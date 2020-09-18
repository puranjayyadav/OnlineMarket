const express = require('express');
const viewsController = require('../controller/viewController');
const router = express.Router();

router.get('/subjects' ,viewsController.getSubjects);
router.get('/homepage',viewsController.getHomepage)
router.get('/contact', viewsController.getContacts)
router.get('/hindi', viewsController.getHindi);
router.get('/after-login' ,viewsController.afterlogin)

module.exports = router;