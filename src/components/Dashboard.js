import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';
import MultiSelect from './selects/multiselect';
import HighchartsStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import { FixedSizeList as List } from 'react-window';
import StockChart from './Stock.jsx'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IndexContainer from './DOW'
import { ResponsiveBump } from '@nivo/bump'
import Topbar from './Topbar';
import { FixedSizeList } from 'react-window';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import MaterialTable from 'material-table';
import XYFrame from "semiotic/lib/XYFrame";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
  AreaChart, Area,
} from 'recharts';

import metricsjson from './metrics.json';

//3GJ8FAC1VNENVM39



//import Highcharts from 'highcharts/highstock'
//import StockHighChart from "constants/StockHighChart"

require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)


const stocksjson = require('./data.json');
const numeral = require('numeral');
numeral.defaultFormat('0,000');
const theme = ["#ac58e5","#E0488B","#9fd0cb","#e0d33a","#7566ff","#533f82","#7a255d","#365350","#a19a11","#3f4482"];


function renderRow(props) {
  const { data, index, style } = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      ...style,
    },
  });
}

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

export  class ListElement extends React.Component {
  render() {
    return <li> {this.props.data}</li>
  }
};

export  class Syncgraph extends React.Component {
    render() {
      if(this.props.data)
      {
      console.log(this.props);
      return <div>
      <ul>{this.props.data.map(function(element, i){
        return <ListElement data = {element}/>  })} </ul>
      </div>
      }
      else
      {
        return null;
      }
    }

};







//url: "https://financialmodelingprep.com/images-New-jpg/CERN.jpg",
// CompanyName:  "Cerner Corporation",
// Exchange: "Nasdaq Global Select",
// Range: "48.78-67.57",
// Sector:  "Technology",
// Industry:"Application Software",
// CEO: "David Brent Shafer",
// Website: "http://www.cerner.com"}
function createData(url, companyName, exchange, range, sector, industry, ceo, website) {
  return { url, companyName, exchange, range, sector, industry, ceo, website };
}
const monthRange = Months;
const  toptions1 = { series: [{name: 'Profit', data: [100,200,30,100,30,50,100]},{name: 'Profit2', data: [222,22,1,123,1,312,100]} ]};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = smUp ? 36 : 48;

  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <FixedSizeList
        style={{ padding: 0, height: Math.min(8, itemCount) * itemSize, maxHeight: 'auto' }}
        itemData={children}
        height={250}
        width="100%"
        outerElementType={outerElementType}
        innerElementType="ul"
        itemSize={itemSize}
        overscanCount={5}
        itemCount={itemCount}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

