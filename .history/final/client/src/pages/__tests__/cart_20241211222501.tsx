
import { cache, cartItemsVar } from '../../cache';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cleanup, renderApollo, waitFor } from '../../test-utils';
import Cart from '../cart';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('Cart Page', () => {
  // Automatically unmount and cleanup DOM after each test.
  afterEach(cleanup);

  it('renders with message for empty carts', async () => {
    // Render the Cart component with Apollo Provider and cache.
    const { getByTestId } = renderApollo(<Cart />, { cache });

    // Wait for the empty message to be rendered.
    await waitFor(() => getByTestId('empty-message'));
  });

  it('renders cart', async () => {
    // Define the mock request and result for GET_LAUNCH query.
    const mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // Render the Cart component with Apollo Provider, cache, and mocks.
    const { getByTestId } = renderApollo(<Cart />, { cache, mocks });

    // Set the cart items to include launch with id '1'.
    cartItemsVar(['1']);

    // Wait for the book button to be rendered.
    await waitFor(() => getByTestId('book-button'));
  });
});
