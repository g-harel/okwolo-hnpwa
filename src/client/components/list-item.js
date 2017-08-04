const timeSince = (seconds) => {
  const difference = (Date.now() / 1000) - seconds;
  const intervals = [
    { unit: 'day', ms: 24 * 60 * 60 * 1 },
    { unit: 'hour', ms: 60 * 60 * 1 },
    { unit: 'minute', ms: 60 * 1 },
    { unit: 'second', ms: 1 },
  ];
  return intervals
    .map(({ unit, ms }) => {
      const amount = Math.round(difference / ms);
      if (amount > 0) {
        return `${amount} ${unit}${amount > 1 ? 's' : ''}`;
      }
      return false;
    }).find(Boolean);
};

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
        ` ${timeSince(item.time)} ago | `,
        ['a', { onclick: () => redirect(`/item/${item.id}`) }, [
          String(item.descendants),
          ' comments',
        ]],
      ]],
    ]]
  );
};
