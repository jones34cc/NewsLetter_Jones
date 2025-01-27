const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    var firstname=req.body.fname;
    var secondname=req.body.lname;
    var email=req.body.email;



    console.log(firstname,secondname,email);

 



var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:secondname
            }
        }

    ]
}

var json_data=JSON.stringify(data);

const url="https://us16.api.mailchimp.com/3.0/lists/807afaf649";
const options={
    method:"POST",
    auth:"Jones34cc:babb2616b1f78b730a07b4822257246-us16"
}

const request=https.request(url,options,function(response)
{

    if(response.statusCode=="200")
    {
        res.sendFile(__dirname+"/success.html");

    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})

request.write(json_data);
request.end();




});


app.post("/failure",function(req,res)
{
    res.redirect("/");
})

app.listen(3000,function()
{
    console.log("Server is listening on port 3000.");
})