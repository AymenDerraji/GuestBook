const express = require ("express");

const app = express();

const port = 3000;
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/guestBook.html");
});    //Hur man skapar en rout. Skickar meddelande till klienter


// app.get("/about", about);// Hur man skickar filer till klienter
// function about(req, res){
//      res.sendFile(__dirname + "/views/about.html");
// }

// app.get("/*", badRequest); //Hur man tar hand om bad request. Ska alltid vara sist!
// function badRequest(req, res){
//     res.status(404).send("Not Found");
// }


app.listen(port , () => console.log("listening on port" + port));