module.exports = {
  addressAPIS: ({ addressService }) => ({
    create: async (req, res) =>
      addressService
        .create(req.params.id, req.body)
        .then((addr) => res.status(201).json({ data: addr })),

    getAll: async (req, res) =>
      addressService
        .getAll(req.params.user)
        .then((addrs) => res.status(200).json({ data: addrs })),
    countAllAddresses: async (req, res) =>
      addressService
        .countAllAddresses()
        .then((nber) => res.status(200).json({ data: nber })),
  }),
};
