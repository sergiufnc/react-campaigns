import React from 'react';

import style from './Campaign.scss';

import {numberFormatter, dateFormatter} from './../../helpers/General'

import {NavLink} from "react-router-dom";

class Campaign extends React.Component {


    render() {

        var campaign = this.props.campaign

        return (
            <NavLink to={{ pathname: "/campaign/" + campaign.id, campaign: campaign }} className="campaign">
                <div className="campaign-icon">
                    <span>{campaign.id[0]}</span>
                </div>

                <div className="campaign-details">
                    <div className="campaign-title">{campaign.id}</div>
                    <div className="campaign-dates"><span className="start-date">{dateFormatter(new Date(campaign.startDate))}</span> - <span className="end-date">{dateFormatter(new Date(campaign.endDate))}</span> • Target <span className="target-impressions">{numberFormatter(campaign.targetImpressions)}</span></div>
                </div>
            </NavLink>
        )
    }
};

export default Campaign;
