import { Request, Response } from 'express';
import { config } from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

import { AuthService } from '@services/authService';
import { UserService } from '../services/userService';

config();

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export async function refreshToken(req: Request, res: Response): Promise<void> {
  const authMethod: AuthService = new AuthService();
  const userMethod: UserService = new UserService();
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token required' });
    return;
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      refreshTokenSecret as Secret
    ) as any;
    const user = await userMethod.getUserByEmail(decoded.email);
    if (!user) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = await authMethod.generateAccessToken(
      user,
      req,
      false
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
}
