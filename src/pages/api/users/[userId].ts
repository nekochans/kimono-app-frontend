import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
};

type UserResponse = {
  user?: User;
  error?: {
    code: number;
    message: string;
  };
};

const handler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>,
): void => {
  const userId: number = parseInt(req.query.userId as string, 10);

  const users = [
    { id: 1, name: 'Moko' },
    { id: 2, name: 'Mop' },
  ];

  const responseUser = users.filter((user: User) => {
    return user.id === userId;
  });

  if (responseUser.length === 0) {
    const responseBody = {
      error: {
        code: 400,
        message: 'Not Found',
      },
    };

    return res.status(404).json(responseBody);
  }

  const responseBody = {
    user: responseUser[0],
  };

  return res.status(200).json(responseBody);
};

export default handler;
