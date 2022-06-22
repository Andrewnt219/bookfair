export const businessRules = {
  DEFAULT_MAX_LISTINGS: 2,
  SLOT_COST: 4.99,
  CONTEXT_TAX: 0.13,
  calculatePurchaseSlot(quantity: number) {
    return quantity * this.SLOT_COST;
  },
};
