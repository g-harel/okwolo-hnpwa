module.exports = ({ redirect, listNames }) => {
  return (
    ['header.header', {}, [
      ['a', { onclick: () => redirect(`/${listNames[0]}`) }],
      ...listNames.map((list) => (
        ['a', { onclick: () => redirect(`/${list}`) }, [
          list,
        ]]
      )),
    ]]
  );
};
