import * as d3 from 'd3';

// Update the rendered node positions triggered by zoom
export default function renderUpdate({ svg }) {
  return () => {
    svg.attr(
      'transform',
      `translate(${d3.event.translate})
     scale(${d3.event.scale.toFixed(1)})`
    );
  };
}
