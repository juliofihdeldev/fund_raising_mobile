// write a function to convert a number to a currency format

export const currency = (num: number) => {
  if (isNaN(Number(num)) ) return 0 + ' HTG';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'HTG',
  }).format(num);
};
