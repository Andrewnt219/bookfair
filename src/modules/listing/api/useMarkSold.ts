import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_MarkAsSold } from '../../../pages/api/listing/markAsSold';

const markSold = async (body: Listing_MarkAsSold['input']) => {
  await axios.patch<Listing_MarkAsSold['return']>('/listing/markAsSold', body);
};

export interface UseMarkSoldOptions {
  config?: MutationConfig<typeof markSold>;
}

export const useMarkSold = (props: UseMarkSoldOptions = {}) => {
  return useTypedMutation<typeof markSold>({
    ...props.config,
    mutationFn: markSold,
  });
};
