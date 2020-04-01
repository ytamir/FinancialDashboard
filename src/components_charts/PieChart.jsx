import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Legend, Tooltip,Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
];

export default class PieChartETF extends React.Component {
    
  render() {
    console.log(this.props.etfs);
    /*let new_voo_obj = [];
    for(let a of Object.entries(this.props.voo.Holdings) )
    {
      new_voo_obj.push({name: a[0], value: parseInt(a[1]['Percentage of Portfolio'])});
    }
    console.log(new_voo_obj);*/
    if( this.props.etfs.length > 0)
    {
    let holdings = this.props.holdings;
    console.log(this.props.etfs);
    console.log(this.props.holdings);
    return <div>
        {
          
        this.props.etfs.map(function(id,i){ // for every selected metric
          console.log(id);
          console.log(i);
         
      return <React.Fragment>
          <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={true} data={holdings[id]} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        {data01.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]}/>
        ))}
        <Tooltip />
      </PieChart></React.Fragment>
      })}
      </div>
    }
    else
    {
        return null;
    }    
}
}