import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Listing_GetAll } from '../../../pages/api/listing/getAll';

const getAllListings = async () => {
  const { data } = await axios.get<Listing_GetAll['return']>('/listing/getAll');

  return data.data;
};

export interface UseGetAllListingsOptions {
  config?: QueryConfig<typeof getAllListings>;
}

export const useGetAllListings = (props: UseGetAllListingsOptions = {}) => {
  return useTypedQuery<typeof getAllListings>({
    ...props.config,
    queryFn: () => getAllListings(),
    queryKey: 'listings',
  });
};
