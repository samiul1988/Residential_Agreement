import React from 'react'

class LeaseDocument extends React.Component {
    state ={
        leaseDocButtonText: "Show Blank Lease Document",
        leaseDocumentVisibility: false
    }
    handleLeaseDocButton = (e) => {
        e.preventDefault();
        this.setState({
            leaseDocButtonText: this.state.leaseDocumentVisibility? "Show Blank Lease Document": "Hide Blank Lease Document",
            leaseDocumentVisibility:  this.state.leaseDocumentVisibility? false: true
        });    
    }
    render() {
        return (
            <div className="m-2 p-2">
                <button 
                    className="btn form-bg form-label-light"
                    onClick={this.handleLeaseDocButton}>{this.state.leaseDocButtonText} </button>
                {
                this.state.leaseDocumentVisibility &&
                <div>
                    <iframe 
                        src="Residential_Agreement_DakBanglow.pdf" 
                        style={{"width":"100%", "height":"700px"}}>
                    </iframe>
                </div>
                }
            </div>

        );
    }
}

export default LeaseDocument