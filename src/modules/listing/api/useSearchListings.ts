import { algoliaListings } from '../../../lib/algolia';
import {
  MutationConfig,
  useTypedMutation,
  useTypedQuery,
} from '../../../lib/react-query';
import { DbListing } from '../types';

const searchListings = async (term: string) => {
  const { hits } = await algoliaListings.search(term, {
    filters: 'isActive:true',
  });
  return hits;
};

export interface UseSearchListingOptions {
  config?: MutationConfig<typeof searchListings>;
}

export const useSearchListings = ({ config }: UseSearchListingOptions = {}) => {
  return useTypedMutation<typeof searchListings>({
    ...config,
    mutationFn: searchListings,
  });
};

const querySearchListings = () => [] as DbListing[];
export const useSearchListingsQuery = () => {
  return useTypedQuery<typeof querySearchListings>({
    queryKey: 'search-listings',
    queryFn: querySearchListings,
  });
};
