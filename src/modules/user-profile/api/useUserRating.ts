import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { User_GetRating } from '../../../pages/api/user/getRating';

const getUserRating = async (params: User_GetRating['input']) => {
  const { data } = await axios.get<User_GetRating['return']>(
    '/user/getRating',
    { params }
  );
  return data.data;
};

export interface UseUserRatingOptions {
  config?: QueryConfig<typeof getUserRating>;
  userId: string | undefined;
}

export const useUserRating = (props: UseUserRatingOptions) => {
  return useTypedQuery<typeof getUserRating>({
    ...props.config,
    queryKey: ['user-rating', props.userId],
    enabled: Boolean(props.userId),
    // Only fetch if userId is logged in
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getUserRating({ userId: props.userId! }),
  });
};
