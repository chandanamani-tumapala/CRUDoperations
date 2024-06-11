let express= require('express')
let bodyparser= require('body-parser')
let cors = require('cors')
//create rest object 
let app= express()
//set JSON as MIME type 
app.use(bodyparser.json())
//client is not sending form data=> encoding JSON 
app.use(bodyparser.urlencoded({extended: false}))
//enabling CORS -> CROSS origine Resource Sharing -> communication among various ports 
app.use(cors())
//create port 
let port = process.env.PORT || 8080 
//import fetch insert update delete modules 
let fetch = require('./fetch/fetch')
let insert= require('./insert/insert')
let update= require('./update/update')
let remov= require('./delete/delete')

app.use('/fetch',fetch)
app.use('/insert', insert)
app.use('/update', update)
app.use("/delete", remov)

//assing port no 
app.listen(port, ()=> {
    console.log('server listening port no :', port)
})

