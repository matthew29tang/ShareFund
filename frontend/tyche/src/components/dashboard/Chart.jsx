import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { max, extent } from "d3-array";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { format } from "d3-format";

import ChartControls from "./ChartControls";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.svg = null;
        this.interval = null;
        this.state = {
            range: 7
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.renderChart();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderChart(range) {
        if(range !== undefined) this.setState({
            range: range
        });

        this.svg.selectAll("*").remove();

        const margin = {
            top: 0, 
            right: 0, 
            bottom: this.props.detailed ? 30 : 10, 
            left: this.props.detailed ? 30 : 10
        };
        const width = this.props.width - margin.left - margin.right;
        const height = this.props.height - margin.top - margin.bottom;
        
        const x = scaleTime().range([0, width]);
        const y = scaleLinear().range([height, 0]);
        
        const valueline = line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });
        
        const g = this.svg.append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        let data = this.props.data;
        if(this.state.range > -1) data = data.slice(Math.max(data.length - this.state.range, 0))

        x.domain(extent(data, function(d) { return d.date; }));
        y.domain([0, max(data, function(d) { return d.value; }) * 1.2]);

        g.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        const xAxis = g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x))
            .attr("class", "xAxis");

        const yAxis = g.append("g")
            .call(axisLeft(y)
                .ticks(20)
                .tickFormat(format(".2s"))
            )
            .attr("class", "yAxis");

        if(!this.props.detailed) {
            xAxis.selectAll("text").remove();
            xAxis.selectAll(".tick").remove();
            yAxis.selectAll("text").remove();
            yAxis.selectAll(".tick").remove();
        }
        if(!this.props.detailed) yAxis.selectAll("text").remove();
    }
    
    render() {
        return (
            <div className="chartcontainer">
                <svg width={ this.props.width } height={ this.props.height } ref={ handle => (this.svg = select(handle)) } className="chart"></svg>
                <ChartControls onChange={ (range) => this.renderChart(range) } hidden={ !this.props.detailed }></ChartControls>
            </div>
        );
    }
}

export default Chart;