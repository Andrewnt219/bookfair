import { DayjsAble } from '@bookfair/common';
import axios from 'axios';
import dayjs from 'dayjs';

export interface GetTopSearchOptions {
  index: 'listings';
  startDate: DayjsAble;
  endDate: DayjsAble;
  limit?: number;
}
export interface AgoliaSearchesRes {
  searches: {
    search: string;
    count: number;
    nbHits: number;
  }[];
}
export const getTopSearch = async (
  props: GetTopSearchOptions
): Promise<AgoliaSearchesRes> => {
  const agoliaReqParams = new URLSearchParams();
  agoliaReqParams.append('index', props.index);
  agoliaReqParams.append(
    'startDate',
    dayjs(props.startDate).format('YYYY-MM-DD')
  );
  agoliaReqParams.append('endDate', dayjs(props.endDate).format('YYYY-MM-DD'));
  if (props.limit) {
    agoliaReqParams.append('limit', props.limit.toString());
  }
  const url = new URL(
    `?${agoliaReqParams.toString()}`,
    'https://analytics.algolia.com/2/searches'
  );
  const { data } = await axios.get<AgoliaSearchesRes>(url.toString(), {
    headers: {
      'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
      'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    },
  });
  return data;
};
