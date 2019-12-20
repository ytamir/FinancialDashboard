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
import Syncgraphs from './SyncGraphs'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IndexContainer from './DOW'
import LineElement from './LineElement'
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



//3GJ8FAC1VNENVM39



//import Highcharts from 'highcharts/highstock'
//import StockHighChart from "constants/StockHighChart"

require('highcharts/indicators/pivot-points')(Highcharts);
require('highcharts/indicators/macd')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/map')(Highcharts);



const stocksjson = require('./data.json');
const metricsjson = require('./metrics.json');
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
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  cardcontent: {
    padding: 1,
    "&:last-child": {
      paddingBottom: 1
    }
  },
  paper: {
    padding: 1,
    margin: 1
  },
  grid: {
    width: 1300,
    margin: `0 ${theme.spacing(0)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1)
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
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(1),
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



/* <LineChart
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
</div> */







//url: "https://financialmodelingprep.com/images-New-jpg/CERN.jpg",
// CompanyName:  "Cerner Corporation",
// Exchange: "Nasdaq Global Select",
// Range: "48.78-67.57",
// Sector:  "Technology",
// Industry:"Application Software",
// CEO: "David Brent Shafer",
// Website: "http://www.cerner.com"}
function arr_diff (a1, a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
          a[a2[i]] = true;
      }
  }

  for (var k in a) {
      diff.push(k);
  }

  return diff;
}

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
    colorcount: 0,
    width: window.innerWidth,
    stockseriesdata: [],
    selectedstocks: [],
    selected_metrics: [],
    data: [],
    graphcolors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],//['#1EB980','#FF6859','#B15DFF','#72DEFF','#045D56'],
    stored_stocks: JSON.parse(stocksjson),
    metrics: JSON.parse(metricsjson),
    stockdata: {chart:
      {
        backgroundColor: null,
        
      },
      rangeSelector: {
        enabled: false
      },
      credits: false
    },
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
    metricsData:[]
    
  };

  delete(id){
    this.setState(prevState => ({
        data: prevState.data.filter(el => el != id )
    }));
 }

  
  
  updatemetricsgraphs() {
    var stocks = "";
    var metrics = "";
    const axios = require('axios');
    var this2 = this;
    if(this.state.selected_metrics.length === 0 || this.state.selectedstocks.length === 0)
    {
      return;
    }

    for ( let stock of this2.state.selectedstocks)
    {
    
    for(var metric of this.state.selected_metrics)
    {
      metrics = metrics + metric+ ";";
      metrics.replace(' ','%20');
    
      let url = 'https://bcd91062.ngrok.io/financialy-metrics?stocks=' + stock + ';&metrics=' + metric + ';&frequency=ANNUAL';
     
      var ret = axios.get(url).then(function (response) {
          
          // for each stock in returned object
          console.log(response.data.return_data);
          for ( let j=0; j < response.data.return_data.length; j++ ) // loop through metrics 
          {
              let parsed_metric_data = response.data.return_data[j];
              let newArray = [];
              var firstyear = parseInt(parsed_metric_data.dates[0].split("-")[0]);
              for ( let i= parsed_metric_data.dates.length-1; i >= 0; i--) // parse all dates sent
              {
                  let temp = { date: parseInt(firstyear-i)};
                  temp[parsed_metric_data.ticker+' '+parsed_metric_data.metric] = parseFloat(parsed_metric_data.data[i]);
                  newArray.push(temp);
              }
              if (this2.state.metricsData.length === 0) // First Metric
              {
                  this2.setState({'metricsData': newArray});
              }
              else // Metrics already inside
              {
                var olddata = this2.state.metricsData;
                var newmetricdata = [];
                for (var newval of newArray) // new stock metric combo to add
                {
                  for( var oldval of olddata) // old items
                  {
                    if ( newval.date === oldval.date)
                    {
                      for (let [key, value] of Object.entries(newval)) 
                      {
                        if (key === 'date'  )
                        {
                          //nothing, its already in there or NaN
                        }
                        else 
                        {
                          if (isNaN(value)) 
                          {
                            newmetricdata.push(oldval);
                            break;
                          }
                          else // add metric data
                          {
                            oldval[key] = value;
                            newmetricdata.push(oldval);
                            break;
                          }
                        }
                      }
                    }
                  }
                }
                this2.setState({'metricsData': newmetricdata});
              }
          }
    });
    }
  }
  }
  
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
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

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
  let {selected_metrics} = this.state;
  selected_metrics.push(value[value.length-1]);
  this.setState({selected_metrics: selected_metrics});
  let current_metric = value[value.length-1];
  var this2 = this;
    var framePropsArray  = [];
    this.updatemetricsgraphs();
}
handleMetricsDeletion = (event,value) => {
  // update metricData
  var newmetricdata = this.state.metricsData;
  var new_metrics_list = this.state.metricsData;
  //update list of metrics
  
  var deletedmetric = arr_diff(this.state.selected_metrics,value);
  //console.log(deletedmetric);


  let count = 0;

  //console.log(this.state.metricsData);
  for (var item of this.state.metricsData) //loop through each date
  {
   // console.log(item);
    if( item !== undefined)
    {
    for (var [key,num] of Object.entries(item)) //loop through data points
    {
      for(var metric of deletedmetric) // loop through new metrics list
      {
      //  console.log("key: " + key + " metric: " + metric +  "item.date: " + item.date );
        if( key.includes(metric)) // keep data from stocks that still exist
        {
       //   console.log("DELETEDkey: " + key + " metric: " + metric +  "item.date: " + item.date );
          delete newmetricdata[count][key];
        }
      }
    }
    }
    count++;
  }

 // console.log(newmetricdata);

  this.setState({metricsData: newmetricdata, selected_metrics:value});
  
}
handleStockAddition = (event,value) => { // add stock color same as sync graph
  const axios = require('axios');
    let {graphcolors, selectedstocks, stockdata, stockseriesdata} = this.state;
    // Make a request for a user with a given ID
    var ticker = value[value.length-1].symbol;
    selectedstocks.push(ticker);
    var url = 'https://bcd91062.ngrok.io/get/daily_price/' + ticker + '/d/d';
    var profileurl = "https://financialmodelingprep.com/api/v3/company/profile/"  + ticker;
    let this2 = this;
    var ret = axios.get(url).then(function (response) 
    { // handle success
        let parsed_data = JSON.parse(response.data[0].stock_data);
        let newArray = [];
       // console.log(parsed_data);
        for ( let i=0; i < Object.keys(parsed_data.Date).length; i++){
          //let temp = { date:parsed_data.Date[i], close:parsed_data.Close[i], high:parsed_data.High[i], volume:parsed_data.Volume[i], open:parsed_data.Open[i], low:parsed_data.Low[i] };
          let temp = [ parsed_data.Date[i], parsed_data.Open[i]];//, parsed_data.High[i], parsed_data.Low[i], parsed_data.Close[i]];
          newArray.push(temp);
        }

        let stocklist =""; //creat title for time series chart
        for (const ticker of selectedstocks)
        {
          stocklist += ticker + ", ";
        }

        stocklist = stocklist.substring(0,stocklist.length-2);
        stockseriesdata.push({name:ticker, data: newArray, color: graphcolors[selectedstocks.length-1]});

        let options = {
          chart:
          {
            backgroundColor: null
          },
          title: {
        text: stocklist
          },
          
          series: stockseriesdata,
          line: {
            dataLabels: {
                enabled: true
            }
          },
          rangeSelector: {
            enabled: true
          },
          xAxis : { 
            gridLineWidth: 0,
          },
          yAxis : { 
            gridLineWidth: 0,
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
      this.updatemetricsgraphs();
}
handleStockDeletion= (event,value) => {
   // console.log(event);
   // console.log(value);
    var newArr = [];
    var new_selected_stocks = [];
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

    // update metricData
    //console.log(value);
    //console.log(this.state.selectedstocks);
    
    var newstocks = [];
    for (let s of value)
    {
      newstocks.push(s.symbol);
    }
    
    let deletedstock = arr_diff(newstocks, this.state.selectedstocks);
    var newmetricdata = this.state.metricsData;
    let cnt = 0;
    for (var item of this.state.metricsData) //loop through each date
    {
      for (var [key,val1] of Object.entries(item)) //loop through data points
      {
        for(var stock of deletedstock) // loop through deleted stocks
        {       
          // console.log("item");
          // console.log(item);
          // console.log("key");
          // console.log(key);
          // console.log("deleted stock");
          // console.log(stock);

          if( key.startsWith(stock)) // keep data from stocks that still exist
          {            
            delete newmetricdata[cnt][key];
          }
        }
      }
      cnt++;
    }

    this.setState({metricsData: newmetricdata, stockdata: options, selectedstocks: new_selected_stocks, stockseriesdata:newArr, rowdata:new_rowdata});
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
    //console.log(this.state);
   // console.log(this.state.selectedstocks);
   // console.log(this.state.selectedstocks.length);
   // console.log(Object.keys(value).length);
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

  render() {
    const { classes } = this.props;
    const { width, amount, period, start, monthlyPayment,
      monthlyInterest, data, loading, options,metrics, stockdata, toptions, selectedstocks, stored_stocks, bumpdata, names , rowdata, columns } = this.state;
    const currentPath = this.props.location.pathname;
    const isMobile = width <= 500;

    if (!isMobile) //is pc
    {
      return (
        <React.Fragment>
          <CssBaseline />
          <Topbar currentPath={currentPath} />
          <div className={classes.root}>


                <Grid container justify="center" spacing={2}  >
                <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                  <Grid xs={10} spacing={3} alignItems="center" justify="center" container className={classes.grid}>
                    <Grid item xs={3} >
                    <Card m={1} className={classes.card}>
                      <CardContent className={{
                            padding: 12,
                            "&:last-child": {
                              paddingBottom: 12
                            }
                          }}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Dow Jones
                        </Typography>
                        <IndexContainer indexname = ".DJI" key="3GJ8FAC1VNENVM39" device="pc" />
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                    <Card className={classes.card}>
                    <CardContent className={{
                            padding: 12,
                            "&:last-child": {
                              paddingBottom: 12
                            }
                          }}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Nasdaq
                        </Typography>
                        <IndexContainer indexname = "ONEQ" key="WPYXUSZL2IBH26QC" device="pc" />
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card className={classes.card}>
                    <CardContent className={{
                            padding: 12,
                            "&:last-child": {
                              paddingBottom: 12
                            }
                          }}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          S&P 500 
                        </Typography>
                        <IndexContainer indexname = ".INX" key="HPMROQZGGJAOOA13" device="pc"/>
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card className={classes.card}>
                    <CardContent className={{
                            padding: 12,
                            "&:last-child": {
                              paddingBottom: 12
                            }
                          }}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          NYSE
                        </Typography>
                        <IndexContainer indexname = "%5ENYA" key="5T77KQXSYKOQWAUM" device="pc"/>
                      </CardContent>
                    </Card>
                    </Grid>
                    
                    </Grid>
                <Grid xs={10} spacing={3} alignItems="center" justify="center" container className={classes.grid}>    
                <Grid item xs={6} >
                <Autocomplete
                  multiple
                  filterSelectedOptions
                  options={stored_stocks}
                  defaultValue={[]}
                  getOptionLabel={option => option.symbol}
                  onChange={this.handleChangeStockList}
                  onDelete={this.handleautodelete}
                  ListboxComponent={ListboxComponent}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Stocks"
                      fullWidth
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.symbol + " - " + option.name, inputValue);
                    const parts = parse(option.symbol + " - " + option.name, matches);
            
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
                      label="Metrics"
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
                    );}}
                
                />
                
                </Grid>
                
                </Grid>
                
                <Grid xs={10} spacing={3} alignItems="center" justify="center" container className={classes.grid}> 
                <Grid item xs={6} >
                <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stockdata} />
                </Grid>
                <Grid item xs={6}>
                <Paper style={{maxHeight: 400, overflow: 'auto',margin: "1em"}} className={classes.paper} classes={{root:classes.paper}}>
                <Syncgraphs width ={width} device="pc" name='Fruits' delete={this.delete} graphcolors={this.state.graphcolors} metricsData={this.state.metricsData} metrics={this.state.selected_metrics} stocks={this.state.selectedstocks}/>
                </Paper>
                </Grid>
                </Grid>
                <Grid item xs={10}>
                <MaterialTable
                title="Company Data"
                options={{toolbar: false, padding:'dense', paginationType:'stepped',columnsButton:'false'}}
                columns={columns}
                data={rowdata}
              />
              </Grid>
              

                </Grid>
                </Grid>
          </div>
          </React.Fragment>
      )
    }
    else // mobile layout
    {
     return (
     <React.Fragment>
          <CssBaseline />
          <Topbar currentPath={currentPath} />
          <div className={classes.root}>
          <div style={{ padding: 4 }}>
                  <Grid  spacing={1} alignItems="center" justify="center" container className={classes.grid}>
                    <Grid item xs={3} >
                    <Card m={1} className={classes.card}>
                      <CardContent className={classes.cardcontent}>
                        <Typography variant="body2" color="textSecondary" >
                          Dow
                        </Typography>
                        <IndexContainer indexname = ".DJI" key="3GJ8FAC1VNENVM39" device="mobile"/>
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3} >
                    <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant="caption" color="textSecondary" >
                          Nasdaq
                        </Typography>
                        <IndexContainer indexname = "ONEQ" key="WPYXUSZL2IBH26QC" device="mobile"/>
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant="caption" color="textSecondary" >
                          S&P 500 
                        </Typography>
                        <IndexContainer indexname = ".INX" key="HPMROQZGGJAOOA13" device="mobile"/>
                      </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant="caption" color="textSecondary" >
                          NYSE
                        </Typography>
                        <IndexContainer indexname = "%5ENYA" key="5T77KQXSYKOQWAUM" device="mobile" />
                      </CardContent>
                    </Card>
                    </Grid>
                    
                    </Grid> 
                    </div>

          <div style={{ padding: 10 }}>
          <Grid container spacing={3}>   
          <Grid item xs>
                <Autocomplete
                  multiple
                  filterSelectedOptions
                  options={stored_stocks}
                  defaultValue={[]}
                  getOptionLabel={option => option.symbol}
                  onChange={this.handleChangeStockList}
                  onDelete={this.handleautodelete}
                  ListboxComponent={ListboxComponent}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Stocks"
                      fullWidth
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.symbol + " - " + option.name, inputValue);
                    const parts = parse(option.symbol + " - " + option.name, matches);
            
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
           </div>
           <div style={{ padding: 10 }}>
          <Grid container spacing={3}>   
          <Grid item xs>
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
                      label="Metrics"
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
                    );}}
                
                />
                
                
                </Grid>
                </Grid>
                </div>
                <Grid item  xs >
                <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stockdata} />
                </Grid>
                <Grid item xs>
                
                <Syncgraphs width ={width} device="mobile" name='Fruits' delete={this.delete} graphcolors={this.state.graphcolors} metricsData={this.state.metricsData} metrics={this.state.selected_metrics} stocks={this.state.selectedstocks}/>
                
                </Grid>
                <Grid item xs>
                <MaterialTable
                title="Company Data"
                options={{toolbar: false, padding:'dense', paginationType:'stepped',columnsButton:'false'}}
                columns={columns}
                data={rowdata}
              />
              </Grid>
          </div>
          </React.Fragment>
     )
    }
  }
}

export default withRouter(withStyles(styles)(Dashboard));
