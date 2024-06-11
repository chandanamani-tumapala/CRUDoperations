//import module 
const express= require("express")
let mongodb = require("mongodb")
//import url 
const url = require("../url")
//create mongo client 
let mcl = mongodb.MongoClient 
//create router instance
let router= express.Router()
//create a router api
router.put("/",(req, res) => {
    let p_id = req.body.p_id
    let obj = {
        p_name : req.body.p_name,
        p_cost: req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url,(err, conn) => {
        if(err) 
            console.log('Enter in connection:-',err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').updateOne({p_id}, {$set:obj}, (err,result) => {
                if(err) 
                    res.json({'update': 'Error'+ err})
                else {
                    if(result.matchedCount!=0 ){
                        console.log('Data Updated')
                        res.json ({'update': 'Success'})
                    }
                    else {
                        console.log('Data not updated')
                        res.json({'update': 'Record Not Found'})
                    }
                    conn.close()

                }
            })
        }
    })
})
module.exports= router
