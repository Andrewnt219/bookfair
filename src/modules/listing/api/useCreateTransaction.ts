import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_Contact } from '../../../pages/api/listing/contact';

const createTransaction = async (body: Listing_Contact['input']) => {
  const { data } = await axios.post<Listing_Contact['return']>(
    '/listing/contact',
    body
  );
  return data.data;
};

export interface UseCreateTransactionOptions {
  config?: MutationConfig<typeof createTransaction>;
}

export const useCreateTransaction = (
  props: UseCreateTransactionOptions = {}
) => {
  return useTypedMutation<typeof createTransaction>({
    ...props.config,
    mutationFn: createTransaction,
  });
};
