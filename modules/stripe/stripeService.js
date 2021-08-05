const { Stripe } = require("stripe");

module.exports = class StripeService {
  constructor({}) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 3,
    });
  }

  async createPaymentIntent(data) {
    return await this.stripe.paymentIntents.create(data);
  }
  async confirmPaymentIntent(id, params) {
    return await this.stripe.paymentIntents.confirm(id, params = null)
  }
  async createSession(data) {
    return await this.stripe.checkout.sessions.create(data);
  }

  async createPaymentMethod(data) {
    return await this.stripe.paymentMethods.create(data);
  }

  async createAccount(data) {
    return await this.stripe.accounts.create(data);
  }

  async getAccount(userId) {
    return await this.stripe.accounts.retrieve(userId);
  }


  async createCustomerAccount(customerData) {
    return await this.stripe.customers.create(customerData);
  }


  constructWebkookStripeEvent(payload, signature, secret) {
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }
};
