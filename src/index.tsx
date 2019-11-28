import React, { useRef, useEffect } from 'react';

import classnames from 'classnames';
import { ITree, IGetTree } from './types';

import { defaultOptions, baseCls } from './config';
import { init } from './chart';

import './style.scss';

export interface IProps {
  className?: string;
  height?: string | number;
  style?: React.CSSProperties;
  data: ITree;
  getChildren?: IGetTree;
}

const ReactOrgChart: React.FunctionComponent<IProps> = (props) => {
  const { className, style, height = 400, data, getChildren } = props;

  const ref = useRef<any>();

  useEffect(() => {
    init(
      ref.current,
      data,
      Object.assign({}, defaultOptions, {
        getTree: getChildren
      })
    );
  }, []);

  return (
    <div className={classnames(baseCls, className)} style={style}>
      <svg ref={ref} width="100%" height={height} />
    </div>
  );
};

export default ReactOrgChart;
