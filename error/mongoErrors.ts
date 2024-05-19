import { MongooseError,Error } from "mongoose";
import AppError from "./AppError";

const mongooseErrorHandler = (err:MongooseError) => {
    if(err instanceof Error.CastError){
        const message = `Invalid ${err.path}: ${err.value}.`;
        return new AppError(message, 400);
    }
    else if(err instanceof Error.ValidationError){
        const errors = Object.values(err.errors).map((el) => el.message);
        const message = `Invalid input data. ${errors.join(". ")}`;
        return new AppError (message, 400);
    }
    else{
        return new AppError ("Database Error", 500);
    }
};
export default mongooseErrorHandler;