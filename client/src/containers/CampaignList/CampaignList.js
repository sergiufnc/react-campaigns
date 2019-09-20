import React from "react";

import {Route, BrowserRouter as Router, Switch, NavLink} from "react-router-dom";

import Campaign from "./../../components/Campaign/Campaign";

import request from "superagent";

class CampaignEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            campaigns: []
        };
    }

    componentWillMount() {
        this.getCampaigns()
    }

    getCampaigns() {
        this.setState({loading: true}, () => {
            request
                .get('http://localhost:8000/api/get-campaigns')
                .then((results) => {
                    this.setState({
                        loading: false,
                        campaigns: results.body.campaigns ? results.body.campaigns : []
                    })
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                    });
                })
        })
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
                <div className="page-header is-row">
                    <div className="is-col">
                        <h1>Campaigns</h1>
                        <p>Find below the list of all active campaigns.</p>
                    </div>
                    <div className="is-col is-text-right">
                        <NavLink to={{pathname: "/campaign/new"}} className="button">Add campaign</NavLink>
                    </div>
                </div>

                <div className="page-content">
                    {this.state.campaigns.map(campaign => (
                        <Campaign campaign={campaign}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default CampaignEdit;