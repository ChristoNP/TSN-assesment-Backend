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
}

module.exports = SubmissionController