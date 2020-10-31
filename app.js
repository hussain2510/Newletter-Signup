const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extexded:true}));
app.use(express.static("public")); /*for image and css file that is static file to render*/
app.get("/",function(request,response){response.sendFile(__dirname+"/signup.html");});
app.listen(process.env.PORT || 3000,function(){console.log("server is running at 3000 port");});
app.post("/",function(request,response){
    var firstName=request.body.FirstName;
    var lastName=request.body.LatsName;
    var email=request.body.Email;
    var data={
      members:[
        {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
        var jsonData=JSON.stringify(data);
        const url="https://us2.api.mailchimp.com/3.0/lists/8451d1dca0"
        const options={
          method: "POST",
          auth:"hussain:f09739bf0faf5d9273082a8920eb2d9e-us2"
        }

        const req=https.request(url,options,function(response1){
          var code=response1.statusCode
          if(code==200)
          {
            response.sendFile(__dirname+"/success.html");
          }
          else
            {
              response.sendFile(__dirname+"/failure.html");
            }
          response.on("data",function(){console.log(data)})
      })

        req.write(jsonData);
        req.end();

});
app.post("/failure",function(req,res){res.redirect("/")});


/*api*/
// f09739bf0faf5d9273082a8920eb2d9e-us2

/*id*/
// 8451d1dca0
