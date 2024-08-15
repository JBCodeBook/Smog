import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadarChart extends Component {
  constructor(props) {
    super(props);

    // Extracting labels and values from the pollutants prop
    const labels = props.pollutants.map(pollutant => pollutant.displayName);
    const values = props.pollutants.map(pollutant => pollutant.concentration.value);

    this.state = {
      options: {
        chart: {
          height: 150,
          type: "radar",
        },
        title: {
          text: 'Pollutant Concentrations',
          style: {
            color: "white",
            fontSize: "16px",
            fontFamily: 'Roboto'
          }
        },
        xaxis: {
          categories: labels,
          labels: {
            show: true,
            style: {
              colors: ["white","white","white","white","white","white"],
              fontSize: "10px",
              fontFamily: 'Roboto'
            }
          }
          },
        yaxis: {
          show: false,
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            }
          }
        },
        plotOptions: {
          radar: {
            size:80,
            polygons: {
              strokeColor: 'black',
              fill: {
                colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        markers: {
          size: 3,
          colors: ['#fff'],
          strokeColor: '#FF4560',
          strokeWidth: 2,
        }
      },
      series: [
        {
          name: "Concentration",
          data: values
        }
      ]
    };
  }

  render() {
    return (
      <div className="radar-chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={350}
        />
      </div>
    );
  }
}

export default RadarChart;
