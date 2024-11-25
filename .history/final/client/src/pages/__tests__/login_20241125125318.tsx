import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import { cache, isLoggedInVar } from '../../cache';
import Login, { LOGIN_USER } from '../login';

// Configure Enzyme adapter (typically done in setup file)
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('Login Page', () => {
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

  beforeEach(() => {
    // Reset logged in state before each test
    isLoggedInVar(false);
  });

  it('renders login page', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <Login />
      </MockedProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('fires login mutation and updates cache', async () => {
    // Ensure initial state is logged out
    expect(isLoggedInVar()).toBeFalsy();

    const wrapper = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <Login />
      </MockedProvider>
    );

    // Find input and submit button
    const emailInput = wrapper.find('[data-testid="login-input"]');
    const submitButton = wrapper.find('button').filterWhere(button => 
      button.text().match(/log in/i)
    );

    // Simulate input change
    emailInput.simulate('change', { 
      target: { value: 'a@a.a' } 
    });

    // Simulate button click
    submitButton.simulate('click');

    // Wait for mutation to resolve
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Update wrapper to reflect changes
    wrapper.update();

    // Check logged in state
    expect(isLoggedInVar()).toBeTruthy();

    wrapper.unmount();
  });
});