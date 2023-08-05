const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;
const saltRounds = 10;
const secretKey = 'TeamEravan';

mongoose.connect('mongodb+srv://ravidemo3:ustime123@cluster0.6f3zkxn.mongodb.net/EravanUser?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  userName: String,
  email : String,
  mobileNo : Number,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
  const { userName, email, mobileNo, password } = req.body;
    // console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({ 
      userName, 
      email,
      mobileNo,
      password: hashedPassword 
    });
    await newUser.save();
    return res.json({ 
      message: 'Registration successful',});
  } catch (error) {
    console.log(error);
    return res.json({
      message:error
    });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log("LOgin done");
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    //  console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get("/getuserbyid/:id",async (req,res)=>{
  // console.log('first')
    const {id} = req.params;
    try {
    const user =  await User.findById(id);
    user.password = null;
    return res.json(user);
    } catch (error) {
      
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});