import jwt from "jsonwebtoken";

import User from "../model/user-schema.js";
import signup from "../model/signupinfo-schema.js";

export const getUser = async (request, response) => {
  // response.status(200).json("HEY CONNECTED")not wworking with this
  try {
    let user = await signup.find();
    response.json({ data: user, statusCode: 200 });
  } catch (error) {
    response.json({ message: error.message, statusCode: 403 });
  }
};

export const edituser = async (request, response) => {
  const user = request.body;
  const edituser = new User(user);

  try {
    await User.updateOne({ _id: request.params.id }, edituser);
    response.json({ message: "User Edited succesfful", statusCode: 200 });
  } catch (error) {
    response.json({ message: error.message, statusCode: 403 });
  }
};

export const deleteuser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
    response.json({ message: "User deleted succesfful", statusCode: 200 });
  } catch (error) {
    response.json({ message: error.message, statusCode: 403 });
  }
};

export const signupuser = async (request, response) => {
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
let validCheck = emailRegex.test(request.body.email)
if(!validCheck){
    return response.json({ message:"Email Not in proper Format", statusCode: 403 });
}
  const user = request.body;
  console.log("EFSFAS", user);
  const newUser = new signup(user);
  console.log("EFSFAS", newUser);
  try {
    await newUser.save();
    return response.json({ status: "ohk", statusC0de: 200 });
  } catch (error) {
    // response.json({error:'Dublicate' , status:'error'})
    return response.json({ message: error.message, statusCode: 403 });
  }
};

export const getlogin = async (request, response) => {
  try {
    let user1 = await signup.findOne({
      username: request.body.username,
      password: request.body.password,
    });

    if (user1) {
      const token = jwt.sign(
        {
          email: user1.username,
        },
        "AMANJWT"
      );
      return response.json({ status: "ohk", user: token, statusCode: 200 });
    } else {
      return response.json({ status: "notohk", user: false, statusCode: 403 });
    }
  } catch (error) {
    response.json({ message: error.message });
  }
};
