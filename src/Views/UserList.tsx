import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Container, LinearProgress, TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userListSelector } from '../Redux/Selectors/userList';
import { getUserList, setCurrentPage } from '../Redux/user-list';
import UserCard from '../Components/UserCard';

// Fetch data 200px before reaching end
const endReachedThreshold = 200;

const UserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const userList = useSelector(userListSelector);
  const {
    loading, currentPage, data, totalPages,
  } = userList;

  useEffect(() => {
    dispatch(getUserList(currentPage));
  }, [currentPage, dispatch]);

  const onEndReached = useCallback(() => {
    if (loading) {
      console.log('already fetching');
      return;
    }
    if (totalPages && currentPage < totalPages) {
      console.log('end reached, fetching...');
      dispatch(setCurrentPage((currentPage || 1) + 1));
      return;
    }
    console.log('end reached, no need to fetch');
  }, [currentPage, dispatch, loading, totalPages]);

  const onScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement, UIEvent>): void => {
      // TODO: I should check that i'm scrolling down
      const target = ev.nativeEvent.target as HTMLDivElement;
      if (target.scrollHeight - target.scrollTop - target.clientHeight < endReachedThreshold) {
        onEndReached();
      }
    },
    [onEndReached],
  );

  // This should be done by backend :)
  const filteredData = useMemo(
    () => (filter
      ? (data || []).filter(
        (d) => d.email.indexOf(filter) > -1 || d.first_name.indexOf(filter) > -1 || d.first_name.indexOf(filter) > -1,
      )
      : (data)),
    [data, filter],
  );

  return (
    <Container>
      {/* Loader shown only on first fetch */}
      {loading && currentPage === 1 && <LinearProgress />}
      <h1>User List</h1>
      {/* <Button variant="contained" onClick={onEndReached}>
        Next page
      </Button> */}
      <Button
        style={{ marginBottom: '1rem' }}
        variant="contained"
        onClick={() => {
          history.push('/user-modal');
        }}
      >
        Add user
      </Button>
      <TextField label="Type to search" fullWidth value={filter} onChange={(ev) => setFilter(ev.target.value)} />
      {filteredData?.length === 0 && data?.length ? <p>No result</p> : null}
      <div id="list-container" onScroll={onScroll}>
        {(filteredData || []).map((user) => (
          <UserCard
            key={user.id.toString()}
            user={user}
            onClick={() => {
              history.push('/user-modal', { user });
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default memo(UserList);
