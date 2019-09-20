import React from 'react';

import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import Header from "./../../components/Header/Header";

import CampaignList from "./../CampaignList/CampaignList";
import CampaignForm from "./../CampaignForm/CampaignForm";

import style from './../../sass/kube.scss';

function App() {
    return (
        <div>
            <Header/>
            <Router>
                <Switch>
                    <Route exact path="/" component={CampaignList}/>
                    <Route exact path="/campaign/new" component={CampaignForm}/>
                    <Route path="/campaign/:id" component={CampaignForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
