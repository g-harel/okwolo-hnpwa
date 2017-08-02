const Header = require('../components/header');
const ListItem = require('../components/list-item');

const ListPage = ({ app, list, listNames, items }) => {
  return (
    ['div.wrapper', {}, [
      [Header, { redirect: app.redirect, list, listNames }],
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
    updateList(type, page);

    return ({ lists, items }) => {
      const list = lists[type] || [];
      const listNames = Object.keys(lists);
      return (
        [ListPage, { app, list, listNames, items }]
      );
    };
  });
};
