import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    // {
    //   name: 'Theodore Roosevelt',
    //   starred: true,
    //   id: 10
    // },
    // {
    //   name: 'Abraham Lincoln',
    //   starred: false,
    //   id: 11
    // },
    // {
    //   name: 'George Washington',
    //   starred: false,
    //   id: 20
    // }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            name: action.name,
            id: action.id,
            gender: 'select'
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter(item => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find(item => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };
    case types.CHANGE_GENDER:
    debugger 
      let _friends = [...state.friendsById];
      let _friend = _friends.find(item => item.id === action.id);
      _friend.gender = action.gender;

      return {
        ...state,
        friendsById: _friends
      }


    default:
      return state;
  }
}
