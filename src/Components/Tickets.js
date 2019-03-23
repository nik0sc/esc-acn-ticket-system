import React from 'react'
import axios from 'axios'
import ButtonAppBar from './ButtonAppBar';
import TicketTable from './TicketTable';
import EnhancedTable from './EnhancedTable';


class Tickets extends React.Component{
  

    render(){
      
        return(
            <div>
                <ButtonAppBar />
                {/* <TicketTable /> */}
                <EnhancedTable />
            </div>

        )
    }
}

export default Tickets;
