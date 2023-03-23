const express = require("express")
const app = express()
const port = 3009 
const db = require('./src/database')
const bodyParser = require("body-parser")
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

// SESI LOGIN DENGAN GOOGLE
require('./auth')

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
    const sql = `INSERT INTO user (userId, name, email, accessToken) VALUES ("${id}", "${given_name}", "${email}", "${accessToken}" )`
    db.query(sql, (err, results) => {
        if (err) {
            const sql = `UPDATE user SET accessToken = "${accessToken}" WHERE userId = "${id}"`
            db.query(sql, (err, results) => {
                if (err) {
                    res.status(500).send('masalah diserver')
                    console.log(err)
                } else {
                    res.redirect('http://localhost:3000')
                    // res.status(201).send(`UPDATED ${given_name}`).redirect('http://localhost:3000')
                    // console.log(results)
                    // res.redirect('http://localhost:3000')
                }
            })      
        } else {
            res.redirect('http://localhost:3000')
            // res.status(200).send(`INSERT ${given_name}`).redirect('http://localhost:3000')
            // console.log(results)
            // res.redirect('http://localhost:3000')
        }
    })
  
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:3000')
    // res.sendStatus(200)
    // console.log(req)
})

// END SESI LOGIN DENGAN GOOGLE
app.get('/user', (req, res) => {
    const accessToken = req.cookies["connect.sid"]
    const sql = `SELECT name, email FROM user WHERE accessToken = "${accessToken}"`
    db.query(sql, (err, response) => {
        if (err) {
            res.sendStatus(500)
            console.log(err)
        } else if (response == 0) {
            res.status(404).send(response)
        } else {
            res.status(200).send({
                "message": "mantap",
                "results": response
            })
            console.log(response.length)
        } 
    })
})

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

app.post('/mylists', (req, res)=> {
    const accessToken = req.cookies["connect.sid"]
    const {task, warn} = req.body
    const sql = `INSERT INTO mylist (id, userId, task, warn) VALUES ("", (SELECT userId FROM user WHERE accessToken = "${accessToken}"), '${task}', '${warn}');`
    db.query(sql, (err, response)=> {
        if (err) {
            res.status(500).send("User tidak ada")
            console.log("User Tidak ada", response)
        } else {
            res.status(201).send("Berhasil!!")
            console.log("Berhasil", response)
        }
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
    const accessToken = req.cookies["connect.sid"]
    const sql = `SELECT * FROM mymemo WHERE userId = (SELECT userId FROM user WHERE accessToken = "${accessToken}")`
    db.query(sql, (err, response) => {
        if (err) throw err 
        res.send(response )
    })
})

app.post('/mymemos', (req, res)=> {
    const accessToken = req.cookies["connect.sid"]
    console.log(accessToken)
    const {title, description, time} = req.body
    const sql = `INSERT INTO mymemo (id, userId, title, description, time) VALUES ("", (SELECT userId FROM user WHERE accessToken = "${accessToken}"),'${title}', '${description}', '${time}')` 
    db.query(sql, (err, response)=> {
        if (err) {
            res.status(404).send("User tidak ditemukan")
            console.log(response)
        } else {
            res.status(200).send('Berhasil!!')
            console.log(response)
        }
    })
})

app.delete('/mymemos', (req, res)=> {
    const accessToken = req.cookies["connect.sid"]
    const {title, description, time} = req.body
    const sql = `DELETE FROM mymemo WHERE title = "${title}" AND description = "${description}" AND userId = (SELECT userId FROM user WHERE accessToken = "${accessToken}")`
    db.query(sql, (err, response)=> { 
        if (err) {
            res.sendStatus(500)
            console.log(response)
        } else {
            res.sendStatus(200)
            console.log(response)
        }
    })
})

app.listen(port, ()=> console.log(`Server berjalan pada port: ${port}`))