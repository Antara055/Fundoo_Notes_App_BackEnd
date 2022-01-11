import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('token');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    //bearerToken = bearerToken.split(' ')[1];
    const user  = await jwt.verify(bearerToken,process.env.secretkey,((err,decode)=>{
      if(err){
        return res.status(401).send({message:"Authentication declined"});
      }
      else{
        req.body['data']=decode;
        req.bearerToken=decode;
        console.log(decode)

        next();
      }
    }))
  }catch (error) {
    next(error);
  }
}

    /* res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error)
  }
};*/