const express = require('express');
const passport = require('passport');
const router = express.Router();

//Get request from Google
router.get('/google' , passport.authenticate('google' ,{scope: ['profile']}))

//Google Auth Callback
//Get /auth/google/callback

router.get('/google/callback', passport.authenticate('google' ,{failureRedirect:'/homepage'}),
(req,res)=>{
    res.redirect('/after-login')
}
)

// Logout User
router.get('/logout' ,(req,res) =>{
    req.logout();
    res.redirect('/')
})

module.exports = router;