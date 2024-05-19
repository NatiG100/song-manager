import dotenv from 'dotenv';
dotenv.config();

interface Config{
    server:{
        port:number,
        nodenv:"development"|"production",
    }
    db:{
        mongoDbConnection:string
    }
}

const appConfig: Config = {
    server: {
        port: parseInt(process.env.PORT||"4000"),
        nodenv:process.env.NODE_ENV==="development"?"development":"production",
    },
    db:{
        mongoDbConnection:process.env.MONGO_DB_CONNECTION||"",
    }
}

export default appConfig;