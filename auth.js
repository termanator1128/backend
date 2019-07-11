var request = require("request");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  request.post(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "https://auth.aleinin.com/verify",
      body: `token=${token}`
    },
    function(error, response, body) {
      const info = JSON.parse(body);
      if (!info.success) {
        return res.json({
          success: info.success,
          message: info.message
        });
      }
      next();
    }
  );
};

module.exports = {
  checkToken: checkToken
};
