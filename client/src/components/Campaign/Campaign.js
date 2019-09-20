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
                    <span>{campaign.name[0]}</span>
                </div>

                <div className="campaign-details">
                    <div className="campaign-title">{campaign.name}</div>
                    <div className="campaign-dates">{dateFormatter(new Date(campaign.startDate))} - {dateFormatter(new Date(campaign.endDate))} &nbsp;&nbsp;•&nbsp;&nbsp; Target {numberFormatter(campaign.targetImpressions)}</div>
                </div>
            </NavLink>
        )
    }
};

export default Campaign;
