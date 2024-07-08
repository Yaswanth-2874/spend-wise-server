import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Transaction from "../models/transaction.model.js";
import List from "../models/list.model.js";

const addTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryName, cost, description, date } = req.body;

    let userList = await List.findOne({ userId });
    if (!userList) userList = await List.create({ userId });

    const newTransaction = new Transaction({
      cost,
      description,
      date,
    });

    const transactionId = newTransaction._id;

    let category = await Category.findOne({
      userId: req.user,
      categoryName: categoryName,
    });

    if (!category) {
      category = new Category({
        userId,
        categoryName,
      });
      userList.categories.push(category._id);
    }

    category.transactions.push(transactionId);
    
    await Promise.all([
      category.save(),
      newTransaction.save(),
      userList.save(),
    ]);

    res.status(200).json(category);
  } catch (error) {
    console.log(`Error in addTransaction controller due to ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addTransaction };
