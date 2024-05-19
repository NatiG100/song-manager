import { NextFunction, Request, Response } from "express";
import { GeneralStat, ResponseBody } from "../types";
import StatService from "../services/StatServices";

export default class StatController{
    static async getGeneralStat(
        req:Request,
        res:Response<ResponseBody<GeneralStat>>,
        next:NextFunction
    ){
        try{
            const generalStat = await StatService.generalStat();
            res.send({
                data:generalStat,
                message:"General Stat"
            });
        }catch(err){
            next(err);
        }
    }
}