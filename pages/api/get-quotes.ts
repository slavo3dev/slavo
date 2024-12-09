import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiUrl = process.env.QUOTES_API_URL; 
  const apiKey = process.env.API_NINJAS_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('API URL or API Key is not defined');
    return res.status(500).json({ error: 'API URL or API Key is not defined in .env file' });
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': apiKey, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the quote');
    }

    const data = await response.json(); 
    
    if (Array.isArray(data) && data.length > 0) {
      const { quote, author } = data[0]; 
      res.status(200).json({ quote, author }); 
    } else {
      res.status(400).json({ error: 'No quotes found in the response data' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Failed to fetch quote: ${error.message}` });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export default handler;
