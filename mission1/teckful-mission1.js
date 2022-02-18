//console.log("teckful-misson1");
const express = require("express");
const app = express();

app.use(express.json());

app.listen(80, console.log("サーバーが開始されました。"));

const mission = [
    { status_code: 200, method: "GET"}
];

app.get("/check", (req, res) => {
    res.send(mission);
});