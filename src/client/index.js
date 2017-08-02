const okwolo = require('okwolo');

const fetch = require('./fetch');

const itemPage = require('./pages/item');
const listPage = require('./pages/list');

const app = okwolo(document.querySelector('.app'));

const actions = fetch(app);

itemPage(app, actions);
listPage(app, actions);

app.setState({
  lists: {
    top: [],
    best: [],
    new: [],
    ask: [],
    show: [],
    job: [],
  },
  items: {},
});

app.use({ route: {
  path: '**',
  callback: () => app.redirect('/top'),
} });
