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
  images: {
    url: string;
  }[];
}

const Bubble: FC<BubbleProps> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const data = props.data.slice(0, 10);
  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", 600)
      .attr("height", 500);

    var gradient = svg
      .append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    // Define the gradient colors
    gradient
      .append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ADFDA2")
      .attr("stop-opacity", 1);

    gradient
      .append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "#11D3F3")
      .attr("stop-opacity", 1);

    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(600 / 2).strength(0.05))
      .force("y", d3.forceY(500 / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide(function (d: BubbleData) {
          return d.popularity * 0.65 + 6;
        })
      );

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
        return d.popularity * 0.65;
      })
      .attr("fill", "url(#gradient)")
      .text(function (d) {
        return d.name;
      });

    simulation.nodes(data).on("tick", ticked);

    function ticked() {
      svg
        .selectAll("circle")
        .attr("cx", function (d: any) {
          return d.x;
        })
        .attr("cy", function (d: any) {
          return d.y;
        });
    }
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
