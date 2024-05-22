

const accessTokenCheck = (accessToken, refreshToken) => {
    if(!accessToken || !refreshToken) {
        return;
    }

    const accessTokenValue = accessToken;
    const payload = accessTokenValue.split(".")[1]
    // console.log(payload); // Output :-  eyJ1c2VybmFtZSI6ImppbSIsImlhdCI6MTcxNjIyNDg2OCwiZXhwIjoxNzE2MjI0OTI4fQ   or   null
    const decodePayload = JSON.parse(atob(payload));
    // console.log(decodePayload);  // Output :-  Object { username: "jim", iat: 1716224868, exp: 1716224928 }    or   null
    const expiryValue = decodePayload.exp;

    const checkExpiry = Date.now() / 1000  >  expiryValue;
    // console.log(checkExpiry);  //  Output :-  true
    return checkExpiry;
};

export default accessTokenCheck;