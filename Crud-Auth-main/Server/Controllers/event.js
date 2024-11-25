const express = require('express');
const router = express.Router();
const Event = require('../model/event');

// GET all events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.render('Event/list', { title: 'Event List', events });
});

// GET add event form
router.get('/add', (req, res) => {
  res.render('Event/add', { title: 'Add Event' });
});

// POST new event
router.post('/add', async (req, res) => {
  const { name, date, time, location, description } = req.body;
  await Event.create({ name, date, time, location, description });
  res.redirect('/events');
});

// GET edit event form
router.get('/edit/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('Event/edit', { title: 'Edit Event', event });
});

// POST update event
router.post('/edit/:id', async (req, res) => {
  const { name, date, time, location, description } = req.body;
  await Event.findByIdAndUpdate(req.params.id, { name, date, time, location, description });
  res.redirect('/events');
});

// GET delete event
router.get('/delete/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/events');
});

module.exports = router;
