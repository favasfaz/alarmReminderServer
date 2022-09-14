import mongoose from "mongoose";

const connectMongo = async () =>
mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>
console.log("MongoDB successfully connected")
)
.catch((error) => console.log((`${error} did not connect`)))

export default connectMongo;
