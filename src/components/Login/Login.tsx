import React, { useRef, useState } from 'react';
import { Col, Result, Row } from 'antd';
import { LoginForm } from './components/LoginForm/LoginForm';
import { LoginState } from './Login.type';
import { LoginFormValues } from './components/LoginForm/LoginForm.type';

export const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.LOGIN);
  const usernameLoggedRef = useRef<string>('');

  const onFinish = (formValues: LoginFormValues) => {
    usernameLoggedRef.current = formValues.username;
    setLoginState(LoginState.LOGGED);
  };

  const renderForm = () => {
    switch (loginState) {
      case LoginState.LOGGED:
        return (
          <Result
            status="success"
            title="User logged!"
            subTitle={<>Username: <b>{usernameLoggedRef.current}</b></>}
          />
        );

      default:
        return <LoginForm onSubmit={onFinish} />;
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        {renderForm()}
      </Col>
    </Row>
  );
};
