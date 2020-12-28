import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from './AuthQueries';
import { toast } from 'react-toastify';
import AppRouter from '../../Components/Routes';

const AuthContainer = () => {
  const [action, setAction] = useState('logIn');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const email = useInput('');
  console.log(email);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    console.log('working');
    e.preventDefault();
    if (action === 'logIn') {
      console.log('working');
      if (email.value !== '') {
        console.log('working email');
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            console.log('something is worng');
            toast.error('You dont have an account yet, create one');
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            console.log('worked');
            toast.success('Check your inbox for your login secret');
            setAction('confirm');
          }
        } catch (err) {
          console.log(err);
          toast.error("Can't request secret, try again");
        }
      } else {
        console.log('failed');
        toast.error('Email is required');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success('Account created! Log In now');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All field are required');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error('Cant confirm secret,check again');
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};

export default AuthContainer;
