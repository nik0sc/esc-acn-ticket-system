import React from 'react';
import ButtonAppBar from './ButtonAppBar'
import SimpleCard from './SimpleCard'

class Dashboard extends React.Component{
    render(){
        return(
            <div>
             <ButtonAppBar />
             <SimpleCard />

            </div>
        )
    }
}


export default Dashboard
