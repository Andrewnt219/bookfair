import { VariantType } from 'notistack';

export class ToastException extends Error {
  variant: VariantType = 'error';
  constructor(message: string, variant: VariantType = 'error') {
    super(message);
    this.variant = variant;
    this.name = 'ToastException';
  }
}
