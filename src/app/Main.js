/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import ExTableBody from './Table/TableBody';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//
// import {blue500, red500, greenA200} from 'material-ui/styles/colors';
// import SvgIcon from 'material-ui/SvgIcon';


const muiTheme = getMuiTheme(lightBaseTheme);

function getStyles() {
  const { baseTheme } = muiTheme;
  return {
    container: {
      textAlign: 'center',
      paddingTop: 20,
    },
    column: {
      padding: 5,
    },
    colname: {
      padding: 5,
    },
    colauthor: {
      padding: 5,
      textAlign:'center',
      width:60
    },
    colaction: {
      padding: 5,
      width:160
    },
    colsum: {
      padding: 5,
      width:160
    },
    iconStyle:{
      color: baseTheme.palette.primary2Color
    },
    rowIconStyle:{
      color: baseTheme.palette.primary2Color,
      verticalAlign:'middle'
    }
  };
}

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      profileExpand: false, 
      openRepoTree: false,
      showMoreFilter: false,
      selectedRows:[],
      rows: [{
        id: '1',
        name: 'Albert Dev',
        label: 'label'
      },{
        id: '2',
        name: 'Bill PM',
        label: 'label'
      },{
        id: '3',
        name: 'William VP',
        label: 'label'
      }
      ]
    };
    this.styles = getStyles();
  }

  handleRowSelection = (selrows) => {

    let _selectedRows = [];
    if( (typeof selrows === 'string') && selrows === 'all'){
      _selectedRows = this.state.rows.map((row, index) => { return index });
    }else if( (typeof selrows === 'string') && selrows === 'none'){
      _selectedRows = [];
    }else{
      _selectedRows = selrows;
    }

    this.setState({selectedRows: _selectedRows});

  }

  render() {
    const styles = this.styles;
    const { selectedRows, rows } = this.state;
    const hasSelected = selectedRows && selectedRows.length > 0;

    const hRowEls = !hasSelected ? (<TableRow>
                <TableHeaderColumn style={styles.colname}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.colsum}>Summary</TableHeaderColumn>
                <TableHeaderColumn style={styles.colaction}>Actions</TableHeaderColumn>
              </TableRow>) :
               (<TableRow>
                <TableHeaderColumn style={styles.column} colSpan={3}>
                  <RaisedButton label='Clear' style={ { margin: 4 } } onTouchTap={ this.handleClear } />
                </TableHeaderColumn>
                </TableRow>);

    const rowEls = rows.map((row, index) => {

      let filterRows = selectedRows.filter( i => (i === index) );

      return (
        <TableRow key={`tr-${row.id}`} selected={ filterRows && filterRows.length > 0} selectable={true}>
          <TableRowColumn style={styles.colname}>
          <div style={{display: 'flex', verticalAlign:'middle'}}>
            <div style={{flex: '0 0 30px', verticalAlign:'middle' }}>
              <span style={{display:'inline-block', height:'100%', verticalAlign:'middle'}}/>
              <FileFolder style={styles.rowIconStyle}/>
            </div>
            <div style={{ flex:1 , overflow: 'hidden'}}>
              <a style={{ textDecoration: 'none', display: 'block',overflow: 'hidden',
                whiteSpace: 'nowrap', cursor: 'pointer',
                textOverflow: 'ellipsis'}} 
                onClick={this.handleRepoLink}>
               <span> {row.name}what is the best choice.</span>
              </a>
              <span style={{display: 'block',overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'}}>
                {row.name} what is the best choice.
              </span>
            </div>
          </div>
          </TableRowColumn>
          <TableRowColumn style={styles.colsum}> 3 folders, 12 files 1.3G</TableRowColumn>
          <TableRowColumn style={styles.colaction}>{row.label}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          
          <h1>Material-UI</h1>
          <h3>Left table is the standard table, right table is the modified one!!!</h3>
          <div style={{display: 'flex'}}>
            <div style={{flex:1, padding: 5}}>
              <p style={{ fontSize:14, width:'100%',textAlign: 'left', height: 50}}>standard table: After click check-all box in table header, uncheck any checkbox in table row will clear all the selected rows!</p>
              <Table multiSelectable={true}
                onRowSelection={this.handleRowSelection}>
                <TableHeader enableSelectAll={true}>
                  {hRowEls}
                </TableHeader>
                <TableBody deselectOnClickaway={false} preScanRows={true}>
                  {rowEls}
                </TableBody>
              </Table>
            </div>
            <div style={{flex:1, padding:5}}>
              <p style={{ fontSize:14, width:'100%',textAlign: 'left', height: 50}}>modified: this table will keep the other selected rows!</p>
              <Table multiSelectable={true}
                onRowSelection={this.handleRowSelection}>
                <TableHeader enableSelectAll={true}>
                  {hRowEls}
                </TableHeader>
                <ExTableBody deselectOnClickaway={false} preScanRows={true}>
                  {rowEls}
                </ExTableBody>
              </Table>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}



export default Main;
