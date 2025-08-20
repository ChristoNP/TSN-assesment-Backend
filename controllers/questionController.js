const db = require("../models");
const { Question } = db

class QuestionController {
    static async getAllQuestions(req, res, next) {
        try {
            const questions = await Question.findAll({
                order: [["order", "ASC"]]
            })
            res.json({
                status: "OK",
                message: "Questions retrieved successfully",
                data: questions
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = QuestionController