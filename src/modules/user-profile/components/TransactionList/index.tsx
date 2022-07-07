import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { DbTransaction } from '../../../listing';
import { TransactionListItem } from '../TransactionListItem';

export interface TransactionListProps {
  transactions: DbTransaction[];
}

export const TransactionList = (props: TransactionListProps) => {
  return (
    <ListGroup as="ul">
      {props.transactions.map((transaction) => (
        <ListGroupItem as="li" key={transaction.id}>
          <TransactionListItem transactionId={transaction.id} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
