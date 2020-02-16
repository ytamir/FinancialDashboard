/* IMPORTS */
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import IndexContainer from '../components_charts/DOW'
import Syncgraphs     from '../components_charts/SyncGraphs'
import PieChartETF    from '../components_charts/PieChart'
import RadarChartETF  from '../components_charts/RadarChart'

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

import stocks_json from '../data/data.json'

import $ from "jquery"

/* File Constants */
const axios       = require('axios');
const etfs_json  = JSON.parse("[{\"symbol\":\"PGJ\",\"name\":\"Invesco Golden Dragon China ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QTEC\",\"name\":\"First Trust NASDAQ-100-Technology Sector Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTHI\",\"name\":\"First Trust Exchange-Traded Fund VI - First Trust BuyWrite Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SOXX\",\"name\":\"iShares PHLX Semiconductor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"WOOD\",\"name\":\"iShares Global Timber & Forestry ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FEMS\",\"name\":\"First Trust Emerging Markets Small Cap AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BSCK\",\"name\":\"Invesco Exchange-Traded Self-Indexed Fund Trust - Invesco BulletShares 2020 Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ANGL\",\"name\":\"VanEck Vectors Fallen Angel High Yield Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GNMA\",\"name\":\"iShares GNMA Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RDVY\",\"name\":\"First Trust Rising Dividend Achievers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FMB\",\"name\":\"First Trust Exchange-Traded Fund III - First Trust Managed Municipal ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNX\",\"name\":\"First Trust Mid Cap Core AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FYX\",\"name\":\"First Trust Small Cap Core AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IBB\",\"name\":\"iShares Trust - iShares Nasdaq Biotechnology ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VIDI\",\"name\":\"ETF Series Solutions - Vident International Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"KBWP\",\"name\":\"Invesco KBW Property & Casualty Insurance ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ISTB\",\"name\":\"iShares Core 1-5 Year USD Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SLQD\",\"name\":\"iShares 0-5 Year Investment Grade Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IUSG\",\"name\":\"iShares Core S&P U.S. Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IUSV\",\"name\":\"iShares Core S&P U.S. Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CBECX\",\"name\":\"Wells Fargo C&B Large Cap Value Fund - Class C\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MMSRX\",\"name\":\"Victory Munder Mid-Cap Core Growth Fund Class R\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCZ\",\"name\":\"iShares Trust - iShares MSCI EAFE Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TSCPX\",\"name\":\"AMG TimesSquare Small Cap Growth Fund Class N\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QQQ\",\"name\":\"Invesco QQQ Trust, Series 1\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QLC\",\"name\":\"FlexShares US Quality Large Cap Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJT\",\"name\":\"iShares Trust - iShares S&P Small-Cap 600 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GXG\",\"name\":\"Global X Funds - Global X MSCI Colombia ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PXI\",\"name\":\"Invesco DWA Energy Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EVGBC\",\"name\":\"Eaton Vance Global Income Builder NextShares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EMQQ\",\"name\":\"EMQQ The Emerging Markets Internet & Ecommerce ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XSLV\",\"name\":\"Invesco S&P SmallCap Low Volatility ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RWK\",\"name\":\"Invesco Exchange-Traded Fund Trust II - Invesco S&P MidCap 400 Revenue ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPVM\",\"name\":\"Invesco S&P 500 Value with Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PXE\",\"name\":\"Invesco Dynamic Energy Exploration & Production ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RWW\",\"name\":\"Invesco S&P Financials Revenue ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SDVSX\",\"name\":\"Sit Dividend Growth Fund Class S\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XHE\",\"name\":\"SPDR S&P Health Care Equipment ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLG\",\"name\":\"Invesco S&P 500 Top 50 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"AREVX\",\"name\":\"American Century Investments One Choice 2055 Portfolio Investor Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPYX\",\"name\":\"SPDR S&P 500 Fossil Fuel Reserves Free ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPXE\",\"name\":\"ProShares Trust - ProShares S&P 500 Ex-Energy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XMLV\",\"name\":\"Invesco S&P MidCap Low Volatility ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XSVM\",\"name\":\"Invesco S&P SmallCap Value with Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RDIV\",\"name\":\"Invesco S&P Ultra Dividend Revenue ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XRLV\",\"name\":\"Invesco S&P 500 ex-Rate Sensitive Low Volatility ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPXN\",\"name\":\"ProShares S&P 500 ex-Financials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPXV\",\"name\":\"ProShares S&P 500 ex-Health Care ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"STARX\",\"name\":\"Astor Sector Allocation Fund Class I\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TDEYX\",\"name\":\"Touchstone Dynamic Equity Fund Class Y\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FPXI\",\"name\":\"First Trust International Equity Opportunities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QYLD\",\"name\":\"Global X NASDAQ 100 Covered Call ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PRFZ\",\"name\":\"Invesco Exchange-Traded Fund Trust - Invesco FTSE RAFI US 1500 Small-Mid ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"YLCO\",\"name\":\"Global X YieldCo & Renewable Energy Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HFXI\",\"name\":\"IndexIQ ETF Trust - IQ 50 Percent Hedged FTSE International ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HFXJ\",\"name\":\"IndexIQ ETF Trust - IQ 50 Percent Hedged FTSE Japan ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ITOT\",\"name\":\"iShares Trust - iShares Core S&P Total U.S. Stock Market ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HSPX\",\"name\":\"Global X Funds - Global X S&P 500 Covered Call ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MINC\",\"name\":\"AdvisorShares Trust - AdvisorShares Newfleet Multi-Sector Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VNQ\",\"name\":\"Vanguard Specialized Funds - Vanguard Real Estate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PCY\",\"name\":\"Invesco Exchange-Traded Fund Trust II - Invesco Emerging Markets Sovereign Debt ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PEK\",\"name\":\"VanEck Vectors ETF Trust - VanEck Vectors ChinaAMC CSI 300 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XITK\",\"name\":\"SPDR Series Trust - SPDR FactSet Innovative Technology ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EPU\",\"name\":\"iShares Trust - iShares MSCI Peru ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IYC\",\"name\":\"iShares Trust - iShares U.S. Consumer Services ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EUDG\",\"name\":\"WisdomTree Trust - WisdomTree Europe Quality Dividend Growth Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IYM\",\"name\":\"iShares Trust - iShares U.S. Basic Materials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TOK\",\"name\":\"iShares Trust - iShares MSCI Kokusai ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HYEM\",\"name\":\"VanEck Vectors ETF Trust - VanEck Vectors Emerging Markets High Yield Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FVD\",\"name\":\"First Trust Exchange-Traded Fund - First Trust Value Line Dividend Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FILL\",\"name\":\"iShares, Inc. - iShares MSCI Global Energy Producers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FXG\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Consumer Staples AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FXH\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Health Care AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FXO\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Financials AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FXU\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Utilities AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IGBH\",\"name\":\"iShares U.S. ETF Trust - iShares Interest Rate Hedged Long-Term Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QDEF\",\"name\":\"FlexShares Trust - FlexShares Quality Dividend Defensive Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HYIH\",\"name\":\"DBX ETF Trust - Xtrackers High Yield Corporate Bond - Interest Rate Hedged ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWH\",\"name\":\"iShares, Inc. - iShares MSCI Hong Kong ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CSM\",\"name\":\"ProShares Trust - ProShares Large Cap Core Plus\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GHII\",\"name\":\"Invesco Exchange-Traded Fund Trust II - Invesco S&P High Income Infrastructure ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWT\",\"name\":\"iShares, Inc. - iShares MSCI Taiwan ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FLTR\",\"name\":\"VanEck Vectors ETF Trust - VanEck Vectors Investment Grade Floating Rate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MGC\",\"name\":\"Vanguard World Fund - Vanguard Mega Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TSCIX\",\"name\":\"AMG TimesSquare Small Cap Growth Fund Class Z\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HYHG\",\"name\":\"ProShares Trust - ProShares High Yield - Interest Rate Hedged\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MGV\",\"name\":\"Vanguard World Fund - Vanguard Mega Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKD\",\"name\":\"iShares Trust - iShares Morningstar Large-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKE\",\"name\":\"iShares Trust - iShares Morningstar Large-Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKH\",\"name\":\"iShares Trust - iShares Morningstar Mid-Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKG\",\"name\":\"iShares Trust - iShares Morningstar Mid-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FDM\",\"name\":\"First Trust Exchange-Traded Fund - First Trust Dow Jones Select MicroCap Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJS\",\"name\":\"iShares Trust - iShares S&P Small-Cap 600 Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DWPP\",\"name\":\"First Trust Dorsey Wright People's Portfolio ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNDF\",\"name\":\"Schwab Strategic Trust - Schwab Fundamental International Large Company Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JHME\",\"name\":\"John Hancock Exchange-Traded Fund Trust - John Hancock Multifactor Energy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JHMI\",\"name\":\"John Hancock Exchange-Traded Fund Trust - John Hancock Multifactor Industrials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNDX\",\"name\":\"Schwab Strategic Trust - Schwab Fundamental U.S. Large Company Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ILF\",\"name\":\"iShares Trust - iShares Latin America 40 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"KRE\",\"name\":\"SPDR Series Trust - SPDR S&P Regional Banking ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLE\",\"name\":\"The Select Sector SPDR Trust - The Energy Select Sector SPDR Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SSIYX\",\"name\":\"Sierra Tactical Core Income Fund Class Y\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IAGG\",\"name\":\"iShares Trust - iShares Core International Aggregate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVOO\",\"name\":\"Vanguard Admiral Funds - Vanguard S&P Mid-Cap 400 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVOV\",\"name\":\"Vanguard Admiral Funds - Vanguard S&P Mid-Cap 400 Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PNQI\",\"name\":\"Invesco NASDAQ Internet ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TLT\",\"name\":\"iShares 20+ Year Treasury Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IPKW\",\"name\":\"Invesco International BuyBack Achievers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PDBC\",\"name\":\"Invesco Optimum Yield Diversified Commodity Strategy No K-1 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"AIA\",\"name\":\"iShares Asia 50 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSCC\",\"name\":\"Invesco S&P SmallCap Consumer Staples ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSCM\",\"name\":\"Invesco S&P SmallCap Materials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LDRI\",\"name\":\"Invesco LadderRite 0-5 Year Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSCU\",\"name\":\"Invesco S&P SmallCap Utilities & Communication Services ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTCS\",\"name\":\"First Trust Capital Strength ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LMBS\",\"name\":\"First Trust Low Duration Opportunities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PKW\",\"name\":\"Invesco BuyBack Achievers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TUR\",\"name\":\"iShares MSCI Turkey ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"REICX\",\"name\":\"West Loop Realty Fund Class C Shares\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"COTZX\",\"name\":\"Columbia Thermostat Fund Institutional Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DVP\",\"name\":\"Deep Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JVTNX\",\"name\":\"Janus Henderson Venture Fund Class N\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SMH\",\"name\":\"VanEck Vectors Semiconductor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ASPGX\",\"name\":\"Astor Sector Allocation Fund Class A\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTA\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Large Cap Value AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JVTSX\",\"name\":\"Janus Henderson Venture Fund Class S\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SSPSX\",\"name\":\"State Street Institutional Premier Growth Equity Fund Service Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPGP\",\"name\":\"Invesco S&P 500 GARP ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PICK\",\"name\":\"iShares, Inc. - iShares MSCI Global Metals & Mining Producers ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLRE\",\"name\":\"The Select Sector SPDR Trust - The Real Estate Select Sector SPDR Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPHQ\",\"name\":\"Invesco S&P 500 Quality ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DFE\",\"name\":\"WisdomTree Europe SmallCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPHY\",\"name\":\"SPDR Portfolio High Yield Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DFJ\",\"name\":\"WisdomTree Japan SmallCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"NEAR\",\"name\":\"iShares Short Maturity Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EMLP\",\"name\":\"First Trust North American Energy Infrastructure Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BYLD\",\"name\":\"iShares Yield Optimized Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPGM\",\"name\":\"SPDR Portfolio MSCI Global Stock Market ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SIZE\",\"name\":\"iShares Edge MSCI USA Size Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SDY\",\"name\":\"SPDR S&P Dividend ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SDVGX\",\"name\":\"Sit Dividend Growth Fund Class I\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DGS\",\"name\":\"WisdomTree Emerging Markets SmallCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"WMW\",\"name\":\"ELEMENTS Linked to the Morningstar Wide Moat Focus Total Return Index\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IBMH\",\"name\":\"iShares iBonds Sep 2019 Term Muni Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DIA\",\"name\":\"SPDR Dow Jones Industrial Average ETF Trust\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPIP\",\"name\":\"SPDR Portfolio TIPS ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPLV\",\"name\":\"Invesco S&P 500 Low Volatility ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LGLV\",\"name\":\"SPDR SSGA US Large Cap Low Volatility Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DJD\",\"name\":\"Invesco Dow Jones Industrial Average Dividend ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DI\",\"name\":\"PIMCO Diversified Income Active ETF\",\"currency\":\"USD\",\"stockExchange\":\"YHD\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IQLT\",\"name\":\"iShares Edge MSCI Intl Quality Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QDF\",\"name\":\"FlexShares Quality Dividend Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPMB\",\"name\":\"SPDR Portfolio Mortgage Backed Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QED\",\"name\":\"IQ Hedge Event-Driven Tracker ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPLB\",\"name\":\"SPDR Portfolio Long Term Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LRGF\",\"name\":\"iShares Edge MSCI Multifactor USA ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CRAK\",\"name\":\"VanEck Vectors Oil Refiners ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DLN\",\"name\":\"WisdomTree U.S. LargeCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DLS\",\"name\":\"WisdomTree International SmallCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ACIM\",\"name\":\"SPDR MSCI ACWI IMI ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HEZU\",\"name\":\"iShares Currency Hedged MSCI Eurozone ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LEMB\",\"name\":\"iShares J.P. Morgan EM Local Currency Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BIV\",\"name\":\"Vanguard Intermediate-Term Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ATMP\",\"name\":\"Barclays ETN+ Select MLP ETN\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DOD\",\"name\":\"ELEMENTS Dogs of the Dow Linked to the Dow Jones High Yield Select 10 Total Return Index\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DOL\",\"name\":\"WisdomTree International LargeCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SLY\",\"name\":\"SPDR S&P 600 Small Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DON\",\"name\":\"WisdomTree U.S. MidCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DBAW\",\"name\":\"Xtrackers MSCI All World ex U.S. Hedged Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EQWL\",\"name\":\"Invesco S&P 100 Equal Weight ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ARKW\",\"name\":\"ARK Next Generation Internet ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RIGS\",\"name\":\"RiverFront Strategic Income Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPSB\",\"name\":\"SPDR Portfolio Short Term Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ARKK\",\"name\":\"ARK Innovation ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPMD\",\"name\":\"SPDR Portfolio S&P 400 Mid Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MBG\",\"name\":\"SPDR Bloomberg Barclays Mortgage Backed Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FUT\",\"name\":\"ProShares Managed Futures Strategy ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QUAL\",\"name\":\"iShares Edge MSCI USA Quality Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MOAT\",\"name\":\"VanEck Vectors Morningstar Wide Moat ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DBEF\",\"name\":\"Xtrackers MSCI EAFE Hedged Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GOVT\",\"name\":\"iShares U.S. Treasury Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QLD\",\"name\":\"ProShares Ultra QQQ\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DRW\",\"name\":\"WisdomTree Global ex-US Real Estate Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FHLC\",\"name\":\"Fidelity MSCI Health Care Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPY\",\"name\":\"SPDR S&P 500 ETF Trust\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FLRN\",\"name\":\"SPDR Bloomberg Barclays Investment Grade Floating Rate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DFND\",\"name\":\"Reality Shares Divcon Dividend Defender ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DBEZ\",\"name\":\"Xtrackers MSCI Eurozone Hedged Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DBEU\",\"name\":\"Xtrackers MSCI Europe Hedged Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LTPZ\",\"name\":\"PIMCO 15+ Year U.S. TIPS Index Exchange-Traded Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DTD\",\"name\":\"WisdomTree U.S. Total Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PXLV\",\"name\":\"Invesco S&amp;P 500 Value with Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DBEM\",\"name\":\"Xtrackers MSCI Emerging Markets Hedged Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DTH\",\"name\":\"WisdomTree International High Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPTS\",\"name\":\"SPDR Portfolio Short Term Treasury ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ROUS\",\"name\":\"Hartford Multifactor US Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FXZ\",\"name\":\"First Trust Materials AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ARKG\",\"name\":\"ARK Genomic Revolution ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PCEF\",\"name\":\"Invesco CEF Income Composite ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"URTH\",\"name\":\"iShares MSCI World ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPLG\",\"name\":\"SPDR Portfolio S&P 500 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPVU\",\"name\":\"Invesco S&P 500 Enhanced Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MDY\",\"name\":\"SPDR S&P MIDCAP 400 ETF Trust\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPSM\",\"name\":\"SPDR Portfolio S&P 600 Small Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPTM\",\"name\":\"SPDR Portfolio S&P 1500 Composite Stock Market ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DIM\",\"name\":\"WisdomTree Trust - WisdomTree International MidCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FPE\",\"name\":\"First Trust Exchange-Traded Fund III - First Trust Preferred Securities and Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FPX\",\"name\":\"First Trust Exchange-Traded Fund - First Trust US Equity Opportunities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HAWX\",\"name\":\"iShares Trust - iShares Currency Hedged MSCI ACWI ex U.S. ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPYG\",\"name\":\"SPDR Portfolio S&P 500 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DDLS\",\"name\":\"WisdomTree Dynamic Currency Hedged International SmallCap Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IDU\",\"name\":\"iShares Trust - iShares U.S. Utilities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DWM\",\"name\":\"WisdomTree International Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IDX\",\"name\":\"VanEck Vectors ETF Trust - VanEck Vectors Indonesia Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IEO\",\"name\":\"iShares Trust - iShares U.S. Oil & Gas Exploration & Production ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XSOE\",\"name\":\"WisdomTree Emerging Markets ex-State-Owned Enterprises Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVAL\",\"name\":\"Alpha Architect International Quantitative Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IAU\",\"name\":\"iShares Gold Trust\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VV\",\"name\":\"Vanguard Index Funds - Vanguard Large-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FDIS\",\"name\":\"Fidelity MSCI Consumer Discretionary Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VOOG\",\"name\":\"Vanguard S&P 500 Growth Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SYLD\",\"name\":\"Cambria Shareholder Yield ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MLN\",\"name\":\"VanEck Vectors AMT-Free Long Municipal Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XBI\",\"name\":\"SPDR S&P Biotech ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SYE\",\"name\":\"SPDR MFS Systematic Core Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"KIE\",\"name\":\"SPDR S&P Insurance ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HJPX\",\"name\":\"iShares Currency Hedged JPX-Nikkei 400 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VB\",\"name\":\"Vanguard Small-Cap Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QUS\",\"name\":\"SPDR MSCI USA StrategicFactors ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SYV\",\"name\":\"SPDR MFS Systematic Value Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VO\",\"name\":\"Vanguard Mid-Cap Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MNA\",\"name\":\"IQ Merger Arbitrage ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MDYG\",\"name\":\"SPDR S&P 400 Mid Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CAPE\",\"name\":\"Barclays ETN+ Shiller Capet ETN\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MDYV\",\"name\":\"SPDR S&P 400 Mid Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HSCZ\",\"name\":\"iShares Trust - iShares Currency Hedged MSCI EAFE Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BOND\",\"name\":\"PIMCO Active Bond Exchange-Traded Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GCE\",\"name\":\"Claymore CEF GS Connect ETN\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MOO\",\"name\":\"VanEck Vectors Agribusiness ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IGM\",\"name\":\"iShares Expanded Tech Sector ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IEFA\",\"name\":\"iShares Trust - iShares Core MSCI EAFE ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SLYG\",\"name\":\"SPDR S&P 600 Small Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IHI\",\"name\":\"iShares U.S. Medical Devices ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VAW\",\"name\":\"Vanguard Materials Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SLYV\",\"name\":\"SPDR S&P 600 Small Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ENFR\",\"name\":\"Alerian Energy Infrastructure ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJH\",\"name\":\"iShares Trust - iShares Core S&P Mid-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FMAT\",\"name\":\"Fidelity MSCI Materials Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VBR\",\"name\":\"Vanguard Small-Cap Value Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RVNU\",\"name\":\"Xtrackers Municipal Infrastructure Revenue Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IGLB\",\"name\":\"iShares Long-Term Corporate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VCR\",\"name\":\"Vanguard Consumer Discretionary Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJJ\",\"name\":\"iShares S&P Mid-Cap 400 Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DDWM\",\"name\":\"WisdomTree Dynamic Currency Hedged International Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJR\",\"name\":\"iShares Core S&P Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FBND\",\"name\":\"Fidelity Total Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IJK\",\"name\":\"iShares Trust - iShares S&P Mid-Cap 400 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VDC\",\"name\":\"Vanguard Consumer Staples Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVLU\",\"name\":\"iShares Edge MSCI Intl Value Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VDE\",\"name\":\"Vanguard Energy Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FFTY\",\"name\":\"Innovator IBD 50 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ECH\",\"name\":\"iShares MSCI Chile Capped ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VEA\",\"name\":\"Vanguard FTSE Developed Markets Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JHMF\",\"name\":\"John Hancock Multifactor Financials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JHMM\",\"name\":\"John Hancock Multifactor Mid Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XMMO\",\"name\":\"Invesco S&P MidCap Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TAO\",\"name\":\"Invesco China Real Estate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XMPT\",\"name\":\"VanEck Vectors CEF Municipal Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SBIO\",\"name\":\"ALPS Medical Breakthroughs ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EDV\",\"name\":\"Vanguard Extended Duration Treasury Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VFH\",\"name\":\"Vanguard Financials Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EES\",\"name\":\"WisdomTree U.S. SmallCap Earnings Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MOTI\",\"name\":\"VanEck Vectors Morningstar International Moat ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FUTY\",\"name\":\"Fidelity MSCI Utilities Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLB\",\"name\":\"Materials Select Sector SPDR Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLU\",\"name\":\"Utilities Select Sector SPDR Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VEGA\",\"name\":\"AdvisorShares STAR Global Buy-Write ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XLY\",\"name\":\"Consumer Discretionary Select Sector SPDR Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VIOV\",\"name\":\"Vanguard S&P Small-Cap 600 Value Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPYB\",\"name\":\"SPDR S&P 500 Buyback ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XAR\",\"name\":\"SPDR S&P Aerospace & Defense ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VEGI\",\"name\":\"iShares MSCI Global Agriculture Producers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VIOO\",\"name\":\"Vanguard S&P Small-Cap 600 Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IPE\",\"name\":\"SPDR Bloomberg Barclays TIPS ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MMTM\",\"name\":\"SPDR S&P 1500 Momentum Tilt ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MINT\",\"name\":\"PIMCO Enhanced Short Maturity Active Exchange-Traded Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HFXE\",\"name\":\"IQ 50 Percent Hedged FTSE Europe ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QDYN\",\"name\":\"FlexShares Quality Dividend Dynamic Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"THD\",\"name\":\"iShares MSCI Thailand Capped ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FIBR\",\"name\":\"iShares Edge U.S. Fixed Income Balanced Risk ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CHIX\",\"name\":\"Global X Funds - Global X MSCI China Financials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TIP\",\"name\":\"iShares TIPS Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CJNK\",\"name\":\"SPDR ICE BofAML Broad High Yield Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"REZ\",\"name\":\"iShares Residential Real Estate Capped ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DVEM\",\"name\":\"WisdomTree Emerging Markets Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ASHR\",\"name\":\"Xtrackers Harvest CSI 300 China A-Shares ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RFV\",\"name\":\"Invesco S&P MidCap 400 Pure Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XSD\",\"name\":\"SPDR S&P Semiconductor ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SMEZ\",\"name\":\"SPDR EURO STOXX Small Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VOE\",\"name\":\"Vanguard Mid-Cap Value Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EFAV\",\"name\":\"iShares Edge MSCI Min Vol EAFE ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VOO\",\"name\":\"Vanguard S&P 500 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VOT\",\"name\":\"Vanguard Mid-Cap Growth Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GRI\",\"name\":\"Cohen & Steers Global Realty Majors ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVV\",\"name\":\"iShares Core S&P 500 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IVW\",\"name\":\"iShares S&P 500 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWB\",\"name\":\"iShares Russell 1000 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWF\",\"name\":\"iShares Russell 1000 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SMIN\",\"name\":\"iShares MSCI India Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VPU\",\"name\":\"Vanguard Utilities Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TLDH\",\"name\":\"FlexShares Currency Hedged Morningstar DM ex-US Factor Tilt Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RHS\",\"name\":\"Invesco S&P 500 Equal Weight Consumer Staples ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWL\",\"name\":\"iShares Russell Top 200 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWO\",\"name\":\"iShares Russell 2000 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"USMV\",\"name\":\"iShares Edge MSCI Min Vol USA ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWP\",\"name\":\"iShares Russell Mid-Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DEFA\",\"name\":\"iShares Adaptive Currency Hedged MSCI EAFE ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWV\",\"name\":\"iShares Russell 3000 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IWY\",\"name\":\"iShares Russell Top 200 Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GSY\",\"name\":\"Invesco Ultra Short Duration ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IXC\",\"name\":\"iShares Global Energy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"XCEM\",\"name\":\"Columbia EM Core ex-China ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GTO\",\"name\":\"Invesco Total Return Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IYE\",\"name\":\"iShares U.S. Energy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IYY\",\"name\":\"iShares Dow Jones U.S. ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SMLV\",\"name\":\"SPDR SSGA US Small Cap Low Volatility Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VTI\",\"name\":\"Vanguard Total Stock Market Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VTV\",\"name\":\"Vanguard Value Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VUG\",\"name\":\"Vanguard Growth Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SMLF\",\"name\":\"iShares Edge MSCI Multifactor USA Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GXF\",\"name\":\"Global X FTSE Nordic Region ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ICVT\",\"name\":\"iShares Convertible Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"NFO\",\"name\":\"Invesco Insider Sentiment ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"AUSE\",\"name\":\"WisdomTree Australia Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IHDG\",\"name\":\"WisdomTree International Hedged Quality Dividend Growth Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VXF\",\"name\":\"Vanguard Extended Market Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTEC\",\"name\":\"Fidelity MSCI Information Technology Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWC\",\"name\":\"iShares MSCI Canada ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWD\",\"name\":\"iShares MSCI Sweden ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"AOA\",\"name\":\"iShares Core Aggressive Allocation ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CSD\",\"name\":\"Invesco S&P Spin-Off ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RPV\",\"name\":\"Invesco S&P 500 Pure Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWM\",\"name\":\"iShares MSCI Malaysia ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWL\",\"name\":\"iShares MSCI Switzerland ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EWW\",\"name\":\"iShares MSCI Mexico Capped ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VYM\",\"name\":\"Vanguard High Dividend Yield Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"NOBL\",\"name\":\"ProShares S&P 500 Dividend Aristocrats ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EQAL\",\"name\":\"Invesco Russell 1000 Equal Weight ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EXT\",\"name\":\"WisdomTree U.S. Total Earnings Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DGRO\",\"name\":\"iShares Core Dividend Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VLU\",\"name\":\"SPDR S&P 1500 Value Tilt ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PBP\",\"name\":\"Invesco S&P 500 BuyWrite ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CUT\",\"name\":\"Invesco MSCI Global Timber ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CMBS\",\"name\":\"iShares CMBS ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DIVY\",\"name\":\"Reality Shares DIVS ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IDHQ\",\"name\":\"Invesco S&P International Developed Quality ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EZA\",\"name\":\"iShares MSCI South Africa ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RSP\",\"name\":\"Invesco S&P 500 Equal Weight ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LDUR\",\"name\":\"PIMCO Enhanced Low Duration Active Exchange-Traded Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EZM\",\"name\":\"WisdomTree U.S. MidCap Earnings Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PPA\",\"name\":\"Invesco Aerospace & Defense ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RTM\",\"name\":\"Invesco S&P 500 Equal Weight Materials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CWB\",\"name\":\"SPDR Bloomberg Barclays Convertible Securities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CWI\",\"name\":\"SPDR MSCI ACWI ex-US ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HEFA\",\"name\":\"iShares Currency Hedged MSCI EAFE ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MTUM\",\"name\":\"iShares Edge MSCI USA Momentum Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HEDJ\",\"name\":\"WisdomTree Europe Hedged Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EUMF\",\"name\":\"WisdomTree Europe Multifactor Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PRF\",\"name\":\"Invesco FTSE RAFI US 1000 ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IYLD\",\"name\":\"iShares Morningstar Multi-Asset Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSJ\",\"name\":\"Invesco Dynamic Software ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSI\",\"name\":\"Invesco Dynamic Semiconductors ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CZA\",\"name\":\"Invesco Zacks Mid-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSR\",\"name\":\"Invesco Active U.S. Real Estate Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TPYP\",\"name\":\"Tortoise North American Pipeline Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GSEU\",\"name\":\"Goldman Sachs ActiveBeta Europe Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RYF\",\"name\":\"Invesco S&P 500 Equal Weight Financials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RYE\",\"name\":\"Invesco S&P 500 Equal Weight Energy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RYT\",\"name\":\"Invesco S&P 500 Equal Weight Technology ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RYU\",\"name\":\"Invesco S&P 500 Equal Weight Utilities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTLS\",\"name\":\"First Trust Long/Short Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ONEV\",\"name\":\"SPDR Russell 1000 Low Volatility Focus ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ONEY\",\"name\":\"SPDR Russell 1000 Yield Focus ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FREL\",\"name\":\"Fidelity Covington Trust - Fidelity MSCI Real Estate Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ZROZ\",\"name\":\"PIMCO 25+ Year Zero Coupon U.S. Treasury Index Exchange-Traded Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNCL\",\"name\":\"Fidelity MSCI Financials Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EQLT\",\"name\":\"Workplace Equality Portfolio\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IBCD\",\"name\":\"iShares iBonds Mar 2020 Term Corporate ex-Financials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FBT\",\"name\":\"First Trust NYSE Arca Biotechnology Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PWB\",\"name\":\"Invesco Dynamic Large Cap Growth ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PWC\",\"name\":\"Invesco Dynamic Market ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QGTA\",\"name\":\"IQ Leaders GTAA Tracker ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKJ\",\"name\":\"iShares Morningstar Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GSIE\",\"name\":\"Goldman Sachs ActiveBeta International Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PWV\",\"name\":\"Invesco Dynamic Large Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ISCF\",\"name\":\"iShares Edge MSCI Multifactor Intl Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DVYE\",\"name\":\"iShares Emerging Markets Dividend ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PXF\",\"name\":\"Invesco FTSE RAFI Developed Markets ex-U.S. ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHZ\",\"name\":\"Schwab U.S. Aggregate Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHX\",\"name\":\"Schwab U.S. Large-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FDL\",\"name\":\"First Trust Morningstar Dividend Leaders Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FDN\",\"name\":\"First Trust Dow Jones Internet Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNDB\",\"name\":\"Schwab Fundamental U.S. Broad Market Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FNDC\",\"name\":\"Schwab Fundamental International Small Company Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHD\",\"name\":\"Schwab U.S. Dividend Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHE\",\"name\":\"Schwab Emerging Markets Equity ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"COPX\",\"name\":\"Global X Copper Miners ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHB\",\"name\":\"Schwab U.S. Broad Market ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHA\",\"name\":\"Schwab U.S. Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHM\",\"name\":\"Schwab U.S. Mid-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PZA\",\"name\":\"Invesco Exchange-Traded Fund Trust II - Invesco National AMT-Free Municipal Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHV\",\"name\":\"Schwab U.S. Large-Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IBDC\",\"name\":\"iShares iBonds Mar 2020 Term Corporate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FCOM\",\"name\":\"Fidelity MSCI Communication Services Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHR\",\"name\":\"Schwab Intermediate-Term U.S. Treasury ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SCHP\",\"name\":\"Schwab U.S. TIPS ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"AGGY\",\"name\":\"WisdomTree Yield Enhanced U.S. Aggregate Bond Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PZT\",\"name\":\"Invesco New York AMT-Free Municipal Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"YLD\",\"name\":\"Principal Active Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FFR\",\"name\":\"First Trust FTSE EPRA/NAREIT Developed Markets Real Estate Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPDW\",\"name\":\"SPDR Portfolio Developed World ex-US ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EMHY\",\"name\":\"iShares Emerging Markets High Yield Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IQDY\",\"name\":\"FlexShares International Quality Dividend Dynamic Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"INTF\",\"name\":\"iShares Trust - iShares Edge MSCI Multifactor Intl ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LIT\",\"name\":\"Global X Lithium & Battery Tech ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RWL\",\"name\":\"Invesco S&P 500 Revenue ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FENY\",\"name\":\"Fidelity Covington Trust - Fidelity MSCI Energy Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EUSC\",\"name\":\"WisdomTree Trust - WisdomTree Europe Hedged SmallCap Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RODM\",\"name\":\"Hartford Multifactor Developed Markets (ex-US) ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FGD\",\"name\":\"First Trust Dow Jones Global Select Dividend Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"UTES\",\"name\":\"Virtus Reaves Utilities ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GOEX\",\"name\":\"Global X Gold Explorers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IDLV\",\"name\":\"Invesco S&P International Developed Low Volatility ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SPEM\",\"name\":\"SPDR Portfolio Emerging Markets ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"EMIH\",\"name\":\"Xtrackers Emerging Markets Bond - Interest Rate Hedged ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VLUE\",\"name\":\"iShares Edge MSCI USA Value Factor ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DES\",\"name\":\"WisdomTree U.S. SmallCap Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BBC\",\"name\":\"Virtus LifeSci Biotech Clinical Trials ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BBP\",\"name\":\"Virtus LifeSci Biotech Products ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MLPX\",\"name\":\"Global X MLP & Energy Infrastructure ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VWOB\",\"name\":\"Vanguard Emerging Markets Government Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BAB\",\"name\":\"Invesco Exchange-Traded Fund Trust II - Invesco Taxable Municipal Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MCMVX\",\"name\":\"Monongahela All Cap Value Fund\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BRLIX\",\"name\":\"Bridgeway Blue Chip Fund\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CXSE\",\"name\":\"WisdomTree China ex-State-Owned Enterprises Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"RING\",\"name\":\"iShares MSCI Global Gold Miners ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VONE\",\"name\":\"Vanguard Russell 1000 Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VONG\",\"name\":\"Vanguard Russell 1000 Growth Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"QQEW\",\"name\":\"First Trust NASDAQ-100 Equal Weighted Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"HYZD\",\"name\":\"WisdomTree Trust - WisdomTree Interest Rate Hedged High Yield Bond Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"MGOAX\",\"name\":\"Victory Munder Mid-Cap Core Growth Fund Class A\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SSPGX\",\"name\":\"State Street Institutional Premier Growth Equity Fund Investment Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VMBS\",\"name\":\"Vanguard Mortgage-Backed Securities Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VGIT\",\"name\":\"Vanguard Intermediate-Term Treasury Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"NCVLX\",\"name\":\"Nuance Concentrated Value Fund Institutional Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PEY\",\"name\":\"Invesco High Yield Equity Dividend Achievers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PID\",\"name\":\"Invesco International Dividend Achievers ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TGIHX\",\"name\":\"TIAA-CREF Growth & Income Fund Advisor Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSCH\",\"name\":\"Invesco S&P SmallCap Health Care ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ESGD\",\"name\":\"iShares Trust - iShares ESG MSCI EAFE ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ESGE\",\"name\":\"iShares, Inc. - iShares ESG MSCI EM ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IGV\",\"name\":\"iShares Trust - iShares Expanded Tech-Software Sector ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ITA\",\"name\":\"iShares U.S. Aerospace & Defense ETF\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DHTCX\",\"name\":\"Diamond Hill All Cap Select Fund Class C\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CDL\",\"name\":\"VictoryShares US Large Cap High Div Volatility Wtd ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VTHR\",\"name\":\"Vanguard Russell 3000 Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CATH\",\"name\":\"Global X S&P 500 Catholic Values ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VCIT\",\"name\":\"Vanguard Intermediate-Term Corporate Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VCLT\",\"name\":\"Vanguard Long-Term Corporate Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DXJS\",\"name\":\"WisdomTree Japan Hedged SmallCap Equity Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CSB\",\"name\":\"VictoryShares US Small Cap High Div Volatility Wtd ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VCSH\",\"name\":\"Vanguard Short-Term Corporate Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"BNDX\",\"name\":\"Vanguard Total International Bond Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"DGRW\",\"name\":\"WisdomTree U.S. Quality Dividend Growth Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VTWV\",\"name\":\"Vanguard Russell 2000 Value Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"GULF\",\"name\":\"WisdomTree Middle East Dividend Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CBLSX\",\"name\":\"Wells Fargo C&B Large Cap Value Fund - Class Inst\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"VYMI\",\"name\":\"Vanguard International High Dividend Yield Index Fund ETF Shares\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TDELX\",\"name\":\"Touchstone Dynamic Equity Fund Institutional Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"CBLLX\",\"name\":\"Wells Fargo C&B Large Cap Value Fund - Class Admin\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"TDEAX\",\"name\":\"Touchstone Dynamic Equity Fund Class A\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JSMD\",\"name\":\"Janus Henderson Small/Mid Cap Growth Alpha ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IEUS\",\"name\":\"iShares MSCI Europe Small-Cap ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"WHGIX\",\"name\":\"Westwood Income Opportunity Fund Institutional Class\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ONEQ\",\"name\":\"Fidelity NASDAQ Composite Index Tracking Stock Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"COMT\",\"name\":\"iShares Commodities Select Strategy ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FBZ\",\"name\":\"First Trust Brazil AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"JKI\",\"name\":\"iShares Trust - iShares Morningstar Mid-Cap Value ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FDT\",\"name\":\"First Trust Developed Markets Ex-US AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FALN\",\"name\":\"iShares Fallen Angels USD Bond ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PSL\",\"name\":\"Invesco DWA Consumer Staples Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"IFEU\",\"name\":\"iShares Trust - iShares Europe Developed Real Estate ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"SRET\",\"name\":\"Global X SuperDividend REIT ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ROBO\",\"name\":\"Robo Global Robotics and Automation Index ETF\",\"currency\":\"USD\",\"stockExchange\":\"NYSEArca\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PUI\",\"name\":\"Invesco DWA Utilities Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"PYZ\",\"name\":\"Invesco DWA Basic Materials Momentum ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGM\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FEX\",\"name\":\"First Trust Exchange-Traded AlphaDEX Fund - First Trust Large Cap Core AlphaDEX Fund\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"LKOR\",\"name\":\"FlexShares Trust - FlexShares Credit-Scored US Long Corporate Bond Index Fund\",\"currency\":\"USD\",\"stockExchange\":\"BATS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FEUZ\",\"name\":\"First Trust Eurozone AlphaDEX ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"FTLB\",\"name\":\"First Trust Hedged BuyWrite Income ETF\",\"currency\":\"USD\",\"stockExchange\":\"NasdaqGS\",\"exchangeShortName\":\"ETF\"},{\"symbol\":\"ODMCX\",\"name\":\"JPMorgan Intrepid Mid Cap Fund Class C\",\"currency\":\"USD\",\"stockExchange\":\"Nasdaq\",\"exchangeShortName\":\"ETF\"}]"
);
//const stocks_json  = require('../data/data.json');
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
function arr_diff( a1, a2 ) {

    var a = [], diff = [];
    for( var i = 0; i < a1.length; i++ )
    {
    a[ a1[ i ] ] = true;
    }
    for( i = 0; i < a2.length; i++ )
        {
        if ( a[ a2[ i ] ] )
            {
            delete a[ a2[ i ] ];
            }
        else
            {
            a[ a2[ i ] ] = true;
            }
        }
    for( var k in a )
        {
        diff.push(k);
        }
  return diff;
}

