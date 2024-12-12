import { cache, isLoggedInVar } from '../../cache';
import { cleanup, fireEvent, renderApollo, waitFor } from '../../test-utils';
import Login, { LOGIN_USER } from '../login';

describe('Login Page', () => {
  // Automatically unmount and cleanup DOM after each test
  afterEach(cleanup);

  it('renders the login page', async () => {
    // Render the Login component
    renderApollo(<Login />);
  });

  it('fires the login mutation and updates the cache when done', async () => {
    // Ensure the user is initially logged out
    expect(isLoggedInVar()).toBeFalsy();

    // Define the mock data for the login mutation
    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];

    // Render the Login component with the defined mocks and cache
    const { getByText, getByTestId } = await renderApollo(<Login />, {
      mocks,
      cache,
    });

    // Simulate user input by changing the value of the login input field
    fireEvent.change(getByTestId('login-input'), {
      target: { value: 'a@a.a' },
    });

    // Simulate a click on the login button
    fireEvent.click(getByText(/log in/i));

    // Wait for the login to complete by checking if the login button is no longer visible
    await waitFor(() => expect(getByText(/log in/i)).not.toBeInTheDocument());

    // Ensure the user is now logged in
    expect(isLoggedInVar()).toBeTruthy();
  });
});