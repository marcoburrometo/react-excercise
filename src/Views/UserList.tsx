import React, { memo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userListSelector } from '../Redux/Selectors/userList';
import { getUserList, setCurrentPage } from '../Redux/user-list';

const UserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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

  console.log(data);

  return (
    <Container>
      {/* Loading only on first fetch */}
      {loading && currentPage === 1 && <LinearProgress />}
      <h1>User List</h1>
      <Button variant="contained" onClick={onEndReached}>
        Next page
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          history.push('/screen2');
        }}
      >
        Go to screen 2
      </Button>
    </Container>
  );
};

export default memo(UserList);
