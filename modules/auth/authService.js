const rp = require('request-promise')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Cognito = require('./cognito/cognito.auth')

module.exports = class Auth {
	constructor ({ postgresDBConnection }) {
		this.db = postgresDBConnection
	}

	async register (req) {
		try {
			const { name, email, password } = req.body
			const result = await Cognito.signup(email, password)
			const pwdCrypted = await bcrypt.hash(password, 12)
			const newUser = await this.db.User.create({
				email,
				password: pwdCrypted,
				name
			})
			return result
		} catch (error) {
			throw error
		}
	}

	async verifyEmail (req) {
		try {
			const { email, code } = req.body
			const user = await this.db.User.findOne({ where: { email } })
			// eslint-disable-next-line no-throw-literal
			if (!user) throw 'User not found'
			const response = await Cognito.verify(email, code)
			console.log('result calling cognoito auth  verify :', response)
			user.emailVerified = true
			await user.save()
			return response
		} catch (error) {
			throw error
		}
	}

	async resendEmailVerificationCode (email) {
		try {
			const response = await Cognito.resendEmailVerificationCode(email)

			console.log('result calling cognoito auth  verify :', response)

			return response
		} catch (error) {
			throw error
		}
	}

	async login (req) {
		const { email, password } = req.body
		try {
			const response = await Cognito.signin(email, password)

			console.log('result calling cognoito auth  login :', response)

			return response
		} catch (error) {
			throw error
		}
	}
}
