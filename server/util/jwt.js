const jwt = require('jsonwebtoken');

const SECRET = "VeeeeeeryyyyyyMeg@SecretTttT!!1";

module.exports = {
    createToken: function (data) {
      return jwt.sign(data, SECRET, {
        expiresIn: '15m'
      });
    },
  
    verifyToken: function (token) {
      return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          
          resolve(data);
        });
      });
    }
  };