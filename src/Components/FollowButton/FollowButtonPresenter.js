import React from 'react';
import Button from '../Button';

function FollowButtonPresenter({ isFollowing, onClick }) {
  return (
    <Button text={isFollowing ? 'Unfollow' : 'Follow'} onClick={onClick} />
  );
}

export default FollowButtonPresenter;