const Header = require('../components/header');
const ListItem = require('../components/list-item');

const ListPage = ({ app, type, list, listNames, items, page }) => {
  return (
    ['div.wrapper', {}, [
      [Header, { redirect: app.redirect, type, list, listNames, page }],
      ['ul.items', {},
        list.map((id) => (
          [ListItem, { redirect: app.redirect, item: items[id] }]
        )),
      ],
    ]]
  );
};

module.exports = (app, { updateList }) => {
  app('/:type/:page?', ({ type, page = 0 }) => {
    updateList(type, page)
      .then((data) => {
        if (data.length < 1) {
          app.redirect(`/${type}`);
        }
      });

    return ({ lists, items }) => {
      const list = lists[type] || [];
      const listNames = Object.keys(lists);
      return (
        [ListPage, { app, type, list, listNames, items, page }]
      );
    };
  });
};
