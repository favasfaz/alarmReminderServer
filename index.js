import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cookieParcer from "cookie-parser";
import db from "./util/config.js";
import bodyParser from "body-parser";
import userRouter from "./Routes/userRouter.js";

dotenv.config();
const PORT = process.env.PORT || 6000;
const app = express();
app.use(helmet());
db();
app.use(cookieParcer());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api/users", userRouter);
app.use('/',(req,res)=>{
  res.send('success')
})

//error management
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(500).json({
    success: false,
    status: errStatus,
    message: errorMessage,
  });
});

//localhost config
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
