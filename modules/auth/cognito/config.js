const AWS = require("aws-sdk");
const jwt_decode = require("jwt-decode");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
let cognitoAttributeList = [];

const poolData = {
  UserPoolId: process.env.AWS_LBDA_COGNITO_POOLID,
  ClientId: process.env.AWS_LBDA_COGNITO_APP_CLIENT_ID,
};

function attributes(key, value) {
  return {
    Name: key,
    Value: value,
  };
}

function setCognitoAttributeList(email, agent) {
  let attributelist = [];
  attributelist.push(attributes("email", email));
  attributelist.forEach((elt) => [
    cognitoAttributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(elt)
    ),
  ]);
}

function getCognitoAttributeList() {
  return cognitoAttributeList;
}

function getCognitoUser(email) {
  const userDAta = {
    Username: email,
    Pool: getUserPoll(),
  };
  return new AmazonCognitoIdentity.CognitoUser(userDAta);
}

function getUserPoll() {
  return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

function getAuthDetails(email, password) {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

function initAWS(
  region = process.env.AWS_LBDA_REGION,
  identityPoolId = process.env.AWS_IDENTITY_POOL_ID
) {
  AWS.config.region = region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    identityPoolId,
  });
}

function refreshNeeded() {
  return AWS.config.credentials.needsRefresh();
}

function decodeJWTToken(token) {
  const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken);
  return { token, email, exp, uuid: sub, auth_time, token_use };
}

module.exports = {
  initAWS,
  decodeJWTToken,
  getAuthDetails,
  getCognitoUser,
  getUserPoll,
  getCognitoAttributeList,
  setCognitoAttributeList,
  refreshNeeded,
};
