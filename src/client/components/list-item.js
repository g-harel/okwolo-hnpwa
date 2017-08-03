const LoadingListItem = () => {
  return (
    ['li.item.loading', {}, [
      ['span.score', {}, [
        '-',
      ]],
      ['span.info'],
      ['span.meta'],
    ]]
  );
};

module.exports = ({ redirect, item }) => {
  if (!item) {
    return [LoadingListItem];
  }
  let host = '';
  if (item.url) {
    host = ` (${new URL(item.url || '').host})`;
  }
  return (
    ['li.item', {}, [
      ['span.score', {}, [
        String(item.score),
      ]],
      ['span.info', {}, [
        ['a.title', { href: item.url || '/' }, [
          item.title,
        ]],
        ['span.host', {}, [
          host,
        ]],
      ]],
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
    ]]
  );
};
