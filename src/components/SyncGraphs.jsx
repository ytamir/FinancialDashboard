
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
    AreaChart, Area,
  } from 'recharts';
import React,  { Component } from 'react';
import LineElement from './LineElement'

export default  class Syncgraphs extends React.Component {
    render() {
      if(this.props.metrics)
      {
      var prevthis = this;
      console.log(this.props);
      return <div>
      <ul>{
      this.props.metrics.map(function(element, i){
        console.log(element);
        console.log(this);
        console.log(prevthis);
        return <LineChart
        width={500}
        height={200}
        data={prevthis.props.metricsData}
        syncId="anId"
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {
            prevthis.props.stocks.map((id) => { // use element and id to get the name of stock metric combo
            return ( <Line type="monotone" dataKey={id+element} stroke="#8884d8" fill="#8884d8" />)
            })
        }
        </LineChart> })} </ul>      
        </div>
      }

      else
      {
        return null;
      }
    }

};