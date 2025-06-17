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
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1]; // Bearer token
  if (!token) return res.status(401).json({ message: 'Token format invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};


const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Role not allowed' });
    }
    next();
  };
};


export {userAuth , verifyToken , roleCheck};
