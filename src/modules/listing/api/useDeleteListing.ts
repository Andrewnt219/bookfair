import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_DeleteOne } from '../../../pages/api/listing/deleteOne';

const deleteListing = (body: Listing_DeleteOne['input']) => {
  return axios.delete<Listing_DeleteOne['return']>('/listing/deleteOne', {
    data: body,
  });
};

export interface UseDeleteListingOptions {
  config?: MutationConfig<typeof deleteListing>;
}

export const useDeleteListing = ({ config }: UseDeleteListingOptions = {}) => {
  return useTypedMutation<typeof deleteListing>({
    ...config,
    mutationFn: deleteListing,
  });
};
