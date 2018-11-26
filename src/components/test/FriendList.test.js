import React from 'react';
import renderer from 'react-test-renderer';
import FriendList from '../FriendList';
import FriendListItem from '../FriendListItem';
import {mount} from 'enzyme';

function mockFriends() {
    return [
        {
            name: 'Theodore Roosevelt',
            starred: true,
            id: '10'
        },
        {
            name: 'Abraham Lincoln',
            starred: false,
            id: '11'
        },
        {
            name: 'George Washington',
            starred: false,
            id: '20'
        }
    ]
}

function mockActions () {
    return {
        addFriend: jest.fn(),
        deleteFriend: jest.fn(),
        starFriend: jest.fn(),
        changeGender: jest.fn()
    }
}

describe('<FriendList />', () => {
    it('should render without crashing', () => {
        const friends = mockFriends();
        const actions = mockActions();
        const wrapper = renderer.create(<FriendList friends={friends} actions={actions}/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    })

    it('should render three friends', () => {
        const friends = mockFriends();
        const actions = mockActions();
        const wrapper = mount(<FriendList friends={friends} actions={actions}/>);
        const friendItems = wrapper.find('ul').children().map(child => child.childAt(0));
        expect(friendItems).toHaveLength(3);
    })
})