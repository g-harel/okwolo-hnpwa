const LoadingListItem = ({}) => {
  return (
    ['li.item.loading', {}, [
      'loading',
    ]]
  );
};

module.exports = ({ redirect, item }) => {
  if (!item || !item.url) {
    return [LoadingListItem];
  }
  return (
    ['li.item', {}, [
      ['span.score', {}, [
        String(item.score),
      ]],
      ['span.info', {}, [
        ['a.title', { href: item.url }, [
          item.title,
        ]],
        ['span.host', {}, [
          `(${new URL(item.url || '').host})`,
        ]],
        ['br'],
        ['span.meta', {}, [
          'by ',
          ['a', { onclick: () => redirect(`/${item.by}`) }, [
            item.by,
          ]],
          ` ${item.time} hours ago | `,
          ['a', { onclick: () => redirect(`/item/${item.id}`) }, [
            String(item.descendants),
            ' comments',
          ]],
        ]],
      ]],
    ]]
  );
};
