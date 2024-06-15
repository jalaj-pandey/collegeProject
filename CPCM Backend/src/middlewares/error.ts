import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../types/utility-class.js";
import { controllerType } from "../types/types.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    err.message ||= "Internal server error";
    err.statusCode ||= 500;

    if(err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =(func: controllerType) =>
(req: Request, res: Response, next: NextFunction)=>{
    return Promise.resolve(func(req,res,next)).catch(next);
}