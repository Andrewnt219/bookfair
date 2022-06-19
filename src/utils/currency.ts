export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting',
  }).format(amount);
};

export const calculateTotal = (subTotal: number, tax: number) => {
  if (tax > 1 || tax < 0) throw new Error('Tax must be from 0 to 1');
  return subTotal + subTotal * tax;
};
