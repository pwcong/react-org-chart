import * as d3 from 'd3';

import { ITree, IOptions } from '../types';
import render from './render';

export const init = (svgElement: SVGElement, treeData: ITree, options: IOptions) => {
  const { nodeWidth, nodeHeight, nodeSpacing } = options;

  const tree = d3.layout.tree().nodeSize([ nodeWidth + nodeSpacing, nodeHeight + nodeSpacing ]);

  const svgRoot = d3.select(svgElement);
  const svg = svgRoot.append('g');
  treeData.x0 = 0;
  treeData.y0 = 0;

  // 允许缩放
  const zoom = d3.behavior.zoom().scaleExtent([ 0.4, 2 ]).duration(50).on('zoom', () => {
    svg.attr('transform', `translate(${d3.event.translate}) scale(${d3.event.scale.toFixed(1)})`);
  });
  svgRoot.call(zoom);

  // 初始化位置
  zoom.translate([ svgElement.clientWidth / 2 - nodeWidth / 2, nodeHeight ]);
  svg.attr('transform', `translate(${svgElement.clientWidth / 2 - nodeWidth / 2}, ${nodeHeight})`);
  
  render(
    svg,
    {
      tree,
      treeData
    },
    options
  );
};
