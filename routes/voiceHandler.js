const ClientCapability = require('twilio').jwt.ClientCapability;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const nameGenerator = require('../name_generator');
const config = require('../config/prod');

exports.tokenGenerator = function tokenGenerator() {
  const identity = nameGenerator();
  const capability = new ClientCapability({
    accountSid: config.twilioSID,
    authToken: config.twilioAuthToken,
  });

  capability.addScope(new ClientCapability.IncomingClientScope(identity));
  capability.addScope(new ClientCapability.OutgoingClientScope({
    applicationSid: config.twilioAppSID,
    clientName: identity,
  }));

  // Include identity and token in a JSON response
  return {
    identity: identity,
    token: capability.toJwt(),
  };
};

exports.voiceResponse = function voiceResponse(toNumber) {
  // Create a TwiML voice response
  const twiml = new VoiceResponse();

  if(toNumber) {
    const attr = isAValidPhoneNumber(toNumber) ? 'number' : 'client';

    const dial = twiml.dial({
      callerId: config.callerID,
    });
     dial.conference('My conference', {
      startConferenceOnEnter: true,
    });
    dial[attr]({}, toNumber);

  } else {
    twiml.say('Thanks for calling!');
  }

  return twiml.toString();
};

function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}
