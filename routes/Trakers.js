const express = require('express')
const router = express.Router()
const { users,  trakers, pages} = require('../Database/models')
// const validator = require('validator')
const bodyParser = require('body-parser')
const session = require('../session/index.js')
var jsonParser = bodyParser.json()
router.use(session())
router.post('/', jsonParser, async (req, res) => {
    const {name, eMail, page, phone} = await req.body 
    console.log(name);  
    if(page && name && eMail){
        page.map(async(track) => {
            var date = new Date
            var day = date.getDate()
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            // var isUser = await users.findOne({
            //     where: {
            //         eMail: eMail,
            //     }
            // })
            // console.log(isUser)
            // var isPage = await pages.findOne({
            //     where: {
            //         page: track,
            //     }
            // })
            // console.log(isPage);
            
            // if(isPage && isUser){
            //     var isTraker = await trakers.findOne({
            //         where: {
            //             ID_user: isUser.ID_user,
            //             ID_page: isPage.ID_page,
            //         }
            //     })
            // }
            
            var isTraker = await trakers.findOne({
                        where: {
                            eMail: eMail,
                            page: track,
                        }
                    })
            if(!isTraker){
                trakers.create({
                    // ID_user: isUser.ID_user,
                    // ID_page: isPage.ID_page,
                    name,
                    eMail,
                    page: track,
                    phone,
                    date,
                    day,
                    month,
                    year,
                })
                
            }

        })
        res.json('')
    }
    
    
})


module.exports = router