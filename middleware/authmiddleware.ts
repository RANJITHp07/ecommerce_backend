import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

export const signinverify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decode: any = jwt.verify(req.headers.authorization as string, process.env.JWT_KEY as string);
    if (decode) {
      (req as IGetUserAuthInfoRequest).user = decode;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin: IUser | null = await User.findById((req as IGetUserAuthInfoRequest)?.user?.id);
    if (isAdmin?.role) {
      next();
    } else {
      res.status(200).send({
        success: false,
        message: "It is not an admin",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
