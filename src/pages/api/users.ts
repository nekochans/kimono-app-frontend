import { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
};

type UserResponse = {
  users?: User[];
  error?: {
    code: number;
    message: string;
  };
};

export default (_req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
  const users = [
    { id: 1, name: 'Moko' },
    { id: 2, name: 'Mop' },
  ];

  const userResponse = {
    users,
  };

  return res.status(200).json(userResponse);
};
