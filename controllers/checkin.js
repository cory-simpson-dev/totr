const Checkin = require('../models/Checkin')
const countryList = require('country-list')

module.exports = {
    getPublicCheckins: async (req,res)=>{
        try{
            const posts = await Checkin.find({status:"public"})
            .populate('userId')
            .lean()
            res.render('reviews.ejs', {title: 'Tastes of the Town', posts: posts, user: req.user, countryData: countryList.getData()})
        }catch(err){
            console.log(err)
        }
        //changed title from Checkins
    },
    getUserCheckins: async (req,res)=>{
        try{
            const posts = await Checkin.find({userId:req.params.id,status:"public"})
            .populate('userId')
            res.render('userpost.ejs', {title: 'Tastes of the Town', posts: posts, user: req.user, countryData: countryList.getData()})
        }catch(err){
            console.log(err)
        }
        //changed title from Checkins
    },
    createCheckin: async (req, res)=>{
        try{
            await Checkin.create({
                restaurant: req.body.restaurant,
                state: req.body.state, 
                userId: req.user.id,
                city: req.body.city,
                country: req.body.country,
                comment: req.body.comment,
                favDish: req.body.favDish,
                foodType: req.body.foodType,
                status: req.body.status,
            })
            console.log('Checkin has been added!')
            res.redirect('/reviews')
        }catch(err){
            console.log(err)
        }
    },
    deleteCheckin: async (req, res)=>{
        try{
            await Checkin.findOneAndDelete({_id:req.body.reviewId})
            console.log('Deleted Checkin')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    editCheckin: async (req,res)=>{

        const review = await Checkin.findOne({
            _id: req.params.id
        }).lean()
            console.log(review)
   
        if(!review){
            res.render('error/404')
        }
    
        if(review.userId != req.user.id){
            res.redirect('/')
        }else      res.render('./edit.ejs',{ 
            post: review, layout: './layouts/edit', title:"Taste of the Town", user:req.user.id, countryData: countryList.getData()
        })
    },
    updateCheckin: async (req, res)=>{
        console.log(req.body)
        try{
            await Checkin.findOneAndUpdate({_id: req.body._id},{
                restaurant: req.body.restaurant,
                state: req.body.state, 
                userId: req.user.id,
                city: req.body.city,
                country: req.body.country,
                comment: req.body.comment,
                favDish: req.body.favDish,
                foodType: req.body.foodType,
                status: req.body.status,                
            }, {
                new: true,
                runValidators: true
            })
            res.redirect('/reviews')
            console.log('updated')
        }catch(err){
            console.log(err)
        }
    },

}    