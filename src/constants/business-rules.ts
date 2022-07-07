export const businessRules = {
  DEFAULT_MAX_LISTINGS: 2,
  SLOT_COST: 4.99,
  PROMOTION_COST_PER_DAY: 1.99,
  CONTEXT_TAX: 0.13,
  SUPPORTED_FORMATS: ['image/jpg', 'image/jpeg', 'image/png'],
  MAX_FILE_SIZE_MB: Infinity,
  MAX_FILE_SIZE_BYTEs() {
    return this.MAX_FILE_SIZE_MB * 1024 * 1024;
  },
  promotionDays: ['1', '3', '7', '30'] as const,
  calculatePurchaseSlot(quantity: number) {
    return quantity * this.SLOT_COST;
  },
  calculatePromotionCost(days: number) {
    return days * this.PROMOTION_COST_PER_DAY;
  },
  DELAY_BEFORE_INCREASE_VIEW: 3000,
};
