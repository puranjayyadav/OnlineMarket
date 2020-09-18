const fs= require('fs');
const path = require('path');
const dotenv = require('dotenv');
const express= require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanititze = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer')
const passport = require('passport');
const session = require('express-session')
const viewRouter=require('./routes/viewRouter')
const globalErrorHandler = require('./controller/GlobalErrorHandler');
//Rotuers Declared
const SubjectRouter = require('./routes/subjectRouter');
const AuthRouter = require('./routes/auth')
//load the config
dotenv.config({path: './config.env'});

require('./passport')(passport)
const app= express();

app.set('view engine' , 'pug');
app.set('views' , path.join(__dirname, 'views'));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//Sessions
app.use(session({
    secret: 'hArsh@1971RN',
    resave: false,
    saveUninitialized:false
}))


//Inintialising Passport Google oAuth Services
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'ContactFrom_v12')));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 *60 *1000,
    message: 'Too many requests from this IP, please try again later in an hour!'
});
app.use('/api' , limiter);

app.use(helmet());
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV ==='development'){
app.use(morgan('dev'));
}


app.use(express.json({limit: '10kb'}));

app.use(mongoSanititze());
app.use(xss());

app.use(hpp());








app.use(globalErrorHandler);


//DEFINING ROUTES(GLOBAL)
app.use('/' , viewRouter);
app.use('/api/v1/Subjects',SubjectRouter)
app.use('/auth' ,AuthRouter);
app.post('/send', (req,res)=>{
    const output=`
    <p>You have a new message from your website</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Name: ${req.body.email}</li>
    </ul>
    <h3> Message</h3>
    <p>${req.body.message}</p>
    `;
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = {
    from: '"Vishakha Online Tutions 👻" <vishakha.mathur@hotmail.com>', // sender address
    to: "puranjayrocks4@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(info,(error,info)=>{
      if(error){
          return console.log(error);
      }
  })
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Message sent: %s", info.messageId)
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

})

//START SERVER

module.exports=app;