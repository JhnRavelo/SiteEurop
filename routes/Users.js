const express = require('express')
const router = express.Router()
const { users } = require('../Database/models')
const validator = require('validator')
const bodyParser = require('body-parser')
const session = require('../session/index.js')

var jsonParser = bodyParser.json()

router.use(session())

router.get('/', jsonParser, async (req, res) => {
    if (req.session.isAuth){
        res.json(req.session.user)
    }else{
        res.json(false)
    }
})

router.get('/logout', jsonParser, async(req, res) => {
    if (req.session.isAuth){
        req.session.destroy((err) => {
            if (err) res.json(err)
            else res.json('Logout');
        })    
    }
})

router.post('/login', jsonParser, async (req, res) => {
    const {name, eMail} = await req.body
    const userName = await users.findOne({
        where: {
            eMail: eMail,
            name: name,
        }
    })
    
    if(!userName){
        return res.json('Pas le bon utilisateur')
    }
        
    req.session.isAuth = true
    req.session.user = {
        name,
        eMail,
        phone: userName.phone,
    }
    res.json('')
})

router.post('/', jsonParser, async (req, res) => {
    
    const {name, eMail, phone} = await req.body
    
    var userName
    if(eMail){
        userName = await users.findOne({
            where: { 
                eMail: eMail,
            }
        })   
    }
    
    if(userName){
        res.json(`L'utilisateur existe déjà`)
    }else if(eMail && !validator.isEmail(eMail)){
        res.json(`L'adresse email n'est pas valide`)
    }else if(phone && !validator.isMobilePhone(phone)){
        res.json(`Le numéro de téléphone est invalide`)
    }else if(name && eMail && !userName && phone && validator.isEmail(eMail) && validator.isMobilePhone(phone)){
        users.create({
            name,
            eMail,
            phone,
        })
        req.session.isAuth = true
        req.session.user = {
        name,
        eMail,
        phone,
    }
        res.json('')
    }else {
        res.json(``)
    }
})

module.exports = router