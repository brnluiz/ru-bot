const I18n = require('./I18n');
const moment = require('moment');

// Format the string as a markdown strong list item
const label = str => `- ${str}: `;

const Formatter = {
  menu: (session, item) => {
    if (!item) return '';

    const locale = {
      title: I18n(session, 'menu:format:title'),
      basics: I18n(session, 'menu:format:basics'),
      main_dish: I18n(session, 'menu:format:main_dish'),
      side_dish: I18n(session, 'menu:format:side_dish'),
      salad: I18n(session, 'menu:format:salad'),
      dessert: I18n(session, 'menu:format:dessert'),
    };

    // Format the date as DD/MM/YYYY
    const date = moment(item.date)
      .locale('pt-br')
      .utc().format('dddd');

    // Format the menu string as a Markdown string
    let menu = `${locale.title} ${date} \n\n`;
    menu += (item.basics) ? (`${label(locale.basics)} ${item.basics} \n`) : '';
    menu += (item.main_dish) ? (`${label(locale.main_dish)} ${item.main_dish} \n`) : '';
    menu += (item.side_dish) ? (`${label(locale.side_dish)} ${item.side_dish} \n`) : '';
    menu += (item.salad) ? (`${label(locale.salad)} ${item.salad} \n`) : '';
    menu += (item.dessert) ? (`${label(locale.dessert)} ${item.dessert} \n`) : '';

    return menu;
  },
};

module.exports = Formatter;
