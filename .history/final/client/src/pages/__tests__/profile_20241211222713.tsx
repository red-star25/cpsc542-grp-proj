import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, waitFor } from '@testing-library/react';
import Profile, { GET_MY_TRIPS } from '../profile';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  trips: [mockLaunch],
};

describe('Profile Page', () => {
  // Automatically unmount and cleanup DOM after each test.
  afterEach(cleanup);

  it('renders profile page', async () => {
    // Mock the Apollo GraphQL query.
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];

    // Render the Profile component with the mocked Apollo provider.
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Profile />
      </MockedProvider>
    );

    // Wait for the profile page to render and check if the test mission is displayed.
    await waitFor(() => getByText(/test mission/i));
  });
});
