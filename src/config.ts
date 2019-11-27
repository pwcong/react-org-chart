import { IOptions } from './types';

export const defaultOptions: IOptions = {
  nodeSpacing: 20,
  nodeHeight: 90,
  nodeWidth: 195,
  borderColor: '#4285f4',
  borderRadius: 4,
  getTree: (node) => Promise.resolve([])
};
