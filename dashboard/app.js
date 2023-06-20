const express = require('express');
const app = express();
const path = require('path')
const passport = require('passport');
const config = require('../config.json');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const Discord = require('discord.js');
let db = require('././../db');
module.exports = client => {
 
   passport.serializeUser((user, done) => {
      done(null, user);
  });
  passport.deserializeUser((id, done) => {
      done(null, id)
  });
passport.use(new Strategy({
   clientID:config.clientID,
   clientSecret:config.clientSecret,
   callbackURL:config.callbackURL,
   scope:scopes
}, (accessToken, refreshToken, profile, done) => {
   return done(null, profile);
}))
app.use(session(
   {
      secret:"ASDPAJF)*IHN)!UDFHNW)(*AYHTGU&HDGIAJSGBDFASDIAKSODNASIUJ",
      resave:false,
      saveUninitialized:false
   }
))
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'))
app.use('/static', express.static(path.join(__dirname + "/puplic")))
// app url
app.get('/callback', passport.authenticate("discord", {failureRedirect:'/'}), (req, res) => {
   res.redirect('/dashboard');
})
app.get("/", (req, res) => {
   res.render('home', {client:client})
})
app.get('/dashboard', (req, res) => {
if(!req.isAuthenticated() || !req.user) return res.redirect('/callback');
   res.render('dashboard', {
      client:client,
      user: req.isAuthenticated() ? req.user : null,
      Permissions:Discord.Permissions
   })
})
app.get('/setting/:guildId', (req, res) => {
   let guild = client.guilds.cache.get(req.params.guildId);
   if(!req.isAuthenticated() || !req.user) return res.redirect('/callback');
res.render('setting', {
   guild:guild,
user: req.isAuthenticated() ? req.user :null
})
   })
   app.post('/setting/:guildId', (req, res) => {
      let guild = client.guilds.cache.get(req.params.guildId)
    let g = db.get(`guild_${guild.id}`)
db.set(`guild_${guild.id}`,{ lang: req.body.lang,  prefix: req.body.prefix})
    })
    console.log(client.guilds.cache)
    app.get('/invite', (req, res) => {
      res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.clientID}&permissions=8&scope=bot%20applications.commands`)
    })
    app.get('/logout', (req, res) => {
      req.logout((err) => {
         if(err) return console.log(err);
      });
      res.redirect('/')
    })
}



app.listen('5000', () => {
   console.log('gg')
})