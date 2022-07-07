import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Review_CreateOne } from '../../../pages/api/review/createOne';

const createReview = async (body: Review_CreateOne['input']) => {
  const { data } = await axios.post<Review_CreateOne['return']>(
    '/review/createOne',
    body
  );
  return data.data;
};

export interface UseCreateReviewOptions {
  config?: MutationConfig<typeof createReview>;
}

export const useCreateReview = (props: UseCreateReviewOptions = {}) => {
  return useTypedMutation<typeof createReview>({
    ...props.config,
    mutationFn: createReview,
  });
};
