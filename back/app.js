const { response } = require("express")
const express = require("express")
const { get } = require("http")
const app = express()
const port = 3009 
const db = require('./src/database')
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

app.get("/login", (req, res)=>{
    res.send("wawwwd")
})

app.get('/mylists', (req, res)=> {
    const sql = "SELECT * FROM mylist" ;
    db.query(sql, (err, response)=>{
        if (err) throw err
         
        res.send({
            "message" : null,
            "results" : response,
        })
    })
})

app.post('/mylists', (req, res)=> {
    const {task, warn} = req.body
    // const sql = "INSERT INTO `mylist`(`task`, `warn`, `color`) VALUES ('[value-1]','[value-2]','[value-3]')"
    const sql = `INSERT INTO mylist (task, warn) VALUES ('${task}', '${warn}')`
    db.query(sql, (err, response)=> {
        if (err) throw err
        console.log(response)
    })
    console.log(`${task} ${warn}`)
    res.send({
        message : "Post data berhasill !!!"
    }) 
})

app.delete('/mylists', (req, res)=> {
    const {task, warn} = req.body
    const sql = `DELETE FROM mylist WHERE task = "${task}" AND warn = "${warn}"`
    db.query(sql, (err, response)=> { 
        if (err) throw err
        console.log(task+response)
    })
    res.send({
        message : "Delete data berhasill !!!"
    })
})

app.get('/mymemos', (req, res) => {
    const sql = "SELECT * FROM mymemo"
    db.query(sql, (err, response) => {
        if (err) throw err
        res.send(response)
    })
})

app.post('/mymemos', (req, res)=> {
    const {title, description, time} = req.body
    // const sql = "INSERT INTO `mylist`(`task`, `warn`, `color`) VALUES ('[value-1]','[value-2]','[value-3]')"
    const sql = `INSERT INTO mymemo (title, description, time) VALUES ('${title}', '${description}', '${time}')`
    db.query(sql, (err, response)=> {
        if (err) throw err
        console.log(response)
    })
    console.log(`${title} ${description} ${time} `)
    res.send({
        message : "Post data berhasill !!!"
    }) 
})

app.delete('/mymemos', (req, res)=> {
    const {title, description, time} = req.body
    const sql = `DELETE FROM mymemo WHERE title = "${title}" AND description = "${description}" AND time = "${time}"`
    db.query(sql, (err, response)=> { 
        if (err) throw err
        console.log(response)
    })
    res.send({
        message : "Delete data berhasill !!!"
    })
})

app.listen(port, ()=> console.log(`Server berjalan pada port: ${port}`))