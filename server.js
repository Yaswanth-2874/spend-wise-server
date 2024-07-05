import express from "express";
import establishMongoConnection from "./db/establishMongoConnection.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT || 5000;
app.use("/api/auth", authRoute);


app.listen(port, () => {
  establishMongoConnection();
  console.log(`Listening on port ${port}`);
});
