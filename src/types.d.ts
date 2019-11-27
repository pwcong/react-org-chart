export interface ITreeNode {
  key: string;
  name: string;
  leaders?: Array<{
    name: string;
    avatar: string;
  }>;
  elementCount?: number;
  children?: ITreeNodes;
}

export type ITreeNodes = Array<ITreeNode>;

export type ITree = ITreeNode;

export type IGetTree = (node: ITreeNode) => Promise<ITreeNodes>;

export interface IOptions {
  nodeSpacing: number
  nodeWidth: number
  nodeHeight: number
  borderColor: string
  borderRadius: number
  getTree: IGetTree;
}
