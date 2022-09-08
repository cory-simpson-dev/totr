const Checkin = require('../models/Checkin')
const countryList = require('country-list')

module.exports = {

    getUserCheckins: async (req,res)=>{
        try{
            const posts = await Checkin.find({userId:req.user.id})
            .populate('userId')
            res.render('user.ejs', {title: 'Tastes of the Town', posts: posts, user: req.user, countryData: countryList.getData()})
        }catch(err){
            console.log(err)
        }
        
    }
}