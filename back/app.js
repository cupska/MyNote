const express = require("express")
const app = express()
const port = 3009 
const db = require('./src/database')
const bodyParser = require("body-parser")
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')



// SESI LOGIN DENGAN GOOGLE

require('./auth')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
app.get('/auth/google/failure', (req, res) => {
    res.send('Something wronge')
})

app.get('/auth/google/success',isLoggedIn , (req, res) => {
    const {id, given_name, email} = req.user
    const accessToken = req.cookies['connect.sid']
    const date = new Date()
    const sql = `INSERT INTO user (userId, name, email, accessToken, modified) VALUES ("${id}", "${given_name}", "${email}", "${accessToken}", "")`
    db.query(sql, (err, results) => {
        if (err) {
            const sql = `UPDATE user SET accessToken = "${accessToken}" WHERE userId = "${id}"`
            db.query(sql, (err, results) => {
                if (err) {
                    res.status(500).send('masalah diserver')
                    console.log(err)
                } else {
                    res.status(201).send(`UPDATE ${given_name}`)
                    console.log(results)
                }
            })      
        } else {
            res.status(200).send(`INSERT ${given_name}`)
            console.log(results)
        }
    })
  
})

app.use('/auth/logout', (req, res) => {
    req.session.destroy()
    res.send("loutout")
    // console.log(req)
})

// END SESI LOGIN DENGAN GOOGLE

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", true)
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
  

app.get('/mylists', (req, res)=> {
      
    const accessToken = req.cookies["connect.sid"]
    const sql = `SELECT * FROM mylist WHERE userId = (SELECT userId FROM user WHERE accessToken = "${accessToken}")` ;
    db.query(sql, (err, response)=>{
        if (err) throw err
        res.send({
            "message" : null,
            "results" : response,
        })
    })
})
// s:oja_P_kxX4us_ehPkivyQiVe0rS1UEAv.09Te/YCdy9tQFlO7jhSyryXwQqOSs+t1vw0oSiRS2cw

app.post('/mylists', (req, res)=> {
    const accessToken = req.cookies["connect.sid"]
    const {task, warn} = req.body
    const sql = `INSERT INTO mylist (id, userId, task, warn) VALUES ("", (SELECT userId FROM user WHERE accessToken = "${accessToken}"), '${task}', '${warn}');`
    db.query(sql, (err, response)=> {
        if (err) throw err
        console.log(response)
    })
    // console.log(`${task} ${warn}`)
    res.send({
        message : "Post data berhasill !!!"
    }) 
})

app.delete('/mylists', (req, res)=> {
    const accessToken = req.cookies["connect.sid"]
    const {task, warn} = req.body
    const sql = `DELETE FROM mylist WHERE task = "${task}" AND warn = "${warn}" AND userId = (SELECT userId FROM user WHERE accessToken = "${accessToken}")`
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
    // console.log(`${title} ${description} ${time} `)
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