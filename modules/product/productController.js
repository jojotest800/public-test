module.exports = {
  productsAPIS: ({ productService }) => ({
    create: (req, res) =>
      productService
        .create(req, req.params.userId)
        .then((user) => res.status(201).json({ data: user })),

    update: (req, res) =>
      productService
        .update(req.params.id, req)
        .then((user) => res.status(201).json({ data: user })),

    getAll: (req, res) =>
      productService
        .getAll(+req.query.page)
        .then((users) => res.status(200).json({ data: users })),
    getProduct: (req, res) =>
      productService
        .getProduct(req.params.id)
        .then((user) => res.status(200).json({ data: user })),

    delete: (req, res) =>
      productService
        .delete(req.params.id)
        .then((user) => res.status(200).json({ data: user })),
    userPayments: (req, res) =>
      productService
        .userPayments(req.params.id)
        .then((data) => res.status(200).json({ data })),
    processSeparate: (req, res) =>
      productService
        .processSeparate()
        .then((data) => res.status(200).json({ data })),
  }),
};
