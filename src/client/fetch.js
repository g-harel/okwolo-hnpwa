const pageLenght = 25;

const get = (path) => {
  const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + path);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

module.exports = (app) => {
  const UPDATE_ITEM = {
    type: 'UPDATE_ITEM',
    target: ['items'],
    handler: (items, { id, data }) => {
      items[id] = data;
      return items;
    },
  };

  const updateItem = (id) => {
    get(`item/${id}.json`)
      .then((data) => {
        app.act(
          'UPDATE_ITEM',
          { id, data },
        );
      });
  };

  const UPDATE_LIST = {
    type: 'UPDATE_LIST',
    target: ['lists'],
    handler: (lists, { type, data }) => {
      lists[type] = data;
      return lists;
    },
  };

  const updateList = (type, page = 0) => {
    get(`${type}stories.json`)
      .then((pageData) => {
        const data = pageData.slice(
          page * pageLenght,
          (page * pageLenght) + pageLenght,
        );
        data.forEach((id) => updateItem(id));
        app.act(
          'UPDATE_LIST',
          { type, data },
        );
      });
  };

  app.use({
    name: 'fetch',
    action: [UPDATE_ITEM, UPDATE_LIST],
  });

  return { updateItem, updateList };
};
