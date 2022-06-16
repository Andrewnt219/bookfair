import { axios } from '../../../lib/axios';
import { useTypedQuery, QueryConfig } from '../../../lib/react-query';
import { Listing_GetAllByUserId } from '../../../pages/api/listing/getAllByUserId';
import { DbListing } from '../types';

const getListingsByUserId = async (
  params: Listing_GetAllByUserId['input']
): Promise<DbListing[]> => {
  const { data } = await axios.get<Listing_GetAllByUserId['return']>(
    '/listing/getAllByUserId',
    { params }
  );
  return data.data;
};

export type UseListingsConfig = {
  userId: string | undefined;
  config?: QueryConfig<typeof getListingsByUserId>;
};
export const useGetListings = ({ userId, config }: UseListingsConfig) => {
  return useTypedQuery<typeof getListingsByUserId>({
    ...config,
    queryKey: ['listings', userId],
    enabled: Boolean(userId),
    queryFn: () => getListingsByUserId({ userId: userId! }),
  });
};
