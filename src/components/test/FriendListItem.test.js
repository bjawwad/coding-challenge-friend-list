import React from 'react';
import FriendListItem from '../FriendListItem';
import renderer from 'react-test-renderer';

describe('<FriendListItem />', () => {
    it('should renders without crashing', () => {
        const wrapper = renderer.create(<FriendListItem id='2' name='Muhammad Bilal'/>).toJSON();
        expect(wrapper).toMatchSnapshot();        
    })
})

