const DataValidator = async (req, res, next) => {
  try {
    const emailChecker = (email) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    };


    const passwordChecker = (password) => {
      if (password == undefined || password.length < 8) {
        return false;
      }
    };

    const usernameChecker = (username) => {
      if (username == undefined || username.length < 7) {
        return false;
      }
    };

    const ConfirmPasswordChecker = (password, confirmPassword) => {
      if (password != confirmPassword) {
        return false;
      }
    };

    if(Object.keys(req.body).length === 0){
      return res.status(401).json({
        message: "no data has been sent",
        valid: false
      });
    }else{
    for (const param in req.body) {
      if (param == "email") {
        if (emailChecker(req.body.email) == false) {
          return res.status(401).json({
            message: "Email is invalid",
            error: {
              param: "email",
              value: req.body.email,
            },
          });
        }
      }
      if (param == "username") {
        if (usernameChecker(req.body.username) == false) {
          return res.status(401).json({
            message: "username is invalid min 7 characters",
            error: {
              param: "username",
              value: req.body.username,
            },
          });
        }
      }
      if (param == "password") {
        if (passwordChecker(req.body.password) == false) {
          return res.status(401).json({
            message: "Password is invalid min 8 characters",
            error: {
              param: "password",
              value: req.body.password,
            },
          });
        }
      }
      if (param == "confirmPassword") {
        if (passwordChecker(req.body.password) == false) {
          return res.status(401).json({
            message: "Password is invalid min 8 characters",
            error: {
              param: "password",
              value: req.body.password,
            },
          });
        }
        if (
          ConfirmPasswordChecker(req.body.password, req.body.confirmPassword) ==
          false
        ) {
          return res.status(401).json({
            message: "Passwords do not match.",
            error: [
              { param: "password", value: req.body.password },
              { param: "confirmPassword", value: req.body.confirmPassword },
            ],
          });
        }
      }
    
    }
  }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
  next();
};
module.exports = DataValidator;
