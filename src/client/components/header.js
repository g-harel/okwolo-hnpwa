module.exports = ({ redirect, type, listNames, page }) => {
  const nextPath = `${type}/${page + 1}`;
  const prevPath = `${type}/${Math.max(page - 1, 0)}`;
  return (
    ['header.header', {}, [
      ['a', { onclick: () => redirect(`/${listNames[0]}`) }],
      ...listNames.map((list) => (
        ['a', {
          onclick: () => redirect(`/${list}`),
          className: { current: type === list },
        }, [
          list,
        ]]
      )),
      ['a.prev', { onclick: () => redirect(prevPath) }, [
        'prev',
      ]],
      ['a.next', { onclick: () => redirect(nextPath) }, [
        'next',
      ]],
    ]]
  );
};
