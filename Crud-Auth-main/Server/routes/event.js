var express = require('express');
var router = express.Router();
let mongoose=require('mongoose');
//Telling my router that i have this model
let Event = require("../model/event.js")
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
    const events= await Event.find();
    res.render('Event/list', {
        title:'Event List',
        displayName: req.user?req.user.displayName:'',
        events: events

    })}
    catch(err){
        console.error(err);
        res.render('Event/list',{
            error:'Error fetching events on the server'
        })
    }
    });

router.get('/add',async(req,res,next)=>{
    try{
        res.render('Event/add',{
            title: 'Add Event',
            displayName: req.user ? req.user.displayName:'' 
        })

    }
    catch(err)
    {
        console.error(err);
        res.render('Event/list',{
            error:'Error loading the add event page'
        })
    }
});



router.post('/add',async(req,res,next)=>{
    try{
        let newEvent = new Event({
            "name": req.body.name,
            "date": req.body.date,
            "time": req.body.time,
            "location": req.body.location,
            "description": req.body.description
        });
        
        Event.create(newEvent).then(()=>{
            res.redirect('/events');
        })
    }
    catch(err)
        {
            console.error(err);
            res.render('Event/list',{
                error:'Error adding the event'
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
            "name": req.body.name,
            "date": req.body.date,
            "time": req.body.time,
            "location": req.body.location,
            "description": req.body.description
        })
        Event.findByIdAndUpdate (id,updatedEvent).then(()=>{
            res.redirect('/events')
        })
    }
    catch(err){
        console.error(err);
        res.render('Event/list',{
            error:'Error updating the event'
        })
    }
});
// Delete event
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Event.deleteOne({_id:id}).then(()=>{
            res.redirect('/events')
        })
    }
    catch(error){
        console.error(err);
        res.render('/Event/list',{
            error:'Error deleting the event'
        })
    }
});
module.exports=router;