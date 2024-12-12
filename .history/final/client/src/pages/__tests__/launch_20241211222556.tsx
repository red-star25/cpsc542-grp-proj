import { Route, Routes } from 'react-router-dom';
import { cleanup, renderApollo, waitFor } from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launch Page', () => {
  // Automatically unmount and cleanup DOM after each test.
  afterEach(cleanup);

  it('renders launch details', async () => {
    // Define the mock request and response data.
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // Define the history object with the desired URL.
    const history = ['/launch/1'];

    // Render the Launch component with Apollo Provider and Router.
    const { getByText } = await renderApollo(
      <Routes>
        <Route path="launch/:launchId" element={<Launch />} />
      </Routes>,
      {
        mocks,
        history,
        resolvers: {},
      },
    );

    // Wait for the launch details to be rendered and assert the presence of the mission name.
    await waitFor(() => getByText(/test mission/i));
  });
});
