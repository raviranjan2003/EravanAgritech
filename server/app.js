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

// Creating a user schema and model for new Users
const userSchema = new mongoose.Schema({
  userName: String,
  email : String,
  mobileNo : Number,
  password: String,
});

const User = mongoose.model('User', userSchema);

//Creating a schema and model for buyers 
const buyerSchema = new mongoose.Schema({
  name : String,
  mobileNo : Number,
  bussinessName : String,
  quantity : Number,
  frequency : String
})
const Buyer = mongoose.model('Buyer',buyerSchema);

//Creating a schema and model for sellers
const sellerSchema = new mongoose.Schema({
  name : String,
  mobileNo : Number,
  bussinessName : String,
  quantity : Number,
  frequency : String
})
const Seller = mongoose.model('Seller',sellerSchema);

//Creating a schema and model for admins
const adminSchema = new mongoose.Schema({
  email : String,
  password : String
})
const Admin = mongoose.model('Admin',adminSchema);

// Register route
app.post('/register', async (req, res) => {
  const { userName, email, mobileNo, password } = req.body;
    // console.log(req.body);
  // const email = req.body.email;
  // const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({ 
      userName, 
      email,
      mobileNo,
      password: hashedPassword 
    });
    // const newAdmin = new Admin({
    //   email,
    //   password : hashedPassword,
    // })
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
    console.log("Login done");
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    //  console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.post("/adminlogin", async (req , res) => {
  const { email , password } = req.body;

  try{
    const user = await Admin.findOne({ email });
    if(!user){
      return res.status(404).json({ error : "Admin not found"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(401).json({ error : "Invalid Password"});
    }
    console.log("Admin logged in");
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    //  console.log(token);
    res.json({ token });

  }catch(err){
    console.log(err);
    res.status(500).json({ error : "An error occurred" });
  }
})

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

app.post("/buy",(req,res)=>{
  // console.log(req.body);
  if(req.body.isBuyer){
    const newBuyer = new Buyer({
      name : req.body.name,
      mobileNo : req.body.mobileNo,
      bussinessName : req.body.bussinessName,
      quantity : req.body.quantity,
      frequency : req.body.frequency
    })
    newBuyer.save()
    .then(()=>{
      console.log("New buyer");
    })
    .catch((err)=>{
      console.log(err);
    });
    return res.json({
      "message": "Order Placed Successfully"
    })
  }else{
    const newSeller = new Seller({
      name : req.body.name,
      mobileNo : req.body.mobileNo,
      bussinessName : req.body.bussinessName,
      quantity : req.body.quantity,
      frequency : req.body.frequency
    })
    newSeller.save()
    .then(()=>{
      console.log("New seller");
    })
    .catch((err)=>{
      console.log(err);
    })
    return res.json({
      "message" : "Order Placed Succesfully"
    })
  }
})

app.post("/adminpanel", (req,res) => {
  const type = req.body.type;
  // console.log(type);
  if(type === "Buyer"){
    Buyer.find()
    .then((users) => {
      // console.log(users);
       return res.status(200).json({ users });
    })
    .catch((err)=>{
      console.log(err);
    })
  }else if(type === "Seller"){
    Seller.find()
    .then((users) => {
      // console.log(users);
      return res.status(200).json({ users });
    })
    .catch((err)=>{
      console.log(err);
    })
  }else{
    console.log("Akshyapatra clicked");
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});