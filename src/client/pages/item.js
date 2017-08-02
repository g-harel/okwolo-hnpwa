const ItemPage = ({ item, items }) => {
  return (
    ['div', {}, [
      JSON.stringify(item),
      JSON.stringify(items),
    ]]
  );
};

module.exports = (app, { updateItem }) => {
  app('/item/:id', ({ id }) => {
    updateItem(id);

    return ({ items }) => {
      const item = items[id] || null;
      return (
        [ItemPage, { item, items }]
      );
    };
  });
};
