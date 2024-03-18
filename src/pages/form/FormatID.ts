const formatID = (id: string) => {
  return id
    .split(' ')
    .map((part) => {
      if (part === '||' || part === '&&') {
        return part;
      } else {
        const charMatch = part.match(/[a-zA-Z]+/);
        const prefix = charMatch ? charMatch[0].toUpperCase() : '';
        const numMatch = part.match(/[0-9]+/);
        const suffix = numMatch ? numMatch[0] : '';
        return `${prefix} ${suffix}`;
      }
    })
    .join(' ');
};

export default formatID;
