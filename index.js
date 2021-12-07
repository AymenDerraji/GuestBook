const express = require ("express");
let fs = require("fs");

const app = express();
app.use(express.static("publik"));
const port = 3000;

// när vi startar  o loggar in i localhost:3000 , då kommer vi till den sidan
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/guestBook.html");
    fs.readFile("views/guestBook.html", function(err, htmlData) {
        fs.readFile("myGuestBook.txt", (err, textData) => {    
            if (err) throw err; // avbryt exekveringen om fel
            let textText = textData.toString();
                if(textText){
                let htmlText = htmlData.toString();
                let output = htmlText.replace(/Finns_inget_data/, textText);
                // skicka till klienten
                res.send(output);
        }});
    })
});   

// hanterar POST-förfrågningar
// OBS - behövs för att läsa data som skickas med POST
app.use(express.urlencoded({extended: true}));

//här får vi data från guestBook.html, som skickas genom <form action="/" metodhe="post"> 
app.post("/", (req, res) => {
            const myText ={
                 namn : req.body.namn, 
                 email : req.body.email,
                 hemsida : req.body.hemsida,
                 kommentar : req.body.kommentar,
                 telefon : req.body.telefon,
            } // skapar min konstant my text 
    
    const text = JSON.stringify(myText)
    fs.appendFile("myGuestBook.txt", `${text}<br/>`, (err) => { // OBS - skapar filen om den inte redan finns, lägger annars till befintlig text
        if(err) throw err;
        fs.readFile("views/guestBook.html", function(err, htmlData) {
            fs.readFile("myGuestBook.txt", (err, textData) => {    
                if (err) throw err; // avbryt exekveringen om fel
                    let htmlText = htmlData.toString();
                    let textText = textData.toString();
                
                    let output = htmlText.replace(/Finns_inget_data/, textText);
                    // skicka till klienten
                    res.send(output);
            });
        })
    });
});


app.listen(port , () => console.log("listening on port: " + port));