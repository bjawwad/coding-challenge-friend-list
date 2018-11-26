import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';

class FriendListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gender: 'select'
    }
  }

  render() {
    const { gender } = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{this.props.name}</span></div>
          <div>
            <small>xx friends in common</small>
          </div>
        </div>

        <div className={styles.genderSelect}>
          <select
            value={gender}
            onChange={(e) => { this.onGenderChange(e) }}
          >
            <option key='select'>Select</option>
            <option key='Male'>Male</option>
            <option key='Female'>Female</option>
          </select>
        </div>

        <div className={styles.friendActions}>
          <button className={`starred btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.starFriend(this.props.id)}>
            <i className={classnames('fa', {
              'fa-star': this.props.starred,
              'fa-star-o': !this.props.starred
            })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.deleteFriend(this.props.id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

  onGenderChange = (e) => {
    if(this.props && this.props.changeGender){
      this.props.changeGender(e.target.value, this.props.id);
    }
    
  }

}

FriendListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func
};

export default FriendListItem
