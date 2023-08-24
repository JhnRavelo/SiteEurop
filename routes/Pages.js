const express = require('express')
const router = express.Router()
const { pages } = require('../Database/models')
// const validator = require('validator')
const bodyParser = require('body-parser')
const session = require('../session/index.js')

var jsonParser = bodyParser.json()

router.use(session())

router.post('/', jsonParser, async (req, res) => {

    const {page} = await req.body
    if(page){
        page.map(async (track)=>{
            const isPage = await pages.findOne({
                where:{
                    page:track,
                }
            })
            if(!isPage){
                pages.create({
                    page:track,
                })
                
            }
            
        })
        res.json('')
        
    }
    
})

module.exports = router