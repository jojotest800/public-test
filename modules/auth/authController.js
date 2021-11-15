module.exports = {
  authAPI: ({ authService }) => ({
    register: (req, res) => {
      authService
        .register(req)
        .then((data) => res.status(200).json({ data, code: 0 }));
    },
    verifyEmail: (req, res) => {
      authService
        .verifyEmail(req)
        .then((data) => res.status(200).json({ data, code: 0 }));
    },
    login: (req, res) => {
      authService
        .login(req)
        .then((data) => res.status(200).json({ data, code: 0 }));
    },
    resendEmailVerificationCode: (req, res) => {
      authService
        .resendEmailVerificationCode(req.body.email)
        .then((data) => res.status(200).json({ data, code: 0 }));
    },
  }),
};
