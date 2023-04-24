import express from "express";
import { getUser , edituser,deleteuser, signupuser, getlogin} from "../controller/user-controller.js";
const route = express.Router();

route.get('/',getUser);
route.put('/:id',edituser)
route.delete('/:id',deleteuser)
route.post('/signup',signupuser)
route.post('/login',getlogin)
export default route;