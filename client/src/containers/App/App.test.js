import React from 'react';
import ReactDOM from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from './App';
import waitUntil from "async-wait-until";
import CampaignList from "../CampaignList/CampaignList";
import CampaignForm from "../CampaignForm/CampaignForm";

it('matches the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
    shallow(<App />);
});
/*

it('check if results render correctly', async (done) => {
    const wrapper = shallow(<App />);

    await waitUntil(() => wrapper.find('div.page-content').text().length > 0);

    console.log(wrapper.html())

    /!*wrapper.find('.campaign').forEach( (node) => {
        console.log(node.html())
        expect(node.find('.campaign-title').text()).toEqual(true)
    })*!/

    done();
});*/
