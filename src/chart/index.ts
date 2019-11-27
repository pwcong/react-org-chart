import * as d3 from 'd3';

import { ITree, IOptions } from '../types';

export const init = (svgNode: SVGElement, treeData: ITree, options: IOptions) => {
  const { nodeWidth, nodeHeight, nodeSpacing } = options || {};

  // const tree =
  d3.layout.tree().nodeSize([ nodeWidth + nodeSpacing, nodeHeight + nodeSpacing ]);

  const svgRoot = d3.select(svgNode);
  const svg = svgRoot.append('g');

  // Allow zoom
  const zoom = d3.behavior.zoom().scaleExtent([ 0.4, 2 ]).duration(50).on('zoom', () => {
    svg.attr('transform', `translate(${d3.event.translate}) scale(${d3.event.scale.toFixed(1)})`);
  });
  svgRoot.call(zoom);
};
