import {
  Button, Card, CardContent, Container, IconButton, InputAdornment, LinearProgress, TextField,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { userErrorSelector, userLoadingSelector } from '../Redux/Selectors/user';
import { login } from '../Redux/user';

export default function Login() {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const userError = useSelector(userErrorSelector);
  const loading = useSelector(userLoadingSelector);
  const [previewPassword, setPreviewPassword] = useState(false);

  const onSubmit = useCallback((values: { email: string; password: string }) => {
    dispatch(login(values));
  }, [dispatch]);

  return (
    <Container maxWidth="xs">
      <h1>Login</h1>
      <Card>
        {loading && <LinearProgress />}
        <CardContent>
          <p>Please use your email and password to proceed.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              autoFocus
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
              label="Password"
              name="password"
              fullWidth
              helperText={errors?.password?.message}
              type={previewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPreviewPassword(!previewPassword)}
                    >
                      {previewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p className="has-error">{userError} &nbsp;</p>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
