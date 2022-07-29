import React, { ChangeEventHandler, useState } from 'react';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../../stores';
import { DbTransaction } from '../../../listing';
import { useMarkSold } from '../../api';
import { TransactionListItem } from '../TransactionListItem';

export interface TransactionListProps {
  transactions: DbTransaction[];
}

export const TransactionList = (props: TransactionListProps) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState('');
  const qc = useQueryClient();
  const toastStore = useToastStore();

  const soldMutation = useMarkSold({
    config: {
      onSuccess() {
        qc.invalidateQueries(['transactions']);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onSoldClick = () => {
    if (selectedTransactionId === '')
      return toastStore.enqueue({
        message: 'No transaction selected',
        variant: 'warning',
      });
    soldMutation.mutate({ transactionId: selectedTransactionId });
  };
  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedTransactionId(e.target.value);
  };

  return (
    <article className="d-flex gap-2 align-items-center">
      <Form.Select
        value={selectedTransactionId}
        name="seller-transactions"
        id="seller-transactions"
        onChange={onSelectChange}
      >
        <option value="">(Not selected)</option>
        {props.transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            transactionId={transaction.id}
          />
        ))}
      </Form.Select>

      <Button disabled={soldMutation.isLoading} onClick={onSoldClick}>
        Sold
      </Button>
    </article>
  );
};
