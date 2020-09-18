const Subject = require('../models/subjectModel');
const catchAsync = require('../catchAsync');
const User = require('./../models/userModel');
const { findById } = require('../models/subjectModel');
//Renders GYM/LAUNDRY status
exports.getSubjects = catchAsync(async(req,res)=>{
    const subjects = await Subject.find();
    res.status(200).render('courses',{
        title: "Subjects",
        subjects
    })
})

exports.getHomepage = catchAsync(async(req,res)=>{
    res.status(200).render('homepage',{
        title: 'Welcome'
    })
})

exports.getContacts = catchAsync(async(req,res)=>{
    res.status(200).render('contact',{
        title: 'Contact Me'
    })
})

exports.getHindi = catchAsync(async(req,res)=>{
    res.status(200).render('hindi',{
        title: 'Hindi'
    })
})

exports.afterlogin = catchAsync(async(req,res)=>{
    const user = await User.find();
    res.status(200).render('after-login',{
        title: 'Welcome',
        user
        

    })
})

