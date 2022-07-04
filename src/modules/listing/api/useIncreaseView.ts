import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_IncreaseView } from '../../../pages/api/listing/increaseView';

const increaseView = (body: Listing_IncreaseView['input']) => {
  return axios.patch<Listing_IncreaseView['return']>(
    '/listing/increaseView',
    body
  );
};

export interface UseIncreaseViewOptions {
  config?: MutationConfig<typeof increaseView>;
}

export const useIncreaseView = (props: UseIncreaseViewOptions = {}) => {
  return useTypedMutation<typeof increaseView>({
    ...props.config,
    mutationFn: increaseView,
  });
};
