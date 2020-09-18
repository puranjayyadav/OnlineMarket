const Subjects = require('../models/subjectModel');
const APIFeatures = require('../apiFeatures');
const AppError = require('./../appError');
const catchAsync = require('./../catchAsync');


exports.getAllSubjects = catchAsync(async(req,res,next) =>{
   
    const features = new APIFeatures(Subjects.find() ,req.query).filter().sort().limitFields();
    const subjects = await features.query;

    res.status(200).json({
        status: 'Success',
        results: subjects.length,
        data:{
            subjects
        }
    })
})

exports.createSubject = catchAsync(async (req,res,next) =>{
   
    const subject = await Subjects.create(req.body);
    res.status(201).json({
        status:'Success',
        data:{
            subject
        }
      });

    })

exports.deleteSubject =catchAsync(async(req,res,next) =>{
   
    
        const subject= await Subjects.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: 'Success'
            })
    
});

exports.updateSubject = catchAsync(async(req,res,next)=>{
    const subject = await Subjects.findByIdAndUpdate(req.params.id,{
        new:true,
        runValidators: true
    });
    res.status(200).json({
        status: 'Success',
        data:{
            subject
        }
    })
})