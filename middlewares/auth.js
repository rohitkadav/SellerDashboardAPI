import jwt from 'jsonwebtoken';


const userAuth = async (req , res , next) =>{
    const {token} = req.headers;
    if(!token) {
        return res.json ({success :  false , message :'Not authorized login'})
    }

    try{
        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET)
        
        if(tokenDecode.id) {
            req.user = { id: tokenDecode.id };
        }else{
            return res.json ({success :  false , message :'Not authorized login'})
        }

        next();
    }catch(e) {
         return res.json ({success :  false , message :e.message})
 
    }
}


export default userAuth;