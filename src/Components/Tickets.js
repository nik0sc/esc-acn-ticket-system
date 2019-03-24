import React from 'react'
import axios from 'axios'
import ButtonAppBar from './ButtonAppBar';
import TicketTable from './TicketTable';
import EnhancedTable from './EnhancedTable';
import Test from './Test';
import Example from './Example';


class Tickets extends React.Component{
  
    render(){
      
        return(
            <div>
                <ButtonAppBar />
                {/* <TicketTable /> */}
                {/* <EnhancedTable /> */}
                
                <Test />
                {/* <Example /> */}
            </div>

        )
    }
}

export default Tickets;
