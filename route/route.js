import express from "express";
import { response } from "express";
import { getUser , addemp , getuserbyID , edituser,deleteuser, signupuser, getlogin} from "../controller/user-controller.js";
const route = express.Router();

route.get('/',getUser);
route.post('/add',addemp)
route.get('/:id',getuserbyID)
route.put('/:id',edituser)
route.delete('/:id',deleteuser)
route.post('/signup',signupuser)
route.post('/login',getlogin)
export default route;