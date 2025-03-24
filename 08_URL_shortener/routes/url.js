const express = require("express")
const { HandleGenerateShortURL, handleGetAnalytics } = require("../controllers/url.js")

const router = express.Router()

router.post('/', HandleGenerateShortURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;