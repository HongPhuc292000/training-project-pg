import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { ILoginParams } from '../../../models/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import '../scss/login.scss';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);
      const json = await dispatch(
        fetchThunk('https://api.gearfocus.div4.pgtest.co/api/authentication/login', 'post', { email: values.email, password: values.password }),
      );
      setLoading(false);
      
      if (json?.success === true) {
        dispatch(setUserInfo(json.user));
        dispatch(replace(ROUTES.listProductManager));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container login-page-wrap"
    >
      <div className='form-container'>
        <h1 className='form-header'>Login</h1>
        <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default LoginPage;
