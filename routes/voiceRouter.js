const Router = require('express').Router;
const requireLogin = require('../middlewares/requireLogin');

const {tokenGenerator, voiceResponse} = require('./voiceHandler');
const User = require('../models/User');

const router = new Router();

/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.get('/api/token', requireLogin, async (req, res) => {
  const data = tokenGenerator();
  const user = await User.findOneAndUpdate({_id: req.user._id}, {clientName: data.identity});
  res.send(data);
});

router.post('/api/voice', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req.body.To));
});

module.exports = router;
