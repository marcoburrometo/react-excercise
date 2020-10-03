import React, { memo } from 'react';
import {
  Avatar, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import { UserListItem } from '../Interfaces/user-list';
import './UserCard.scss';

interface Props {
  user: UserListItem;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: Props) => (
  <div className="user-card" onClick={onClick}>
    <ListItemAvatar>
      <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar} />
    </ListItemAvatar>
    <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.email} />
  </div>
);

export default memo(UserCard);
