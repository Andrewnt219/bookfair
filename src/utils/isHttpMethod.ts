const httpMethodList = [
  'get',
  'post',
  'update',
  'delete',
  'patch',
  'head',
  'connect',
  'options',
  'trace',
] as const;
export type HttpMethod = typeof httpMethodList[number];

// this will always work with any types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpMethod = (method: any): method is HttpMethod =>
  httpMethodList.includes(method);
