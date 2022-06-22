import React from 'react';
import { calculateTotal, formatCurrency } from '../utils';

export interface PriceSummaryProps {
  subtotal: number;
  taxRate: number;
}

export const PriceSummary = (props: PriceSummaryProps) => {
  return (
    <article className="text-end">
      <dl className="dl">
        <dt>Subtotal</dt>
        <dd>{formatCurrency(props.subtotal)}</dd>
        <dt>Tax</dt>
        <dd>{formatCurrency(props.subtotal * props.taxRate)}</dd>
        <dt className="h2">Total</dt>
        <dd className="h2">
          {formatCurrency(calculateTotal(props.subtotal, props.taxRate))}
        </dd>
      </dl>

      <style jsx>{`
        .dl {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          column-gap: 1rem;
          justify-content: flex-end;
        }
      `}</style>
    </article>
  );
};
