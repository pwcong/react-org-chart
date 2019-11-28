import * as d3 from 'd3';
import { IOptions, IRenderData, ITreeNode } from '../types';
import { nodeCls, nodeNameCls, nodeLinkCls } from '../config';

import { collapseNode, expandNode } from './utils';

export default function render(svg, renderData: IRenderData, options: IOptions) {
  const { tree, treeData, sourceNode } = renderData;
  const {
    animationDuration,
    lineHeight,
    lineColor,
    lineOffsetY,
    nodeWidth,
    nodeHeight,
    backgroundColor,
    borderColor,
    borderRadius,
    getTree
  } = options;

  const nodes = tree.nodes(treeData).reverse();
  const links = tree.links(nodes);

  nodes.forEach((d) => {
    d.y = d.depth * lineHeight;
    d.x0 = d.x;
    d.y0 = d.y;
  });

  renderData.nodes = nodes;
  renderData.links = links;

  const parentNode = sourceNode || treeData;

  // 渲染节点
  const node = svg.selectAll(`g.${nodeCls}`).data(nodes.filter((d) => d.id), (d) => d.id);
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', nodeCls)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    .on('click', async (d: ITreeNode) => {
      renderData.sourceNode = d;

      if (!d.children && !d._children) {
        try {
          const children = await getTree(d);
          d.children = children;
        } catch (e) {
          d.children = [];
        }
      } else {
        if (d.children) {
          collapseNode(d);
        } else {
          expandNode(d);
        }
      }

      render(svg, renderData, options);
    });

  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', borderRadius)
    .attr('ry', borderRadius);

  nodeEnter
    .append('text')
    .attr('class', nodeNameCls)
    .attr('text-anchor', 'start')
    .attr('x', 0)
    .attr('y', 14)
    .attr('font-size', 14)
    .attr('fill', '#333333')
    .text((d) => d.name);

  node.transition().duration(animationDuration).attr('transform', (d) => `translate(${d.x}, ${d.y})`);
  node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${parentNode.x}, ${parentNode.y})`)
    .remove();

  // 渲染连线
  svg.select(`path.${nodeLinkCls}`).data(links, (d) => d.target.id);
  const link = svg.selectAll(`path.${nodeLinkCls}`).data(links.filter((link) => link.source.id), (d) => d.target.id);
  const linear = d3.svg.line().x((d) => d.x).y((d) => d.y).interpolate('linear');
  link
    .enter()
    .insert('path', 'g')
    .attr('class', nodeLinkCls)
    .attr('fill', 'none')
    .attr('stroke', lineColor)
    .attr('stroke-width', 1)
    .attr('d', (d) =>
      linear([
        {
          x: d.source.x0 + nodeWidth / 2,
          y: d.source.y0 + nodeHeight + 2
        },
        {
          x: d.source.x0 + nodeWidth / 2,
          y: d.source.y0 + nodeHeight + 2
        },
        {
          x: d.source.x0 + nodeWidth / 2,
          y: d.source.y0 + nodeHeight + 2
        },
        {
          x: d.source.x0 + nodeWidth / 2,
          y: d.source.y0 + nodeHeight + 2
        }
      ])
    );

  link.transition().duration(animationDuration).attr('d', (d) =>
    linear([
      {
        x: d.source.x + nodeWidth / 2,
        y: d.source.y + nodeHeight
      },
      {
        x: d.source.x + nodeWidth / 2,
        y: d.target.y - lineOffsetY
      },
      {
        x: d.target.x + nodeWidth / 2,
        y: d.target.y - lineOffsetY
      },
      {
        x: d.target.x + nodeWidth / 2,
        y: d.target.y
      }
    ])
  );

  link.exit().transition().duration(animationDuration).attr('d', (d) =>
    linear([
      {
        x: sourceNode.x + nodeWidth / 2,
        y: sourceNode.y + nodeHeight + 2
      },
      {
        x: sourceNode.x + nodeWidth / 2,
        y: sourceNode.y + nodeHeight + 2
      },
      {
        x: sourceNode.x + nodeWidth / 2,
        y: sourceNode.y + nodeHeight + 2
      },
      {
        x: sourceNode.x + nodeWidth / 2,
        y: sourceNode.y + nodeHeight + 2
      }
    ])
  );
}
