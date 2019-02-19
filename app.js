const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()

let users = [{ id: 1, username: "aa", email: "aa", password: "aa" }]

app.use(express.static('./frontend'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
    function (email, password, next) {
        let user = users.find((user) => user.email === email && user.password === password)
        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    }
))

passport.serializeUser(function (user, next) {
    next(null, user.id)
})

passport.deserializeUser(function (id, next) {
    var user = users.find((user) => user.id === id)
    next(null, user)
})

app.post('/signup', (req, res, next) => {
    users.push(req.body)
    console.log(req.body)
    res.send(users)
})

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send("success")
})

app.get('/dashboard', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, './frontend', 'dashboard.html'));        // res.send('Your are logged in ' + req.user.username)
        console.log(req.user.username)
    } else {
        res.send('ERROR: log in ERROR')
    }
})

app.listen(3000)