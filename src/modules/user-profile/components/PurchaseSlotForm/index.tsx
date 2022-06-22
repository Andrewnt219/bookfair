import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { businessRules } from '../../../../constants';
import { PriceSummary } from '../../../../ui';
import { usePurchaseSlotForm } from './usePurchaseSlotForm';

export const PurchaseSlotForm = () => {
  const { form, purchaseSlotMutation } = usePurchaseSlotForm();

  const { errors } = form.formState;
  const quantity = form.watch('quantity');
  const subtotal = businessRules.calculatePurchaseSlot(quantity);

  const onSubmit = form.handleSubmit((data) =>
    purchaseSlotMutation.mutate(data)
  );

  return (
    <div>
      <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
        <Form.Group controlId="purchase-quantity">
          <Form.Label>Quantity</Form.Label>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <Form.Control
                type="number"
                min={1}
                isInvalid={Boolean(errors.quantity)}
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="mt-4">
          <PriceSummary
            subtotal={subtotal}
            taxRate={businessRules.CONTEXT_TAX}
          />
        </div>

        <Button type="submit" className="d-block ms-auto">
          Purchase slot
        </Button>
      </Form>
    </div>
  );
};
