/* IMPORTS */
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import IndexContainer from '../components_charts/DOW'
import Syncgraphs     from '../components_charts/SyncGraphs'

import HighchartsStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import MaterialTable from 'material-table';
import Topbar        from './Topbar';

import Autocomplete  from '@material-ui/lab/Autocomplete';
import Card          from '@material-ui/core/Card';
import CardContent   from '@material-ui/core/CardContent';
import CssBaseline   from '@material-ui/core/CssBaseline';
import Grid          from '@material-ui/core/Grid';
import Paper         from '@material-ui/core/Paper';
import TextField     from '@material-ui/core/TextField';
import Typography    from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import withStyles    from '@material-ui/styles/withStyles';

import React,  { Component } from 'react';
import { withRouter, Link }  from 'react-router-dom';
import { FixedSizeList }     from 'react-window';

/* File Constants */
const axios       = require('axios');
const stocks_json  = require('../data/data.json');
const metrics_json = require('../data/metrics.json');


/* Styling */
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

/* Used to detect deleted stocks and metrics in search bars */
function arr_diff (a1, a2) {

  var a = [], diff = [];
  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }
  for (i = 0; i < a2.length; i++) {
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

/* Used handle row additions in the company information box */
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

/* Company Information Box */
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = smUp ? 36 : 48;

  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
  }, [other]);

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

  /* PAGE STATE */
  state = {
    color_count: 0,
    width: window.innerWidth,
    stock_series_data: [],
    selected_stocks: [],
    selected_metrics: [],
    data: [],
    graph_colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b",
                  "#91e8e1"],
    stored_stocks: JSON.parse(stocks_json),
    metrics: JSON.parse(metrics_json),
    stock_data: {
        chart:
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
        render: row_data => <img src={row_data.url} alt = "" style={{width: 50, borderRadius: '50%'}}/>
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
        render: row_data => <Link href={row_data.Website} >
        {row_data.Website}
      </Link>
      }

    ],
    row_data: [],
    metricsData:[]
  };

  delete(id){
    this.setState(prevState => ({
        data: prevState.data.filter(el => el !== id )
    }));
 }

  updatemetricsgraphs() {
    var metrics = "";
    const axios = require('axios');
    var this2 = this;
    if(this.state.selected_metrics.length === 0 || this.state.selected_stocks.length === 0)
    {
      return;
    }

    for ( let stock of this2.state.selected_stocks)
    {
    
    for(var metric of this.state.selected_metrics)
    {
      metrics = metrics + metric+ ";";
      metrics.replace(' ','%20'); 
    
      let url = 'https://backend.stockstats.io/financialy-metrics?stocks=' + stock + ';&metrics=' + metric + ';&frequency=ANNUAL';
     
      axios.get(url).then(function (response) {
          
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

handleMetricsAddition = (event,value) => {

  let {selected_metrics} = this.state;
  selected_metrics.push(value[value.length-1]);
  this.setState({selected_metrics: selected_metrics});
  this.updatemetricsgraphs();
}
handleMetricsDeletion = (event,value) => {
  // update metricData
  var newmetricdata = this.state.metricsData;
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
    for (var [key,] of Object.entries(item)) //loop through data points
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

/*
* Handles stock addition from the select
*/
handleStockAddition = (event,value) => {

    // Get current graph information
    let { graph_colors, selected_stocks, stock_data, stock_series_data } = this.state;

    // Get ticker symbol passed in and construct url
    var ticker = value[value.length-1].symbol;
    selected_stocks.push(ticker);
    var url = 'https://backend.stockstats.io/get/daily_price/' + ticker + '/d/d';

    // Get state outside of asynch request
    let current_state = this;

    // Send API Request and Handle to get Stock Price
    axios.get(url).then(function (response)
        {

        // Store new Data Opening Price for Each Day
        let parsed_data = JSON.parse( response.data[0].stock_data );
        let new_data = [];
        for ( let i=0; i < Object.keys(parsed_data.Date).length; i++ )
            {
            let temp = [ parsed_data.Date[i], parsed_data.Open[i]];
            new_data.push(temp);
            }

        // Store the chart title
        let char_title = "";
        for( const ticker of selected_stocks )
            {
            char_title += ticker + ", ";
            }
        char_title = char_title.substring(0,char_title.length-2);



        // Format the new data to push to our state
        stock_series_data.push( { compare: 'percent', name: ticker, data: new_data,
                                color: graph_colors[ selected_stocks.length-1 ] } );
        let options = {
          chart: { backgroundColor: null },
          title: { text: char_title },
          series: stock_series_data,
          line: {  dataLabels: { enabled: true } },
          rangeSelector: { enabled: true },
          xAxis : {  gridLineWidth: 0 },
          yAxis : { gridLineWidth: 0, labels: { formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  } } }
        };
        stock_data = options;

        // Set the current state
        current_state.setState( { stock_data, selected_stocks,stock_series_data } );

    
        } );

    // Send API Request and Handle to get company info
    var profile_url = "https://financialmodelingprep.com/api/v3/company/profile/"  + ticker;
    this.setState( () => {
      fetch( profile_url )
        .then( response => response.json() )
        .then( res => {
          this.setState( {
            row_data: [...this.state.row_data, {
              symbol: res.symbol, 
              url: res.profile.image,
              companyName:  res.profile.companyName,
              exchange: res.profile.exchange,
              range: res.profile.range,
              sector:  res.profile.sector,
              industry: res.profile.industry,
              ceo: res.profile.ceo,
              website: res.profile.website}] } );
        
      } );
    } );

    // Update Metrics Graphs
    this.updatemetricsgraphs();

}

/*
* Handles stock deletion from the select
*/
handleStockDeletion = ( event, value ) => {

    var new_data = [];
    var new_selected_stocks = [];
    var stock_title = "";

    // Update the Page Title
    for( var val of value )
        {
        stock_title += val.symbol + ", ";
        new_selected_stocks.push( val.symbol );
        }
    // Remove last comma in the graph title
    if( stock_title !== "" )
        {
        stock_title = stock_title.substring( 0,stock_title.length-2 );
        }

    // Update the stock series data
    for( var prev_val of this.state.stock_series_data )
        {
        for( var new_symbol of value )
            {
            if( prev_val.name  === new_symbol.symbol )
                {
                new_data.push( prev_val );
                break;
                }
            }
        }

    // Update the stock series graph
    let options =
        { title: { text: stock_title },
          series: new_data,
          line: { dataLabels: { enabled: true } }
        };

    // Update Row Data
    var new_row_data = [];
    for( var r_data of this.state.row_data )
        {
        for( var new_stock of new_selected_stocks )
            {
            if ( r_data.symbol === new_stock )
                {
                new_row_data.push( r_data );
                break;
                }
            }
        }

    // Find difference in stock list between current state and select list
    var new_stocks = [];
    for( var stock of value )
        {
        new_stocks.push( stock.symbol );
        }

    // Update metrics state data
    var deleted_stock = arr_diff( new_stocks, this.state.selected_stocks );
    var new_metric_data = this.state.metricsData;
    let cnt = 0;
    for( var item of this.state.metricsData )
        {
      for( var [ key, ] of Object.entries( item ) )
        {
        for( let stock of deleted_stock )
            {
            if( key.startsWith( stock ) )
                {
                delete new_metric_data[cnt][key];
                }
            }
        }
      cnt++;
    }

    // Set State Data
    this.setState( { metricsData: new_metric_data, stock_data: options, selected_stocks: new_selected_stocks,
                     stock_series_data: new_data, row_data: new_row_data } );
}

/*
* Handles metrics addition and deletion from the select
*/
handleChangeMetricsList = (event,value) => {

    if( this.state.selected_metrics.length < Object.keys(value).length )
        {
        this.handleMetricsAddition( event, value );
        }
    else if( this.state.selected_metrics.length > Object.keys(value).length )
        {
        this.handleMetricsDeletion( event, value );
        }
}

/*
* Handles stock addition and deletion from the select
*/
handleChangeStockList = (event,value) => {
    if( this.state.selected_stocks.length < Object.keys(value).length )
        {
        this.handleStockAddition( event, value );
        }
    else if( this.state.selected_stocks.length > Object.keys(value).length )
        {
        this.handleStockDeletion( event, value );
        }

}

  render() {
    const { classes } = this.props;
    const { width, metrics, stock_data, stored_stocks , row_data, columns } = this.state;
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
                <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stock_data} />
                </Grid>
                <Grid item xs={6}>
                <Paper style={{maxHeight: 400, overflow: 'auto',margin: "1em"}} className={classes.paper} classes={{root:classes.paper}}>
                <Syncgraphs width ={width} device="pc" name='Fruits' delete={this.delete} graph_colors={this.state.graph_colors} metricsData={this.state.metricsData} metrics={this.state.selected_metrics} stocks={this.state.selected_stocks}/>
                </Paper>
                </Grid>
                </Grid>
                <Grid item xs={10}>
                <MaterialTable
                title="Company Data"
                options={{toolbar: false, padding:'dense', paginationType:'stepped',columnsButton:'false'}}
                columns={columns}
                data={row_data}
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
                <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stock_data} />
                </Grid>
                <Grid item xs>
                
                <Syncgraphs width ={width} device="mobile" name='Fruits' delete={this.delete} graph_colors={this.state.graph_colors} metricsData={this.state.metricsData} metrics={this.state.selected_metrics} stocks={this.state.selected_stocks}/>
                
                </Grid>
                <Grid item xs>
                <MaterialTable
                title="Company Data"
                options={{toolbar: false, padding:'dense', paginationType:'stepped',columnsButton:'false'}}
                columns={columns}
                data={row_data}
              />
              </Grid>
          </div>
          </React.Fragment>
     )
    }
  }
}

export default withRouter(withStyles(styles)(Dashboard));
