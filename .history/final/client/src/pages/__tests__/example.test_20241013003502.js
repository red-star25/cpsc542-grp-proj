// test/Launch.test.js
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LAUNCH_DETAILS } from '../final/client/src/pages/launch'; // Adjust the import path as necessary
import Launch from '../final/client/src/pages/launch'; // Adjust the import path as necessary

const mocks = [
  {
    request: {
      query: GET_LAUNCH_DETAILS,
      variables: { launchId: '1' },
    },
    result: {
      data: {
        launch: {
          mission: {
            name: 'Test Mission',
            missionPatch: 'test-patch-url',
          },
          site: 'Test Site',
          rocket: {
            type: 'Test Rocket',
          },
        },
      },
    },
  },
];

test('renders launch details', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Launch />
    </MockedProvider>
  );

  // Check if the mission name is rendered
  const missionName = await screen.findByText(/Test Mission/i);
  expect(missionName).toBeInTheDocument();

  // Check if the site is rendered
  const site = await screen.findByText(/Test Site/i);
  expect(site).toBeInTheDocument();
});
