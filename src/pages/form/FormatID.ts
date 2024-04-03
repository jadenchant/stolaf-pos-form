const formatID = (id: string) => {
  return id
    .split(' ')
    .map((part) => {
      part = part.toLowerCase();

      if (part === '||' || part === 'or') {
        return 'or';
      } else if (part === '&&' || part === 'and') {
        return 'and';
      } else if (part === 'none' || part === 'na') {
        return ' ';
      } else {
        const charMatch = part.match(/[a-zA-Z]+/);
        if (
          charMatch &&
          charMatch[0].length >= 3 &&
          charMatch[0].length <= 4
        ) {
          const prefix = charMatch[0].toUpperCase();
          const numMatch = part.match(/[0-9]+/);
          const suffix = numMatch ? numMatch[0] : '';
          return `${prefix} ${suffix}`;
        }
        part = part.charAt(0).toUpperCase() + part.slice(1);
        return part;
      }
    })
    .join(' ');
};

export default formatID;
