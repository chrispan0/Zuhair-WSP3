var express = require('express');
var router = express.Router();
let mongoose=require('mongoose');
//Telling my router that i have this model
let event = require("../model/event")
const event=require("../model/event")
let eventController = require('../Controllers/event.js')
function requireAuth(req,res,next)
{
    if (!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();

}
 

router.get('/',async(req,res,next)=>{
try{
    const eventList= await event.find();
    res.render('Event/list', {
        title:'Events',
        displayName: req.user?req.user.displayName:'',
        EventList:EventList
    })}
    catch(err){
        console.error(err);
        res.render('Event/list',{
            error:'Error on the server'
        })
    }
    });

router.get('/add',async(req,res,next)=>{
    try{
        res.render('Event/add',{
            title: 'Add Event',
            displayName: req.user?req.user.displayName:'' 
        })

    }
    catch(err)
    {
        console.error(err);
        res.render('Event/list',{
            error:'Error on the server'
        })
    }
});



router.post('/add',async(req,res,next)=>{
    try{
        let newEvent= Event ({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Event.create(newEvent).then(()=>{
            res.redirect('/eventslist');
        })
    }
    catch(err)
        {
            console.error(err);
            res.render('/eventslist',{
                error:'Error on the server'
            })

        }
    })

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id=req.params.id;
        const eventToEdit=await Event.findById(id);
        res.render('Event/edit',
            {
                title:'Edit Event',
                displayName: req.user?req.user.displayName:'',
                Event:eventToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); //passing the error
    }
});
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedEvent = Event({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        })
        Event.findByIdAndUpdate (id,updatedEvent).then(()=>{
            res.redirect('/eventslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('/eventslist',{
            error:'Error on the server'
        })
    }
});
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Event.deleteOne({_id:id}).then(()=>{
            res.redirect('/eventslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('/eventslist',{
            error:'Error on the server'
        })
    }
});
module.exports=router;