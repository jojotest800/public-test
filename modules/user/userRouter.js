const { makeInvoker } = require('awilix-express')
const express = require('express')
const { usersAPIS } = require('./userController')
const { auth: isAuthenticated } = require('../../middleware/auth')

const api = makeInvoker(usersAPIS)

const router = express.Router()

router.post('/new-stripe-customer/:id', api('createStripeCustomer'))
router.post('/new-payment-intent/:id', api('createPaymentIntent'))
router.post('/confirm-payment-intent/:id', api('confirmPaymentIntent'))
router.post('/', api('create'))
router.post('/webhook', api('stripeEvents'))
router.post('/payment', api('makePayment'))
router.put('/:id', api('update'))
router.delete('/:id', api('delete'))

router.get('/', isAuthenticated(), api('getAll'))
router.get('/transactions', api('getTransactions'))
router.get('/:id', api('getUser'))
router.get('/payments/:id', api('userPayments'))

module.exports = router
