const express = require("express");
const app = express();
const stockModel = require("../models/Stock");

app.use(express.json());

const date = { status_code: 200, method: "PUT"};

const date2 = { status_cede: 404, method: "GET"};

const date3 = { status_code: 201, method: "POST"};

const date4 = { status_code: 400, method: "POST"};

app.put("/init", async (req, res) => {
    stockModel.remove({}, function(err){
        if(err) throw err;
     });
     const initdate = { id: 1, name: "pen", price: 100, on_price: true, count: 100 };
     const stock = new stockModel(initdate);
     try {
         await stock.save();
     } catch (err) {
         res.status(500).send(err);
     }
        res.send({date});

    
});

app.get("/init", async (req, res) => {
    try {
        res.send({date});

    } catch  (err) {
        res.status(500).send(err);
    }
    
});

app.get("/stock/detail/1", async (req, res) => {
    const all_stock = await stockModel.find({});
    const id = 1;
    var idFlg = 0;
    for(var i = 0;i < all_stock.length;i++){
        if (id == all_stock[i].id) {
            idFlg = 1;
            const item = all_stock[i];
            const Item = {status_code: 200, method: "GET",item};
            res.send(Item);
            break;
        }
    }
    if (idFlg == 0) {
        res.send(date2);
    }
});

app.get("/stock/detail/2", async (req, res) => {
    const all_stock = await stockModel.find({});
    const id = 2;
    var idFlg = 0;
    for(var i = 0;i < all_stock.length;i++){
        if (id == all_stock[i].id) {
            idFlg = 1;
            const item = all_stock[i];
            const Item = {status_code: 200, method: "GET",item};
            res.send(Item);
            break;
        }
    }
    if (idFlg == 0) {
        res.send(date2);
    }
});


app.get("/stock/detail/3", async (req, res) => {
    const all_stock = await stockModel.find({});
    console.log(all_stock.count);
    const id = 3;
    var idFlg = 0;
    try {
        for (var i = 0;i < all_stock.length;i++){
            if (id == all_stock[i].id) {
                idFlg = 1;
                break;
            }
        }
        if (idFlg == 1){
            res.send(all_stock[id-1]);
        } else {
           res.send(date2);
        }
        
        //res.send(Item);
    } catch  (err) {
        res.status(404).send(err);
    }
});


app.get("/stock/detail/:id", async (req, res) => {
    const all_stock = await stockModel.find({});
    var idFlg = 0;
    try {
        for (var i = 0;i < all_stock.length;i++){
            if (req.params.id == all_stock[i].id) {
                idFlg = 1;
                const item = all_stock[i]
                const Item = {status_cede:200,method: "GET",item};
                res.send(Item);
                break;
            }
        }
        if(idFlg == 0) {
            res.send("存在しないID");
        }
    } catch  (err) {
        res.status(404).send(err);
    }
});



 
app.post("/init/date", async (req, res) => {
    const stock = new stockModel(req.body);
    try {
        await stock.save();
        res.send(stock);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/create/single", async (req, res) => {
    const stock = new stockModel(req.body);
    try {
        await stock.save();
        res.send(date3);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/stock/create/single", async (req, res) => {
    var Oldid = [];
    var idFlg = 0;
    const all_stock = await stockModel.find({});
    //console.log(all_stock[0].id);
    for(var i = 0;i < all_stock.count;i++) {
        Oldid.push(all_stock[i].id);
    }
    //console.log(all_stock[1].id);
    const stock = new stockModel(req.body);  
    try {
        for(var i = 0;i < Oldid.count;i++) {
            if (Oldid[i] == stock[0].id) {
                idFlg = 1;
                res.send(date4);
                break;
            }
        }
        if (idFlg == 0) {
            await stock.save();
            res.send(date3);
        }
    } catch (err) {
        res.status(400).send(date4);
    }
});

module.exports = app;
