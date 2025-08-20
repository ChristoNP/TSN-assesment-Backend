require("dotenv").config();
const express = require('express');
const cors = require('cors');
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', router)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
