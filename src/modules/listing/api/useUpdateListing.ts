import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_UpdateOne } from '../../../pages/api/listing/updateOne';

const updateListing = (body: Listing_UpdateOne['input']) => {
  return axios.patch<Listing_UpdateOne['return']>('/listing/updateOne', body);
};

export interface UseUpdateListingOptions {
  config?: MutationConfig<typeof updateListing>;
}

export const useUpdateListing = ({ config }: UseUpdateListingOptions = {}) => {
  return useTypedMutation<typeof updateListing>({
    ...config,
    mutationFn: updateListing,
  });
};
