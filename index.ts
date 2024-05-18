import app from './app';
import appConfig from './config';
app.listen(appConfig.server.port, ()=>{
    console.log(`[server]: Server is running at http://localhost:${appConfig.server.port}`);
})

