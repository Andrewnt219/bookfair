import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Review_GetByListing } from '../../../pages/api/review/getByListing';

const getReviewByListing = async (params: Review_GetByListing['input']) => {
  const { data } = await axios.get<Review_GetByListing['return']>(
    '/review/getByListing',
    { params }
  );
  return data.data;
};

export interface UseListingReviewOptions {
  config?: QueryConfig<typeof getReviewByListing>;
  listingId: string | undefined | null;
}

export const useListingReview = (props: UseListingReviewOptions) => {
  return useTypedQuery<typeof getReviewByListing>({
    ...props.config,
    queryKey: ['listing-review', props.listingId],
    enabled: Boolean(props.listingId),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getReviewByListing({ listingId: props.listingId! }),
  });
};