/* Used to handle row additions in the company information box */
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

class ETF_Dashboard extends Component {

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
    stored_etfs: etfs_json,
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

  update_metrics_graphs() {
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


/*
* Handles metrics addition from the select
*/
handleMetricsAddition = (event,value) => {
  let { selected_metrics } = this.state;
  selected_metrics.push (value[ value.length-1 ] );
  this.setState( { selected_metrics: selected_metrics } );
  this.update_metrics_graphs();
}


/*
* Handles metrics deletion from the select
*/
handleMetricsDeletion = (event,value) => {
    var current_metric_data = this.state.metricsData;
    var deleted_metric = arr_diff(this.state.selected_metrics,value);
    let count = 0;

    for( var item of this.state.metricsData )   //loop through metric
    {
        if( item !== undefined )
        {
            for( var [ key,]  of Object.entries( item ) ) //loop through data points
            {
                for( var metric of deleted_metric ) // loop through new metrics list
                {
                if( key.includes( metric ) )
                    {
                    delete current_metric_data[count][key];
                    }
                }
            }
        }
    count++;
    }
  this.setState( { metricsData: current_metric_data, selected_metrics: value } );
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

    // Update Metrics Graphs to account for new stocks
    this.update_metrics_graphs();

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
    const { width, metrics, stock_data, stored_etfs , row_data, columns } = this.state;
    const currentPath = this.props.location.pathname;
    const isMobile = width <= 500;

    if( !isMobile ) //is pc
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
                  options={stored_etfs}
                  defaultValue={[]}
                  getOptionLabel={option => option.symbol}
                  onChange={this.handleChangeStockList}
                  onDelete={this.handleautodelete}
                  ListboxComponent={ListboxComponent}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="ETFs"
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
                <PieChartETF></PieChartETF>
                <RadarChartETF></RadarChartETF>
                <Grid xs={10} spacing={3} alignItems="center" justify="center" container className={classes.grid}> 
                <Grid item xs={6} >
                <HighchartsReact highcharts={HighchartsStock} title="d" constructorType={'stockChart'} options={stock_data} />
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
                  options={stored_etfs}
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

export default withRouter(withStyles(styles)(ETF_Dashboard));
