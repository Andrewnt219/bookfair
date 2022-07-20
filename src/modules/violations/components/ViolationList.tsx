import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ViolationProvider } from '../contexts/ViolationContext';
import { DbViolation } from '../types';
import { ViolationListItem } from './ViolationListItem';

export interface ViolationListProps {
  violations: DbViolation[];
}

export const ViolationList = (props: ViolationListProps) => {
  if (props.violations.length === 0) return <p>(No violations)</p>;

  return (
    <ListGroup as="ul">
      {props.violations.map((violation) => (
        <ListGroupItem as="li" className="border-0" key={violation.id}>
          <ViolationProvider violation={violation}>
            <ViolationListItem />
          </ViolationProvider>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
