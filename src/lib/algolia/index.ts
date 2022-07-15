import algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export const algoliaListings = searchClient.initIndex('listings');
export * from './algolia-utils';
