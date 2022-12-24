const app = require("../../app");
const User = require("../../modal/userschema")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

//storing the data from signup form
const signup = async (req, res) => {
    try {
        console.log(req.body, 'reqqqqqqqqqqqqqqqqqqqqqqqq');
        let user = await User.findOne({ email: req.body.signupEmail })
        console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        if (!user) {
          let usernumber = await User.findOne({ phone: req.body.signupPhone })  
        console.log(usernumber, 'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrnumberrrrrrrrrrrrrrrrrr');
          if (!usernumber) {
            try {
              let password = await bcrypt.hash(req.body.signupPassword, 10)
              const user = await new User({
                name: req.body.signupName,
                phone: req.body.signupPhone,
                email: req.body.signupEmail,
                password,
                createdat: Date(),
                block:false
              })
              await user.save().then(() => {
                res.status(200).json({ res: user })
              })
      
            } catch (error) {
              console.log(error.message);
            }
          } else {
            console.log('phonenumberrrrrrrrrrrrrrrrrrrrrrr');
            res.json({ error: "This Phone Number is Alredy Registered" })
          }
        } else {
          res.json({ error: "This Email is Alredy Registered" })
        }
      } catch (error) {
        console.log(error,'tryyyyyyyyyyyeroorrrrrrrrrrrrrrrrrrrrrr');
      }

}

//login and jwt token generated
const login = async (req, res) => {
    try {
        console.log(req.body, 'reqqqqqqqqqqqqqqqqqqqqqqqq');
      let { loginEmail, loginPassword } = req.body;
      let user = await User.findOne({ loginEmail })
      console.log(user,'userrrrrrrrrrrrrrrrrrr');
      if (!user) {
        console.log("No user with this credentials");
        res.json({ error: "This Mail is not Registerd !!!" })
      } else {
        if (user.password) {
          let comparePassword = await bcrypt.compare(loginPassword, user.password);
          if (comparePassword) {
            console.log("login successfull");
            const userId = user._id
            const token = jwt.sign({ userId }, 'xyz123', { expiresIn: '1d' })
            res.status(200).json({ res: {user: user}, token })
            console.log(token, 'tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
          } else {
            console.log("login failed");
            res.json({ error: "Invalid UserId" })
          }
        }
      }
      } catch (error) {
        console.log(error,'tryyyyyyyyyyyeroorrrrrrrrrrrrrrrrrrrrrr');
      }
}


module.exports = { signup, login }