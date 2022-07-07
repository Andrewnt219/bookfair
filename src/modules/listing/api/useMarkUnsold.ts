import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_MarkAsUnsold } from '../../../pages/api/listing/markAsUnsold';

const markUnsold = async (body: Listing_MarkAsUnsold['input']) => {
  await axios.patch<Listing_MarkAsUnsold['return']>(
    '/listing/markAsUnsold',
    body
  );
};

export interface UseMarkUnsoldOptions {
  config?: MutationConfig<typeof markUnsold>;
}

export const useMarkUnsold = (props: UseMarkUnsoldOptions = {}) => {
  return useTypedMutation<typeof markUnsold>({
    ...props.config,
    mutationFn: markUnsold,
  });
};
