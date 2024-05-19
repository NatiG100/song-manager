import app from './app';
import appConfig from './config';
import mongoose from 'mongoose';
import http from 'http';

const server = http.createServer(app);
import { Server } from 'socket.io';
export const io = new Server(server);


main().then(()=>{
    server.listen(appConfig.server.port, ()=>{
        console.log(`[server]: Server is running at http://localhost:${appConfig.server.port}`);
    })
}).catch(err=>{
    console.log("Error while connecting to the database");
    console.log(err);
});

async function main(){
    await mongoose.connect(appConfig.db.mongoDbConnection);
}

