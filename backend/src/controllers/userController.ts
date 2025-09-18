import { Request, Response, NextFunction } from "express";
import { hashPassword, comparePassword } from "../utils/password";
import User from "../models/user";
import { HTTP_STATUS } from "../constants/httpStatus";
import { generateRefreshToken, generateAccessToken } from "../utils/jwt";
import { MESSAGES } from "../constants/messages";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: MESSAGES.USER.ALREADY_EXISTS });
        return;
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(HTTP_STATUS.CREATED).json({ message: MESSAGES.USER.REGISTER_SUCCESS });
  } catch (error) {
    next(error); 
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
       res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.USER.INVALID_EMAIL });
       return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
       res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.USER.INVALID_PASSWORD });
       return;
    }

    const accessToken = generateAccessToken({ id: user._id, email: user.email });
    if (!accessToken) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.USER.NOT_FOUND });
        return;
    }

    const refreshToken = generateRefreshToken({ id: user._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HTTP_STATUS.OK).json({ message: MESSAGES.USER.LOGIN_SUCCESS, accessToken, user });
  } catch (error) {
    next(error); 
  }
};
