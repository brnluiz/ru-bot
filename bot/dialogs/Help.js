const builder = require('botbuilder');
const library = new builder.Library('Help');

// FIXME: i18n
const options = {
  'Cardápio de hoje': {
    id: 'Menu:Today'
  },
  'Cardápio de amanhã': {
    id: 'Menu:Tomorrow'
  },
  'Cardápio da semana': {
    id: 'Menu:Week'
  },
  'Notificações diárias': {
    id: 'Subscribe:Subscribe'
  }
}

library.dialog('Options', [(session) => {
  builder.Prompts.choice(session, 'help', options, {
    maxRetries: 0
  });
}, (session, results) => {
  if (results.response) {
    const option = options[results.response.entity];
    session.replaceDialog(option.id);
  } else {
    session.send('options:notvalid');
    session.endDialog();
  }
}]);

module.exports = library;
module.exports.options = options;