class Dashboard extends Component {


  
  state = {
    loading: true,
    amount: 15000,
    period: 3,
    start: 0,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    stockseriesdata: [],
    selectedstocks: [],
    selected_metrics: [],
    data: [],
    stored_stocks: JSON.parse(stocksjson),
    metrics: JSON.parse(metricsjson),
    stockdata: {
      title: {
        text: 'My stock chart'
      },
      series: [
        {
          data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
        },
        {
          data: [1,2,3,4,5]
        }
      ]
    },
      testdata: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]],
      toptions: { series: [{name: 'Profit', data: [100,200,30,100,30,50,100]}]},     
    names: [
      'AAPL',
      'MSFT',
      'GRMN',
      'CERN',
      'FB',
      'TSLA',
      'XOM',
      'DOX'
    ],
    columns: [
      {field: 'url',
        Title: 'Company',
        render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>
      },
      {
        title: 'Company Name',
        field: 'companyName'
      },
      {
        title: 'Exchange',
        field: 'exchange',
        cellStyle: {height: '10px'}
      },
      {
        title: 'Range',
        field: 'range'
      },
      {
        title: 'Sector',
        field: 'sector'
      },
      {
        title: 'Industry',
        field: 'industry'
      },
      {
        title: 'CEO',
        field: 'ceo'
      },
      {
        title: 'Website',
        field: 'website',
        render: rowData => <Link href={rowData.Website} > 
        {rowData.Website}
      </Link>
      }

    ],
    rowdata: []
      // { 
      // url: "https://financialmodelingprep.com/images-New-jpg/CERN.jpg",
      // CompanyName:  "Cerner Corporation",
      // Exchange: "Nasdaq Global Select",
      // Range: "48.78-67.57",
      // Sector:  "Technology",
      // Industry:"Application Software",
      // CEO: "David Brent Shafer",
      // Website: "http://www.cerner.com"}
    ,
    syncdata:  [
      {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
      },
      {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
      },
      {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
      },
      {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
      },
      {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
      },
      {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
      },
      {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
      },
    ],
    bumpdata: [
      {
        "id": "Serie 1",
        "data": [
          {
            "x": 2000,
            "y": 10
          },
          {
            "x": 2001,
            "y": 12
          },
          {
            "x": 2002,
            "y": 7
          },
          {
            "x": 2003,
            "y": 4
          },
          {
            "x": 2004,
            "y": 9
          }
        ]
      },
      {
        "id": "Serie 2",
        "data": [
          {
            "x": 2000,
            "y": 4
          },
          {
            "x": 2001,
            "y": 5
          },
          {
            "x": 2002,
            "y": 8
          },
          {
            "x": 2003,
            "y": 7
          },
          {
            "x": 2004,
            "y": 7
          }
        ]
      },
      {
        "id": "Serie 3",
        "data": [
          {
            "x": 2000,
            "y": 2
          },
          {
            "x": 2001,
            "y": 8
          },
          {
            "x": 2002,
            "y": 1
          },
          {
            "x": 2003,
            "y": 2
          },
          {
            "x": 2004,
            "y": 12
          }
        ]
      },
      {
        "id": "Serie 4",
        "data": [
          {
            "x": 2000,
            "y": 12
          },
          {
            "x": 2001,
            "y": 4
          },
          {
            "x": 2002,
            "y": 6
          },
          {
            "x": 2003,
            "y": 5
          },
          {
            "x": 2004,
            "y": 10
          }
        ]
      },
      {
        "id": "Serie 5",
        "data": [
          {
            "x": 2000,
            "y": 7
          },
          {
            "x": 2001,
            "y": 7
          },
          {
            "x": 2002,
            "y": 2
          },
          {
            "x": 2003,
            "y": 6
          },
          {
            "x": 2004,
            "y": 1
          }
        ]
      }
    ],
    frameProps: {
        lines:
        [

        { title: "CERNREVENUE",
          coordinates:
            [
                { date: 1, data: 450 },
                { date: 2, data: 200 },
                { date: 3, data: 200 },
                { date: 4, data: 200 },
                { date: 5, data: 200 }
            ]
        },

        { title: "GRMNREVENUE",
          coordinates:
            [
                { date: 1, data: 300 },
                { date: 2, data: 300 },
                { date: 3, data: 300 },
                { date: 4, data: 300 },
                { date: 5, data: 300 }
            ]
        }

        ],
        size: [600,200],
        margin: { left: 80, bottom: 90, right: 10, top: 40 },
        lineType: "bumpline",
        xAccessor: "date",
        yAccessor: "data",
        lineStyle: (d, i) => ({
            stroke: theme[i],
            strokeWidth: 2,
            fill: "none"
        }),
        title: (
            <text textAnchor="middle">
              Revenue Comparison
            </text>
        ),
        axes: [{ orient: "left", label: "Rank", },
               { orient: "bottom", label: "Year" }
              ]
    }
    
    
  };
  

  
  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1));
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period);
    //console.log(stockdata);
    
   

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      };
    })
      this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data});
 

    
  }

  componentDidMount() {
    this.updateValues();
  }


  

  handleChangeAmount = (event, value) => {
    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get('http://127.0.0.1:5000/post/5')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    this.setState({amount: value, loading: false});
    this.updateValues();
  }

  handleChangePeriod = (event, value) => {
    this.setState({period: value, loading: false});
    this.updateValues();
  }

  handleChangeStart = (event, value) => {
    this.setState({start: value, loading: false});
    this.updateValues();
  }

  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            console.log(propName);
            console.log(a[propName]);
            console.log(b[propName]);
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}
handleautodelete = (event,value) => {
  console.log(event);
}
handleMetricsAddition = (event,value) => {
const axios = require('axios');
  // add the new metric into the metrics list
  this.state.selected_metrics.push(value[value.length-1]);
  let current_metric = value[value.length-1];
  let this2 = this;

    var framePropsArray  = [];

    var stocks = "";

    for ( let i =0; i <  this2.state.selectedstocks.length; i++)
    {
        stocks = stocks + this2.state.selectedstocks[i] + ";"
    }
    let url = 'http://127.0.0.1:5000/financial-metrics?stocks=' + stocks + '&metrics=' + current_metric + '&frequency=ANNUAL';
    console.log("URL")
    console.log(url)
    console.log(this2.state.selectedstocks)

    var ret = axios.get(url).then(function (response) {

        var objCopy = {}; // objCopy will store a copy of the frameProps
        var key;
        for (key in this2.state.frameProps) {
        objCopy[key] = this2.state.frameProps[key];
        }
        objCopy.lines = []

        for ( let j=0; j < response.data.return_data.length; j++ )
        {
            let parsed_metric_data = response.data.return_data[j];
            let newArray = [];
            console.log(parsed_metric_data);

            for ( let i=0; i < parsed_metric_data.dates.length; i++)
            {
                let split = parsed_metric_data.dates[i].split("-")
                let year = parseInt(split[0])
                let month = parseInt(split[1])
                let day = parseInt(split[2])
                if(month == 1) { year = year - 1 }
                year = year - 2000;
                let temp = { date: year, data: parseInt(parsed_metric_data.data[i]) };
                newArray.push(temp);
            }

            console.log("NEWARRAY")
            console.log(newArray);
            objCopy.lines.push({title: parsed_metric_data.ticker + parsed_metric_data.metric, coordinates: newArray })

         }


        this2.setState({frameProps : objCopy});
        console.log("STATE")
        console.log(this2.state)

    });
}
handleMetricsDeletion = (event,value) => {
  
}
handleStockAddition = (event,value) => {
  const axios = require('axios');
    let {selectedstocks, stockdata, stockseriesdata} = this.state;
    // Make a request for a user with a given ID
    var ticker = event.currentTarget.innerText;
    selectedstocks.push(event.currentTarget.innerText);
    var url = 'http://127.0.0.1:5000/get/daily_price/' + event.currentTarget.innerText + '/d/d';
    var profileurl = "https://financialmodelingprep.com/api/v3/company/profile/"  + event.currentTarget.innerText;
    console.log(url);
    let this2 = this;
    var this3 = this;
    var ret = axios.get(url).then(function (response) {
        // handle success
        console.log(response);
        let parsed_data = JSON.parse(response.data[0].stock_data);
        let newArray = [];
        console.log(parsed_data);
        for ( let i=0; i < Object.keys(parsed_data.Date).length; i++){
          //let temp = { date:parsed_data.Date[i], close:parsed_data.Close[i], high:parsed_data.High[i], volume:parsed_data.Volume[i], open:parsed_data.Open[i], low:parsed_data.Low[i] };
          let temp = [ parsed_data.Date[i], parsed_data.Open[i]];//, parsed_data.High[i], parsed_data.Low[i], parsed_data.Close[i]];
          newArray.push(temp);
        }
        console.log(newArray);
        let stocklist ="";
        for (const ticker of selectedstocks)
        {
          stocklist += ticker + ", ";
        }
        stocklist = stocklist.substring(0,stocklist.length-2);
        console.log(stockdata);
        stockseriesdata.push({name:ticker, data: newArray});
        let options = {
          title: {
        text: stocklist
          },
          series: stockseriesdata,
          line: {
            dataLabels: {
                enabled: true
            }
          }
        };
     stockdata = options;

    this2.setState({stockdata, selectedstocks,stockseriesdata});
    
        })
    this.setState( () => {
      fetch(profileurl)
        .then(response => response.json())
        .then(res => {
          
          this.setState({
            rowdata: [...this.state.rowdata, {
              symbol: res.symbol, 
              url: res.profile.image,
              companyName:  res.profile.companyName,
              exchange: res.profile.exchange,
              range: res.profile.range,
              sector:  res.profile.sector,
              industry: res.profile.industry,
              ceo: res.profile.ceo,
              website: res.profile.website}] });
        
          });
        });





        // var {bumpdata} = this.state;
        // var self = this;
        // var metrics_url = 'http://127.0.0.1:5000/financial-metrics?stocks='+ event.currentTarget.innerText +
        //           '&metrics=REVENUE&frequency=QUARTERLY';
     
        //  var ret = axios.get(metrics_url).then(function (metrics_response) {
     
        //      console.log(metrics_response);
        //      var return_data = metrics_response.data.return_data;
        //      console.log("RETURN DATA");
        //      console.log(return_data);
        //      console.log("ARRAY VALUES");
     
        //      for ( var i=0; i < return_data.length; i++ ){
        //        console.log(return_data[i]);
        //        bumpdata[i].id = return_data[i].ticker + "-" + return_data[i].metric;
        //        bumpdata[i].data[0].y = 9000;
        //      }
     
        //      console.log("BUMP DATA");
        //      console.log(bumpdata);
        //      self.setState({bumpdata});
        //      self.forceUpdate();
        //      console.log("STATE");
        //      console.log(self.state);
     
        //  });

}
handleStockDeletion= (event,value) => {
    console.log(event);
    console.log(value);
    var newArr = [];
    var new_selected_stocks = [];
    let count = 0;
    var stocklist = "";

    //update title
    for(var val of value)
    {
      stocklist += val.symbol + ", ";
      new_selected_stocks.push(val.symbol);
    }

    //update stock series inside of the graph
    for (var prev_val of this.state.stockseriesdata)
    {
      for(var new_symbol of value)
      {
        if (prev_val.name  === new_symbol.symbol)
        {
          newArr.push(prev_val);
          break;
        }
      }
       
    }

    //remove last comma
    if(stocklist !== "")
    {
      stocklist = stocklist.substring(0,stocklist.length-2);
    }
    
    //update graph
    let options = {
      title: {
    text: stocklist
      },
      series: newArr,
      line: {
        dataLabels: {
            enabled: true
        }
      }
    };

    //update rowdata
    var new_rowdata = [];
    for(var rdata of this.state.rowdata)
    {
      for(var new_stock of new_selected_stocks)
      {
      
        if (rdata.symbol === new_stock)
        {
            //delete rdata.tableData;
            new_rowdata.push(rdata);
            break;
        }
      }
    }

    this.setState({stockdata: options, selectedstocks: new_selected_stocks, stockseriesdata:newArr, rowdata:new_rowdata});
}

