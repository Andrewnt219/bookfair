import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { CheckoutSession_Index } from '../../../pages/api/checkout_sessions';

const getCheckoutSession = async (params: CheckoutSession_Index['input']) => {
  const { data } = await axios.get<CheckoutSession_Index['return']>(
    '/checkout_sessions',
    { params }
  );
  return data.data;
};

export interface useCheckoutSessionOptions {
  config?: QueryConfig<typeof getCheckoutSession>;
  sessionId: string | undefined;
}

export const useCheckoutSession = (props: useCheckoutSessionOptions) => {
  return useTypedQuery<typeof getCheckoutSession>({
    ...props.config,
    queryFn: () =>
      getCheckoutSession({
        // only run on explicit sessionId
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session_id: props.sessionId!,
      }),
    queryKey: ['checkout-sessions', props.sessionId],
    enabled: Boolean(props.sessionId),
  });
};
