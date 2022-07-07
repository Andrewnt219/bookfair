import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { WithQueryData } from '../../../../ui';
import { useDbUserQuery, useExpandedTransaction } from '../../../user-profile';
import { DbReview } from '../../types';

export interface ReviewCardProps {
  review: DbReview;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const buyerQuery = useDbUserQuery(review.userId);

  return (
    <WithQueryData query={buyerQuery}>
      {(buyer) => (
        <article>
          <h3>{review.title}</h3>
          <p className="mb-0">{review.body}</p>
          <Rating readonly size={20} ratingValue={review.rating} />
          <div className="text-muted d-flex gap-1">
            <Link href={`/user/${buyer.uid}`}>
              <a className="d-block">{buyer.displayName}</a>
            </Link>
            on
            <time dateTime={review.createdAt}>
              {dayjs(review.createdAt).format('MMM DD, YYYY hh:mm:ss A')}
            </time>
          </div>
        </article>
      )}
    </WithQueryData>
  );
};
