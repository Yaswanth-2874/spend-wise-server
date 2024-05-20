const express = require("express");
const router = express.Router();
const { client, connect, ObjectId } = require("../connection");
connect();
const { format } = require("date-fns");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

router.route("/").get(async (req, res) => {
  try {
    const data = client.db("ToDoList").collection("SpendWise");
    const query = await data.find({}).toArray();
    res.json(query);
  } catch (e) {
    console.log("Error in fetching data due to ", e);
    res.json({ status: "bad" });
  }
});
router.route("/login").post(async (req, res) => {
  try {
    const data = client.db("ToDoList").collection("SpendWise");
    const { password, email } = req.body;
    const query = await data.findOne({ email: email });
    if (!query) {
      res.json({ status: "bad", reason: "Username not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, query.password);
    if (!isPasswordValid) {
      res.json({ status: "bad", reason: "Username or password wrong" });
      return;
    }
    res.json(query);
  } catch (e) {
    console.log("Failed to login in due to ", e);
    res.json({ status: "bad" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const data = client.db("ToDoList").collection("SpendWise");
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newData = {
      email: email,
      password: hashedPassword,
      status: "good",
      balance: 0,
      spendings: {},
      data: [],
    };
    let query = data.findOne({ email: email });
    if (Object.keys(query).length !== 0) {
      res.json({ status: "bad", message: "Data already found", query });
      return;
    }
    await data.insertOne(newData);
    query = data.findOne({ email: email });
    res.json({ query });
  } catch (e) {
    console.log("Not able to register due to ", e);
    res.json({ status: "bad", message: "Something went wrong in the server" });
  }
});
router
  .route("/:email")
  .put(async (req, res) => {
    try {
      const data = client.db("ToDoList").collection("SpendWise");
      const { category, description, cost, balance, isExpenditure } = req.body;
      let { date } = req.body;
      date = !date ? format(new Date(), "dd-MM-yyyy") : date;
      const existingData = await data.findOne({ email: req.params.email });
      let graphData = existingData ? existingData.data : [];
      const existingCategoryIndex = graphData.findIndex(
        (item) => item.label === category
      );
      if (existingCategoryIndex !== -1) {
        graphData[existingCategoryIndex].value += cost;
      } else {
        graphData.push({
          label: category,
          value: cost,
        });
      }
      await data.updateOne(
        { email: req.params.email },
        {
          $set: { balance: balance, data: graphData },
          $addToSet: {
            [`spendings.${category}`]: {
              _id: new ObjectId(),
              description,
              cost,
              date,
              isExpenditure,
            },
          },
        },
        { upsert: true }
      );
      res.json({ status: "Updated Data" });
    } catch (e) {
      console.log("Not able to update data due to ", e);
      res.json({ status: "Error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const data = client.db("ToDoList").collection("SpendWise");
      await data.deleteOne({ email: req.params.email });
      res.json({ status: "Deleted Data" });
    } catch (e) {
      console.log("Not able to insert data due to ", e);
      res.json({ status: "Error" });
    }
  });

router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  try {
    const data = client.db("ToDoList").collection("SpendWise");
    const result = await data.updateOne(
      { [`spendings.${category}._id`]: new ObjectId(id) },
      { $pull: { [`spendings.${category}`]: { _id: new ObjectId(id) } } }
    );
    if (result.modifiedCount === 1) {
      res.json({ status: "good", message: "Deleted data" });
    } else {
      res.json({ status: "bad", message: "Data with specified ID not found" });
    }
  } catch (e) {
    console.log("Not able to delete data with specific id due to ", e);
    res.json({ status: "bad" });
  }
});
module.exports = router;
