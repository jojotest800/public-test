const emitter = require("../events");

module.exports = class User {
  constructor({ postgresDBConnection, stripeService }) {
    this.db = postgresDBConnection;
    this.perPage = 2;
    this.stripeService = stripeService;
    emitter.on("NEW_PRODUCT_ADDED", this.alertNewProduct.bind(this));
  }

  async create(req) {
    const { email, firstName, lastName } = req.body;
    const user = await this.db.User.findOne({ where: [{ email: email }] });
    if (user) {
      throw new Error("Email already in use");
    }
    return await this.db.User.create({ email, firstName, lastName });
  }

  async update(userId, req) {
    const fields = req.body;
    const user = await this.db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User does not exists");
    }
    return await this.db.User.update({ ...fields }, { where: { id: userId } });
  }

  async getAll(page = null) {
    const p = page ? page : 1;
    const result = await this.db.User.findAndCountAll({
      offset: (page - 1) * this.perPage,
      limit: this.perPage,
      include: {
        model: this.db.Address,
      },
    });
    const total = result.count;
    const pagesNumber = Math.ceil(total / this.perPage);
    const paginator = {
      total,
      pagesNumber,
      next: page < pagesNumber,
      prev: page > 1 && page <= pagesNumber,
    };
    return { paginator, rows: result.rows };
  }

  async getUser(userId) {
    return await this.db.User.findOne({
      where: { id: userId },
      include: this.db.Address,
    });
  }

  async delete(userId) {
    return await this.db.User.destroy({
      where: { id: userId },
      include: this.db.Address,
    });
  }

  async userPayments(userId) {
    return await this.db.Payment.findAll();
  }

  async makePayment(data) {
    const { line_items, userId } = data;

    const user = await this.db.User.findOne({
      id: userId,
      include: this.db.Address,
    });

    if (!user) {
      throw new Error("User not found !");
    }
    let amount = 0;
    line_items.forEach((item) => {
      amount += item?.price_data?.unit_amount;
    });

    const paymentSession = await this.stripeService.createSession({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: user.email,
      success_url:
        "http://localhost:3000/checkout?sessionId={CHECKOUT_SESSION_ID}&status=success",
      cancel_url:
        "http://localhost:3000/checkout?sessionId={CHECKOUT_SESSION_ID}&status=failed",
    });

    const newPayment = await this.db.Payment.create({
      userId: user.id,
      amount,
      status: "initialized",
      buyer_address: user?.Addresses[0]?.id,
      payment_mode: "stripe",
      session: paymentSession.id,
    });
    return { sessionUrl: paymentSession.url, paymentInfo: newPayment };
  }

  async stripeEvents(req) {
    const payload = req.rawBody;
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = this.stripeService.constructWebkookStripeEvent(
        payload,
        sig,
        process.env.WEBHOOK_ENDPOINT_SECRET
      );
    } catch (error) {
      let err = new Error();
      err.message = `Signature verification failed : ${error.message}`;
      error.statusCode = 400;
      throw err;
    }

    const session = event.data.object;
    const lastInitializedSession = await this.db.Payment.findOne({
      where: { session: session.id },
    });

    switch (event.type) {
      case "checkout.session.completed":
        if (!lastInitializedSession) {
          throw new Error("Last initialized session not found !");
        }
        lastInitializedSession.status = "complete";
        lastInitializedSession.save();
        break;
      case "payment_intent.canceled":
        const paymentIntentId = event?.data?.objoct?.id;
        const trans = await this.db.Transaction.findOne({
          where: { chargeId: paymentIntentId },
        });
        const order = await this.db.Order.findOne({
          where: { transactionId: trans.id },
        });
        const status = "failed";
        trans.upodate({ status });
        order.upodate({ status });
        console.log(
          "payment intent cancel event receive from stripe server :",
          event
        );
        break;

      case "payment_intent.succeeded":
        console.log(
          "payment intent success event receive from stripe server",
          event
        );
        break;
      case "payment_intent.processing":
        console.log(
          "payment intent processing event receive from stripe server"
        );
        break;

      case "customer.created":
        console.log("Customer created event receive from stripe server");
        break;
      case "customer.deleted":
        console.log("Customer deleted event receive from stripe server");
        break;

      default:
        console.log(`Cannot handle the event : ${Object.keys(event.type)}`);
        break;
    }

    return "ok";
  }

  async newStripeCustomer(userId, body) {
    const user = await this.db.User.findOne({
      where: { id: userId },
      include: this.db.Address,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const addrs = user.Addresses;

    const payment_method = await this.stripeService.createPaymentMethod(body);
    let customer;
    if (payment_method) {
      customer = await this.stripeService.createCustomerAccount({
        email: user.email,
        // address: addrs.length > 0 ? addrs[0] : null,
        name: user.firstName + " " + user.lastName,
        payment_method: payment_method.id,
      });
    }
    return { customer, payment_method };
  }

  async alertNewProduct(model) {
    
    console.log("A new product has been added : ", model);
  }

  async createPaymentIntent(userId, body) {
    const user = await this.db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found !");
    }
    const paymentIntent = await this.stripeService.createPaymentIntent({
      ...body,
      receipt_email: user.email,
    });
    return await this.db.Transaction.create({
      userId,
      payment_intent: paymentIntent.id,
      status: "authorized",
      type: paymentIntent.client_secret,
    });
  }

  async confirmPaymentIntent(userId, paymentIntentId){
    const user = await this.getUser(userId)
    if(!user){
      throw new Error('User not found')
    }
    return await  this.stripeService.confirmPaymentIntent(paymentIntentId?.id, {
      receipt_email: user.email
    })
  }

  async getTransactions() {
    return await this.db.Transaction.findAll({});
  }
};
