import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Listing_GetOne } from '../../../pages/api/listing/getOne';

const getListing = async (params: Listing_GetOne['input']) => {
  const { data } = await axios.get<Listing_GetOne['return']>(
    '/listing/getOne',
    { params }
  );
  return data.data;
};

export interface UseGetListingOptions {
  config?: QueryConfig<typeof getListing>;
  listingId: string | undefined;
}

export const useGetListing = ({ config, listingId }: UseGetListingOptions) => {
  return useTypedQuery<typeof getListing>({
    ...config,
    queryKey: ['listing', listingId],
    enabled: Boolean(listingId),
    // Only runs with listingId specified
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getListing({ listingId: listingId! }),
  });
};
