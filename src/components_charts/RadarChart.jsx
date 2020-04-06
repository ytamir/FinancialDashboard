import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'History', A: 65, B: 85, fullMark: 150,
  },
];

export default class RadarChartETF extends  React.Component  {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
    let prevthis = this;
    let countcolor = -1;
    console.log(this.state);
    if(this.props.radial.length  > 0 )
      {
    return (            
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={prevthis.props.radial}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, this.props.maxval]} />
        {
            prevthis.props.etfs.map((id) => { //for every selected stock
              //countcolor++; // basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'
              // use element and id to get the name of stock metric combo
              countcolor++;
              console.log(id);
            return ( <Radar name={id} dataKey={id} stroke={prevthis.props.graph_colors[countcolor-1]} fill={prevthis.props.graph_colors[countcolor-1]} fillOpacity={0.5} />)
            })
         //<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
       // <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
        }
       
        <Legend />
      </RadarChart>
    );
      }
      else
      {
        return null;
      }
  }
}
