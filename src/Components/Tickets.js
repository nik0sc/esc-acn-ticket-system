import React from 'react'
import axios from 'axios'
import ButtonAppBar from './ButtonAppBar';
import TicketTable from './TicketTable';
import EnhancedTable from './EnhancedTable';
import Test from './Test';
import MUIDataTable from "mui-datatables";
import FormDialog from './FormDialog'
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dialog, Toolbar, IconButton, Divider } from 'material-ui';
import { AppBar, Typography, List, ListItem, ListItemText, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import TestWillDelete from './ReviewTicket';
import classnames from 'classnames';
import { Button, Modal } from 'semantic-ui-react'


class Tickets extends React.Component{
  
    state = {
        redirect: false,
        open: true,
        currentTicket: [],
      }

      componentDidMount(){
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
            assigned_team: data.assigned_team, username: data.username})}))})
            //console.log(this.state.allTickets[0].assigned_team);  // null
            const allT = this.state.allTickets;
            for(var i =0;i<allT.length;i++){
              if(allT[i].assigned_team === null){
                allT[i].assigned_team = "None";
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

      onClose = () => {
        this.setState({ 
          redirect: false,
          open: false,
        });
         
      };

      renderElement(){
        if(this.state.redirect)
           return (
            <div>
            <TestWillDelete currentT = {this.state.currentTicket} onClose={this.onClose.bind(this)} /> 

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
            {
             name: "topics",
             label: "Topics",
             options: {
              filter: true,
              filterOptions: ['AR City', 'DevOps', 'Smart City'],
              sort: false,
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
                name: "username",
                label: "Username",
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
            //   setCellProps: (value) =>{
            //       return{
            //           className: classnames ({
            //               [this.props.classes.PriorityCell]: value === "Medium"
            //           })
            //       };
            //   }
             }
            },
            {
              name: "assigned_team",
              label: "Assigned Team",
              options: {
               filter: true,
               sort: true,
            //    setCellProps: (value) =>{
            //        return{
            //            className: classnames ({
            //                [this.props.classes.PriorityCell]: value === "Medium"
            //            })
            //        }; 
            //    }
              }
             },
            {
               name: "progress",
               label: "Progress",
               options: {
                filter: true,
                sort: true,
               }},
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
        // const id = rowData[0];
        // console.log(id)
        console.log(rowData);
        this.setState({
          redirect: true,
          currentTicket: rowData
        })
      }
  };

      
        return(
            <div>
                <ButtonAppBar />
                <MuiThemeProvider>
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

export default Tickets;
