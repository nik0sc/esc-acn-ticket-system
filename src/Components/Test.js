import MUIDataTable from "mui-datatables";
import React from 'react';
import FormDialog from './FormDialog'
import classnames from 'classnames';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import axios from 'axios'
import { Dialog, Toolbar, IconButton, Divider } from 'material-ui';
import { AppBar, Button, Typography, List, ListItem, ListItemText, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const customStyles = {
    PriorityCell:{
       fontWeight: 1000
    },
};

// const columns = [
//  {
//   name: "tickets",
//   label: "Tickets",
//   options: {
//    filter: false,
//    sort: true,
//   }
//  },
//  {
//   name: "topics",
//   label: "Topics",
//   options: {
//    filter: true,
//    filterOptions: ['AR City', 'DevOps', 'Smart City'],
//    sort: false,
//   }
//  },
//  {
//   name: "subject",
//   label: "Subject",
//   options: {
//    filter: false,
//    sort: false,
//   }
//  },
//  {
//   name: "priority",
//   label: "Priority",
//   options: {
//    filter: true,
//    sort: true,
//    setCellProps: (value) =>{
//        return{
//            className: classnames ({
//                [this.props.classes.PriorityCell]: value === "High"
//            })
//        };
//    }
//   }
//  },
//  {
//     name: "progress",
//     label: "Progress",
//     options: {
//      filter: true,
//      sort: true,
//     }},
//     {
//         name: "time",
//         label: "Last Modified (Hours)",
//         options:{
//             filter: false,
//             sort: true
//         }
//     },
    
// ];

// const data = [
//  { tickets: "1", topics: ["Smart City", "DevOps"], subject:"Help!", progress: "In Progress", priority: "Low", time: 5  },
//  { tickets: "2", topics: "AR City", subject:"Please save me!", progress: "Open", priority: "Medium", time: 2},
//  { tickets: "3", topics: "Business Pls", subject:"What is life?", progress: "Closed", priority: "High", time: 1 },
//  { tickets: "4", topics: "Driveby", subject:"Can't do this", progress: "Open", priority: "Medium", time: 10 },
// ];

// const options = {
//   filterType: 'dropdown',
 
// //   customSort: (data, colIndex, order) => {
// //     return data.sort(function(a,b) {
// //         a = a.data[colIndex].split('/').reverse().join('');
// //         b = b.data[colIndex].split('/').reverse().join('');
// //         return a.localeCompare(b);         // <-- alternative 
// //       });
// //        },
// };




class Test extends React.Component{

  state = {
    redirect: false,
    open: true,
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

  renderElement(){
    if(this.state.redirect)
       return (
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
        >
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                CLOSE
              </IconButton>
              <Typography variant="h6" color="inherit" >
                Sound
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          </Dialog>

);
 }

 handleClose = () => {
  this.setState({ 
    redirect: false,
  });
   
};


    // getMuiTheme = () => createMuiTheme({
    //     overrides: {
    //       MUIDataTable: {
    //         root: {
    //           backgroundColor: "#FF000",
    //         },
    //         paper: {
    //           boxShadow: "none",
    //         }
    //       },
    //       MUIDataTableBodyCell: {
    //         root: {
    //           backgroundColor: "#FFF"
    //         }
    //       }
    //     }
    //   });
    
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
             name: "priority",
             label: "Priority",
             options: {
              filter: true,
              sort: true,
              setCellProps: (value) =>{
                  return{
                      className: classnames ({
                          [this.props.classes.PriorityCell]: value === "Medium"
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
               setCellProps: (value) =>{
                   return{
                       className: classnames ({
                           [this.props.classes.PriorityCell]: value === "Medium"
                       })
                   }; 
               }
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
        this.setState({
          redirect: true,
        })
      }
  };
        return(
          <div>            
            {/* theme={this.getMuiTheme()} */}

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


export default withStyles({name: "Test"})(Test);