handleChangeMetricsList = (event,value) => { // onchangefunction for metrics autocomplete

  if( this.state.selected_metrics.length <  Object.keys(value).length) // new metric is selected
  {
    this.handleMetricsAddition(event, value);
  }
  else if (this.state.selected_metrics.length > Object.keys(value).length) // a metric is being deleted
  {
    this.handleMetricsDeletion(event, value);

  }
  else
  {
    console.log("uh oh, spaghettiOs");
  }

}

  handleChangeStockList = (event,value) => {
    console.log(this.state);
    console.log(this.state.selectedstocks);
    console.log(this.state.selectedstocks.length);
    console.log(Object.keys(value).length);
      if( this.state.selectedstocks.length <  Object.keys(value).length) // new stock is selected
      {
        this.handleStockAddition(event, value);
      }
      else if (this.state.selectedstocks.length > Object.keys(value).length) // a stock is being deleted
      {
        this.handleStockDeletion(event, value);

      }
      else
      {
        console.log("uh oh, spaghettiOs");
      }
  }

//   <div>
// <Button variant="outlined" className={classes.outlinedButtom}>
//   Get help
// </Button>
// </div>
  

  render() {
    const { classes } = this.props;
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading, options,metrics, stockdata, toptions, selectedstocks, stored_stocks, bumpdata, names , rowdata, columns } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>


              <Grid container justify="center" spacing={2}  >
              <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                <Grid xs={11} spacing={3} alignItems="center" justify="center" container className={classes.grid}>
                  <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Dow Jones
                      </Typography>
                      <IndexContainer indexname = ".DJI" />
                    </CardContent>
                  </Card>
                  </Grid>
                  <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Nasdaq
                      </Typography>
                      <IndexContainer indexname = "AAPL" />
                    </CardContent>
                  </Card>
                  </Grid>
                  <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        S&P 500 
                      </Typography>
                      <IndexContainer indexname = ".INX" />
                    </CardContent>
                  </Card>
                  </Grid>
                  <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        NYSE
                      </Typography>
                      <IndexContainer indexname = "%5ENYA" />
                    </CardContent>
                  </Card>
                  </Grid>
                  
                  </Grid>
              <Grid xs={11} spacing={3} alignItems="center" justify="center" container className={classes.grid}>    
              <Grid item xs={6} >
              <Autocomplete
                multiple
                filterSelectedOptions
                options={stored_stocks}
                getOptionLabel={option => option.symbol}
                defaultValue={[]}
                onChange={this.handleChangeStockList}
                onDelete={this.handleautodelete}
                ListboxComponent={ListboxComponent}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Please Pick Stocks to Compare"
                    fullWidth
                  />
                )}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.symbol, inputValue);
                  const parts = parse(option.symbol, matches);
          
                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 900 : 300 }}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
              </Grid>
              <Grid item xs={6} >
              <Autocomplete
                multiple
                filterSelectedOptions
                options={metrics}
                getOptionLabel={option => option}
                defaultValue={[]}
                onChange={this.handleChangeMetricsList}
                onDelete={this.handleautodelete}
                ListboxComponent={ListboxComponent}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Financial Metrics"
                    fullWidth
                  />
                )}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option, inputValue);
                  const parts = parse(option, matches);
          
                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 900 : 300 }}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
              
              </Grid>
              </Grid>
              <Grid xs={11} spacing={3} alignItems="center" justify="center" container className={classes.grid}> 
              <Grid item xs={6} >
              <Card className={classes.card}>
              <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stockdata} />
              </Card>
              </Grid>
              <Grid item xs={6}>
              <div>
        <h4>A demo of synchronized AreaCharts</h4>
        <LineChart
          width={500}
          height={200}
          data={this.state.syncdata}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
        <p>Maybe some other content</p>
        <LineChart
          width={500}
          height={200}
          data={this.state.syncdata}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          <Brush />
        </LineChart>
        <AreaChart
          width={500}
          height={200}
          data={this.state.syncdata}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </div>
             
              </Grid>
              </Grid>
              <MaterialTable
              title="Company Data"
              options={{toolbar: false, padding:'dense', paginationType:'stepped',columnsButton:'false'}}
              columns={columns}
              data={rowdata}
            />
            

              </Grid>
              </Grid>
        </div>
        <Syncgraph name='Fruits' syncdata={this.state.syncdata} data={selectedstocks }/>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));
