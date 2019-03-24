import MUIDataTable from "mui-datatables";
import React from 'react';
import FormDialog from './FormDialog'
import classnames from 'classnames';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';


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

    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTable: {
            root: {
              backgroundColor: "#FF000",
            },
            paper: {
              boxShadow: "none",
            }
          },
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#FFF"
            }
          }
        }
      });
    
    render(){

        const columns = [
            {
             name: "tickets",
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
             name: "subject",
             label: "Subject",
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
               name: "progress",
               label: "Progress",
               options: {
                filter: true,
                sort: true,
               }},
               {
                   name: "time",
                   label: "Last Modified (Hours)",
                   options:{
                       filter: false,
                       sort: true
                   }
               },
               
           ];
           
           const data = [
            { tickets: "1", topics: ["Smart City", "DevOps"], subject:"Help!", progress: "In Progress", priority: "Low", time: 5  },
            { tickets: "2", topics: "AR City", subject:"Please save me!", progress: "Open", priority: "Medium", time: 2},
            { tickets: "3", topics: "Business Pls", subject:"What is life?", progress: "Closed", priority: "High", time: 1 },
            { tickets: "4", topics: "Driveby", subject:"Can't do this", progress: "Open", priority: "Medium", time: 10 },
           ];

           

const options = {
    filterType: 'dropdown',
    onRowClick: rowData => {
        const id = rowData[0];
        console.log(id)
    }
  };
        return(
            <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
  title={"Tickets"}
  data={data}
  columns={columns}
  options={options}
/>
</MuiThemeProvider>
        )
    }
}

export default withStyles(customStyles, {name: "Test"})(Test);