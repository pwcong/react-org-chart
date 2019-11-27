import React, { useRef, useEffect } from 'react';

import classnames from 'classnames';
import { ITree, IGetTree } from './types';

import { defaultOptions } from './config';
import { init } from './chart';

import './style.scss';

export interface IProps {
  className?: string;
  height?: number;
  style?: React.CSSProperties;
  data: ITree;
  getChildren?: IGetTree;
}

const cls = 'react-org-chart';

const ReactOrgChart: React.FunctionComponent<IProps> = (props) => {
  const { className, style, height = 400, data, getChildren } = props;

  const ref = useRef<any>();
  const svgRef = useRef<any>();

  useEffect(() => {
    init(
      svgRef.current,
      data,
      Object.assign({}, defaultOptions, {
        getTree: getChildren
      })
    );
  }, []);

  return (
    <div className={classnames(cls, className)} style={style} ref={ref}>
      <svg ref={svgRef} width="100%" height={height} />
    </div>
  );
};

export default ReactOrgChart;
