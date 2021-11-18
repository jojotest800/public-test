const { asClass, Lifetime } = require('awilix')
const UserService = require('./userService')
const Router = require('./userRouter')
const moduleIsActive = require('../../modules.config').user

module.exports = {
	load (container) {
		if (moduleIsActive) {
			container.register({
				userService: asClass(UserService, { lifetime: Lifetime.SINGLETON })
			})

			const app = container.resolve('expressApp')
			app.use('/api/v1/users', Router)
		}
	}
}
