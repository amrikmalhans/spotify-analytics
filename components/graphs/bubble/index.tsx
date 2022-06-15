import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface BubbleProps {
  data: BubbleData[];
}

interface BubbleData {
  name: string;
  popularity: number;
  x: number;
  y: number;
  color: string;
}

const Bubble: FC<BubbleProps> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const data = props.data
    .map((d) => {
      return {
        ...d,
        x: Math.random() * 500,
        y: Math.random() * 520,
        color: d3.interpolateRainbow(d.popularity / 100),
      };
    })
    .slice(0, 10);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", 600)
      .attr("height", 500);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", function (d) {
        return d.popularity * 0.4;
      })
      .attr("fill", function (d) {
        return d.color;
      });

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x + d.popularity * 0.4;
      })
      .attr("y", function (d) {
        return d.y + 3;
      })
      .text(function (d) {
        return d.name;
      })
      .style("font-family", "arial")
      .style("font-size", "12px");
  }, [svgRef, data]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Bubble;
