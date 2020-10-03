import React, { useCallback, useMemo, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField/TextField';
import { useDispatch } from 'react-redux';
import { UserListItem, UserToSend } from '../Interfaces/user-list';
import { createUser, updateUser } from '../Services/user-list';
import { resetUserList, setCurrentPage } from '../Redux/user-list';

export default function UserModal() {
  const dispatch = useDispatch();
  const history = useHistory<{ user: UserListItem }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useMemo(() => history.location.state?.user, [history.location.state]);
  const isEdit = useMemo(() => user !== undefined, [user]);
  const {
    handleSubmit, register, errors, formState,
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      email: user?.email || '',
      firstName: user?.first_name,
      lastName: user?.last_name,
    },
  });

  const onSubmit = useCallback(
    async (values: { email: string; firstName: string; lastName: string }) => {
      setLoading(true);
      setError('');
      const user2save: UserToSend = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
      };
      const res = await (isEdit ? updateUser(user?.id, user2save) : createUser(user2save));
      setLoading(false);
      if (res?.ok) {
        // I'm refreshing the list
        dispatch(resetUserList());
        dispatch(setCurrentPage(1));
        history.push('/user-list');
      } else {
        setError((await res?.text()) || 'Unknown error');
      }
    },
    [dispatch, history, isEdit, user],
  );

  return (
    <Dialog aria-labelledby="user-dialog-title" open scroll="paper" maxWidth="lg" fullWidth>
      {loading && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="user-dialog-title">{isEdit ? `Edit user ${user.email}` : 'Create new user'}</DialogTitle>
        <DialogContent className="person-dialog" style={{ padding: 30 }} dividers={true}>
          <TextField
            inputRef={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            margin="normal"
            label="Email"
            name="email"
            fullWidth
            helperText={errors?.email?.message}
          />
          <TextField
            inputRef={register({
              required: 'Required',
            })}
            margin="normal"
            label="First name"
            name="firstName"
            fullWidth
            helperText={errors?.firstName?.message}
          />
          <TextField
            inputRef={register({
              required: 'Required',
            })}
            margin="normal"
            label="Last name"
            name="lastName"
            fullWidth
            helperText={errors?.lastName?.message}
          />
          <p className="has-error">{error} &nbsp;</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => history.push('/user-list')}>
            Cancel
          </Button>
          <Button disabled={!formState.isDirty || !formState.isValid} variant="contained" type="submit" color="primary">
            {isEdit ? 'Update user' : 'Create new user'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
