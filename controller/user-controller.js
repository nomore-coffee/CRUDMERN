import express from "express"
import { response } from "express";
import { request } from "express";
import jwt from 'jsonwebtoken'

import User from "../model/user-schema.js"
import signup from "../model/signupinfo-schema.js";


export const getUser = async(request , response)=>{
    // response.status(200).json("HEY CONNECTED")not wworking with this
    try {
         let user = await User.find();
         response.json(user)
     } catch (error) {
         response.json({message: error.message})
         
     }
}

export const addemp =async(request , response)=>{
    const user = request.body;
    const newUser = new User(user);

    try {
       await newUser.save();
        response.json(newUser)
    } catch (error) {
        response.json({message: error.message})
        
    }
}

export  const getuserbyID= async  (request, response)=>{
    const id = request.params.id; 
   
    try {
        const user = await User.findById(id);
        response.json(user)
    } catch (error) {
        response.json({message:error.message})
    }
}

export const edituser = async(request , response)=>{
    const user=request.body;
    const edituser= new User(user);

    try {
        await User.updateOne({_id: request.params.id},edituser)
        response.json
    } catch (error) {
        response.json({message:error.message})
        
    }
}

export const deleteuser = async(request , response)=>{

    try {
        await User.deleteOne({_id:request.params.id});
        response.json("User deleted succesfful");
    } catch (error) {
        response.json({message:error.message})   
    }
}

export const signupuser =async(request , response)=>{
    const user = request.body;
    console.log("EFSFAS",user)
    const newUser = new signup(user);
    console.log("EFSFAS",newUser)

    // try {
    // //    await newUser.save();
    // //     response.json(newUser)
    // await signup.create({
    //     name:req.body.name,
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:req.body.password,
    // })
    //     res.json({status:'ohk'})
    // } catch (error) {
    //     response.json({error:'Dublicate' , status:'error'})
        
    // }
    try {
        await newUser.save();
        response.json({status:'ohk'})
     } catch (error) {
        // response.json({error:'Dublicate' , status:'error'})
        response.json({message: error.message})
         
     }
}

export const getlogin = async(request , response)=>{

    try {
         let user1 = await signup.findOne({
                username:request.body.username
                // password:request.body.password
         })

         if(user1){
            const token = jwt.sign({
               email:user1.username
            },'AMANJWT')
           return response.json({ status:'ohk',user:token})
       }  
       else{
           return response.json({ status:'notohk',user:false})
           
       }
     } catch (error) {
         response.json({message: error.message})
         
     }
}