const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subjects=require('../models/subjectModel')
const { userInfo } = require('os');
dotenv.config({path: './config.env'});
//SERVER MANAGEMENT SYSTEM

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.MONGO_PASSWORD
)

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>
    console.log('DB connnection succesfull !'));

    //READ JSON FILE
    const subjects = JSON.parse(
        fs.readFileSync(`${__dirname}/Subjects.json`, 'utf-8')
    );

    const importData = async() =>{
        try{
        await Subjects.create(subjects);
        console.log('Data Succesfully Loaded');     
        process.exit();       
        }catch(err){
            console.log(err);
        }
    };

    //Delete All DATA from DB

    const deleteData = async()=>{
        try{
            await Subjects.deleteMany();
            console.log('Data Succesfully deleted');
            process.exit();
        }catch(err){
            console.log(err);
        }
    }
    if(process.argv[2] === '--import'){
        importData();
    }else if(process.argv[2] === '--delete'){
        deleteData();
    }