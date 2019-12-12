
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
    AreaChart, Area,
  } from 'recharts';
import React,  { Component } from 'react';

export default class LineElement extends React.Component {
    render() { return <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        
      }
  };

//   if(this.props.stocks)
//   {
//   var prevthis = this;
//   console.log(this.props);
//   return <div>
//   <ul>{
//   this.props.stocks.map(function(element, i){
//     console.log(element);
//     console.log(this);
//     console.log(prevthis);
//     return <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />})} </ul>      
//     </div>
//   }

//   else
//   {
//     return null;
//   }
  

  