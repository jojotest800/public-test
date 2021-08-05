module.exports = {
    imagesAPIS: ({ imageService }) => ({
      create: async (req, res) =>
        imageService
          .create(req)
          .then((user) => res.status(201).json({ data: user })),

    }),
  };
  