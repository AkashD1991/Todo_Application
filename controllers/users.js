const User = require('../models/user');
const mailer = require('../misc/mailer');
const bcrypt = require('bcryptjs');
const randomString = require('randomstring');


module.exports = {

    signUp: async(req, res, next) => {
        try{
        const { fname, lname, email, gender, birthdate, password, isAdmin, isActive, code } = req.value.body;
        console.log(req.value.body);

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({user : 'Email is already in use'})
        }
        const Token = randomString.generate();
        console.log(Token);
        const newUser = new User({ fname, lname, email, gender, birthdate, password, isAdmin, isActive, code ,Token});
        await newUser.save();
        res.status(200).json({user:'Thank You for Register! , please check your email and Verify'})
        
        const html = `Hi there,
            <br/>
            Thank you for registering!
            <br/><br/>
            Please verify your email by typing the following token:
            <br/>
            Token: <b>${code}</b>
            <br/>
            On the following page:
            <a href="http://localhost:3000/verify">Click Here</a>
            <br/><br/>
            Have a pleasant day.` 

      // Send email
      await mailer.sendEmail('admin@gmail.com',email, 'Please verify your email!', html);

      res.status(200).json({user: 'Please check your email.' });
    } catch(error) {
      next(error);
    }
},

verify:async(req, res, next) =>
{
        const { email, code } = req.body
        console.log(req.body);

        const user = await User.findOne({ email,code });
      if (!user) {
        // return res.status(403).json({user: 'Invalid filed'});
       return res.status(200).json({error:'Invalid filed'})
      }
        await User.update({email},
            {
            $set: { isActive:true,
                    code:''
                  }
            }
        )
        res.status(200).json({user : 'Now You May Login'})
},

signIn: async (req, res, next) =>{
        const { email, password } = req.body
        
        const user = await User.findOne({ email });
        if (!user) {
         return res.json({errorEmail : 'Entered Wrong Email'})
          }
     if(!await bcrypt.compare(password,user.password))
      {
        return res.json({errorPassword : 'Entered Wrong Password'})
      }
      if(!user.isActive)
      {
        return res.status(200).json({user : 'You are not active, Please contact Admin'})
      }
      const Token = randomString.generate();
      console.log(Token);
      return res.status(200).json({user,Token})
    },

    getusers:async (req, res, next) =>{

        const users= await User.find({});
        return res.status(200).json(users);
    },

    updateUser:async (req, res, next) =>{
        const {_id} =req.body
        console.log(req.body);
        const user = await User.findById({_id})
        await User.update({_id},
            {
            $set: { 
                isActive: !user.isActive
                  }
            }
        )
        res.status(200).json({user : 'Updated Successfully'})

    },

    updateProfile:async(req, res, next) => {
        
        const {_id, fname, lname, email, gender, birthdate, password } = req.body;
        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await User.update({_id},
            {
            $set: { fname, lname, email, gender, birthdate, password:passwordHash }
            }
        )
        res.status(200).json({user : 'Profile Updated Successfully'})

        }
}