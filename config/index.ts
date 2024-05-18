import dotenv from 'dotenv';
dotenv.config();

interface Config{
    server:{
        port:number
    }
}

const appConfig: Config = {
    server: {
        port: parseInt(process.env.PORT||"4000")
    }
}

export default appConfig;