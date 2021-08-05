module.exports = {
  usersAPIS: ({ userService }) => ({
    create: (req, res) =>
      userService
        .create(req)
        .then((user) => res.status(201).json({ data: user })),

    update: (req, res) =>
      userService
        .update(req.params.id, req)
        .then((user) => res.status(201).json({ data: user })),

    getAll: (req, res) =>
      userService
        .getAll(+req.query.page)
        .then((users) => res.status(200).json({ data: users })),

    getUser: (req, res) =>
      userService
        .getUser(req.params.id)
        .then((user) => res.status(200).json({ data: user })),

    delete: (req, res) =>
      userService
        .delete(req.params.id)
        .then((user) => res.status(200).json({ data: user })),
    makePayment: (req, res) =>
      userService
        .makePayment(req.body)
        .then((data) => res.status(201).json(data)),
    stripeEvents: (req, res) =>
      userService
        .stripeEvents(req)
        .then((data) => res.status(200).json({ data })),
    userPayments: (req, res) =>
      userService
        .userPayments(req.params.id)
        .then((data) => res.status(200).json({ data })),
    createStripeCustomer: (req, res) =>
      userService
        .newStripeCustomer(req.params.id, req.body)
        .then((data) => res.status(200).json({ data })),
    createPaymentIntent: (req, res) =>
      userService
        .createPaymentIntent(req.params.id, req.body)
        .then((data) => res.status(200).json({ data })),
    getTransactions: (req, res) =>
      userService
        .getTransactions()
        .then((data) => res.status(200).json({ data })),
        confirmPaymentIntent: (req, res) =>
      userService
        .confirmPaymentIntent(req.params.id, req.body)
        .then((data) => res.status(200).json({ data })),
  }),
};

