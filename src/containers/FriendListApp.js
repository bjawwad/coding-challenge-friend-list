import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import { addFriend, deleteFriend, starFriend, changeGender } from '../actions/FriendsActions';
import { FriendList, AddFriendInput, Pagination } from '../components';
import { getPaginatedData } from '../utils/utils';
import '../components/Pagination.css';


class FriendListApp extends Component {

  constructor(props) {
    super(props);
    this.limit = 2;
    this.state = {
      currentPage: 1,
      start: 0,
      end: this.limit
    }
  }

  render() {
    const { friendlist: { friendsById } } = this.props;
    const { currentPage, start, end } = this.state;
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
      changeGender: this.props.changeGender
    };

    const paginatedFriends = getPaginatedData(friendsById, start, end);
    const totalItems = friendsById.length;

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={paginatedFriends} actions={actions} />

        {
          totalItems > 2 ? <Pagination
            total={totalItems}
            currentPage={currentPage}
          >
            {
              ({
                pages,
                nextPage,
                previousPage,
                totalPages,
                hasNextPage,
                hasPreviousPage,
                getPageItemProps
              }) => {
                return (
                  <div className='pagination'>
                    <button
                      className='btn btn-default'
                      {...getPageItemProps({
                        pageValue: 1,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      first
                </button>

                    {
                      hasPreviousPage && (
                        <button
                          className='btn btn-default'
                          {...getPageItemProps({
                            pageValue: previousPage,
                            onPageChange: this.handlePageChange
                          })}
                        >
                          <i className='fa fa-angle-left'></i>
                        </button>
                      )
                    }

                    {
                      pages.map(page => {
                        const activePageStyle = currentPage === page ? { backgroundColor: '#fdce09' } : null;
                        return (
                          <button
                            className='btn btn-default'
                            key={page}
                            style={activePageStyle}
                            {...getPageItemProps({
                              pageValue: page,
                              onPageChange: this.handlePageChange
                            })}
                          >
                            {page}
                          </button>
                        )
                      })
                    }

                    {
                      hasNextPage && (
                        <button
                          className='btn btn-default'
                          {...getPageItemProps({
                            pageValue: nextPage,
                            onPageChange: this.handlePageChange
                          })}
                        >
                          <i className='fa fa-angle-right'></i>
                        </button>
                      )
                    }

                    {
                      <button
                        className='btn btn-default'
                        {...getPageItemProps({
                          pageValue: totalPages,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        last
                    </button>
                    }

                  </div>
                )
              }
            }
          </Pagination>
            : null
        }
      </div>
    );
  }

  handlePageChange = page => {
    const end = this.limit * page;
    const start = end - this.limit;
    this.setState({
      currentPage: page,
      start,
      end
    });
  }

}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  changeGender
})(FriendListApp)
