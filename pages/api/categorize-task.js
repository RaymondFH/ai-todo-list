import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title } = req.body;
      
      if (!title) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }

      const prompt = [
        "Human: Categorize the following task with a short, single-word category. Be specific but concise.",
        "",
        `Task: ${title}`,
        "",
        "Assistant: The category for this task is"
      ].join('\n');

      const completion = await anthropic.completions.create({
        model: "claude-2",
        prompt: prompt,
        max_tokens_to_sample: 10,
      });

      let category = completion.completion.trim()
        .replace(/^[:"'\s]+|[:"'\s]+$/g, '') // Remove leading/trailing quotes, colons, and spaces
        .replace(/^the\s+/i, ''); // Remove leading "the" if present

      // Capitalize the first letter
      category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      console.log('Task:', title);
      console.log('AI-generated category:', category);

      category = category
        .toLowerCase()
        .replace(/['"]/g, "") // Remove quotes
        .replace(/[.,!?]$/, "") // Remove ending punctuation
        .trim();
      category = category.charAt(0).toUpperCase() + category.slice(1);

      const newTask = {
        id: Date.now(),
        title,
        category,
      };

      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Failed to categorize task' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}