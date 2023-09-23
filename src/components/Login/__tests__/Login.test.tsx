import { Login } from "@components/Login/Login";
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

function renderLogin() {
  const { container } = render(<Login />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByText(/submit/i);

  return {
    usernameInput,
    passwordInput,
    submitButton,
    container,
    changeUsername: (value: string) => userEvent.type(usernameInput, value),
    changePassword: (value: string) => userEvent.type(passwordInput, value),
    submitForm: () => userEvent.click(submitButton),
  }
}

test('should render user information when user is logged in', async () => {
  const { container, changeUsername, changePassword, submitForm } = renderLogin();

  const username = 'admin';
  const password = 'password112233';

  changeUsername(username);
  changePassword(password);
  submitForm();

  await waitFor(() => {
    expect(screen.getByText('User logged!')).toBeTruthy();
  });

  expect(container.textContent).toContain(`Username: ${username}`);
});

test('should render login page when user is not logged in', async () => {
  renderLogin();
  expect(screen.getByText('Login page')).toBeTruthy();
});
