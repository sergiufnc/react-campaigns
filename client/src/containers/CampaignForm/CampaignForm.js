import React from "react";

import {Route, BrowserRouter as Router, Switch, NavLink} from "react-router-dom";

import request from "superagent";
import Campaign from "../../components/Campaign/Campaign";

import Cleave from 'cleave.js/react';


class CampaignForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            id: props.match.id,
            campaign: props.location.campaign ? props.location.campaign : {
                id: '',
                name: '',
                startDate: '',
                endDate: '',
                targetImpressions: ''
            }
        };
    }

    componentWillMount() {
        if (this.state.id && !this.state.campaign.id) {
            this.setState({loading: true}, () => {
                this.getCampaign()
            })
        }
    }

    getCampaign() {
        this.setState({loading: true}, () => {
            request
                .get('http://localhost:8000/api/get-campaign/' + this.state.id)
                .then((results) => {
                    this.setState({
                        loading: false,
                        campaign: results.campaign
                    })
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                    });
                })
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        request
            .post('http://localhost:8000/api/add-campaign')
            .send({campaign: this.state.campaign})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .then((results) => {
                this.props.history.push('/')
            })
            .catch((err) => {
                alert(err)
            })
    }

    handleCancel(e) {
        this.props.history.push('/')
    }

    handleNameChange(e) {
        var newCampaign = this.state.campaign
        newCampaign.name = e.target.value
        this.setState({campaign: newCampaign})
    }

    handleStartDateChange(e) {
        var newCampaign = this.state.campaign
        newCampaign.startDate = e.target.value
        this.setState({campaign: newCampaign})
    }

    handleEndDateChange(e) {
        var newCampaign = this.state.campaign
        newCampaign.endDate = e.target.value
        this.setState({campaign: newCampaign})
    }

    handleTargetChange(e) {
        var newCampaign = this.state.campaign
        newCampaign.targetImpressions = e.target.value
        this.setState({campaign: newCampaign})
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container" style={{padding: "100px 0"}}>
                    <p>Loading...</p>
                </div>
            )
        }

        return (
            <div className="container" style={{padding: "100px 0"}}>
                <div className="is-50 is-center">
                    <div className="page-header">
                        <h1>{this.state.campaign.id ? 'Edit campaign' : 'New campaign'}</h1>
                        <p>Add the campaign details.</p>
                    </div>

                    <div className="page-content">
                        <form method="post" onSubmit={this.handleSubmit.bind(this)} action="">
                            <div className="form-item">
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.campaign.name} placeholder="Nike - Autumn Campaign" onChange={this.handleNameChange.bind(this)} className=""/>
                            </div>

                            <div className="form-item">
                                <label>Start date</label>
                                <Cleave options={{date: true, delimiter: '/', datePattern: ['d', 'm', 'Y']}} placeholder="dd/mm/yyyy" type="text" name="startDate" value={this.state.campaign.startDate} onChange={this.handleStartDateChange.bind(this)} className=""/>
                            </div>

                            <div className="form-item">
                                <label>End date</label>
                                <Cleave options={{date: true, delimiter: '/', datePattern: ['d', 'm', 'Y']}} placeholder="dd/mm/yyyy" type="text" name="endDate" value={this.state.campaign.endDate} onChange={this.handleEndDateChange.bind(this)} className=""/>
                            </div>

                            <div className="form-item">
                                <label>Target impressions</label>
                                <Cleave options={{numericOnly: true}} type="text" name="targetImpressions" value={this.state.campaign.targetImpressions} placeholder="1000" onChange={this.handleTargetChange.bind(this)} className=""/>
                            </div>

                            <div className="form-item is-buttons">
                                <button className="button">Add campaign</button>
                                <button onClick={this.handleCancel.bind(this)} className="button is-tertiary">Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignForm;