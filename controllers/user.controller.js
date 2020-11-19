const mongoose = require('mongoose');
var md5 = require('md5');

const UserController = mongoose.model('User');

module.exports.register = (req, res, next) => {
    console.log(req.body)
    var user = new UserController();
    user.email = req.body.email;
    user.password = md5(req.body.password);
    user.save((err, doc) => {
        if (!err)
            res.json({message: 'User Created Successfully!', status: 200})
        else {
            res.json({message: {err}, status: 400})
        }
    });
}
module.exports.login = (req, res, next) => {
    console.log(req.body.email)
    UserController.findOne({email: req.body.email},
        (err, user) => {
            if (err)
                res.json({message: {err}, status: 400})
            // unknown user
            else if (!user)
                res.json({message: 'Email is not registered!', status: 400})
            // wrong password
            else if (!(user.password === md5(req.body.password)))
                res.json({message: 'Wrong password!', status: 401})
            // authentication succeeded
            else
                res.json({message: 'Successfully Authenticated!', status: 200})
        });
}
