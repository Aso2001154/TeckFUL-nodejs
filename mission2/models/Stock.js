const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        unique: true,
        default: 0,
        validate(value) {
            if(value < 0) throw new Error("idのマイナスは存在しません。");
        },
    },
    name: {
        type: String,
        // リクワイヤードをtrueにしておく
        required:true,
        // 空白削除
        trim: true,
        // 小文字として設定してくれる
        lowercase: true,
    },
    price: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) throw new Error("価格のマイナスは存在しません。");
        },
    },
    on_sale: {
        type: Boolean,
        default: false,
    },
    count: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) throw new Error("マイナスの在庫は存在しません。");
        },
    },
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;

