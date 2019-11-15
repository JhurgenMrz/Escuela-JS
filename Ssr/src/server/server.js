import express from 'express';
import dotnev from 'dotenv'

dotnev.config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();

app.get('*',(req,res)=>{
    res.send({"Hello":"World"})
})

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server on PORT ${PORT}`);
})