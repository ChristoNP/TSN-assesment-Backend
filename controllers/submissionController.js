const db = require("../models")
const { Submission } = db

class SubmissionController {
    static async createSubmission(req, res, next) {
        try {
            const { firstName, lastName, department, years, answers } = req.body
            const avg = answers.reduce((a, b) => a + Number(b), 0) / answers.length

            const submission = await Submission.create({
                firstName,
                lastName,
                department,
                years,
                average: avg
            })

            res.status(201).json({
                status: "OK",
                message: "Submission created successfully",
                data: submission
            })
        } catch (err) {
            next(err)
        }
    }
    static async getSubmissionById(req, res, next) {
        try {
            const { id } = req.params
            const submission = await Submission.findByPk(id)

            if (!submission) {
                return res.status(404).json({
                    status: "ERROR",
                    message: "Submission not found",
                    data: null,
                })
            }

            res.status(200).json({
                status: "OK",
                message: "Submission retrieved successfully",
                data: submission,
            })
        } catch (err) {
            next(err)
        }
    }
    static async getAllSubmissions(req, res, next) {
        try {
            const submissions = await Submission.findAll()
            res.status(200).json({
                status: "OK",
                message: "Submissions retrieved successfully",
                data: submissions,
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SubmissionController