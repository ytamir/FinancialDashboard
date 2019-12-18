
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ReferenceLine, Brush,
    AreaChart, Area,
  } from 'recharts';
import React,  { Component } from 'react';
import LineElement from './LineElement';
import NumberFormat from 'react-number-format';

function nFormatter(num, digits) {
  let lessthanzero = false;
  if(num < 0)
  {
    lessthanzero = true;
    num = num *-1;

  }
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "B" },
    { value: 1E12, symbol: "T" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  if(lessthanzero)
  {
    return -1*((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
  }
  else
  {
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }
}

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    if( Math.abs(amount) > 10000)
    {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    }
    else
    {
      return Number((amount).toFixed(3));
    }
   
  } catch (e) {
    console.log(e)
  }
};

export const NumberMask = (value) => (
  <NumberFormat
    value={value}
    displayType="text"
    thousandSeparator=","
    prefix="$"
  />
)
export default  class Syncgraphs extends React.Component {

      delete(id){
        this.props.delete(id);
      }

    render() {
      if(this.props.metrics && this.props.stocks.length > 0)
      {
      var prevthis = this;
      let countcolor = -1;
      return <div>
      <ul>{

      
        
      this.props.metrics.map(function(element, i){ // for every selected metric
        countcolor = 0;
        return <React.Fragment> <h4>{element}</h4>  <LineChart
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
        <Legend/>
        <YAxis scale="sqrt" tickFormatter={tick => {
              return nFormatter(tick, 3); }}/>
        <Tooltip formatter={value => {
              return formatMoney(value); }}/>
        <ReferenceLine y={0} stroke='#000'/>
        {
            prevthis.props.stocks.map((id) => { //for every selected stock
              countcolor++; // basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'
              // use element and id to get the name of stock metric combo
            return ( <Line name={id} type="monotoneX" key={id} dataKey={id+" "+element} stroke={prevthis.props.graphcolors[countcolor-1]} strokeWidth={3} />)  
            })
        }
        </LineChart> </React.Fragment> })} </ul>      
        </div>
      }
      else
      {
        return null;
      }
    }

};