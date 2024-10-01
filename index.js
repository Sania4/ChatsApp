const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); //EXPRESS
const Chat = require("./models/chat.js");
const methodOverride = require("method-override") //FOR DELETE AND PUT REQUEST

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));//PUBLIC FOLDER
app.use(express.urlencoded({extended:true})); //TO PARSE DATA
app.use(methodOverride("_method"))

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

//INDEX ROUTE
app.get ("/chats", async (req,res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats})
});

//NEW ROUTE
app.get ("/chats/new", (req,res) => {
    res.render("newchat.ejs")
});

//CREATE ROUTE
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body
    
    let newChats = new Chat ({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    console.log(newChats)
    newChats
        .save()
        .then( () =>{ //IF THEN IS WRITTEN NO NEED FOR ASYNC AND AWAIT KEYWORDS
        console.log("chat saved")
        })
        .catch ( (err) => {
        console.log(err)
    });

    res.redirect("/chats")
});

//EDIT ROUTE
app.get ("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs", {chat})
});

//UPDATE ROUTE
app.put("/chats/:id", async (req,res)=> {
    let {id} =req.params;
    let {msg : newMsg} = req.body
    let chatUpdated = await Chat.findByIdAndUpdate(id, {msg:newMsg},{runValidators: true, new:true});
    // console.log(chatUpdated)
    res.redirect("/chats")
});

//DESTROY ROUTE
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats")
});

app.get ("/", (req,res) => {
    res.send("Working in get")
});

app.listen(8080, () => {
    console.log("Server is listening on 8080")
});