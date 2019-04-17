import React from 'react'
import { Redirect } from 'react-router'

class NewRoute extends React.Component {
    render() {
        return (
          <div>
            <h2>Repos</h2>
    
            {/* add some links */}
            <ul>
              <li><Redirect to="/tickets/reactjs/react-router">React Router</Redirect></li>
              <li><Redirect to="/tickets/facebook/react">React</Redirect></li>
            </ul>
    
          </div>
        )
      }
    }



export default NewRoute;
    