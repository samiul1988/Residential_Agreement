import React from 'react'
import LeaseDocument from './LeaseDocument'
import CreateLease from './CreateLease'
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="m-0 p-0">
        <Navbar />
        <div className="container p-0 ">
          <div className="d-flex flex-column main-body-container" >
            <LeaseDocument />
            <CreateLease />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
