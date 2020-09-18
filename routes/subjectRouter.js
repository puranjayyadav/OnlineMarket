const express = require('express');
const Router = express.Router();
const subjectRouter = require('../controller/subjectController');

Router.route('/').get(subjectRouter.getAllSubjects).post(subjectRouter.createSubject)
Router.route('/:id').delete(subjectRouter.deleteSubject).patch(subjectRouter.updateSubject)
module.exports = Router;