import { Button, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { businessRules } from '../../../../constants';
import { PriceSummary } from '../../../../ui';
import { PromoteListingSchema } from '../../types';
import { usePromoteListingForm } from './usePromoteListingForm';

export interface PromoteListingFormProps {
  listingId: string;
  onSubmit?(data: PromoteListingSchema): void;
}

export const PromoteListingForm = (props: PromoteListingFormProps) => {
  const { form, stripeCheckoutMutation } = usePromoteListingForm({
    listingId: props.listingId,
  });

  const { errors } = form.formState;
  const days = form.watch('days');
  const subtotal = businessRules.calculatePromotionCost(days);

  const onSubmit = form.handleSubmit(async (data) => {
    props.onSubmit?.(data);
    await stripeCheckoutMutation.mutateAsync({
      days: data.days,
      listingId: props.listingId,
    });
  });

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Form.Group controlId="promotion-duration">
        <Form.Label>Duration (days)</Form.Label>
        <Controller
          control={form.control}
          name="days"
          render={({ field }) => (
            <Form.Select
              title="Promotion's duration"
              {...field}
              isInvalid={Boolean(errors.days)}
            >
              <option value="0">(Not selected)</option>
              {businessRules.promotionDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.days?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="mt-3">
        <PriceSummary subtotal={subtotal} taxRate={businessRules.CONTEXT_TAX} />
      </div>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="mt-3 d-block ms-auto"
      >
        Promote listing
      </Button>
    </Form>
  );
};
