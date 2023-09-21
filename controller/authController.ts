import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Twilio } from "twilio";



const accountSid = process.env.SID as string;
const authToken = process.env.KEY as string;

const client =  new Twilio(accountSid, authToken);

const registerController = async (req: Request, res: Response) => {
  try {
    const reuser = await User.findOne({ email: req.body.email });
    if (!reuser) {
      const saltRounds = 10;
      const hashpassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = new User({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        password: hashpassword,
        phone: req.body.phone,
        address: req.body.address,
        favourite: req.body.favourite,
        favpassword: req.body.favpassword,
      });
      const user = await newUser.save();
      res.status(200).send({
        success: true,
        message: user,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Already registered please login",
      });
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err,
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    const key:string=process.env.JWT_KEY as string
    if (user && key) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, key);
        res.status(200).send({
          success: true,
          message: { user, token: token },
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Wrong password",
        });
      }
    } else {
      res.status(200).send({
        success: false,
        message: "Wrong email",
      });
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err,
    });
  }
};

const confirmPhonenumber=async(req: Request, res: Response)=>{
  try{
    const verification = await client.verify.services(accountSid)
      .verifications.create({
        to: `+91${req.body.number}`,
        channel: 'sms',
      });
    client.messages
    .create({
      from: '6238403528',
      to: `+91${req.body.number}`,
      body: "You just sent an SMS from TypeScript using Twilio!",
    })
    .then((message) => console.log(message.sid));

    res.status(200).json({
      success: true,
      message: 'SMS verification code sent successfully',
      verificationSid: verification.sid, 
    });
  }catch (err) {
    res.status(401).send({
      success: false,
      message: err,
    });
  }
}

const forgotpassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.phoneNumber }) ;
    try {
     
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(req.body.newpassword, saltRounds);
        await user?.updateOne({ password: hashpassword });
        res.status(200).send({
          success: true,
          message: user,
        });
     
    } catch (err) {
      res.status(401).send({
        success: false,
        message: err,
      });
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err,
    });
  }
};

export { registerController, loginController, forgotpassword,confirmPhonenumber };
