import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LoginFormProps, LoginFormValues } from '@components/Login/components/LoginForm/LoginForm.type';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
  <Form
    name="login"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600, marginTop: 100 }}
    initialValues={{ remember: true }}
    onFinish={onSubmit}
    autoComplete="off"
  >
    <Form.Item<LoginFormValues>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<LoginFormValues>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<LoginFormValues>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
