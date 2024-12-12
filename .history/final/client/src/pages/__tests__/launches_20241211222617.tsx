import { InMemoryCache } from '@apollo/client';

import { cleanup, renderApollo, waitFor } from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';

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

describe('Launches Page', () => {
  // Automatically unmount and cleanup DOM after each test.
  afterEach(cleanup);

  it('renders launches', async () => {
    // Create a new instance of InMemoryCache with addTypename set to false.
    const cache = new InMemoryCache({ addTypename: false });

    // Define the mock request and result for the Apollo client.
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];

    // Render the Launches component with Apollo client mocks and cache.
    const { getByText } = await renderApollo(<Launches />, {
      mocks,
      cache,
    });

    // Wait for the component to render and the specified text to be present.
    await waitFor(() => getByText(/test mission/i));
  });
});
