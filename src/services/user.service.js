import User from '../models/user.model';
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


//Register
export const newUser = async (body) => {
  const hashedPassWord=await bcrypt.hash(body.password,10);
  body.password=hashedPassWord;
  const data = await User.create(body);
  return data;
};

//login
export const loggedin = async(body)=>{
  const findData=await User.findOne({
    email:body.email
  });
    if(findData){
      const passworkCheck=await bcrypt.compare(body.password,findData.password)
      if(passworkCheck){
        console.log("welcome")
        const secretKey=process.env.secretkey;
        const payload={id:findData._id ,email:findData.email};
        const token=await jwt.sign(payload,secretKey)
        console.log(token);
        return findData;
      }
    }
    else{
      throw new err("wrong entry");
      /* return new Promise((resolve,reject)=>{
        reject("worng entry");
      }) */
    }
  };
