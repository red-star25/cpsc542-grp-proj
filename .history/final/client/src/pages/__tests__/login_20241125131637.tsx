import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { isLoggedInVar } from '../../cache';
import { Loading, LoginForm } from '../../components';
import Login, { LOGIN_USER } from '../login';

// Setup Enzyme adapter for React 18
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

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
    // Reset localStorage and isLoggedInVar before each test
    localStorage.clear();
    isLoggedInVar(false);
  });

  it('renders login page without crashing', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(wrapper.find(LoginForm).exists()).toBeTruthy();
  });

  it('shows loading component when mutation is in progress', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    // Simulate mutation loading state
    wrapper.find(LoginForm).prop('login')({ 
      variables: { email: 'a@a.a' } 
    });

    wrapper.update();
    expect(wrapper.find(Loading).exists()).toBeTruthy();
  });

  it('updates login state and localStorage after successful login', async () => {
    // Mock localStorage methods
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    // Manually trigger the login mutation with mock data
    const loginMutation = wrapper.find(LoginForm).prop('login');
    await loginMutation({ 
      variables: { email: 'a@a.a' } 
    });

    wrapper.update();

    // Check localStorage was updated
    expect(setItemSpy).toHaveBeenCalledWith('token', 'def456');
    expect(setItemSpy).toHaveBeenCalledWith('userId', 'abc123');

    // Check isLoggedInVar was updated
    expect(isLoggedInVar()).toBeTruthy();

    // Clean up spy
    setItemSpy.mockRestore();
  });

  it('displays error message when login fails', () => {
    const errorMocks = [
      {
        request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
        error: new Error('Login failed'),
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={errorMocks}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    // Simulate error scenario
    wrapper.find(LoginForm).prop('login')({ 
      variables: { email: 'a@a.a' } 
    });

    wrapper.update();
    expect(wrapper.text()).toContain('An error occurred');
  });
});