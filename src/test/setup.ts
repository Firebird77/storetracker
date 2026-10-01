/* eslint-disable @typescript-eslint/no-require-imports */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMapView = (props: object) =>
    require('react').createElement(View, { testID: 'map-view', ...props });
  const MockMarker = (props: object) =>
    require('react').createElement(View, { testID: 'map-marker', ...props });
  return { __esModule: true, default: MockMapView, Marker: MockMarker };
});
