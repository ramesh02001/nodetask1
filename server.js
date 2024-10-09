const express =require('express');
const fs = require('fs');
const path =require('path');

const app=express();
const outputfolder='./output';

if (!fs.existsSync(outputfolder)) {
    fs.mkdirSync(outputfolder);
}

const PORT=3000;

app.get('/createFile',(req,res)=>{
    const currentdate=new Date;
    const year= currentdate.getFullYear().toString();
    const month= (currentdate.getMonth()+1).toString();
    const date= currentdate.getDate().toString();
    const hour= currentdate.getHours().toString();
    const min= currentdate.getMinutes().toString();
    const sec= currentdate.getSeconds().toString();

    const dateTimeForFileName= `${year}-${month}-${date}-${hour}-${min}-${sec}.txt`;
    const filepath=path.join(outputfolder,dateTimeForFileName);

    fs.writeFile(filepath,currentdate.toISOString(),(err)=>{
        if(err){
            res.status(500).send(`error creating file : ${err}`);
            return;
        }
        res.send(`file created successfully at: ${filepath}`);

    })
})

app.get('/getfiles',(req,res)=>{
    fs.readdir(outputfolder,(err,files)=>{
        if(err){
            res.status(500).send(`error creating file : ${err}`);
            return;
        }
        console.log("List of Files:",files);
        const textfile=files.filter((file)=> path.extname(file) === ".txt");

        res.json(textfile);

    })
})

app.listen(PORT,(req,res)=>{
    console.log("server is runind:",PORT)
})
