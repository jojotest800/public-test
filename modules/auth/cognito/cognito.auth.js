const AWSConfig = require('./config')

function signup (email, password, agent = 'none') {
	return new Promise((resolve) => {
		AWSConfig.initAWS()
		AWSConfig.setCognitoAttributeList(email, agent)
		AWSConfig.getUserPoll().signUp(
			email,
			password,
			AWSConfig.getCognitoAttributeList(),
			null,
			(err, result) => {
				if (err) {
					return resolve({ statusCode: 422, response: err })
				}
				const response = {
					username: result.user.username,
					userConfirmed: result.userConfirmed,
					userAgent: result.user.client.userAgent
				}
				return resolve({ statusCode: 201, response })
			}
		)
	})
}

function verify (email, code) {
	return new Promise((resolve) => {
		AWSConfig.getCognitoUser(email).confirmRegistration(
			code,
			true,
			(err, result) => {
				if (err) {
					return resolve({ statusCode: 400, response: err })
				}
				return resolve({ statusCode: 200, response: result })
			}
		)
	})
}

function signin (email, password) {
	return new Promise((resolve) => {
		AWSConfig.getCognitoUser(email).authenticateUser(
			AWSConfig.getAuthDetails(email, password),
			{
				onSuccess: (result) => {
					const token = {
						accessToken: result.getAccessToken().getJwtToken(),
						idToken: result.getIdToken().getJwtToken(),
						refresToken: result.getRefreshToken().getToken()
					}
					return resolve({
						statusCode: 200,
						response: AWSConfig.decodeJWTToken(token)
					})
				},
				onFailure: err => resolve({ statusCode: 400, response: JSON.stringify(err) })
			}
		)
	})
}

function resendEmailVerificationCode (email) {
	return new Promise((resolve) => {
		AWSConfig.getCognitoUser(email).resendConfirmationCode((
			err,
			result
		) => {
			if (err) {
				return resolve({ statusCode: 400, response: err })
			}
			return resolve({ statusCode: 200, response: result })
		})
	})
}

function getNewRefreshToken (email, refresh_token) {
	return new Promise((resolve) => {
		const cognitoUser = AWSConfig.getCognitoUser(email)
		if (AWSConfig.refreshNeeded()) {<
			// eslint-disable-next-line consistent-return
			cognitoUser.refreshSession(refresh_token, (err, result) => {
				if (err) return console.log(err)
			})
		}
	})
}

module.exports = {
	signup,
	verify,
	signin,
	resendEmailVerificationCode
}
