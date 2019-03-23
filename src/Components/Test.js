import MUIDataTable from "mui-datatables";
import React from 'react';
import FormDialog from './FormDialog'

const columns = [
 {
  name: "tickets",
  label: "Tickets",
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
  }
 },
 {
    name: "progress",
    label: "Progress",
    options: {
     filter: true,
     sort: true,
    }},
    
];

const data = [
 { tickets: "1", topics: ["Smart City", "DevOps"], subject:"Help!", progress: "In Progress", priority: "Low" },
 { tickets: "2", topics: "AR City", subject:"Please save me!", progress: "Open", priority: "Medium" },
 { tickets: "3", topics: "Business Pls", subject:"What is life?", progress: "Closed", priority: "High" },
 { tickets: "4", topics: "Driveby", subject:"Can't do this", progress: "Open", priority: "Medium" },
];

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
    
    render(){


const options = {
    filterType: 'dropdown',
    //onRowClick: rowData => this.redirect(rowData)
  };
        return(
            <MUIDataTable
  title={"Tickets"}
  data={data}
  columns={columns}
  options={options}
/>
        )
    }
}

export default Test;