import React from 'react'
import axios from 'axios'
import ButtonAppBar from './ButtonAppBar';
import MUIDataTable from "mui-datatables";
import FormDialog from './FormDialog'
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dialog, Toolbar, IconButton, Divider } from 'material-ui';
import { AppBar, Typography, List, ListItem, ListItemText, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import ReviewTicket from './ReviewTicket';
import classnames from 'classnames';
import AdminAppBar from './AdminAppBar';
import Cookies from 'universal-cookie';
import {Redirect, NavLink, Route, Switch, Link} from 'react-router-dom'
import compose from 'recompose/compose';


const customStyles = {
  HighCell: {
    color: "#F23913",
  },
  MediumCell:{
    color: "#F2852B",
  },
  LowCell:{
    color: '#59af26'
  },
  InsufficientCell:{
    color: '#ed4a3b'
  },
};

class Tickets extends React.Component{

  state= {
    datas: [],
    limit: 10,
    prev: 0,
    }

  constructor(props){
    super(props);
    this.state= {
      currentTicketID: '',
      redirect: false,
      open: true,
    }
  }

  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  axiosFunc = async(limit, start) => {
    const cookies = new Cookies();
    const LoggedSessionToken = cookies.get('AdminSessionToken');
    const {datas} = this.state;


    axios.get(`https://ticket-service.ticket.lepak.sg/ticket?limit=${this.state.limit}&offset=${start}`,{
          headers: {
            'X-Parse-Session-Token': 'r:5ab3041d2ff2484950e68251589ec347',
          },
        })
        .then((res) => {
          if(res.request.status === 200){
            // this.setState({id: res.data.map((data => {return([data.id, data.priority, data.title])}))})
            this.setState({allTickets: res.data.map((data => {return({id: data.id, title: data.title, 
            message: data.message, open_time: data.open_time, close_time: data.close_time, 
            assigned_team: data.assigned_team, username: data.username, fullname: data.long_name,
            email: data.email, phone: data.phone,
            priority: data.priority, severity: data.severity, flag: data.status_flag, response: data.response})}))})
            //console.log(this.state.allTickets[0].assigned_team);  // null
            const allT = this.state.allTickets;
            for(var i =0;i<allT.length;i++){
              if(allT[i].assigned_team === null || allT[i].assigned_team === 0){
                allT[i].assigned_team = "-";
              }
              if(allT[i].assigned_team === 1){
                allT[i].assigned_team = "Billing";
              }
              if(allT[i].assigned_team === 2){
                allT[i].assigned_team = "Technical";
              }
              if(allT[i].assigned_team === 3){
                allT[i].assigned_team = "General";
              }
              if(allT[i].flag === 0){
                allT[i].flag = "New";
              }
              if(allT[i].flag === 1){
                allT[i].flag = "In Progress";
              }
              if(allT[i].flag === 2){
                allT[i].flag = "Response Insufficient";
              }
              if(allT[i].flag === 3){
                allT[i].flag = "Closed";
              }

              if(allT[i].open_time){
                
                allT[i].open_time = allT[i].open_time.substring(0 ,16).replace("T", " | ");
                
              }
              if(allT[i].priority === 1){
                allT[i].priority = "Low";
              }
              if(allT[i].priority ===2){
                allT[i].priority = "Medium";
              }
              if(allT[i].priority ===3){
                allT[i].priority = "High";
              }
              if(allT[i].severity === 1){
                allT[i].severity = "Low";
              }
              if(allT[i].severity ===2){
                allT[i].severity = "Medium";
              }
              if(allT[i].severity ===3){
                allT[i].severity = "High";
              }
              
            }
            this.setState({
              allTickets: allT,
            })
    
          }
        })
        .catch(error => {
          console.log('failed')
        })
      }
    
  componentDidMount(){
    console.log('component mounted');
    this.axiosFunc(20, 0);
    this.interval = setInterval(this.axiosFunc, 10000);

  }
      onClose(value){
        return() => {
         // window.location.reload();
          this.setState({
            currentTicket: value,
            redirect: false,
            open: false,
          }, function() {
            console.log("AFTER CHANGE: " + this.state.currentTicket);
          })
        }
      }

      // renderElement(){
      //   if(this.state.redirect){
      //     return (
      //       {/* <ReviewTicket currentT = {this.state.currentTicket} onClose={this.onClose.bind(this)}  /> 
      //       <Redirect to={{
      //         pathname: '/reviewTicket',
      //         state: {idTicket : this.state.currentTicket, onClose: this.onClose.bind(this)}
      //         }}/>  */}
      //         this.props.history.push('/reviewTicket')
      //     );
      //   }
      //   }



    render(){

        const columns = [
            {
             name: "id",
             label: "Ticket ID",
             options: {
              filter: false,
              sort: true,
             }
            },
            {
             name: "title",
             label: "Subject Title",
             options: {
              filter: false,
              sort: false,
             }
            },
            {
                name: "message",
                label: "Message",
                options: {
                 filter: false,
                 sort: false,
                 display: false,
                }
               },
            {
             name: "priority",
             label: "Priority",
             options: {
              filter: true,
              sort: true,
              filterOptions: ['Low', 'Medium', 'High'],
              setCellProps: (value) => {
                  return{
                      className: classnames ({
                          [this.props.classes.HighCell]: value === "High",
                          [this.props.classes.MediumCell]: value === "Medium",
                          [this.props.classes.LowCell]: value === "Low",
                      })
                  };
              }
             }
            },
            {
              name: "severity",
              label: "Severity",
              options: {
               filter: true,
               sort: true,
               filterOptions: ['Low', 'Medium', 'High'],
               setCellProps: (value) =>{
                   return{
                       className: classnames ({
                        [this.props.classes.HighCell]: value === "High",
                        [this.props.classes.MediumCell]: value === "Medium",
                        [this.props.classes.LowCell]: value === "Low",
                       })
                   };
               }
              }
             },
            {
              name: "assigned_team",
              label: "Assigned Team",
              options: {
               filter: true,
               sort: true,
               filterOptions: ['Billing', 'Technical', 'Sales', 'General Inquiry'],
              }
             },
            {
              name: "flag",
              label: "Status",
              
              options: {
                filter: true,
                sort: true,
                filterOptions: ['New', 'In Progress', 'Insufficent', 'Closed'],
                setCellProps: (value) =>{
                  return{
                      className: classnames ({
                       [this.props.classes.InsufficientCell]: value === "Response Insufficient",
                      
                      })
                  };
              }
              }
            },
                {
                   name: "open_time",
                   label: "Date Opened",
                   options:{
                       filter: false,
                       sort: true
                   }
               }, 
           ];
           
          const data = this.state.allTickets;
           

const options = {
    selectableRows: false,
    filterType: 'dropdown',
    resizableColumns: true,
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 20],
    onChangePage: (currentPage) => {
      const {prev, limit} = this.state;
      if(currentPage > prev){
        this.setState({
          prev: prev+1,
        })
        this.axiosFunc(limit, currentPage * limit);
      }

    },
    onRowClick: rowData => {
        //const id = rowData[0];
        // console.log(id)
        console.log("ROWDATA " + rowData);
        this.setState({
          redirect: true,
          currentTicket: rowData,
          currentTicketID: rowData[0],
        })
      }
    
      
      
  };

  if(this.state.redirect){
    this.props.history.push({
      pathname:"/reviewTicket",
      state:{
          currentTicketID: this.state.currentTicketID,
       }
     });

  }
      
        return(
            <div>
                <AdminAppBar />
                <MuiThemeProvider theme={this.getMui}>
                    <MUIDataTable
                    title={"Tickets"}
                data={data}
                columns={columns}
                options={options}
                />

                
                
                {/* {this.renderElement()} */}
                
                </MuiThemeProvider>
            </div>

        )
    }
}

export default withStyles(customStyles, {name: "Tickets"})(Tickets);
