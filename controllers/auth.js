const db = require('../models')
const verify = require('../jwt/verify')


exports.register = (req, res, next) => {
    db.User.findOne({
        email: req.body.email
      }, function (err, user) {
        if (err) {
          res.json(err)
        }
        if (user) {
            res.json({ success: false, message: 'This email address already exists' })
        } else {
          var newUser = new db.User()
          newUser.email = req.body.email.toLowerCase()
          newUser.password = newUser.generateHash(req.body.password)
          newUser.save(function (err, user) {
            if (err) {
              res.json(err)
            }
                  
            res.json({
                success: true,
                message: 'You have successfully registered. Please proceed to login',
                
            })
      })

    }
})
}

exports.login = (req, res, next) => {
    console.log('Login Body ', req.body)
    db.User.findOne({  email: req.body.email  }).then(user => {
        // console.log('User ', user)
        if (user) {
            if (user.validPassword(req.body.password)) {
                const { firstname, username, lastname, id } = user

                res.json({
                    success: true,
                    token: user.generateJwt(),
                    user: { lastname, firstname, id, username }
                })
            }
        } else {
            res.json({ success: false, message: 'Login information is incorrect' })
        }
    })
}

exports.logout = (req, res, next) => {
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
       req.logOut()
       res.status(200).json(data)
 
     }else{
       res.sendStatus(401)
     }
   }