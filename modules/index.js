const Address = require('./address')
const User = require('./user')
const aws_s3 = require('./aws_s3')
const Images = require('./images')
const CronJob = require('./cron/')
const Product = require('./product')
const stripe = require('./stripe')
const Auth = require('./auth')

module.exports = {
    loadModules(container){
        aws_s3.load(container)
        Address.load(container);
        User.load(container);
        Images.load(container);
        CronJob.load(container);
        stripe.load(container);
        Product.load(container);
        Auth.load(container);
    }
}