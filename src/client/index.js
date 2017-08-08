const okwolo = require('okwolo');

window.pageLength = 25;

const fetch = require('./fetch');

const itemPage = require('./pages/item');
const listPage = require('./pages/list');

const app = okwolo(document.querySelector('.app'));

const actions = fetch(app);

itemPage(app, actions);
listPage(app, actions);

const placeholder = new Array(25).fill(0);

app.setState({
  lists: {
    top: placeholder,
    new: placeholder,
    ask: placeholder,
    show: placeholder,
    job: placeholder,
  },
  items: {},
});

app.use({ route: {
  path: '**',
  callback: () => app.redirect('/top'),
} });
