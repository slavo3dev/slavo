import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'stoic-quotes.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const quotes = JSON.parse(fileContents);
    
    if (Array.isArray(quotes) && quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const { quote, author } = quotes[randomIndex];

      res.status(200).json({ quote, author });
      
    } else {
      res.status(400).json({ error: 'No quotes found in the response data' });
    }
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Failed to fetch quotes from JSON file' });
  }
};

export default handler;
