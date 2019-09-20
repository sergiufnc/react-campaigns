import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CampaignList from './CampaignList';
import waitUntil from 'async-wait-until';
import {Route, BrowserRouter as Router, Switch, NavLink} from "react-router-dom";

it('renders without crashing', () => {
    const wrapper = shallow(<CampaignList />);

    expect(wrapper.find('.page-header .add-campaign').props().to.pathname).toBe('/campaign/new');

});