import { Response,Request,NextFunction } from "express";
import AppError from "./AppError";
import appConfig from "../config";
import { MongooseError } from "mongoose";
import mongooseErrorHandler from "./mongoErrors";
import app from "../app";

const devError = (err:AppError,res:Response)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    });
};

const prodError = (err:AppError,res:Response)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        });
    }else{
        res.status(500).json({
            status:"error",
            message:"Something went wrong"
        });
    }
}

const globalErrorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    let appError;
    if(appConfig.server.nodenv==="development"){
        if(err instanceof AppError){
            appError = new AppError(err.message,err.statusCode||500)
        }else{
            appError = new AppError(err.message,500);
        }
        devError(appError,res);
    }else if(appConfig.server.nodenv==="production"){
        if(Error instanceof MongooseError){
            appError = mongooseErrorHandler(err);
        }else{
            appError = new AppError(err.message,500);
        }
        if(err)
        prodError(appError,res);
    }
};

export default globalErrorHandler;