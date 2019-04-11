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


const customStyles = {
  HighCell: {
    color: "#F2852B",
  },
  UrgentCell:{
    color: '#F23913',
  },
  CriticalCell: {
    color: '#F23913',
  }
};

class Tickets extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      NewcurrentTicket: '',
      redirect: false,
      open: true,
    }
  }

  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  axiosFunc = () => {

    axios.get(`https://esc-ticket-service.lepak.sg/ticket/byUser`,{
          headers: {
            'X-Parse-Session-Token': 'r:85d020c6dbeb6a0680bca1c96487b6ce'
          }
        })
        .then((res) => {
          if(res.request.status === 200){
            // this.setState({id: res.data.map((data => {return([data.id, data.priority, data.title])}))})
            this.setState({allTickets: res.data.map((data => {return({id: data.id, title: data.title, 
            message: data.message, open_time: data.open_time, close_time: data.close_time, 
            assigned_team: data.assigned_team, username: data.username, fullname: data.long_name, 
            priority: data.priority, severity: data.severity})}))})
            //console.log(this.state.allTickets[0].assigned_team);  // null
            const allT = this.state.allTickets;
            for(var i =0;i<allT.length;i++){
              if(allT[i].assigned_team === null){
                allT[i].assigned_team = "None";
              }
              if(allT[i].open_time){
                
                allT[i].open_time = allT[i].open_time.substring(0 ,16).replace("T", " | ");
                
              }
              if(allT[i].priority === 1){
                allT[i].priority = "Low";
              }
              if(allT[i].priority ===2){
                allT[i].priority = "Normal";
              }
              if(allT[i].priority ===3){
                allT[i].priority = "High";
              }
              if(allT[i].priority === 4){
                allT[i].priority = "Urgent";
              }
              if(allT[i].severity === 1){
                allT[i].severity = "Low";
              }
              if(allT[i].severity ===2){
                allT[i].severity = "Normal";
              }
              if(allT[i].severity ===3){
                allT[i].severity = "High";
              }
              if(allT[i].severity === 4){
                allT[i].severity = "Critical";
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
    this.axiosFunc();
    //this.interval = setInterval(this.axiosFunc, 10000);

    // how much is too much? 
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(this.props.NewcurrentTicket !== this.state.NewcurrentTicket){
  //     this.setState({
  //       currentTicket: this.state.NewcurrentTicket,
  //     })
  //     console.log("UPDATEEEEEEEEINGGGNG")
  //   }
  // }

  // shouldComponentUpdate(nextProps,nextState){
  //   if(this.state.NewcurrentTicket === nextState.NewcurrentTicket){
  //     console.log('please update')
  //       return false;
  //   }
  //   return true;
  // }


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

      renderElement(){
        if(this.state.redirect)
           return (
            <div>
              
            <ReviewTicket currentT = {this.state.currentTicket} onClose={this.onClose.bind(this)}  /> 
          </div>
          );
        }



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
            // {
            //  name: "topics",
            //  label: "Topics",
            //  options: {
            //   filter: true,
            //   filterOptions: ['AR City', 'DevOps', 'Smart City'],
            //   sort: false,
            //  }
            // },
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
                name: "username",
                label: "Username",
                options: {
                 filter: false,
                 sort: false,
                 display: false,
                }
               },
               {
                name: "fullname",
                label: "Full Name",
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
              setCellProps: (value) => {
                  return{
                      className: classnames ({
                          [this.props.classes.HighCell]: value === "High",
                          [this.props.classes.UrgentCell]: value === "Urgent",
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
               setCellProps: (value) =>{
                   return{
                       className: classnames ({
                           [this.props.classes.CriticalCell]: value === "Critical",
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
              }
             },
            // {
            //    name: "progress",
            //    label: "Progress",
            //    options: {
            //     filter: true,
            //     sort: true,
            //    }},
                {
                   name: "open_time",
                   label: "Date Opened",
                   options:{
                       filter: false,
                       sort: true
                   }
               }, 
           ];
           
          //  const data = [
          //   { tickets: "1", topics: ["Smart City", "DevOps"], subject:"Help!", progress: "In Progress", priority: "Low", time: 5  },
          //   { tickets: "2", topics: "AR City", subject:"Please save me!", progress: "Open", priority: "Medium", time: 2},
          //   { tickets: "3", topics: "Business Pls", subject:"What is life?", progress: "Closed", priority: "High", time: 1 },
          //   { tickets: "4", topics: "Driveby", subject:"Can't do this", progress: "Open", priority: "Medium", time: 10 },
          //  ];
          const data = this.state.allTickets;
           

const options = {
    filterType: 'dropdown',
    onRowClick: rowData => {
        //const id = rowData[0];
        // console.log(id)
        console.log("ROWDATA " + rowData);
        this.setState({
          redirect: true,
          currentTicket: rowData
        })
      }
      
  };

      
        return(
            <div>
                <ButtonAppBar />
                <MuiThemeProvider theme={this.getMui}>
                    <MUIDataTable
                    title={"Tickets"}
                data={data}
                columns={columns}
                options={options}
                />

                
                
                {this.renderElement()}
                
                </MuiThemeProvider>
            </div>

        )
    }
}

export default withStyles(customStyles, {name: "Tickets"})(Tickets);
