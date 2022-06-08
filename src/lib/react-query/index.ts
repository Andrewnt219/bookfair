import { AxiosError } from 'axios';
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
  useQuery,
  useMutation,
} from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

type FnType = (...args: any) => any;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<Fn extends FnType> = Awaited<ReturnType<Fn>>;

export type QueryConfig<Fn extends FnType> = UseQueryOptions<
  ExtractFnReturnType<Fn>
>;

export type MutationConfig<MutationFnType extends FnType> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;

export const useTypedQuery = <Fn extends FnType>(config: QueryConfig<Fn>) =>
  useQuery(config);

export const useTypedMutation = <Fn extends FnType>(
  config: MutationConfig<Fn>
) => useMutation(config);
