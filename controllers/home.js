const Checkin = require('../models/Checkin')
const countryList = require('country-list')

module.exports = {
    getIndex: async (req,res)=>{
        if(!req.user){
            try{
                const posts = await Checkin.find({status:"public"})
                .populate('userId')
                .lean()
    
                res.render('index.ejs', {title: 'Taste of the Town', layout: './layouts/index', posts: posts, user: req.user, countryData: countryList.getData()})
            }catch(err){
                console.log(err)
            }

        }else{

            try{
                const posts = await Checkin.find({userId:req.user.id})
                .populate('userId')
                res.render('user.ejs', {title: 'Taste of the Town', posts: posts, user: req.user, countryData: countryList.getData()})
            }catch(err){
                console.log(err)
            }

        }
        
    }
}