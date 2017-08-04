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
    top: [0, 0, 0],
    best: [0, 0, 0],
    new: [0, 0, 0],
    ask: [0, 0, 0],
    show: [0, 0, 0],
    job: [0, 0, 0],
  },
  items: {},
});

app.use({ route: {
  path: '**',
  callback: () => app.redirect('/top'),
} });
