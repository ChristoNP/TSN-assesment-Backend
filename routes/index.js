const express = require("express");
const QuestionController = require("../controllers/questionController");
const SubmissionController = require("../controllers/submissionController");
const router = express.Router();

// Questions
router.get('/questions', QuestionController.getAllQuestions)

// Submissions
router.post('/submissions', SubmissionController.createSubmission)

module.exports = router