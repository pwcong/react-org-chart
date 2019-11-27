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
