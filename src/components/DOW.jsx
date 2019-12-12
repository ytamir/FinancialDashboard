import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export default class IndexContainer extends React.Component {
  constructor () {
    super()
    this.state = { // TODO remove chart title
      chartOptions: {
        title: {
            text: 'My chart'
          },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }    
            }
        },
        credits: {
            enabled: false
          },
          legend: {
            enabled: false
        },
        chart: {
            height: 200,
            type: 'area'
        },
        plotOptions: {
            series: {
                fillOpacity: 0.1
            }
        },   
        series: [{
          data: [],
          color: '#34d965',
        negativeColor: '#0088FF',
        threshold: 2
        }],
        xAxis:{
            visible: false
        },
        yAxis:{
            visible: false
        },
        title:{
            visible: false
        }
      }
    }
    this.timer();
    // setInterval(function(){
    //     console.log(this);
    //     const { chartOptions } = this.state;
    //     console.log(chartOptions);
    
    //     this.setState({
    //     chartOptions: {
    //       series: [{
    //         data: this.state.chartOptions.series[0].data.push(Math.random()*3 -1),
    //         color: '#FF0000',
    //         negativeColor: '#0088FF'          
    //       }]
    //     }}
    //   )}, 1500);
    
  }
  
  getData(){
    
    //setInterval(() => {
        const axios = require('axios');
        //var a = this.state;
        let cur = this;
        

        let aplha_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+this.props.indexname+'&interval=5min&outputsize=full&apikey=3GJ8FAC1VNENVM39';
        let url = "https://financialmodelingprep.com/api/v3/majors-indexes/" + this.props.indexname;
        axios.get(aplha_url).then(function (response) {
            // handle success
           
        //console.log(response.data.price);
        //console.log("this.state");
        //console.log(cur.state);
        //let old_data = cur.state.chartOptions.series[0].data;
        //old_data.push(response.data.price);
        //console.log(response);
        //console.log(response.data["Time Series (5min)"]);
        var newdata = [];
        var threshold = 0;
        var count = 0;
        for (const item of Object.entries(response.data["Time Series (5min)"]))
        {
          if(count === 0)
          {
            threshold = parseFloat(item[1]["1. open"]);
          }
         // console.log(item);
          newdata.push([Date.parse(item[0]),parseFloat(item[1]["1. open"])]);
          count++;
        }
        newdata.reverse();
        //console.log(newdata);
    
        //console.log('Our data is fetched');
        cur.setState({
            chartOptions: {
              xAxis: {
                type: 'datetime'
            },   
            area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              }
            },
              states: {
                hover: {
                    lineWidth: 1
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }    
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                type: "area",
                data: newdata,//[0].data.push(Math.random()*3 -1),
                color: '#42f56c',
                negativeColor: '#f54251' ,
                threshold: threshold
            }],
            title: {
                text: ''
              },
            yAxis:{
              title: {
                text: 'price'
            }
            }
            }});
          })
          .catch(function (error) {
            // handle error
            //console.log(error);
          })
          .finally(function () {
            // always executed
          });
        
    //}, 5000);
  }

  componentDidMount(){
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  timer() {
    //this.setState({ currentCount: 10 });
    var a = this.state;
    //console.log("a");
    //console.log(a);

    this.setState({
        chartOptions: {
          series: [{
            //data: this.state.chartOptions.series[0].data.push(Math.random()*3 -1),
            color: '#FF0000',
            negativeColor: '#0088FF'          
          }]
        }});
  }


  

  render () {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div> 
    )
  }
}