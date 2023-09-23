import { render, screen, waitFor } from "@testing-library/react"
import { LoginFormProps } from "@components/Login/components/LoginForm/LoginForm.type";
import { LoginForm } from "@components/Login/components/LoginForm/LoginForm";
import userEvent from "@testing-library/user-event";

function renderLoginForm(props: LoginFormProps) {
  const { container } = render(<LoginForm {...props} />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const rememberMeInput = screen.getByLabelText(/remember me/i);
  const submitButton = screen.getByText(/submit/i);

  return {
    usernameInput,
    passwordInput,
    submitButton,
    container,
    changeUsername: (value: string) => userEvent.type(usernameInput, value),
    changePassword: (value: string) => userEvent.type(passwordInput, value),
    clickRememberMe: () => userEvent.click(rememberMeInput),
    submitForm: () => userEvent.click(submitButton),
  }
}

const username = 'admin';
const password = '123456#';

test('submit calls the submit handler', async () => {
  const handleSubmit = jest.fn();
  const { changeUsername, changePassword, clickRememberMe, submitForm } = renderLoginForm({
    onSubmit: handleSubmit,
    initialValues: {
      remember: false
    }
  });

  changeUsername(username);
  changePassword(password);
  clickRememberMe();
  submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
    remember: true
  });
});

test('submit shows form error messages if password is not filled in', async () => {
  const handleSubmit = jest.fn();
  const { changeUsername, submitForm } = renderLoginForm({
    onSubmit: handleSubmit
  });

  changeUsername(username);
  submitForm();

  await waitFor(() => {
    expect(screen.getByText('Please input your password!')).toBeTruthy();
  });
});
