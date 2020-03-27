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

const voo_sample = {"_id":{"$oid":"5e5c4df512849cb880b0d8d0"},"QueryDate":"Mar 1, 2020","HoldingsLastUpdatedDate":"Mar 1, 2020","Ticker":"VOO","Holdings":{"Microsoft Corp.":{"Ticker":"MSFT","Number of Shares":"154,277,455","Percentage of Portfolio":"4.81","Annual Percentage Change":"44.43"},"Apple Inc.":{"Ticker":"AAPL","Number of Shares":"84,464,701","Percentage of Portfolio":"4.79","Annual Percentage Change":"56.32"},"Amazon.com Inc.":{"Ticker":"AMZN","Number of Shares":"8,422,262","Percentage of Portfolio":"3.10","Annual Percentage Change":"14.79"},"Facebook Inc.":{"Ticker":"FB","Number of Shares":"48,665,909","Percentage of Portfolio":"1.80","Annual Percentage Change":"18.22"},"Alphabet Inc.":{"Ticker":"GOOGL","Number of Shares":"6,034,122","Percentage of Portfolio":"1.58","Annual Percentage Change":"19.27"},"BERKSHIRE HATHAWAY INC.":{"Ticker":"BRK.A","Number of Shares":"746","Percentage of Portfolio":"0.05","Annual Percentage Change":"2.01"},"JPMORGAN CHASE & CO.":{"Ticker":"JPM","Number of Shares":"63,429,567","Percentage of Portfolio":"1.54","Annual Percentage Change":"10.41"},"JOHNSON & JOHNSON":{"Ticker":"JNJ","Number of Shares":"53,224,439","Percentage of Portfolio":"1.45","Annual Percentage Change":"-1.02"},"Visa Inc.":{"Ticker":"V","Number of Shares":"34,618,511","Percentage of Portfolio":"1.26","Annual Percentage Change":"23.46"},"PROCTER & GAMBLE CO.":{"Ticker":"PG","Number of Shares":"50,432,052","Percentage of Portfolio":"1.15","Annual Percentage Change":"14.48"},"Mastercard Inc.":{"Ticker":"MA","Number of Shares":"17,952,463","Percentage of Portfolio":"1.04","Annual Percentage Change":"29.25"},"Intel Corp.":{"Ticker":"INTC","Number of Shares":"87,970,199","Percentage of Portfolio":"1.03","Annual Percentage Change":"4.28"},"AT&T Inc.":{"Ticker":"T","Number of Shares":"147,729,400","Percentage of Portfolio":"1.02","Annual Percentage Change":"13.39"},"BANK OF AMERICA CORP.":{"Ticker":"BAC","Number of Shares":"163,717,586","Percentage of Portfolio":"0.98","Annual Percentage Change":"-3.49"},"EXXON MOBIL CORP.":{"Ticker":"XOM","Number of Shares":"85,563,646","Percentage of Portfolio":"0.97","Annual Percentage Change":"-35.27"},"UNITEDHEALTH GROUP INC.":{"Ticker":"UNH","Number of Shares":"19,159,429","Percentage of Portfolio":"0.96","Annual Percentage Change":"1.95"},"Home Depot Inc.":{"Ticker":"HD","Number of Shares":"22,059,880","Percentage of Portfolio":"0.92","Annual Percentage Change":"18.60"},"Walt Disney Co.":{"Ticker":"DIS","Number of Shares":"36,450,011","Percentage of Portfolio":"0.92","Annual Percentage Change":"4.32"},"VERIZON COMMUNICATIONS INC.":{"Ticker":"VZ","Number of Shares":"83,638,562","Percentage of Portfolio":"0.91","Annual Percentage Change":"-4.51"},"Coca-Cola Co.":{"Ticker":"KO","Number of Shares":"77,981,129","Percentage of Portfolio":"0.83","Annual Percentage Change":"19.03"},"MERCK & CO. INC.":{"Ticker":"MRK","Number of Shares":"51,487,409","Percentage of Portfolio":"0.81","Annual Percentage Change":"-5.04"},"Pfizer Inc.":{"Ticker":"PFE","Number of Shares":"111,916,742","Percentage of Portfolio":"0.76","Annual Percentage Change":"-22.15"},"Chevron Corp.":{"Ticker":"CVX","Number of Shares":"38,238,313","Percentage of Portfolio":"0.75","Annual Percentage Change":"-22.27"},"Comcast Corp.":{"Ticker":"CMCSA","Number of Shares":"91,809,227","Percentage of Portfolio":"0.73","Annual Percentage Change":"4.93"},"PepsiCo Inc.":{"Ticker":"PEP","Number of Shares":"28,199,878","Percentage of Portfolio":"0.73","Annual Percentage Change":"14.44"},"CISCO SYSTEMS INC.":{"Ticker":"CSCO","Number of Shares":"85,791,495","Percentage of Portfolio":"0.72","Annual Percentage Change":"-22.60"},"WELLS FARGO & CO.":{"Ticker":"WFC","Number of Shares":"77,833,604","Percentage of Portfolio":"0.67","Annual Percentage Change":"-18.14"},"Adobe Inc.":{"Ticker":"ADBE","Number of Shares":"9,789,319","Percentage of Portfolio":"0.63","Annual Percentage Change":"31.27"},"Boeing Co.":{"Ticker":"BA","Number of Shares":"10,812,220","Percentage of Portfolio":"0.63","Annual Percentage Change":"-36.82"},"MCDONALD":{"Ticker":"MCD","Number of Shares":"15,230,058","Percentage of Portfolio":"0.60","Annual Percentage Change":"5.90"},"Walmart Inc.":{"Ticker":"WMT","Number of Shares":"28,688,339","Percentage of Portfolio":"0.60","Annual Percentage Change":"9.75"},"Citigroup Inc.":{"Ticker":"C","Number of Shares":"44,150,704","Percentage of Portfolio":"0.60","Annual Percentage Change":"-1.46"},"SALESFORCE.COM INC.":{"Ticker":"CRM","Number of Shares":"17,937,565","Percentage of Portfolio":"0.60","Annual Percentage Change":"4.46"},"ABBOTT LABORATORIES":{"Ticker":"ABT","Number of Shares":"35,741,342","Percentage of Portfolio":"0.57","Annual Percentage Change":"-0.26"},"Medtronic plc":{"Ticker":"MDT","Number of Shares":"27,106,021","Percentage of Portfolio":"0.57","Annual Percentage Change":"10.76"},"BRISTOL-MYERS SQUIBB CO.":{"Ticker":"BMY","Number of Shares":"47,406,042","Percentage of Portfolio":"0.55","Annual Percentage Change":"15.89"},"Netflix Inc.":{"Ticker":"NFLX","Number of Shares":"8,762,642","Percentage of Portfolio":"0.55","Annual Percentage Change":"1.70"},"NVIDIA Corp.":{"Ticker":"NVDA","Number of Shares":"12,376,262","Percentage of Portfolio":"0.54","Annual Percentage Change":"73.78"},"PAYPAL HOLDINGS INC.":{"Ticker":"PYPL","Number of Shares":"23,745,416","Percentage of Portfolio":"0.50","Annual Percentage Change":"10.35"},"COSTCO WHOLESALE CORP.":{"Ticker":"COST","Number of Shares":"8,933,983","Percentage of Portfolio":"0.50","Annual Percentage Change":"28.93"},"NEXTERA ENERGY INC.":{"Ticker":"NEE","Number of Shares":"9,884,308","Percentage of Portfolio":"0.49","Annual Percentage Change":"35.30"},"PHILIP MORRIS INTERNATIONAL INC.":{"Ticker":"PM","Number of Shares":"31,464,533","Percentage of Portfolio":"0.48","Annual Percentage Change":"-6.19"},"Accenture plc":{"Ticker":"ACN","Number of Shares":"12,842,891","Percentage of Portfolio":"0.48","Annual Percentage Change":"12.43"},"Amgen Inc.":{"Ticker":"AMGN","Number of Shares":"12,016,144","Percentage of Portfolio":"0.48","Annual Percentage Change":"4.34"},"INTERNATIONAL BUSINESS MACHINES CORP.":{"Ticker":"IBM","Number of Shares":"17,910,732","Percentage of Portfolio":"0.47","Annual Percentage Change":"-6.48"},"THERMO FISHER SCIENTIFIC INC.":{"Ticker":"TMO","Number of Shares":"8,109,008","Percentage of Portfolio":"0.47","Annual Percentage Change":"12.22"},"UNION PACIFIC CORP.":{"Ticker":"UNP","Number of Shares":"14,038,885","Percentage of Portfolio":"0.46","Annual Percentage Change":"-5.47"},"HONEYWELL INTERNATIONAL INC.":{"Ticker":"HON","Number of Shares":"14,450,294","Percentage of Portfolio":"0.46","Annual Percentage Change":"4.90"},"Broadcom Inc.":{"Ticker":"AVGO","Number of Shares":"8,021,871","Percentage of Portfolio":"0.45","Annual Percentage Change":"0.42"},"UNITED TECHNOLOGIES CORP.":{"Ticker":"UTX","Number of Shares":"16,407,002","Percentage of Portfolio":"0.45","Annual Percentage Change":"2.91"},"NIKE Inc.":{"Ticker":"NKE","Number of Shares":"25,198,367","Percentage of Portfolio":"0.44","Annual Percentage Change":"3.73"},"AbbVie Inc.":{"Ticker":"ABBV","Number of Shares":"29,906,121","Percentage of Portfolio":"0.44","Annual Percentage Change":"7.93"},"Eli Lilly & Co.":{"Ticker":"LLY","Number of Shares":"17,086,677","Percentage of Portfolio":"0.44","Annual Percentage Change":"0.36"},"TEXAS INSTRUMENTS INC.":{"Ticker":"TXN","Number of Shares":"18,904,023","Percentage of Portfolio":"0.42","Annual Percentage Change":"7.97"},"Oracle Corp.":{"Ticker":"ORCL","Number of Shares":"43,812,693","Percentage of Portfolio":"0.42","Annual Percentage Change":"-5.57"},"Linde plc":{"Ticker":"LIN","Number of Shares":"10,863,533","Percentage of Portfolio":"0.40","Annual Percentage Change":"9.46"},"GENERAL ELECTRIC CO.":{"Ticker":"GE","Number of Shares":"176,617,693","Percentage of Portfolio":"0.40","Annual Percentage Change":"0.00"},"LOCKHEED MARTIN CORP.":{"Ticker":"LMT","Number of Shares":"5,019,843","Percentage of Portfolio":"0.39","Annual Percentage Change":"20.25"},"Danaher Corp.":{"Ticker":"DHR","Number of Shares":"12,927,341","Percentage of Portfolio":"0.38","Annual Percentage Change":"14.39"},"AMERICAN TOWER CORP.":{"Ticker":"AMT","Number of Shares":"8,957,649","Percentage of Portfolio":"0.38","Annual Percentage Change":"30.95"},"Starbucks Corp.":{"Ticker":"SBUX","Number of Shares":"23,883,363","Percentage of Portfolio":"0.37","Annual Percentage Change":"11.80"},"QUALCOMM Inc.":{"Ticker":"QCOM","Number of Shares":"23,091,405","Percentage of Portfolio":"0.36","Annual Percentage Change":"47.62"},"3M Co.":{"Ticker":"MMM","Number of Shares":"11,629,447","Percentage of Portfolio":"0.34","Annual Percentage Change":"-28.60"},"LOWE":{"Ticker":"LOW","Number of Shares":"15,500,287","Percentage of Portfolio":"0.33","Annual Percentage Change":"-0.98"},"ALTRIA GROUP INC.":{"Ticker":"MO","Number of Shares":"37,779,256","Percentage of Portfolio":"0.33","Annual Percentage Change":"-22.84"},"CVS HEALTH CORP.":{"Ticker":"CVS","Number of Shares":"26,308,931","Percentage of Portfolio":"0.33","Annual Percentage Change":"1.16"},"FIDELITY NATIONAL INFORMATION SERVICES INC.":{"Ticker":"FIS","Number of Shares":"12,428,749","Percentage of Portfolio":"0.33","Annual Percentage Change":"30.32"},"AMERICAN EXPRESS CO.":{"Ticker":"AXP","Number of Shares":"13,568,978","Percentage of Portfolio":"0.32","Annual Percentage Change":"2.34"},"MONDELEZ INTERNATIONAL INC.":{"Ticker":"MDLZ","Number of Shares":"29,115,899","Percentage of Portfolio":"0.31","Annual Percentage Change":"12.03"},"CHARTER COMMUNICATIONS INC.":{"Ticker":"CHTR","Number of Shares":"3,170,806","Percentage of Portfolio":"0.30","Annual Percentage Change":"42.94"},"GILEAD SCIENCES INC.":{"Ticker":"GILD","Number of Shares":"25,585,008","Percentage of Portfolio":"0.30","Annual Percentage Change":"5.78"},"CME Group Inc.":{"Ticker":"CME","Number of Shares":"7,247,135","Percentage of Portfolio":"0.29","Annual Percentage Change":"10.54"},"BOOKING HOLDINGS INC.":{"Ticker":"BKNG","Number of Shares":"846,513","Percentage of Portfolio":"0.28","Annual Percentage Change":"-11.04"},"US Bancorp":{"Ticker":"USB","Number of Shares":"28,743,555","Percentage of Portfolio":"0.28","Annual Percentage Change":"-9.90"},"GOLDMAN SACHS GROUP INC.":{"Ticker":"GS","Number of Shares":"6,444,533","Percentage of Portfolio":"0.28","Annual Percentage Change":"1.35"},"BECTON DICKINSON AND CO.":{"Ticker":"BDX","Number of Shares":"5,469,348","Percentage of Portfolio":"0.28","Annual Percentage Change":"-4.98"},"TJX Cos. Inc.":{"Ticker":"TJX","Number of Shares":"24,522,795","Percentage of Portfolio":"0.27","Annual Percentage Change":"15.98"},"UNITED PARCEL SERVICE INC.":{"Ticker":"UPS","Number of Shares":"14,171,689","Percentage of Portfolio":"0.27","Annual Percentage Change":"-18.57"},"AUTOMATIC DATA PROCESSING INC.":{"Ticker":"ADP","Number of Shares":"8,750,362","Percentage of Portfolio":"0.27","Annual Percentage Change":"1.15"},"CATERPILLAR INC.":{"Ticker":"CAT","Number of Shares":"11,175,570","Percentage of Portfolio":"0.27","Annual Percentage Change":"-10.99"},"Cigna Corp.":{"Ticker":"CI","Number of Shares":"7,551,427","Percentage of Portfolio":"0.27","Annual Percentage Change":"1.23"},"Intuit Inc.":{"Ticker":"INTU","Number of Shares":"5,264,057","Percentage of Portfolio":"0.27","Annual Percentage Change":"6.40"},"Southern Co.":{"Ticker":"SO","Number of Shares":"21,208,391","Percentage of Portfolio":"0.27","Annual Percentage Change":"22.24"},"S&P Global Inc.":{"Ticker":"SPGI","Number of Shares":"4,942,527","Percentage of Portfolio":"0.27","Annual Percentage Change":"31.82"},"Chubb Ltd.":{"Ticker":"CB","Number of Shares":"9,165,299","Percentage of Portfolio":"0.26","Annual Percentage Change":"9.02"},"DUKE ENERGY CORP.":{"Ticker":"DUK","Number of Shares":"14,743,725","Percentage of Portfolio":"0.26","Annual Percentage Change":"2.71"},"DOMINION ENERGY INC.":{"Ticker":"D","Number of Shares":"16,645,569","Percentage of Portfolio":"0.26","Annual Percentage Change":"5.18"},"TRUIST FINANCIAL CORP.":{"Ticker":"TFC","Number of Shares":"27,119,719","Percentage of Portfolio":"0.26","Annual Percentage Change":"-9.64"},"Anthem Inc.":{"Ticker":"ANTM","Number of Shares":"5,127,678","Percentage of Portfolio":"0.25","Annual Percentage Change":"-16.00"},"Fiserv Inc.":{"Ticker":"FISV","Number of Shares":"11,548,654","Percentage of Portfolio":"0.25","Annual Percentage Change":"28.58"},"Stryker Corp.":{"Ticker":"SYK","Number of Shares":"6,511,206","Percentage of Portfolio":"0.25","Annual Percentage Change":"2.05"},"ConocoPhillips":{"Ticker":"COP","Number of Shares":"22,188,639","Percentage of Portfolio":"0.24","Annual Percentage Change":"-30.05"},"INTUITIVE SURGICAL INC.":{"Ticker":"ISRG","Number of Shares":"2,337,204","Percentage of Portfolio":"0.24","Annual Percentage Change":"-2.81"},"Morgan Stanley":{"Ticker":"MS","Number of Shares":"24,876,515","Percentage of Portfolio":"0.24","Annual Percentage Change":"5.80"},"ServiceNow Inc.":{"Ticker":"NOW","Number of Shares":"3,813,932","Percentage of Portfolio":"0.24","Annual Percentage Change":"35.70"},"PNC FINANCIAL SERVICES GROUP INC.":{"Ticker":"PNC","Number of Shares":"8,861,008","Percentage of Portfolio":"0.24","Annual Percentage Change":"0.54"},"Zoetis Inc.":{"Ticker":"ZTS","Number of Shares":"9,631,453","Percentage of Portfolio":"0.24","Annual Percentage Change":"42.04"},"Raytheon Co.":{"Ticker":"RTN","Number of Shares":"5,631,197","Percentage of Portfolio":"0.23","Annual Percentage Change":"1.73"},"CROWN CASTLE INTERNATIONAL CORP.":{"Ticker":"CCI","Number of Shares":"8,408,078","Percentage of Portfolio":"0.23","Annual Percentage Change":"21.10"},"BlackRock Inc.":{"Ticker":"BLK","Number of Shares":"2,385,112","Percentage of Portfolio":"0.23","Annual Percentage Change":"4.75"},"Allergan plc":{"Ticker":"AGN","Number of Shares":"6,638,400","Percentage of Portfolio":"0.23","Annual Percentage Change":"40.26"},"COLGATE-PALMOLIVE CO.":{"Ticker":"CL","Number of Shares":"17,330,694","Percentage of Portfolio":"0.23","Annual Percentage Change":"2.58"},"VERTEX PHARMACEUTICALS INC.":{"Ticker":"VRTX","Number of Shares":"5,199,887","Percentage of Portfolio":"0.22","Annual Percentage Change":"18.03"},"MICRON TECHNOLOGY INC.":{"Ticker":"MU","Number of Shares":"22,386,299","Percentage of Portfolio":"0.22","Annual Percentage Change":"27.20"},"NORTHROP GRUMMAN CORP.":{"Ticker":"NOC","Number of Shares":"3,169,570","Percentage of Portfolio":"0.22","Annual Percentage Change":"14.67"},"BOSTON SCIENTIFIC CORP.":{"Ticker":"BSX","Number of Shares":"28,186,645","Percentage of Portfolio":"0.22","Annual Percentage Change":"-6.36"},"GLOBAL PAYMENTS INC.":{"Ticker":"GPN","Number of Shares":"6,077,658","Percentage of Portfolio":"0.22","Annual Percentage Change":"42.30"},"CSX Corp.":{"Ticker":"CSX","Number of Shares":"15,726,104","Percentage of Portfolio":"0.22","Annual Percentage Change":"-3.04"},"Prologis Inc.":{"Ticker":"PLD","Number of Shares":"12,774,223","Percentage of Portfolio":"0.22","Annual Percentage Change":"20.13"},"Target Corp.":{"Ticker":"TGT","Number of Shares":"10,247,172","Percentage of Portfolio":"0.21","Annual Percentage Change":"41.06"},"INTERCONTINENTAL EXCHANGE INC.":{"Ticker":"ICE","Number of Shares":"11,260,867","Percentage of Portfolio":"0.21","Annual Percentage Change":"17.07"},"MARSH & MCLENNAN COS. INC.":{"Ticker":"MMC","Number of Shares":"10,206,108","Percentage of Portfolio":"0.21","Annual Percentage Change":"12.67"},"APPLIED MATERIALS INC.":{"Ticker":"AMAT","Number of Shares":"18,680,527","Percentage of Portfolio":"0.20","Annual Percentage Change":"49.87"},"NORFOLK SOUTHERN CORP.":{"Ticker":"NSC","Number of Shares":"5,272,990","Percentage of Portfolio":"0.20","Annual Percentage Change":"0.85"},"CHARLES SCHWAB CORP.":{"Ticker":"SCHW","Number of Shares":"23,119,912","Percentage of Portfolio":"0.19","Annual Percentage Change":"-12.50"},"ILLINOIS TOOL WORKS INC.":{"Ticker":"ITW","Number of Shares":"5,915,767","Percentage of Portfolio":"0.19","Annual Percentage Change":"15.47"},"Equinix Inc.":{"Ticker":"EQIX","Number of Shares":"1,724,470","Percentage of Portfolio":"0.19","Annual Percentage Change":"36.98"},"AIR PRODUCTS & CHEMICALS INC.":{"Ticker":"APD","Number of Shares":"4,457,921","Percentage of Portfolio":"0.19","Annual Percentage Change":"20.93"},"ADVANCED MICRO DEVICES INC.":{"Ticker":"AMD","Number of Shares":"22,520,360","Percentage of Portfolio":"0.19","Annual Percentage Change":"93.70"},"Aon plc":{"Ticker":"AON","Number of Shares":"4,735,034","Percentage of Portfolio":"0.19","Annual Percentage Change":"21.50"},"AMERICAN ELECTRIC POWER CO. INC.":{"Ticker":"AEP","Number of Shares":"9,989,230","Percentage of Portfolio":"0.19","Annual Percentage Change":"10.70"},"WASTE MANAGEMENT INC.":{"Ticker":"WM","Number of Shares":"7,893,795","Percentage of Portfolio":"0.18","Annual Percentage Change":"10.54"},"KIMBERLY-CLARK CORP.":{"Ticker":"KMB","Number of Shares":"6,933,061","Percentage of Portfolio":"0.18","Annual Percentage Change":"12.45"},"Biogen Inc.":{"Ticker":"BIIB","Number of Shares":"3,649,176","Percentage of Portfolio":"0.18","Annual Percentage Change":"-6.23"},"Deere & Co.":{"Ticker":"DE","Number of Shares":"6,367,784","Percentage of Portfolio":"0.18","Annual Percentage Change":"-4.35"},"Ecolab Inc.":{"Ticker":"ECL","Number of Shares":"5,071,478","Percentage of Portfolio":"0.18","Annual Percentage Change":"7.10"},"L3HARRIS TECHNOLOGIES INC.":{"Ticker":"LHX","Number of Shares":"4,470,791","Percentage of Portfolio":"0.18","Annual Percentage Change":"22.02"},"SHERWIN-WILLIAMS CO.":{"Ticker":"SHW","Number of Shares":"1,661,182","Percentage of Portfolio":"0.17","Annual Percentage Change":"17.36"},"SCHLUMBERGER LTD.":{"Ticker":"SLB","Number of Shares":"27,993,114","Percentage of Portfolio":"0.17","Annual Percentage Change":"-38.92"},"Sempra Energy":{"Ticker":"SRE","Number of Shares":"5,700,324","Percentage of Portfolio":"0.17","Annual Percentage Change":"16.16"},"PROGRESSIVE CORP.":{"Ticker":"PGR","Number of Shares":"11,823,920","Percentage of Portfolio":"0.17","Annual Percentage Change":"0.62"},"BAXTER INTERNATIONAL INC.":{"Ticker":"BAX","Number of Shares":"10,325,816","Percentage of Portfolio":"0.17","Annual Percentage Change":"11.19"},"Exelon Corp.":{"Ticker":"EXC","Number of Shares":"19,655,301","Percentage of Portfolio":"0.17","Annual Percentage Change":"-10.75"},"CAPITAL ONE FINANCIAL CORP.":{"Ticker":"COF","Number of Shares":"9,417,936","Percentage of Portfolio":"0.17","Annual Percentage Change":"7.29"},"ACTIVISION BLIZZARD INC.":{"Ticker":"ATVI","Number of Shares":"15,537,958","Percentage of Portfolio":"0.17","Annual Percentage Change":"39.10"},"EDWARDS LIFESCIENCES CORP.":{"Ticker":"EW","Number of Shares":"4,218,416","Percentage of Portfolio":"0.17","Annual Percentage Change":"21.50"},"Sysco Corp.":{"Ticker":"SYY","Number of Shares":"10,318,338","Percentage of Portfolio":"0.16","Annual Percentage Change":"-0.69"},"Illumina Inc.":{"Ticker":"ILMN","Number of Shares":"2,973,192","Percentage of Portfolio":"0.16","Annual Percentage Change":"-14.07"},"LAM RESEARCH CORP.":{"Ticker":"LRCX","Number of Shares":"2,934,215","Percentage of Portfolio":"0.16","Annual Percentage Change":"65.59"},"GENERAL MOTORS CO.":{"Ticker":"GM","Number of Shares":"25,424,451","Percentage of Portfolio":"0.16","Annual Percentage Change":"-23.75"},"AMERICAN INTERNATIONAL GROUP INC.":{"Ticker":"AIG","Number of Shares":"17,594,152","Percentage of Portfolio":"0.16","Annual Percentage Change":"-3.01"},"ESTEE LAUDER COS. INC.":{"Ticker":"EL","Number of Shares":"4,501,169","Percentage of Portfolio":"0.16","Annual Percentage Change":"16.91"},"EMERSON ELECTRIC CO.":{"Ticker":"EMR","Number of Shares":"12,316,867","Percentage of Portfolio":"0.16","Annual Percentage Change":"-6.46"},"EOG RESOURCES INC.":{"Ticker":"EOG","Number of Shares":"11,764,469","Percentage of Portfolio":"0.16","Annual Percentage Change":"-33.44"},"Autodesk Inc.":{"Ticker":"ADSK","Number of Shares":"4,448,853","Percentage of Portfolio":"0.16","Annual Percentage Change":"16.19"},"Humana Inc.":{"Ticker":"HUM","Number of Shares":"2,678,385","Percentage of Portfolio":"0.16","Annual Percentage Change":"11.01"},"ROPER TECHNOLOGIES INC.":{"Ticker":"ROP","Number of Shares":"2,104,206","Percentage of Portfolio":"0.15","Annual Percentage Change":"8.70"},"ROSS STORES INC.":{"Ticker":"ROST","Number of Shares":"7,315,270","Percentage of Portfolio":"0.15","Annual Percentage Change":"14.77"},"SIMON PROPERTY GROUP INC.":{"Ticker":"SPG","Number of Shares":"6,206,197","Percentage of Portfolio":"0.15","Annual Percentage Change":"-32.09"},"ANALOG DEVICES INC.":{"Ticker":"ADI","Number of Shares":"7,447,143","Percentage of Portfolio":"0.15","Annual Percentage Change":"2.95"},"KINDER MORGAN INC./DE":{"Ticker":"KMI","Number of Shares":"39,397,745","Percentage of Portfolio":"0.15","Annual Percentage Change":"-0.57"},"Moody's Corp.":{"Ticker":"MCO","Number of Shares":"3,283,946","Percentage of Portfolio":"0.15","Annual Percentage Change":"38.27"},"GENERAL DYNAMICS CORP.":{"Ticker":"GD","Number of Shares":"4,738,225","Percentage of Portfolio":"0.15","Annual Percentage Change":"-5.70"},"Phillips 66":{"Ticker":"PSX","Number of Shares":"8,986,998","Percentage of Portfolio":"0.15","Annual Percentage Change":"-23.33"},"WALGREENS BOOTS ALLIANCE INC.":{"Ticker":"WBA","Number of Shares":"15,159,388","Percentage of Portfolio":"0.14","Annual Percentage Change":"-35.88"},"Newmont Corp.":{"Ticker":"NEM","Number of Shares":"16,577,475","Percentage of Portfolio":"0.14","Annual Percentage Change":"31.19"},"PRUDENTIAL FINANCIAL INC.":{"Ticker":"PRU","Number of Shares":"8,127,744","Percentage of Portfolio":"0.14","Annual Percentage Change":"-21.46"},"MARRIOTT INTERNATIONAL INC./MD":{"Ticker":"MAR","Number of Shares":"5,486,764","Percentage of Portfolio":"0.14","Annual Percentage Change":"-2.31"},"MetLife Inc.":{"Ticker":"MET","Number of Shares":"15,809,394","Percentage of Portfolio":"0.14","Annual Percentage Change":"-5.07"},"Eaton Corp. plc":{"Ticker":"ETN","Number of Shares":"8,358,635","Percentage of Portfolio":"0.14","Annual Percentage Change":"12.50"},"BANK OF NEW YORK MELLON CORP.":{"Ticker":"BK","Number of Shares":"16,967,384","Percentage of Portfolio":"0.14","Annual Percentage Change":"-24.36"},"Centene Corp.":{"Ticker":"CNC","Number of Shares":"11,804,098","Percentage of Portfolio":"0.14","Annual Percentage Change":"-14.33"},"DUPONT DE NEMOURS INC.":{"Ticker":"DD","Number of Shares":"14,982,483","Percentage of Portfolio":"0.14","Annual Percentage Change":"-73.87"},"DOLLAR GENERAL CORP.":{"Ticker":"DG","Number of Shares":"5,148,041","Percentage of Portfolio":"0.14","Annual Percentage Change":"27.19"},"Aflac Inc.":{"Ticker":"AFL","Number of Shares":"14,840,699","Percentage of Portfolio":"0.14","Annual Percentage Change":"-12.53"},"Allstate Corp.":{"Ticker":"ALL","Number of Shares":"6,550,393","Percentage of Portfolio":"0.14","Annual Percentage Change":"11.99"},"HCA HEALTHCARE INC.":{"Ticker":"HCA","Number of Shares":"5,348,978","Percentage of Portfolio":"0.14","Annual Percentage Change":"-8.50"},"XCEL ENERGY INC.":{"Ticker":"XEL","Number of Shares":"10,603,644","Percentage of Portfolio":"0.13","Annual Percentage Change":"14.58"},"TRAVELERS COS. INC.":{"Ticker":"TRV","Number of Shares":"5,218,418","Percentage of Portfolio":"0.13","Annual Percentage Change":"-9.66"},"VALERO ENERGY CORP.":{"Ticker":"VLO","Number of Shares":"8,303,532","Percentage of Portfolio":"0.13","Annual Percentage Change":"-20.27"},"Dow Inc.":{"Ticker":"DOW","Number of Shares":"14,991,162","Percentage of Portfolio":"0.13","Annual Percentage Change":"NA"},"OCCIDENTAL PETROLEUM CORP.":{"Ticker":"OXY","Number of Shares":"18,061,834","Percentage of Portfolio":"0.13","Annual Percentage Change":"-50.88"},"Ford Motor Co.":{"Ticker":"F","Number of Shares":"78,739,269","Percentage of Portfolio":"0.13","Annual Percentage Change":"-20.73"},"FedEx Corp.":{"Ticker":"FDX","Number of Shares":"4,853,800","Percentage of Portfolio":"0.13","Annual Percentage Change":"-22.35"},"MARATHON PETROLEUM CORP.":{"Ticker":"MPC","Number of Shares":"13,129,432","Percentage of Portfolio":"0.13","Annual Percentage Change":"-25.21"},"WEC ENERGY GROUP INC.":{"Ticker":"WEC","Number of Shares":"6,378,819","Percentage of Portfolio":"0.12","Annual Percentage Change":"22.13"},"CONSOLIDATED EDISON INC.":{"Ticker":"ED","Number of Shares":"6,722,472","Percentage of Portfolio":"0.12","Annual Percentage Change":"-3.48"},"YUM! BRANDS INC.":{"Ticker":"YUM","Number of Shares":"6,116,268","Percentage of Portfolio":"0.12","Annual Percentage Change":"-4.15"},"CONSTELLATION BRANDS INC.":{"Ticker":"STZ","Number of Shares":"3,386,799","Percentage of Portfolio":"0.12","Annual Percentage Change":"1.85"},"TRANSDIGM GROUP INC.":{"Ticker":"TDG","Number of Shares":"1,007,302","Percentage of Portfolio":"0.12","Annual Percentage Change":"29.88"},"T ROWE PRICE GROUP INC.":{"Ticker":"TROW","Number of Shares":"4,725,472","Percentage of Portfolio":"0.12","Annual Percentage Change":"17.73"},"Public Storage":{"Ticker":"PSA","Number of Shares":"3,037,551","Percentage of Portfolio":"0.12","Annual Percentage Change":"-0.23"},"IHS Markit Ltd.":{"Ticker":"INFO","Number of Shares":"8,108,384","Percentage of Portfolio":"0.12","Annual Percentage Change":"34.29"},"INGERSOLL-RAND PLC":{"Ticker":"IR","Number of Shares":"4,844,868","Percentage of Portfolio":"0.12","Annual Percentage Change":"20.64"},"GENERAL MILLS INC.":{"Ticker":"GIS","Number of Shares":"12,221,755","Percentage of Portfolio":"0.12","Annual Percentage Change":"4.06"},"HP Inc.":{"Ticker":"HPQ","Number of Shares":"29,965,370","Percentage of Portfolio":"0.12","Annual Percentage Change":"-12.83"},"COGNIZANT TECHNOLOGY SOLUTIONS CORP.":{"Ticker":"CTSH","Number of Shares":"11,071,884","Percentage of Portfolio":"0.12","Annual Percentage Change":"-14.56"},"DELTA AIR LINES INC.":{"Ticker":"DAL","Number of Shares":"11,639,715","Percentage of Portfolio":"0.12","Annual Percentage Change":"-8.53"},"ELECTRONIC ARTS INC.":{"Ticker":"EA","Number of Shares":"5,904,347","Percentage of Portfolio":"0.12","Annual Percentage Change":"3.61"},"Welltower Inc.":{"Ticker":"WELL","Number of Shares":"7,555,354","Percentage of Portfolio":"0.12","Annual Percentage Change":"0.38"},"ZIMMER BIOMET HOLDINGS INC.":{"Ticker":"ZBH","Number of Shares":"4,159,403","Percentage of Portfolio":"0.11","Annual Percentage Change":"9.37"},"TE CONNECTIVITY LTD.":{"Ticker":"TEL","Number of Shares":"6,763,734","Percentage of Portfolio":"0.11","Annual Percentage Change":"0.46"},"MOTOROLA SOLUTIONS INC.":{"Ticker":"MSI","Number of Shares":"3,464,250","Percentage of Portfolio":"0.11","Annual Percentage Change":"15.87"},"ONEOK Inc.":{"Ticker":"OKE","Number of Shares":"8,352,914","Percentage of Portfolio":"0.11","Annual Percentage Change":"2.41"},"O":{"Ticker":"ORLY","Number of Shares":"1,530,078","Percentage of Portfolio":"0.11","Annual Percentage Change":"0.21"},"AVALONBAY COMMUNITIES INC.":{"Ticker":"AVB","Number of Shares":"2,824,662","Percentage of Portfolio":"0.11","Annual Percentage Change":"3.25"},"JOHNSON CONTROLS INTERNATIONAL PLC":{"Ticker":"JCI","Number of Shares":"15,598,662","Percentage of Portfolio":"0.11","Annual Percentage Change":"2.99"},"EQUITY RESIDENTIAL":{"Ticker":"EQR","Number of Shares":"7,059,485","Percentage of Portfolio":"0.11","Annual Percentage Change":"2.41"},"EVERSOURCE ENERGY":{"Ticker":"ES","Number of Shares":"6,547,750","Percentage of Portfolio":"0.11","Annual Percentage Change":"24.12"},"HILTON WORLDWIDE HOLDINGS INC.":{"Ticker":"HLT","Number of Shares":"5,705,680","Percentage of Portfolio":"0.11","Annual Percentage Change":"16.42"},"Amphenol Corp.":{"Ticker":"APH","Number of Shares":"5,995,445","Percentage of Portfolio":"0.11","Annual Percentage Change":"-2.68"},"PUBLIC SERVICE ENTERPRISE GROUP INC.":{"Ticker":"PEG","Number of Shares":"10,227,032","Percentage of Portfolio":"0.11","Annual Percentage Change":"-12.38"},"WILLIS TOWERS WATSON PLC":{"Ticker":"WLTW","Number of Shares":"2,600,529","Percentage of Portfolio":"0.10","Annual Percentage Change":"10.97"},"EDISON INTERNATIONAL":{"Ticker":"EIX","Number of Shares":"7,251,581","Percentage of Portfolio":"0.10","Annual Percentage Change":"10.86"},"STATE STREET CORP.":{"Ticker":"STT","Number of Shares":"7,353,370","Percentage of Portfolio":"0.10","Annual Percentage Change":"-5.98"},"VF Corp.":{"Ticker":"VFC","Number of Shares":"6,623,310","Percentage of Portfolio":"0.10","Annual Percentage Change":"-17.93"},"VERISK ANALYTICS INC.":{"Ticker":"VRSK","Number of Shares":"3,313,423","Percentage of Portfolio":"0.10","Annual Percentage Change":"23.33"},"Paychex Inc.":{"Ticker":"PAYX","Number of Shares":"6,442,567","Percentage of Portfolio":"0.10","Annual Percentage Change":"1.25"},"PACCAR Inc.":{"Ticker":"PCAR","Number of Shares":"6,995,034","Percentage of Portfolio":"0.10","Annual Percentage Change":"-2.22"},"PPG INDUSTRIES INC.":{"Ticker":"PPG","Number of Shares":"4,781,566","Percentage of Portfolio":"0.10","Annual Percentage Change":"-6.88"},"PPL Corp.":{"Ticker":"PPL","Number of Shares":"14,621,903","Percentage of Portfolio":"0.10","Annual Percentage Change":"-6.16"},"REGENERON PHARMACEUTICALS INC.":{"Ticker":"REGN","Number of Shares":"1,615,332","Percentage of Portfolio":"0.10","Annual Percentage Change":"2.59"},"IQVIA HOLDINGS INC.":{"Ticker":"IQV","Number of Shares":"3,649,492","Percentage of Portfolio":"0.10","Annual Percentage Change":"-1.52"},"KLA Corp.":{"Ticker":"KLAC","Number of Shares":"3,191,304","Percentage of Portfolio":"0.10","Annual Percentage Change":"33.78"},"SOUTHWEST AIRLINES CO.":{"Ticker":"LUV","Number of Shares":"9,579,421","Percentage of Portfolio":"0.10","Annual Percentage Change":"-14.22"},"McKesson Corp.":{"Ticker":"MCK","Number of Shares":"3,643,975","Percentage of Portfolio":"0.10","Annual Percentage Change":"9.76"},"Entergy Corp.":{"Ticker":"ETR","Number of Shares":"4,027,027","Percentage of Portfolio":"0.10","Annual Percentage Change":"26.44"},"FIRSTENERGY CORP.":{"Ticker":"FE","Number of Shares":"10,926,793","Percentage of Portfolio":"0.10","Annual Percentage Change":"9.36"},"FLEETCOR TECHNOLOGIES INC.":{"Ticker":"FLT","Number of Shares":"1,754,973","Percentage of Portfolio":"0.10","Annual Percentage Change":"14.71"},"DIGITAL REALTY TRUST INC.":{"Ticker":"DLR","Number of Shares":"4,221,386","Percentage of Portfolio":"0.10","Annual Percentage Change":"5.22"},"eBay Inc.":{"Ticker":"EBAY","Number of Shares":"15,465,328","Percentage of Portfolio":"0.10","Annual Percentage Change":"-7.82"},"SBA COMMUNICATIONS CORP.":{"Ticker":"SBAC","Number of Shares":"2,276,940","Percentage of Portfolio":"0.10","Annual Percentage Change":"46.94"},"WILLIAMS COS. INC.":{"Ticker":"WMB","Number of Shares":"24,510,213","Percentage of Portfolio":"0.09","Annual Percentage Change":"-29.68"},"Ball Corp.":{"Ticker":"BLL","Number of Shares":"6,616,486","Percentage of Portfolio":"0.09","Annual Percentage Change":"26.95"},"T-MOBILE US INC.":{"Ticker":"TMUS","Number of Shares":"6,402,786","Percentage of Portfolio":"0.09","Annual Percentage Change":"25.01"},"TYSON FOODS INC.":{"Ticker":"TSN","Number of Shares":"5,970,087","Percentage of Portfolio":"0.09","Annual Percentage Change":"10.02"},"Twitter Inc.":{"Ticker":"TWTR","Number of Shares":"15,701,026","Percentage of Portfolio":"0.09","Annual Percentage Change":"9.17"},"MSCI Inc.":{"Ticker":"MSCI","Number of Shares":"1,712,783","Percentage of Portfolio":"0.09","Annual Percentage Change":"63.46"},"REALTY INCOME CORP.":{"Ticker":"O","Number of Shares":"6,591,493","Percentage of Portfolio":"0.09","Annual Percentage Change":"5.17"},"PARKER-HANNIFIN CORP.":{"Ticker":"PH","Number of Shares":"2,598,511","Percentage of Portfolio":"0.09","Annual Percentage Change":"4.07"},"IDEXX LABORATORIES INC.":{"Ticker":"IDXX","Number of Shares":"1,734,426","Percentage of Portfolio":"0.09","Annual Percentage Change":"21.79"},"MICROCHIP TECHNOLOGY INC.":{"Ticker":"MCHP","Number of Shares":"4,832,865","Percentage of Portfolio":"0.09","Annual Percentage Change":"4.18"},"MONSTER BEVERAGE CORP.":{"Ticker":"MNST","Number of Shares":"7,720,860","Percentage of Portfolio":"0.09","Annual Percentage Change":"6.25"},"Hershey Co.":{"Ticker":"HSY","Number of Shares":"2,999,684","Percentage of Portfolio":"0.09","Annual Percentage Change":"31.40"},"Cummins Inc.":{"Ticker":"CMI","Number of Shares":"3,098,008","Percentage of Portfolio":"0.09","Annual Percentage Change":"-2.62"},"Cintas Corp.":{"Ticker":"CTAS","Number of Shares":"1,695,408","Percentage of Portfolio":"0.09","Annual Percentage Change":"30.13"},"DISCOVER FINANCIAL SERVICES":{"Ticker":"DFS","Number of Shares":"6,339,713","Percentage of Portfolio":"0.09","Annual Percentage Change":"-7.96"},"DTE Energy Co.":{"Ticker":"DTE","Number of Shares":"3,885,161","Percentage of Portfolio":"0.09","Annual Percentage Change":"-8.74"},"AGILENT TECHNOLOGIES INC.":{"Ticker":"A","Number of Shares":"6,259,307","Percentage of Portfolio":"0.09","Annual Percentage Change":"-2.96"},"ARCHER-DANIELS-MIDLAND CO.":{"Ticker":"ADM","Number of Shares":"11,258,405","Percentage of Portfolio":"0.09","Annual Percentage Change":"-11.66"},"ANSYS Inc.":{"Ticker":"ANSS","Number of Shares":"1,730,232","Percentage of Portfolio":"0.09","Annual Percentage Change":"36.96"},"AMERICAN WATER WORKS CO. INC.":{"Ticker":"AWK","Number of Shares":"3,656,225","Percentage of Portfolio":"0.09","Annual Percentage Change":"22.39"},"AutoZone Inc.":{"Ticker":"AZO","Number of Shares":"481,932","Percentage of Portfolio":"0.09","Annual Percentage Change":"13.22"},"STANLEY BLACK & DECKER INC.":{"Ticker":"SWK","Number of Shares":"3,074,174","Percentage of Portfolio":"0.09","Annual Percentage Change":"5.31"},"WEYERHAEUSER CO.":{"Ticker":"WY","Number of Shares":"15,070,048","Percentage of Portfolio":"0.08","Annual Percentage Change":"0.50"},"CBRE Group Inc.":{"Ticker":"CBRE","Number of Shares":"6,766,706","Percentage of Portfolio":"0.08","Annual Percentage Change":"12.91"},"ResMed Inc.":{"Ticker":"RMD","Number of Shares":"2,908,302","Percentage of Portfolio":"0.08","Annual Percentage Change":"56.12"},"ROCKWELL AUTOMATION INC.":{"Ticker":"ROK","Number of Shares":"2,336,915","Percentage of Portfolio":"0.08","Annual Percentage Change":"1.66"},"Synopsys Inc.":{"Ticker":"SNPS","Number of Shares":"3,040,908","Percentage of Portfolio":"0.08","Annual Percentage Change":"34.40"},"VeriSign Inc.":{"Ticker":"VRSN","Number of Shares":"2,088,757","Percentage of Portfolio":"0.08","Annual Percentage Change":"6.66"},"Ventas Inc.":{"Ticker":"VTR","Number of Shares":"7,538,677","Percentage of Portfolio":"0.08","Annual Percentage Change":"-14.83"},"M&T Bank Corp.":{"Ticker":"MTB","Number of Shares":"2,669,205","Percentage of Portfolio":"0.08","Annual Percentage Change":"-18.63"},"NORTHERN TRUST CORP.":{"Ticker":"NTRS","Number of Shares":"4,285,578","Percentage of Portfolio":"0.08","Annual Percentage Change":"-5.90"},"PIONEER NATURAL RESOURCES CO.":{"Ticker":"PXD","Number of Shares":"3,350,237","Percentage of Portfolio":"0.08","Annual Percentage Change":"-13.27"},"Kroger Co.":{"Ticker":"KR","Number of Shares":"16,220,512","Percentage of Portfolio":"0.08","Annual Percentage Change":"-5.60"},"LAS VEGAS SANDS CORP.":{"Ticker":"LVS","Number of Shares":"6,835,976","Percentage of Portfolio":"0.08","Annual Percentage Change":"-5.08"},"ESSEX PROPERTY TRUST INC.":{"Ticker":"ESS","Number of Shares":"1,336,400","Percentage of Portfolio":"0.08","Annual Percentage Change":"1.26"},"Fortive Corp.":{"Ticker":"FTV","Number of Shares":"5,976,637","Percentage of Portfolio":"0.08","Annual Percentage Change":"-15.36"},"Corning Inc.":{"Ticker":"GLW","Number of Shares":"15,555,365","Percentage of Portfolio":"0.08","Annual Percentage Change":"-31.22"},"HARTFORD FINANCIAL SERVICES GROUP INC.":{"Ticker":"HIG","Number of Shares":"7,289,850","Percentage of Portfolio":"0.08","Annual Percentage Change":"1.77"},"Cerner Corp.":{"Ticker":"CERN","Number of Shares":"6,352,822","Percentage of Portfolio":"0.08","Annual Percentage Change":"21.55"},"CHIPOTLE MEXICAN GRILL INC.":{"Ticker":"CMG","Number of Shares":"517,069","Percentage of Portfolio":"0.08","Annual Percentage Change":"29.08"},"Copart Inc.":{"Ticker":"CPRT","Number of Shares":"4,137,795","Percentage of Portfolio":"0.08","Annual Percentage Change":"44.46"},"Corteva Inc.":{"Ticker":"CTVA","Number of Shares":"15,137,237","Percentage of Portfolio":"0.08","Annual Percentage Change":"NA"},"DOLLAR TREE INC.":{"Ticker":"DLTR","Number of Shares":"4,786,437","Percentage of Portfolio":"0.08","Annual Percentage Change":"-13.30"},"ALEXION PHARMACEUTICALS INC.":{"Ticker":"ALXN","Number of Shares":"4,475,334","Percentage of Portfolio":"0.08","Annual Percentage Change":"-30.87"},"AMETEK Inc.":{"Ticker":"AME","Number of Shares":"4,623,058","Percentage of Portfolio":"0.08","Annual Percentage Change":"7.99"},"AMERIPRISE FINANCIAL INC.":{"Ticker":"AMP","Number of Shares":"2,562,446","Percentage of Portfolio":"0.08","Annual Percentage Change":"7.15"},"Aptiv plc":{"Ticker":"APTV","Number of Shares":"5,162,287","Percentage of Portfolio":"0.08","Annual Percentage Change":"-6.24"},"BOSTON PROPERTIES INC.":{"Ticker":"BXP","Number of Shares":"2,908,650","Percentage of Portfolio":"0.08","Annual Percentage Change":"-2.61"},"Xilinx Inc.":{"Ticker":"XLNX","Number of Shares":"5,085,841","Percentage of Portfolio":"0.08","Annual Percentage Change":"-32.27"},"WESTERN DIGITAL CORP.":{"Ticker":"WDC","Number of Shares":"6,014,947","Percentage of Portfolio":"0.07","Annual Percentage Change":"14.46"},"REPUBLIC SERVICES INC.":{"Ticker":"RSG","Number of Shares":"4,260,052","Percentage of Portfolio":"0.07","Annual Percentage Change":"15.72"},"SKYWORKS SOLUTIONS INC.":{"Ticker":"SWKS","Number of Shares":"3,445,868","Percentage of Portfolio":"0.07","Annual Percentage Change":"23.31"},"SYNCHRONY FINANCIAL":{"Ticker":"SYF","Number of Shares":"12,024,494","Percentage of Portfolio":"0.07","Annual Percentage Change":"-9.12"},"ViacomCBS Inc.":{"Ticker":"VIAC","Number of Shares":"10,930,064","Percentage of Portfolio":"0.07","Annual Percentage Change":"-50.40"},"VULCAN MATERIALS CO.":{"Ticker":"VMC","Number of Shares":"2,677,357","Percentage of Portfolio":"0.07","Annual Percentage Change":"7.27"},"METTLER-TOLEDO INTERNATIONAL INC.":{"Ticker":"MTD","Number of Shares":"492,408","Percentage of Portfolio":"0.07","Annual Percentage Change":"2.29"},"HEALTHPEAK PROPERTIES INC.":{"Ticker":"PEAK","Number of Shares":"10,011,383","Percentage of Portfolio":"0.07","Annual Percentage Change":"2.79"},"ROYAL CARIBBEAN CRUISES LTD.":{"Ticker":"RCL","Number of Shares":"3,477,084","Percentage of Portfolio":"0.07","Annual Percentage Change":"-32.12"},"KeyCorp":{"Ticker":"KEY","Number of Shares":"19,923,009","Percentage of Portfolio":"0.07","Annual Percentage Change":"-7.26"},"Kraft Heinz Co.":{"Ticker":"KHC","Number of Shares":"12,596,486","Percentage of Portfolio":"0.07","Annual Percentage Change":"-23.07"},"Lennar Corp.":{"Ticker":"LEN.B","Number of Shares":"76,975","Percentage of Portfolio":"0.01","Annual Percentage Change":"21.96"},"LYONDELLBASELL INDUSTRIES NV":{"Ticker":"LYB","Number of Shares":"5,192,352","Percentage of Portfolio":"0.07","Annual Percentage Change":"-17.57"},"MCCORMICK & CO. INC./MD":{"Ticker":"MKC","Number of Shares":"2,499,342","Percentage of Portfolio":"0.07","Annual Percentage Change":"8.49"},"Fastenal Co.":{"Ticker":"FAST","Number of Shares":"11,593,045","Percentage of Portfolio":"0.07","Annual Percentage Change":"7.75"},"FIFTH THIRD BANCORP":{"Ticker":"FITB","Number of Shares":"14,353,741","Percentage of Portfolio":"0.07","Annual Percentage Change":"-12.26"},"Halliburton Co.":{"Ticker":"HAL","Number of Shares":"17,751,803","Percentage of Portfolio":"0.07","Annual Percentage Change":"-45.73"},"HEWLETT PACKARD ENTERPRISE CO.":{"Ticker":"HPE","Number of Shares":"26,171,292","Percentage of Portfolio":"0.07","Annual Percentage Change":"-23.41"},"CADENCE DESIGN SYSTEMS INC.":{"Ticker":"CDNS","Number of Shares":"5,675,894","Percentage of Portfolio":"0.07","Annual Percentage Change":"15.13"},"CDW Corp./DE":{"Ticker":"CDW","Number of Shares":"2,906,561","Percentage of Portfolio":"0.07","Annual Percentage Change":"20.31"},"CHURCH & DWIGHT CO. INC.":{"Ticker":"CHD","Number of Shares":"4,963,933","Percentage of Portfolio":"0.07","Annual Percentage Change":"5.75"},"Clorox Co.":{"Ticker":"CLX","Number of Shares":"2,538,032","Percentage of Portfolio":"0.07","Annual Percentage Change":"1.67"},"CMS ENERGY CORP.":{"Ticker":"CMS","Number of Shares":"5,740,715","Percentage of Portfolio":"0.07","Annual Percentage Change":"12.20"},"DR Horton Inc.":{"Ticker":"DHI","Number of Shares":"6,781,666","Percentage of Portfolio":"0.07","Annual Percentage Change":"33.04"},"Equifax Inc.":{"Ticker":"EFX","Number of Shares":"2,448,456","Percentage of Portfolio":"0.07","Annual Percentage Change":"30.62"},"Ameren Corp.":{"Ticker":"AEE","Number of Shares":"4,975,936","Percentage of Portfolio":"0.07","Annual Percentage Change":"12.18"},"ARTHUR J GALLAGHER & CO.":{"Ticker":"AJG","Number of Shares":"3,772,875","Percentage of Portfolio":"0.07","Annual Percentage Change":"21.08"},"ALIGN TECHNOLOGY INC.":{"Ticker":"ALGN","Number of Shares":"1,450,744","Percentage of Portfolio":"0.07","Annual Percentage Change":"-15.45"},"ALEXANDRIA REAL ESTATE EQUITIES INC.":{"Ticker":"ARE","Number of Shares":"2,478,254","Percentage of Portfolio":"0.07","Annual Percentage Change":"12.55"},"BEST BUY CO. INC.":{"Ticker":"BBY","Number of Shares":"4,606,264","Percentage of Portfolio":"0.07","Annual Percentage Change":"9.92"},"Teleflex Inc.":{"Ticker":"TFX","Number of Shares":"936,529","Percentage of Portfolio":"0.06","Annual Percentage Change":"15.36"},"CARDINAL HEALTH INC.":{"Ticker":"CAH","Number of Shares":"5,915,992","Percentage of Portfolio":"0.06","Annual Percentage Change":"-2.82"},"ULTA BEAUTY INC.":{"Ticker":"ULTA","Number of Shares":"1,156,289","Percentage of Portfolio":"0.06","Annual Percentage Change":"-16.29"},"MAXIM INTEGRATED PRODUCTS INC.":{"Ticker":"MXIM","Number of Shares":"5,473,579","Percentage of Portfolio":"0.06","Annual Percentage Change":"2.66"},"NORTONLIFELOCK INC.":{"Ticker":"NLOK","Number of Shares":"11,597,718","Percentage of Portfolio":"0.06","Annual Percentage Change":"-15.98"},"OMNICOM GROUP INC.":{"Ticker":"OMC","Number of Shares":"4,404,224","Percentage of Portfolio":"0.06","Annual Percentage Change":"-8.04"},"PAYCOM SOFTWARE INC.":{"Ticker":"PAYC","Number of Shares":"992,336","Percentage of Portfolio":"0.06","Annual Percentage Change":"54.69"},"REGIONS FINANCIAL CORP.":{"Ticker":"RF","Number of Shares":"19,495,713","Percentage of Portfolio":"0.06","Annual Percentage Change":"-18.41"},"INTERNATIONAL PAPER CO.":{"Ticker":"IP","Number of Shares":"7,925,588","Percentage of Portfolio":"0.06","Annual Percentage Change":"-20.77"},"Kellogg Co.":{"Ticker":"K","Number of Shares":"5,032,549","Percentage of Portfolio":"0.06","Annual Percentage Change":"8.45"},"KEYSIGHT TECHNOLOGIES INC.":{"Ticker":"KEYS","Number of Shares":"3,794,414","Percentage of Portfolio":"0.06","Annual Percentage Change":"11.72"},"CarMax Inc.":{"Ticker":"KMX","Number of Shares":"3,325,492","Percentage of Portfolio":"0.06","Annual Percentage Change":"44.79"},"KANSAS CITY SOUTHERN":{"Ticker":"KSU","Number of Shares":"2,004,508","Percentage of Portfolio":"0.06","Annual Percentage Change":"38.70"},"LABORATORY CORP. OF AMERICA HOLDINGS":{"Ticker":"LH","Number of Shares":"1,964,097","Percentage of Portfolio":"0.06","Annual Percentage Change":"19.42"},"MID-AMERICA APARTMENT COMMUNITIES INC.":{"Ticker":"MAA","Number of Shares":"2,305,715","Percentage of Portfolio":"0.06","Annual Percentage Change":"25.25"},"MGM RESORTS INTERNATIONAL":{"Ticker":"MGM","Number of Shares":"10,416,563","Percentage of Portfolio":"0.06","Annual Percentage Change":"-9.57"},"MARTIN MARIETTA MATERIALS INC.":{"Ticker":"MLM","Number of Shares":"1,264,064","Percentage of Portfolio":"0.06","Annual Percentage Change":"19.83"},"Evergy Inc.":{"Ticker":"EVRG","Number of Shares":"4,609,356","Percentage of Portfolio":"0.06","Annual Percentage Change":"17.77"},"EXPEDIA GROUP INC.":{"Ticker":"EXPE","Number of Shares":"2,826,853","Percentage of Portfolio":"0.06","Annual Percentage Change":"-23.07"},"FREEPORT-MCMORAN INC.":{"Ticker":"FCX","Number of Shares":"29,349,507","Percentage of Portfolio":"0.06","Annual Percentage Change":"-24.32"},"Fortinet Inc.":{"Ticker":"FTNT","Number of Shares":"2,871,077","Percentage of Portfolio":"0.06","Annual Percentage Change":"16.11"},"Carnival Corp.":{"Ticker":"CCL","Number of Shares":"8,102,140","Percentage of Portfolio":"0.06","Annual Percentage Change":"-41.99"},"CITIZENS FINANCIAL GROUP INC.":{"Ticker":"CFG","Number of Shares":"8,793,414","Percentage of Portfolio":"0.06","Annual Percentage Change":"-14.42"},"CINCINNATI FINANCIAL CORP.":{"Ticker":"CINF","Number of Shares":"3,072,946","Percentage of Portfolio":"0.06","Annual Percentage Change":"8.43"},"COOPER COS. INC.":{"Ticker":"COO","Number of Shares":"1,002,837","Percentage of Portfolio":"0.06","Annual Percentage Change":"13.08"},"CONCHO RESOURCES INC.":{"Ticker":"CXO","Number of Shares":"4,066,837","Percentage of Portfolio":"0.06","Annual Percentage Change":"-38.92"},"QUEST DIAGNOSTICS INC.":{"Ticker":"DGX","Number of Shares":"2,724,435","Percentage of Portfolio":"0.06","Annual Percentage Change":"23.25"},"Dover Corp.":{"Ticker":"DOV","Number of Shares":"2,938,408","Percentage of Portfolio":"0.06","Annual Percentage Change":"13.25"},"AKAMAI TECHNOLOGIES INC.":{"Ticker":"AKAM","Number of Shares":"3,268,878","Percentage of Portfolio":"0.06","Annual Percentage Change":"24.87"},"Amcor plc":{"Ticker":"AMCR","Number of Shares":"32,748,756","Percentage of Portfolio":"0.06","Annual Percentage Change":"-10.87"},"CONAGRA BRANDS INC.":{"Ticker":"CAG","Number of Shares":"9,844,507","Percentage of Portfolio":"0.06","Annual Percentage Change":"15.59"},"UNITED AIRLINES HOLDINGS INC.":{"Ticker":"UAL","Number of Shares":"4,402,189","Percentage of Portfolio":"0.06","Annual Percentage Change":"-29.69"},"WYNN RESORTS LTD.":{"Ticker":"WYNN","Number of Shares":"1,953,489","Percentage of Portfolio":"0.05","Annual Percentage Change":"-15.45"},"CBOE GLOBAL MARKETS INC.":{"Ticker":"CBOE","Number of Shares":"2,242,590","Percentage of Portfolio":"0.05","Annual Percentage Change":"21.08"},"Xylem Inc./NY":{"Ticker":"XYL","Number of Shares":"3,642,443","Percentage of Portfolio":"0.05","Annual Percentage Change":"1.36"},"ZEBRA TECHNOLOGIES CORP.":{"Ticker":"ZBRA","Number of Shares":"1,090,000","Percentage of Portfolio":"0.05","Annual Percentage Change":"4.19"},"SVB FINANCIAL GROUP":{"Ticker":"SIVB","Number of Shares":"1,042,942","Percentage of Portfolio":"0.05","Annual Percentage Change":"-16.91"},"STERIS plc":{"Ticker":"STE","Number of Shares":"1,713,459","Percentage of Portfolio":"0.05","Annual Percentage Change":"31.50"},"SEAGATE TECHNOLOGY PLC":{"Ticker":"STX","Number of Shares":"4,676,240","Percentage of Portfolio":"0.05","Annual Percentage Change":"2.41"},"Tiffany & Co.":{"Ticker":"TIF","Number of Shares":"2,183,702","Percentage of Portfolio":"0.05","Annual Percentage Change":"39.48"},"TAKE-TWO INTERACTIVE SOFTWARE INC.":{"Ticker":"TTWO","Number of Shares":"2,288,954","Percentage of Portfolio":"0.05","Annual Percentage Change":"27.00"},"UDR Inc.":{"Ticker":"UDR","Number of Shares":"5,926,998","Percentage of Portfolio":"0.05","Annual Percentage Change":"1.37"},"VARIAN MEDICAL SYSTEMS INC.":{"Ticker":"VAR","Number of Shares":"1,837,190","Percentage of Portfolio":"0.05","Annual Percentage Change":"-7.85"},"WESTINGHOUSE AIR BRAKE TECHNOLOGIES CORP.":{"Ticker":"WAB","Number of Shares":"3,683,038","Percentage of Portfolio":"0.05","Annual Percentage Change":"-8.76"},"Waters Corp.":{"Ticker":"WAT","Number of Shares":"1,303,352","Percentage of Portfolio":"0.05","Annual Percentage Change":"-19.35"},"Nasdaq Inc.":{"Ticker":"NDAQ","Number of Shares":"2,320,556","Percentage of Portfolio":"0.05","Annual Percentage Change":"12.94"},"NetApp Inc.":{"Ticker":"NTAP","Number of Shares":"4,616,020","Percentage of Portfolio":"0.05","Annual Percentage Change":"-29.30"},"Nucor Corp.":{"Ticker":"NUE","Number of Shares":"6,134,126","Percentage of Portfolio":"0.05","Annual Percentage Change":"-32.10"},"NVR Inc.":{"Ticker":"NVR","Number of Shares":"70,205","Percentage of Portfolio":"0.05","Annual Percentage Change":"38.75"},"OLD DOMINION FREIGHT LINE INC.":{"Ticker":"ODFL","Number of Shares":"1,291,831","Percentage of Portfolio":"0.05","Annual Percentage Change":"28.80"},"PRINCIPAL FINANCIAL GROUP INC.":{"Ticker":"PFG","Number of Shares":"5,220,771","Percentage of Portfolio":"0.05","Annual Percentage Change":"-15.32"},"Qorvo Inc.":{"Ticker":"QRVO","Number of Shares":"2,349,691","Percentage of Portfolio":"0.05","Annual Percentage Change":"45.03"},"IDEX Corp.":{"Ticker":"IEX","Number of Shares":"1,538,381","Percentage of Portfolio":"0.05","Annual Percentage Change":"2.10"},"INTERNATIONAL FLAVORS & FRAGRANCES INC.":{"Ticker":"IFF","Number of Shares":"2,159,869","Percentage of Portfolio":"0.05","Annual Percentage Change":"-5.94"},"Incyte Corp.":{"Ticker":"INCY","Number of Shares":"3,616,330","Percentage of Portfolio":"0.05","Annual Percentage Change":"-13.32"},"Gartner Inc.":{"Ticker":"IT","Number of Shares":"1,809,633","Percentage of Portfolio":"0.05","Annual Percentage Change":"-10.06"},"JACOBS ENGINEERING GROUP INC.":{"Ticker":"J","Number of Shares":"2,739,688","Percentage of Portfolio":"0.05","Annual Percentage Change":"23.47"},"Loews Corp.":{"Ticker":"L","Number of Shares":"5,173,802","Percentage of Portfolio":"0.05","Annual Percentage Change":"-4.08"},"LEIDOS HOLDINGS INC.":{"Ticker":"LDOS","Number of Shares":"2,691,807","Percentage of Portfolio":"0.05","Annual Percentage Change":"60.59"},"ALLIANT ENERGY CORP.":{"Ticker":"LNT","Number of Shares":"4,860,520","Percentage of Portfolio":"0.05","Annual Percentage Change":"14.68"},"LAMB WESTON HOLDINGS INC.":{"Ticker":"LW","Number of Shares":"2,954,087","Percentage of Portfolio":"0.05","Annual Percentage Change":"25.75"},"Masco Corp.":{"Ticker":"MAS","Number of Shares":"5,747,476","Percentage of Portfolio":"0.05","Annual Percentage Change":"9.05"},"MARKETAXESS HOLDINGS INC.":{"Ticker":"MKTX","Number of Shares":"766,654","Percentage of Portfolio":"0.05","Annual Percentage Change":"32.65"},"EXPEDITORS INTERNATIONAL OF WASHINGTON INC.":{"Ticker":"EXPD","Number of Shares":"3,443,584","Percentage of Portfolio":"0.05","Annual Percentage Change":"-5.79"},"EXTRA SPACE STORAGE INC.":{"Ticker":"EXR","Number of Shares":"2,619,887","Percentage of Portfolio":"0.05","Annual Percentage Change":"6.36"},"FMC Corp.":{"Ticker":"FMC","Number of Shares":"2,621,751","Percentage of Portfolio":"0.05","Annual Percentage Change":"3.88"},"Fox Corp.":{"Ticker":"FOX","Number of Shares":"3,404,034","Percentage of Portfolio":"0.02","Annual Percentage Change":"NA"},"FIRST REPUBLIC BANK/CA":{"Ticker":"FRC","Number of Shares":"2,481,279","Percentage of Portfolio":"0.05","Annual Percentage Change":"-4.16"},"GENUINE PARTS CO.":{"Ticker":"GPC","Number of Shares":"2,936,205","Percentage of Portfolio":"0.05","Annual Percentage Change":"-20.08"},"Garmin Ltd.":{"Ticker":"GRMN","Number of Shares":"2,922,495","Percentage of Portfolio":"0.05","Annual Percentage Change":"5.01"},"WW GRAINGER INC.":{"Ticker":"GWW","Number of Shares":"882,475","Percentage of Portfolio":"0.05","Annual Percentage Change":"-10.79"},"Hasbro Inc.":{"Ticker":"HAS","Number of Shares":"2,573,998","Percentage of Portfolio":"0.05","Annual Percentage Change":"-8.56"},"HUNTINGTON BANCSHARES INC./OH":{"Ticker":"HBAN","Number of Shares":"20,871,092","Percentage of Portfolio":"0.05","Annual Percentage Change":"-14.61"},"Hess Corp.":{"Ticker":"HES","Number of Shares":"5,239,286","Percentage of Portfolio":"0.05","Annual Percentage Change":"-3.37"},"Hologic Inc.":{"Ticker":"HOLX","Number of Shares":"5,423,541","Percentage of Portfolio":"0.05","Annual Percentage Change":"0.34"},"HORMEL FOODS CORP.":{"Ticker":"HRL","Number of Shares":"5,624,616","Percentage of Portfolio":"0.05","Annual Percentage Change":"-3.05"},"Celanese Corp.":{"Ticker":"CE","Number of Shares":"2,444,797","Percentage of Portfolio":"0.05","Annual Percentage Change":"-9.33"},"CENTERPOINT ENERGY INC.":{"Ticker":"CNP","Number of Shares":"10,159,558","Percentage of Portfolio":"0.05","Annual Percentage Change":"-26.12"},"CENTURYLINK INC.":{"Ticker":"CTL","Number of Shares":"19,844,938","Percentage of Portfolio":"0.05","Annual Percentage Change":"-7.86"},"CITRIX SYSTEMS INC.":{"Ticker":"CTXS","Number of Shares":"2,474,328","Percentage of Portfolio":"0.05","Annual Percentage Change":"-1.87"},"DUKE REALTY CORP.":{"Ticker":"DRE","Number of Shares":"7,434,260","Percentage of Portfolio":"0.05","Annual Percentage Change":"9.25"},"DARDEN RESTAURANTS INC.":{"Ticker":"DRI","Number of Shares":"2,478,068","Percentage of Portfolio":"0.05","Annual Percentage Change":"-12.45"},"AMERISOURCEBERGEN CORP.":{"Ticker":"ABC","Number of Shares":"3,041,045","Percentage of Portfolio":"0.05","Annual Percentage Change":"1.85"},"AES Corp./VA":{"Ticker":"AES","Number of Shares":"13,428,975","Percentage of Portfolio":"0.05","Annual Percentage Change":"-2.51"},"ATMOS ENERGY CORP.":{"Ticker":"ATO","Number of Shares":"2,414,068","Percentage of Portfolio":"0.05","Annual Percentage Change":"4.44"},"BROWN-FORMAN CORP.":{"Ticker":"BF.B","Number of Shares":"3,684,908","Percentage of Portfolio":"0.05","Annual Percentage Change":"25.15"},"BAKER HUGHES CO.":{"Ticker":"BKR","Number of Shares":"13,146,385","Percentage of Portfolio":"0.05","Annual Percentage Change":"-39.67"},"BROADRIDGE FINANCIAL SOLUTIONS INC.":{"Ticker":"BR","Number of Shares":"2,319,208","Percentage of Portfolio":"0.05","Annual Percentage Change":"2.25"},"DENTSPLY SIRONA INC.":{"Ticker":"XRAY","Number of Shares":"4,498,912","Percentage of Portfolio":"0.05","Annual Percentage Change":"19.40"},"WR BERKLEY CORP.":{"Ticker":"WRB","Number of Shares":"2,934,465","Percentage of Portfolio":"0.04","Annual Percentage Change":"21.26"},"AVERY DENNISON CORP.":{"Ticker":"AVY","Number of Shares":"1,689,302","Percentage of Portfolio":"0.04","Annual Percentage Change":"6.23"},"WESTERN UNION CO.":{"Ticker":"WU","Number of Shares":"8,480,730","Percentage of Portfolio":"0.04","Annual Percentage Change":"25.79"},"RAYMOND JAMES FINANCIAL INC.":{"Ticker":"RJF","Number of Shares":"2,497,461","Percentage of Portfolio":"0.04","Annual Percentage Change":"-0.23"},"JM Smucker Co.":{"Ticker":"SJM","Number of Shares":"2,307,393","Percentage of Portfolio":"0.04","Annual Percentage Change":"-4.26"},"MOLSON COORS BEVERAGE CO.":{"Ticker":"TAP","Number of Shares":"3,800,335","Percentage of Portfolio":"0.04","Annual Percentage Change":"-18.82"},"TRACTOR SUPPLY CO.":{"Ticker":"TSCO","Number of Shares":"2,395,113","Percentage of Portfolio":"0.04","Annual Percentage Change":"-7.18"},"Textron Inc.":{"Ticker":"TXT","Number of Shares":"4,616,958","Percentage of Portfolio":"0.04","Annual Percentage Change":"-25.80"},"UNIVERSAL HEALTH SERVICES INC.":{"Ticker":"UHS","Number of Shares":"1,624,560","Percentage of Portfolio":"0.04","Annual Percentage Change":"-7.14"},"UNITED RENTALS INC.":{"Ticker":"URI","Number of Shares":"1,520,537","Percentage of Portfolio":"0.04","Annual Percentage Change":"-2.34"},"VORNADO REALTY TRUST":{"Ticker":"VNO","Number of Shares":"3,205,690","Percentage of Portfolio":"0.04","Annual Percentage Change":"-19.89"},"Mylan NV":{"Ticker":"MYL","Number of Shares":"10,439,090","Percentage of Portfolio":"0.04","Annual Percentage Change":"-33.91"},"NOBLE ENERGY INC.":{"Ticker":"NBL","Number of Shares":"9,675,627","Percentage of Portfolio":"0.04","Annual Percentage Change":"-29.58"},"NORWEGIAN CRUISE LINE HOLDINGS LTD.":{"Ticker":"NCLH","Number of Shares":"4,303,771","Percentage of Portfolio":"0.04","Annual Percentage Change":"-32.16"},"NiSource Inc.":{"Ticker":"NI","Number of Shares":"7,555,481","Percentage of Portfolio":"0.04","Annual Percentage Change":"0.30"},"PulteGroup Inc.":{"Ticker":"PHM","Number of Shares":"5,152,470","Percentage of Portfolio":"0.04","Annual Percentage Change":"48.39"},"PERKINELMER INC.":{"Ticker":"PKI","Number of Shares":"2,247,262","Percentage of Portfolio":"0.04","Annual Percentage Change":"-7.92"},"PINNACLE WEST CAPITAL CORP.":{"Ticker":"PNW","Number of Shares":"2,273,745","Percentage of Portfolio":"0.04","Annual Percentage Change":"-3.73"},"EVEREST RE GROUP LTD.":{"Ticker":"RE","Number of Shares":"824,628","Percentage of Portfolio":"0.04","Annual Percentage Change":"10.52"},"REGENCY CENTERS CORP.":{"Ticker":"REG","Number of Shares":"3,385,674","Percentage of Portfolio":"0.04","Annual Percentage Change":"-11.75"},"JACK HENRY & ASSOCIATES INC.":{"Ticker":"JKHY","Number of Shares":"1,556,357","Percentage of Portfolio":"0.04","Annual Percentage Change":"14.23"},"LKQ Corp.":{"Ticker":"LKQ","Number of Shares":"6,199,737","Percentage of Portfolio":"0.04","Annual Percentage Change":"8.51"},"LINCOLN NATIONAL CORP.":{"Ticker":"LNC","Number of Shares":"4,012,264","Percentage of Portfolio":"0.04","Annual Percentage Change":"-27.96"},"LIVE NATION ENTERTAINMENT INC.":{"Ticker":"LYV","Number of Shares":"2,848,231","Percentage of Portfolio":"0.04","Annual Percentage Change":"7.84"},"E*TRADE FINANCIAL CORP.":{"Ticker":"ETFC","Number of Shares":"4,566,449","Percentage of Portfolio":"0.04","Annual Percentage Change":"-7.10"},"DIAMONDBACK ENERGY INC.":{"Ticker":"FANG","Number of Shares":"3,260,062","Percentage of Portfolio":"0.04","Annual Percentage Change":"-41.23"},"FORTUNE BRANDS HOME & SECURITY INC.":{"Ticker":"FBHS","Number of Shares":"2,811,886","Percentage of Portfolio":"0.04","Annual Percentage Change":"28.17"},"Globe Life Inc.":{"Ticker":"GL","Number of Shares":"2,015,157","Percentage of Portfolio":"0.04","Annual Percentage Change":"11.99"},"HUNTINGTON INGALLS INDUSTRIES INC.":{"Ticker":"HII","Number of Shares":"827,190","Percentage of Portfolio":"0.04","Annual Percentage Change":"-2.24"},"HENRY SCHEIN INC.":{"Ticker":"HSIC","Number of Shares":"2,968,372","Percentage of Portfolio":"0.04","Annual Percentage Change":"4.35"},"HOST HOTELS & RESORTS INC.":{"Ticker":"HST","Number of Shares":"14,508,914","Percentage of Portfolio":"0.04","Annual Percentage Change":"-25.74"},"CH ROBINSON WORLDWIDE INC.":{"Ticker":"CHRW","Number of Shares":"2,736,552","Percentage of Portfolio":"0.04","Annual Percentage Change":"-23.50"},"EASTMAN CHEMICAL CO.":{"Ticker":"EMN","Number of Shares":"2,747,127","Percentage of Portfolio":"0.04","Annual Percentage Change":"-26.60"},"AMERICAN AIRLINES GROUP INC.":{"Ticker":"AAL","Number of Shares":"7,886,920","Percentage of Portfolio":"0.04","Annual Percentage Change":"-46.62"},"Allegion plc":{"Ticker":"ALLE","Number of Shares":"1,879,202","Percentage of Portfolio":"0.04","Annual Percentage Change":"27.16"},"ARISTA NETWORKS INC.":{"Ticker":"ANET","Number of Shares":"1,097,221","Percentage of Portfolio":"0.04","Annual Percentage Change":"-32.00"},"Apache Corp.":{"Ticker":"APA","Number of Shares":"7,604,438","Percentage of Portfolio":"0.04","Annual Percentage Change":"-25.74"},"Arconic Inc.":{"Ticker":"ARNC","Number of Shares":"7,835,796","Percentage of Portfolio":"0.04","Annual Percentage Change":"57.54"},"Westrock Co.":{"Ticker":"WRK","Number of Shares":"5,217,544","Percentage of Portfolio":"0.04","Annual Percentage Change":"-13.86"},"Whirlpool Corp.":{"Ticker":"WHR","Number of Shares":"1,276,837","Percentage of Portfolio":"0.03","Annual Percentage Change":"-10.55"},"BorgWarner Inc.":{"Ticker":"BWA","Number of Shares":"4,179,399","Percentage of Portfolio":"0.03","Annual Percentage Change":"-23.62"},"SL GREEN REALTY CORP.":{"Ticker":"SLG","Number of Shares":"1,649,315","Percentage of Portfolio":"0.03","Annual Percentage Change":"-13.08"},"Snap-on Inc.":{"Ticker":"SNA","Number of Shares":"1,109,148","Percentage of Portfolio":"0.03","Annual Percentage Change":"-11.16"},"Tapestry Inc.":{"Ticker":"TPR","Number of Shares":"5,582,411","Percentage of Portfolio":"0.03","Annual Percentage Change":"-33.85"},"Mosaic Co.":{"Ticker":"MOS","Number of Shares":"7,072,903","Percentage of Portfolio":"0.03","Annual Percentage Change":"-47.06"},"MARATHON OIL CORP.":{"Ticker":"MRO","Number of Shares":"16,173,991","Percentage of Portfolio":"0.03","Annual Percentage Change":"-50.68"},"NIELSEN HOLDINGS PLC":{"Ticker":"NLSN","Number of Shares":"7,197,271","Percentage of Portfolio":"0.03","Annual Percentage Change":"-28.17"},"NATIONAL OILWELL VARCO INC.":{"Ticker":"NOV","Number of Shares":"7,805,039","Percentage of Portfolio":"0.03","Annual Percentage Change":"-34.85"},"NRG Energy Inc.":{"Ticker":"NRG","Number of Shares":"5,088,801","Percentage of Portfolio":"0.03","Annual Percentage Change":"-19.04"},"NEWELL BRANDS INC.":{"Ticker":"NWL","Number of Shares":"7,708,303","Percentage of Portfolio":"0.03","Annual Percentage Change":"-6.43"},"News Corp.":{"Ticker":"NWS","Number of Shares":"14,719","Percentage of Portfolio":"0.01","Annual Percentage Change":"-6.61"},"PEOPLE":{"Ticker":"PBCT","Number of Shares":"8,983,918","Percentage of Portfolio":"0.03","Annual Percentage Change":"-21.23"},"PACKAGING CORP. OF AMERICA":{"Ticker":"PKG","Number of Shares":"1,912,372","Percentage of Portfolio":"0.03","Annual Percentage Change":"-8.51"},"Pentair plc":{"Ticker":"PNR","Number of Shares":"3,399,642","Percentage of Portfolio":"0.03","Annual Percentage Change":"-8.54"},"Perrigo Co. plc":{"Ticker":"PRGO","Number of Shares":"2,753,485","Percentage of Portfolio":"0.03","Annual Percentage Change":"7.71"},"ROBERT HALF INTERNATIONAL INC.":{"Ticker":"RHI","Number of Shares":"2,378,510","Percentage of Portfolio":"0.03","Annual Percentage Change":"-26.16"},"INTERPUBLIC GROUP OF COS. INC.":{"Ticker":"IPG","Number of Shares":"7,843,485","Percentage of Portfolio":"0.03","Annual Percentage Change":"-7.17"},"IRON MOUNTAIN INC.":{"Ticker":"IRM","Number of Shares":"5,808,388","Percentage of Portfolio":"0.03","Annual Percentage Change":"-13.11"},"JB HUNT TRANSPORT SERVICES INC.":{"Ticker":"JBHT","Number of Shares":"1,723,893","Percentage of Portfolio":"0.03","Annual Percentage Change":"-9.88"},"JUNIPER NETWORKS INC.":{"Ticker":"JNPR","Number of Shares":"6,770,289","Percentage of Portfolio":"0.03","Annual Percentage Change":"-22.72"},"KIMCO REALTY CORP.":{"Ticker":"KIM","Number of Shares":"8,531,518","Percentage of Portfolio":"0.03","Annual Percentage Change":"-0.74"},"MOHAWK INDUSTRIES INC.":{"Ticker":"MHK","Number of Shares":"1,202,082","Percentage of Portfolio":"0.03","Annual Percentage Change":"-12.59"},"F5 NETWORKS INC.":{"Ticker":"FFIV","Number of Shares":"1,229,711","Percentage of Portfolio":"0.03","Annual Percentage Change":"-30.01"},"FLIR SYSTEMS INC.":{"Ticker":"FLIR","Number of Shares":"2,713,067","Percentage of Portfolio":"0.03","Annual Percentage Change":"-17.93"},"FEDERAL REALTY INVESTMENT TRUST":{"Ticker":"FRT","Number of Shares":"1,420,340","Percentage of Portfolio":"0.03","Annual Percentage Change":"-12.61"},"TechnipFMC plc":{"Ticker":"FTI","Number of Shares":"8,500,346","Percentage of Portfolio":"0.03","Annual Percentage Change":"-33.84"},"CF INDUSTRIES HOLDINGS INC.":{"Ticker":"CF","Number of Shares":"4,394,798","Percentage of Portfolio":"0.03","Annual Percentage Change":"-14.97"},"Comerica Inc.":{"Ticker":"CMA","Number of Shares":"2,911,857","Percentage of Portfolio":"0.03","Annual Percentage Change":"-40.06"},"CAMPBELL SOUP CO.":{"Ticker":"CPB","Number of Shares":"3,417,545","Percentage of Portfolio":"0.03","Annual Percentage Change":"24.61"},"Discovery Inc.":{"Ticker":"DISCA","Number of Shares":"3,198,976","Percentage of Portfolio":"0.02","Annual Percentage Change":"-10.27"},"DISH NETWORK CORP.":{"Ticker":"DISH","Number of Shares":"5,178,542","Percentage of Portfolio":"0.03","Annual Percentage Change":"4.88"},"DaVita Inc.":{"Ticker":"DVA","Number of Shares":"1,814,234","Percentage of Portfolio":"0.03","Annual Percentage Change":"36.37"},"DEVON ENERGY CORP.":{"Ticker":"DVN","Number of Shares":"7,829,845","Percentage of Portfolio":"0.03","Annual Percentage Change":"-45.65"},"DXC TECHNOLOGY CO.":{"Ticker":"DXC","Number of Shares":"5,178,462","Percentage of Portfolio":"0.03","Annual Percentage Change":"-63.98"},"ADVANCE AUTO PARTS INC.":{"Ticker":"AAP","Number of Shares":"1,401,064","Percentage of Portfolio":"0.03","Annual Percentage Change":"-15.99"},"ABIOMED Inc.":{"Ticker":"ABMD","Number of Shares":"913,827","Percentage of Portfolio":"0.03","Annual Percentage Change":"-55.30"},"APARTMENT INVESTMENT & MANAGEMENT CO.":{"Ticker":"AIV","Number of Shares":"3,011,233","Percentage of Portfolio":"0.03","Annual Percentage Change":"-2.21"},"Assurant Inc.":{"Ticker":"AIZ","Number of Shares":"1,171,573","Percentage of Portfolio":"0.03","Annual Percentage Change":"19.55"},"Albemarle Corp.":{"Ticker":"ALB","Number of Shares":"2,144,323","Percentage of Portfolio":"0.03","Annual Percentage Change":"-11.30"},"ALASKA AIR GROUP INC.":{"Ticker":"ALK","Number of Shares":"2,488,971","Percentage of Portfolio":"0.03","Annual Percentage Change":"-18.59"},"FRANKLIN RESOURCES INC.":{"Ticker":"BEN","Number of Shares":"5,642,091","Percentage of Portfolio":"0.03","Annual Percentage Change":"-33.60"},"ZIONS BANCORP NA":{"Ticker":"ZION","Number of Shares":"3,447,963","Percentage of Portfolio":"0.03","Annual Percentage Change":"-21.79"},"CIMAREX ENERGY CO.":{"Ticker":"XEC","Number of Shares":"2,059,443","Percentage of Portfolio":"0.02","Annual Percentage Change":"-54.50"},"AO Smith Corp.":{"Ticker":"AOS","Number of Shares":"2,773,063","Percentage of Portfolio":"0.02","Annual Percentage Change":"-25.01"},"RALPH LAUREN CORP.":{"Ticker":"RL","Number of Shares":"1,006,646","Percentage of Portfolio":"0.02","Annual Percentage Change":"-17.07"},"Rollins Inc.":{"Ticker":"ROL","Number of Shares":"2,843,820","Percentage of Portfolio":"0.02","Annual Percentage Change":"-4.71"},"SEALED AIR CORP.":{"Ticker":"SEE","Number of Shares":"3,120,866","Percentage of Portfolio":"0.02","Annual Percentage Change":"-31.32"},"Unum Group":{"Ticker":"UNM","Number of Shares":"4,172,755","Percentage of Portfolio":"0.02","Annual Percentage Change":"-37.72"},"PVH Corp.":{"Ticker":"PVH","Number of Shares":"1,500,497","Percentage of Portfolio":"0.02","Annual Percentage Change":"-36.28"},"QUANTA SERVICES INC.":{"Ticker":"PWR","Number of Shares":"2,875,432","Percentage of Portfolio":"0.02","Annual Percentage Change":"6.01"},"IPG PHOTONICS CORP.":{"Ticker":"IPGP","Number of Shares":"719,908","Percentage of Portfolio":"0.02","Annual Percentage Change":"-19.13"},"Invesco Ltd.":{"Ticker":"IVZ","Number of Shares":"7,529,492","Percentage of Portfolio":"0.02","Annual Percentage Change":"-25.39"},"Kohl's Corp.":{"Ticker":"KSS","Number of Shares":"3,166,974","Percentage of Portfolio":"0.02","Annual Percentage Change":"-42.30"},"L Brands Inc.":{"Ticker":"LB","Number of Shares":"4,701,595","Percentage of Portfolio":"0.02","Annual Percentage Change":"-20.95"},"LEGGETT & PLATT INC.":{"Ticker":"LEG","Number of Shares":"2,658,753","Percentage of Portfolio":"0.02","Annual Percentage Change":"-13.20"},"Macy's Inc.":{"Ticker":"M","Number of Shares":"6,238,598","Percentage of Portfolio":"0.02","Annual Percentage Change":"-47.75"},"Flowserve Corp.":{"Ticker":"FLS","Number of Shares":"2,642,973","Percentage of Portfolio":"0.02","Annual Percentage Change":"-11.61"},"HANESBRANDS INC.":{"Ticker":"HBI","Number of Shares":"7,301,647","Percentage of Portfolio":"0.02","Annual Percentage Change":"-29.50"},"HOLLYFRONTIER CORP.":{"Ticker":"HFC","Number of Shares":"3,003,421","Percentage of Portfolio":"0.02","Annual Percentage Change":"-36.42"},"HARLEY-DAVIDSON INC.":{"Ticker":"HOG","Number of Shares":"3,121,860","Percentage of Portfolio":"0.02","Annual Percentage Change":"-18.40"},"HELMERICH & PAYNE INC.":{"Ticker":"HP","Number of Shares":"2,193,828","Percentage of Portfolio":"0.02","Annual Percentage Change":"-31.87"},"H&R Block Inc.":{"Ticker":"HRB","Number of Shares":"3,949,464","Percentage of Portfolio":"0.02","Annual Percentage Change":"-15.01"},"CABOT OIL & GAS CORP.":{"Ticker":"COG","Number of Shares":"8,251,370","Percentage of Portfolio":"0.02","Annual Percentage Change":"-43.74"},"CAPRI HOLDINGS LTD.":{"Ticker":"CPRI","Number of Shares":"3,061,281","Percentage of Portfolio":"0.02","Annual Percentage Change":"-43.15"},"ALLIANCE DATA SYSTEMS CORP.":{"Ticker":"ADS","Number of Shares":"827,300","Percentage of Portfolio":"0.02","Annual Percentage Change":"-50.44"},"XEROX HOLDINGS CORP.":{"Ticker":"XRX","Number of Shares":"3,760,240","Percentage of Portfolio":"0.02","Annual Percentage Change":"2.48"},"UNDER ARMOUR INC.":{"Ticker":"UAA","Number of Shares":"3,803,262","Percentage of Portfolio":"0.01","Annual Percentage Change":"-36.99"},"Coty Inc.":{"Ticker":"COTY","Number of Shares":"5,986,652","Percentage of Portfolio":"0.01","Annual Percentage Change":"-16.47"},"Gap Inc.":{"Ticker":"GPS","Number of Shares":"4,296,341","Percentage of Portfolio":"0.01","Annual Percentage Change":"-43.49"},"Nordstrom Inc.":{"Ticker":"JWN","Number of Shares":"2,165,288","Percentage of Portfolio":"0.01","Annual Percentage Change":"-26.58"},"WYNDHAM HOTELS & RESORTS INC.":{"Ticker":"WH","Number of Shares":"216","Percentage of Portfolio":"0.01","Annual Percentage Change":"-2.84"}}};

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
    voo: voo_sample,
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
    
      let url = 'https://flask.stockstats.io/financialy-metrics?stocks=' + stock + ';&metrics=' + metric + ';&frequency=ANNUAL';
     
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
    var url = 'https://flask.stockstats.io/get/daily_price/' + ticker + '/d/d';

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
    const { selected_stocks, width, metrics, stock_data, stored_etfs , row_data, columns, voo } = this.state;
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
                <PieChartETF etfs={selected_stocks} voo={voo}/>
                <RadarChartETF>  </RadarChartETF>
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


