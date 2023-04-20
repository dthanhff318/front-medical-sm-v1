import { IndexedObject } from 'types/common';

export const replacePathParams = (path: string, params: IndexedObject<string>): string =>
  path.replace(/:([^/]+)/g, (_, p1) => encodeURIComponent(params[p1] ? params[p1] : ''));
