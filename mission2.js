const express = require("express");
const app = express();
const mongoose = require("mongoose");

const stockRouter = require("./routes/stockRoutes");

app.use(stockRouter);

mongoose.connect(
    "mongodb+srv://shincode:abc@cluster0.i0ryk.mongodb.net/food?retryWrites=true&w=majority"
).then(() => console.log("データベース接続成功"))
.catch((err) => console.log(err));

app.listen(3000, () => {
    console.log("サーバーを開始しました。");
});