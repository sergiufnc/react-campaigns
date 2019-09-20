import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Campaign from './Campaign';

it('renders without crashing', () => {
    const wrapper = shallow(<Campaign campaign={{
        id: 1,
        name: 'Campaign name',
        startDate: '2019-10-10',
        endDate: '2019-11-11',
        targetImpressions: 1000
    }} />);

    expect(wrapper.find('.start-date').text()).toEqual('10 Oct, 2019')
    expect(wrapper.find('.target-impressions').text()).toEqual('1k')
});