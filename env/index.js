const assert =require('assert')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    getEnvVal(key){
        const result = process.env[key]
        assert(typeof result !== 'undefined',`Please provide ${key} in the .env file, cause it seems to be undefined!`)

        return result
    }
}