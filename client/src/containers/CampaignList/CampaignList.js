import React from "react";

import {Route, BrowserRouter as Router, Switch, NavLink} from "react-router-dom";

import Campaign from "./../../components/Campaign/Campaign";

import request from "superagent";

class CampaignList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            campaigns: []
        };
    }

    componentDidMount() {
        this._isMounted = true;

        this.getCampaigns()
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        var pageContent = ''

        if (this.state.loading) {
            pageContent = (
                <div className="container is-text-center" style={{padding: "100px 20px"}}>
                    <p>Loading...</p>
                </div>
            )
        } else {
            pageContent = (
                <div>
                    {this.state.campaigns.map(campaign => (
                        <Campaign key={campaign.id} campaign={campaign}/>
                    ))}
                </div>
            )
        }

        return (
            <div className="container" style={{padding: "100px 20px"}}>
                <div className="page-header is-row">
                    <div className="is-col">
                        <h1>Campaigns</h1>
                        <p>Find below the list of all active campaigns.</p>
                    </div>
                    <div className="is-col is-text-right">
                        <NavLink to={{pathname: "/campaign/new"}} className="button add-campaign">Add campaign</NavLink>
                    </div>
                </div>

                <div className="page-content">
                    {pageContent}
                </div>
            </div>
        );
    }
}

export default CampaignList;