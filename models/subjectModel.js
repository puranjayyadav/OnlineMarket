const mongoose = require('mongoose');
const slugify = require('slugify');
const SubjectSchema = new mongoose.Schema({
    SubjectName:{
        type:String,
        required:[true, 'A Subject card must have name'],
        unique: true,
        minLength:1
    },
    SubjectDescription:{
        type:String,
        required:[true, 'A subject must have a description']
    },
    imageCover:{
        type:String,
        required:[true,'Please specify a image to the cards']
    },
    slug:String
})
SubjectSchema.pre('save' , function(next){
    this.slug = slugify(this.SubjectName, {lower: true});
next();
});

const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;