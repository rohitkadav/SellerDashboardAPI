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

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const roleCheck = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};

export {userAuth , verifyToken , roleCheck};
