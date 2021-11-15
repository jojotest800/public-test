const CognitoExpress = require("cognito-express");
const compose = require("composable-middleware");

const cognitoAuthChecker = new CognitoExpress({
  region: process.env.AWS_LBDA_REGION,
  cognitoUserPoolId: process.env.AWS_LBDA_COGNITO_POOLID,
  tokenUse: "access",
  tokenExpiration: 300000,
});

function auth() {
  return compose().use((req, res, next) => {
    let token;
    if (req.headers && {}.hasOwnProperty.call(req.headers, "authorization")) {
      token = req.headers.authorization;
    }
    if (!token)
      return res
        .status(401)
        .json({ error: "Access Token missing from header" });
    const accessToken = token.split(" ")[1];
    cognitoAuthChecker.validate(accessToken, function (err, result) {
      if (err) return res.status(401).json(err);
      req.user = result;
      next();
    });
  });
}

module.exports = { auth };
