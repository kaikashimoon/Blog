const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const cors = require("cors");
const multer = require('multer');

const app = express()
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, "images")
  }, filename:(req, file, cb)=>{
    cb(null, req.body.name)
    //"hello.jpeg"
  },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)    
    .then(()=>console.log('CONNECTED TO THE DB..'))
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();