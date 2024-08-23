import { Anthropic } from '@anthropic-ai/sdk';
import memoryStore from '../../lib/memoryStore';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      
      const prompt = [
        "Human: Categorize the following task into one of these categories: Work, Personal, Shopping, Health, Finance",
        "",
        `Task: ${title}`,
        "",
        "Assistant: The category for this task is"
      ].join('\n');

      const completion = await anthropic.completions.create({
        model: "claude-2",
        prompt: prompt,
        max_tokens_to_sample: 1000,
      });

      const category = completion.completion.trim();

      const task = memoryStore.addTask({
        title,
        description,
        category,
      });

      res.status(201).json({ success: true, data: task });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Failed to categorize and save task' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}