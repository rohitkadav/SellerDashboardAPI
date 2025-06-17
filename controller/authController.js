import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if( !name || !email || !password) {
        return res.json({sucess:false, message : 'Missing Details'})
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser){ 
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await userModel.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

 const logout = async (req, res) => {
  // Client will just delete the token
  res.status(200).json({ message: 'Logout successful. Please delete the token on client side.' });
};


export {login , register ,logout};
