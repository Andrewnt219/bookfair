import { Variant } from "react-bootstrap/esm/types";

export class ToastException extends Error {
  variant: Variant = "error";
  constructor(message: string, variant: Variant = "error") {
    super(message);
    this.variant = variant;
    this.name = "ToastException";
  }
}
