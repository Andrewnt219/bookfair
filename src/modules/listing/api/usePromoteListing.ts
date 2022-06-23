import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_PromoteOne } from '../../../pages/api/listing/promoteOne';

const promoteListing = async (body: Listing_PromoteOne['input']) => {
  await axios.post<Listing_PromoteOne['return']>('/listing/promoteOne', body);
};
export interface UsePromoteListingOptions {
  config?: MutationConfig<typeof promoteListing>;
}

export const usePromoteListing = ({
  config,
}: UsePromoteListingOptions = {}) => {
  return useTypedMutation<typeof promoteListing>({
    ...config,
    mutationFn: promoteListing,
  });
};
