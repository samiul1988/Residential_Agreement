import React from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import originalMoment from "moment";
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root');

// const URL_PATH = "http://localhost:4500/api/admin/send-email";
const URL_PATH = "http://157.245.125.39:4500/api/admin/send-email";

const today = originalMoment();

const successMessage = (
    <div className="alert alert-success m-0">
        <h5 className="alert-heading">Successful Submission!</h5>
        <hr></hr>
        <p className="mb-0"> Agreement form was submitted successfully!</p>
    </div>
);

const errorMessage = (
    <div className="alert alert-warning m-0">
        <h5 className="alert-heading">Unsuccessful Submission!</h5>
        <hr></hr>
        <p className="mb-0"> Agreement form submission was unsuccessful!</p>
    </div>
);


const defaultState = {
    tenantFirstName: "",
    tenantLastName: "",
    tenantEmail: "",
    tenantContactNumber: "",
    roomNumber: "101",
    leaseType: "Fixed Term",
    termDuration: 12,
    startDate: today,
    endDate: today,
    focusedInput: null,
    rentAmount: 450,
    depositAmount: 450,
    includedFacilities: [],
    additionalObligations: "",
    tenantAwareOfResidencyAct: "yes",
    tenantWillHaveCopy: "yes",
    witnessName: "",
    landlordSignatureData: "", //"data:image/png;base64," + btoa(""),
    tenantSignatureData: "", //"data:image/png;base64," + btoa(""),
    witnessSignatureData: "", //"data:image/png;base64," + btoa(""),
    isConfirmationFormVisible: false,
    isMessageFormVisible: false,
    message: successMessage
}


class CreateLease extends React.Component {
    state = defaultState

    sigPanelLandlord = {}
    sigPanelTenant = {}
    sigPanelWitness = {}

    clearSigPanelLandlord = (e) => {
        e.preventDefault();
        this.sigPanelLandlord.clear();
        this.setState({
            landlordSignatureData: ""
        });
    }

    clearSigPanelTenant = (e) => {
        e.preventDefault();
        this.sigPanelTenant.clear();
        this.setState({
            tenantSignatureData: ""
        });
    }

    clearSigPanelWitness = (e) => {
        e.preventDefault();
        this.sigPanelWitness.clear();
        this.setState({
            witnessSignatureData: ""
        });
    }

