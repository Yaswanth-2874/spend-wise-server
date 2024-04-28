const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 4000;
const userRoute = require("./routes/users");
app.use(express.json());
app.use("/users", userRoute);
app.listen(port, () => console.log("Listening on port 4000"));
