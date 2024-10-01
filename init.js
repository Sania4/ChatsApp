const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main()
    .then ( () => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatsapp');
}

let chat1 = new Chat ({
    from: "Marjan",
    to: "Sania",
    msg: "Let's meet tommorrow",
    created_at: new Date()
});

let myChats = [
    {
        from: "Marjan",
        to: "Sania",
        msg: "Let's meet tommorrow",
        created_at: new Date()
    },
    {
        from: "Anjum",
        to: "Sania",
        msg: "Let's have lunch",
        created_at: new Date()
    },
    {
        from: "Sarah",
        to: "Sania",
        msg: "Hello, how is it going?",
        created_at: new Date(),
    },
    {
        from: "Asma",
        to: "Sania",
        msg: "Bring me some Fruits.",
        created_at: new Date(),
    },
];

Chat.insertMany(myChats);