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

export const isHttpMethod = (method: any): method is HttpMethod =>
  httpMethodList.includes(method);