    handleSignatureData = (e) => {
        let signatureData = "";
        if (e.target.id == "sigPanelLandlord") {
            signatureData = this.sigPanelLandlord.toDataURL();
            this.setState({
                landlordSignatureData: signatureData
            });
        } else if (e.target.id == "sigPanelTenant") {
            signatureData = this.sigPanelTenant.toDataURL();
            this.setState({
                tenantSignatureData: signatureData
            });
        } else {
            signatureData = this.sigPanelWitness.toDataURL();
            this.setState({
                witnessSignatureData: signatureData
            });
        }
        console.log(this.state);

    }
    onChange = (e) => {
        e.preventDefault();
        console.log(e.target.id, e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onRequestClose = () => {
        this.setState({
            isConfirmationFormVisible: false
        });
    }

    onRequestCloseMessageForm = () => {
        this.setState({
            isMessageFormVisible: false
        });
    }

    resetForm = () => {
        this.setState({
            ...
            defaultState
        });
    }

    onSubmitButtonClick = (e) => {
        e.preventDefault();
        this.setState({
            isConfirmationFormVisible: true
        });
    }

    onCancelButtonClick = (e) => {
        e.preventDefault();
        this.setState({
            isConfirmationFormVisible: false
        });
    }

    onConfirmButtonClick = (e) => {
        e.preventDefault();
        this.setState({
            isConfirmationFormVisible: false
        });
        const data = {
            tenantFirstName: this.state.tenantFirstName,
            tenantLastName: this.state.tenantLastName,
            tenantEmail: this.state.tenantEmail,
            tenantContactNumber: this.state.tenantContactNumber,
            roomNumber: this.state.roomNumber,
            leaseType: this.state.leaseType,
            termDuration: this.state.termDuration,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            rentAmount: this.state.rentAmount,
            depositAmount: this.state.depositAmount,
            includedFacilities: "",
            additionalObligations: this.state.additionalObligations,
            witnessName: this.state.witnessName,
            tenantAwareOfResidencyAct: this.state.tenantAwareOfResidencyAct,
            tenantWillHaveCopy: this.state.tenantWillHaveCopy,
            landlordSignatureData: this.state.landlordSignatureData,
            tenantSignatureData: this.state.tenantSignatureData,
            witnessSignatureData: this.state.witnessSignatureData
        };

        axios({
            method: "POST",
            url: URL_PATH,
            data: data
        }).then((response) => {
            if (response.data.msg == 'success') {
                this.setState({
                    isMessageFormVisible:true,
                    message: successMessage
                });
                setTimeout(()=>{
                    this.resetForm();
                    this.setState({
                        isMessageFormVisible:false
                    }); 
                }, 5000);
                // alert("Agreement was submitted successfully!");
            } else if (response.data.msg == 'fail') {
                // alert("Agreement was not failed to send.")
                this.setState({
                    isMessageFormVisible:true,
                    message: errorMessage
                });
                setTimeout(()=>{
                    this.setState({
                        isMessageFormVisible:false
                    }); 
                }, 5000);
            }
        });

    }

    onSubmit = (e) => {
        // console.log(this.state);
        const body = JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            userPassword: this.state.userPassword,
            phoneNumber: this.state.phoneNumber,
            employmentRole: this.state.employmentRole,
            employmentStatus: this.state.employmentStatus,
            createdBy: this.state.createdBy,
            createdAt: this.state.createdAt,
            createdOn: this.state.createdOn,
            updatedBy: this.state.updatedBy,
            updatedOn: this.state.updatedOn
        });
        console.log(body);

        e.preventDefault();
        // console.log(this.state);
        fetch(API_HOST_ADDRESS + "/api/admin/create-user", {
            method: 'POST',
            body: body,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    submitMessageClass: "align-self-center text-success"
                });
            } else {
                this.setState({
                    submitMessageClass: "align-self-center text-danger"
                });
            };
            return response.text();
        }).then((data) => {
            this.setState({
                submitMessageText: data
            });
        }).catch((err) => {
            // console.log("Error", err)
            this.setState({
                submitMessageClass: "align-self-center text-danger",
                submitMessageText: "Please try again later..."
            });
        });
    }
    render() {
        return (
            <div className="container">
                <h5 className="form-bg form-label-light m-0 p-1">Lease Agreement Form</h5>
                <form className="card card-body " onSubmit={this.onSubmitButtonClick}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="tenantFirstName" className="font-weight-bold form-label-dark">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenantFirstName"
                                aria-describedby="tenantFirstName"
                                placeholder="First Name"
                                required={true}
                                onChange={this.onChange}
                                value={this.state.tenantFirstName}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="tenantLastName" className="font-weight-bold form-label-dark">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenantLastName"
                                aria-describedby="tenantLastName"
                                placeholder="Last Name"
                                required={false}
                                onChange={this.onChange}
                                value={this.state.tenantLastName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="tenantEmail" className="font-weight-bold form-label-dark">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="tenantEmail"
                                aria-describedby="tenantEmail"
                                placeholder="Email"
                                required={true}
                                onChange={this.onChange}
                                value={this.state.tenantEmail}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="tenantContactNumber" className="font-weight-bold form-label-dark">Contact Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="tenantContactNumber"
                                aria-describedby="tenantContactNumber"
                                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                placeholder="XXX-XXX-XXXX"
                                required={false}
                                onChange={this.onChange}
                                value={this.state.tenantContactNumber}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="roomNumber" className="font-weight-bold form-label-dark">Room No.</label>
                            <select
                                className="form-control"
                                id="roomNumber"
                                aria-describedby="roomNumber"
                                onChange={this.onChange}
                                defaultValue={this.state.roomNumber}>
                                <option value="101"> 101</option>
                                <option value="102"> 102</option>
                                <option value="103"> 103</option>
                                <option value="201"> 201</option>
                                <option value="202"> 202</option>
                                <option value="203"> 203</option>
                                <option value="204"> 204</option>
                                <option value="205"> 205</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="leaseType" className="font-weight-bold form-label">Lease Type</label>
                            <select
                                className="custom-select mr-sm-2"
                                id="leaseType"
                                defaultValue={this.state.leaseType}
                                onChange={this.onChange}>
                                <option value="Week To Week">Week to Week</option>
                                <option value="Month To Month">Month to Month</option>
                                <option value="Fixed Term">Fixed Term</option>
                            </select>
                        </div>
                        {this.state.leaseType == "Fixed Term" &&
                            <div className="form-group col-md-6">
                                <label htmlFor="termDuration" className="font-weight-bold form-label">Term Duration (in month)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="termDuration"
                                    aria-describedby="termDuration"
                                    value={this.state.termDuration}
                                    required={false}
                                    onChange={this.onChange}
                                />
                            </div>
                        }
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="leaseValidityPeriod" className="font-weight-bold form-label">Lease Validity Period</label>
                            <div className="form-control">
                                <DateRangePicker
                                    startDate={this.state.startDate}
                                    startDateId="startDate"
                                    endDateId="endDate"
                                    endDate={this.state.endDate}
                                    onDatesChange={({ startDate, endDate }) => {
                                        console.log(startDate);
                                        this.setState({ startDate, endDate });
                                    }
                                    }
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="rentAmount" className="font-weight-bold form-label">Rent Amount (in CAD)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="rentAmount"
                                aria-describedby="rentAmount"
                                required={true}
                                onChange={this.onChange}
                                value={this.state.rentAmount}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="depositAmount" className="font-weight-bold form-label">Deposit (in CAD)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="depositAmount"
                                aria-describedby="depositAmount"
                                required={true}
                                onChange={this.onChange}
                                value={this.state.depositAmount}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="includedFacilities" className="font-weight-bold form-label-dark">Facilities included with the Lease</label>
                            {
                                //        <div
                                //        className="form-control"
                                //        id="facilities"
                                //    >
                                //        <div className="custom-control custom-checkbox">
                                //            <input type="checkbox" className="custom-control-input form-bg" id="defaultChecked2" />
                                //            <label className="custom-control-label" for="defaultChecked2">Default checkedss</label>
                                //        </div>

                                //        </div>
                            }
                            <select
                                multiple={true}
                                className="form-control"
                                id="includedFacilities"
                                aria-describedby="includedFacilities"
                                onChange={this.onChange}>
                                <option selected={true} value="waterSupply"> Water Supply</option>
                                <option selected={true} value="hotWaterSupply"> Hot Water Supply</option>
                                <option selected={true} value="refrigerator"> Refrigerator</option>
                                <option selected={true} value="furniture"> Furniture</option>
                                <option selected={true} value="rangeAndOven"> Range and Oven</option>
                                <option selected={true} value="electricity"> Electricity</option>
                                <option selected={true} value="propertyTax"> Property Tax</option>
                                <option selected={true} value="washerAndDryer"> Washer and Dryer</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="additionalObligations" className="font-weight-bold form-label-dark">Additional Obligations</label>
                            <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                id="additionalObligations"
                                aria-describedby="additionalObligations"
                                onChange={this.onChange}
                                value={this.state.additionalObligations}>
                            </textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="font-weight-bold form-label-dark">Tenant read/aware of Alberta Residential Tenancies Act? </label>
                            <select
                                className="form-control"
                                onChange={this.onChange}
                                defaultValue={this.state.tenantAwareOfResidencyAct}>
                                <option value="yes"> Yes </option>
                                <option value="no"> No </option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="font-weight-bold form-label-dark"> Tenant will have a copy of this document? </label>
                            <select
                                className="form-control"
                                onChange={this.onChange}
                                defaultValue={this.state.tenantWillHaveCopy}>
                                <option value="yes"> Yes </option>
                                <option value="no"> No </option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label className="font-weight-bold form-label-dark"> Signature of the Landlord </label>
                            <div className="d-flex">
                                <SignatureCanvas
                                    className="form-control"
                                    penColor='black'
                                    canvasProps={{ width: 300, height: 130, className: 'sigCanvas border rounded', id: "sigPanelLandlord" }}
                                    ref={(ref) => { this.sigPanelLandlord = ref }}
                                    onEnd={this.handleSignatureData}
                                />
                                <div className="d-flex align-items-center p-2">
                                    <button className="btn btn-sm form-bg form-label-light" onClick={this.clearSigPanelLandlord}>
                                        Clear
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label className="font-weight-bold form-label-dark"> Signature of the Tenant </label>
                            <div className="d-flex">
                                <SignatureCanvas
                                    className="form-control"
                                    penColor='black'
                                    canvasProps={{ width: 300, height: 130, className: 'sigCanvas border rounded', id: "sigPanelTenant" }}
                                    ref={(ref) => { this.sigPanelTenant = ref }}
                                    onEnd={this.handleSignatureData}
                                />
                                <div className="d-flex align-items-center p-2">
                                    <button className="btn btn-sm form-bg form-label-light" onClick={this.clearSigPanelTenant}>
                                        Clear
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="witnessName" className="font-weight-bold form-label-dark">Name of the Witness</label>
                            <input
                                type="text"
                                className="form-control"
                                id="witnessName"
                                aria-describedby="witnessName"
                                required={false}
                                onChange={this.onChange}
                                value={this.state.witnessName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label className="font-weight-bold form-label-dark"> Signature of the Witness </label>
                            <div className="d-flex">
                                <SignatureCanvas
                                    className="form-control"
                                    penColor='black'
                                    canvasProps={{ width: 300, height: 130, className: 'sigCanvas border rounded', id: "sigPanelWitness" }}
                                    ref={(ref) => { this.sigPanelWitness = ref }}
                                    onEnd={this.handleSignatureData}
                                />
                                <div className="d-flex align-items-center p-2">
                                    <button className="btn btn-sm form-bg form-label-light" onClick={this.clearSigPanelWitness}>
                                        Clear
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-4"></div>
                        <div className="form-group col-md-4 d-flex justify-content-center">
                            <button type="submit"
                                className="btn btn-block form-bg form-label-light"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </form>

                <ReactModal
                    className="modal-submit-confirmation"
                    id="modal-submit-confirmation-window" 
                    isOpen={this.state.isConfirmationFormVisible}
                    onRequestClose={this.onRequestClose}>
                    <div className="card card-body">
                        <div>
                            <h6>Confirm form Submission</h6>
                            <div className="d-flex flex-row justify-content-center">
                                <div className="p-2">
                                    <button 
                                        className="btn btn-sm form-bg form-label-light p-2"
                                        onClick={this.onConfirmButtonClick}>Confirm</button>
                                </div>
                                <div className="p-2">
                                    <button 
                                        className="btn btn-sm form-bg form-label-light p-2"
                                        onClick={this.onCancelButtonClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>

                <ReactModal
                    className="modal-submit-confirmation"
                    id="modal-submit-confirmation-window" 
                    isOpen={this.state.isMessageFormVisible}
                    onRequestClose={this.onRequestCloseMessageForm}>
                    <div className="card card-body d-flex align-items-center p-0">
                        {this.state.message}
                    </div>
                </ReactModal>

            </div>
        );
    }
}
export default CreateLease
