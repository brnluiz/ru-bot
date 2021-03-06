const I18n = require('../../helpers/I18n');
const builder = require('botbuilder');

const library = new builder.Library('Info');
const options = {};

library.dialog('Info', [(session) => {
  options[I18n(session, 'info:timetable')] = { id: 'Info:Timetable' };
  options[I18n(session, 'info:prices')] = { id: 'Info:Prices' };
  options[I18n(session, 'info:credits')] = { id: 'Info:Credits' };

  return builder.Prompts.choice(session, 'prompt', options, {
    maxRetries: 0,
    promptAfterAction: false,
  });
}, (session, results) => {
  if (!results.response) {
    return session.endConversation('options:notvalid');
  }

  const option = options[results.response.entity];
  session.sendTyping();
  session.beginDialog(option.id);

  return builder.Prompts.choice(session, 'prompt:again', ['yes', 'no'], {
    maxRetries: 0,
    promptAfterAction: false,
  });
}, (session, results) => {
  if (!results.response) {
    return session.endConversation('options:notvalid');
  } else if (results.response.entity === 'yes') {
    return session.replaceDialog('Info:Info');
  }

  return session.endConversation();
}]);

library.dialog('Prices', (session) => {
  session.send('prices');
  let prices = '';
  prices += `- ${I18n(session, 'info:prices:student')}: R$ 1.50\n`;
  prices += `- ${I18n(session, 'info:prices:uniemployees')}: R$ 2.90\n`;
  prices += `- ${I18n(session, 'info:prices:others')}: R$ 6.10\n`;
  session.send(prices);
});

library.dialog('Timetable', (session) => {
  session.send('timetable:weekdays');
  session.send('timetable:weekends');
  session.send('timetable:ticketoffice');
});

library.dialog('Credits', (session) => {
  session.send('credits:team');
  session.send('credits:code');
  session.send('credits:about');
});

module.exports = library;
