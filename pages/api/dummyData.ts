// /pages/api/dummyData.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
  age: number;
};

let dummyData: Data[] = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 32 },
  { id: 3, name: 'Alice Johnson', age: 24 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(dummyData);
      break;

    case 'PUT': {
      // Find the item by id and update it
      const { id } = query;
      const { name, age } = body;

      const index = dummyData.findIndex((item) => item.id === Number(id));
      if (index === -1) {
        return res.status(404).json({ message: 'Data not found' });
      }

      dummyData[index] = { ...dummyData[index], name, age };
      res.status(200).json(dummyData[index]);
      break;
    }

    case 'DELETE': {
      // Find the item by id and delete it
      const { id } = query;

      dummyData = dummyData.filter((item) => item.id !== Number(id));
      res.status(200).json({ message: 'Data deleted successfully' });
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
