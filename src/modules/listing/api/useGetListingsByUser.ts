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

export type UseListingsByUserConfig = {
  userId: string | undefined;
  config?: QueryConfig<typeof getListingsByUserId>;
};
export const useGetListingsByUser = ({
  userId,
  config,
}: UseListingsByUserConfig) => {
  return useTypedQuery<typeof getListingsByUserId>({
    ...config,
    queryKey: ['listings', userId],
    enabled: Boolean(userId),
    // Only run when userId exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getListingsByUserId({ userId: userId! }),
  });
};
