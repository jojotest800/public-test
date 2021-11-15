const { makeInvoker } = require('awilix-express')
const express = require('express')
const { authAPI } = require('./authController')
const router = express.Router();

const api = makeInvoker(authAPI)

router.post('/register', api('register'))
router.post('/verify-email', api('verifyEmail'))
router.post('/resend-verification-code', api('resendEmailVerificationCode'))
router.post('/login', api('login'))

module.exports = router