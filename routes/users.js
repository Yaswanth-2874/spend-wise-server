const express = require("express");
const router = express.Router();
const { client, connect } = require("../connection");
connect();
const { format } = require("date-fns");

router.get("/", async (req, res) => {
  try {
    const data = client.db("ToDoList").collection("SpendWise");
    const query = await data.find({}).toArray();
    res.json(query);
  } catch (e) {
    console.log("Not able to get data due to ", e);
    res.json({ status: "Error" });
  }
});

router
  .route("/:email")
  .get(async (req, res) => {
    try {
      const data = client.db("ToDoList").collection("SpendWise");
      const query = await data.findOne({ email: req.params.email });
      if (!query) res.status(500).json({ status: "Data not found" });
      else res.json(query);
    } catch (e) {
      console.log("Not able to get data due to ", e);
      res.json({ status: "Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const data = client.db("ToDoList").collection("SpendWise");
      const newData = {
        email: req.params.email,
        balance: 10000,
        spendings: {},
      };
      await data.insertOne(newData);
      res.json({ status: "Inserted Data" });
    } catch (e) {
      console.log("Not able to insert data due to ", e);
      res.json({ status: "Error" });
    }
  })
  .put(async (req, res) => {
    try {
      const data = client.db("ToDoList").collection("SpendWise");
      const time = format(new Date(), "HH:mm:ss");
      const { category, description, cost, balance } = req.body;
      let { date } = req.body;
      date = !date ? format(new Date(), "dd-MM-yyyy") : date;
      await data.updateOne(
        { email: req.params.email },
        {
          $set: { balance: balance },
          $addToSet: {
            [`spendings.${category}`]: { description, cost, time, date },
          },
        },
        { upsert: true }
      );
      res.json({ status: "Updated Data" });
    } catch (e) {
      console.log("Not able to update data due to ", e);
      res.json({ status: "Error" });
    }
  });
module.exports = router;
