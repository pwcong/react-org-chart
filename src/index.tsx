import React, { useRef, useEffect } from 'react';

import classnames from 'classnames';
import { ITree, ITreeNode, ITreeNodes } from './types';

import './style.scss';

export interface IProps {
  className?: string;
  height?: number;
  style?: React.CSSProperties;
  data: ITree;
  getChildren?: (node: ITreeNode) => Promise<ITreeNodes>;
}

const cls = 'react-org-chart';

const ReactOrgChart: React.FunctionComponent<IProps> = (props) => {
  const { className, style, height = 400 } = props;

  const ref = useRef<any>();
  const svgRef = useRef<any>();

  useEffect(() => {
    // TODO 初始化
  }, []);

  return (
    <div className={classnames(cls, className)} style={style} ref={ref}>
      <svg ref={svgRef} width="100%" height={height} />
    </div>
  );
};

export default ReactOrgChart;
