import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CampaignForm from './CampaignForm';

it('renders without crashing', () => {
    shallow(<CampaignForm />);
});