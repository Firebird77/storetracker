import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import type { ComponentType, ReactElement } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MOCK_STORES } from '../api/mockStores';
import type { Store } from '../api/types';
import type { RootStackParamList } from '../navigation/types';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });

export const makeStores = (count: number): Store[] => MOCK_STORES.slice(0, count);

export const makeStore = (overrides: Partial<Store> = {}): Store => ({
  ...MOCK_STORES[0]!,
  ...overrides,
});

const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const renderWithProviders = (ui: ReactElement, queryClient: QueryClient = createTestQueryClient()) =>
  render(
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </SafeAreaProvider>,
  );

const Stack = createNativeStackNavigator<RootStackParamList>();

const DetailProbe = ({ route }: { route: { params: { storeId: string } } }) => (
  <Text>Détail {route.params.storeId}</Text>
);

export const renderScreen = (Screen: ComponentType, queryClient?: QueryClient) =>
  renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Screen} />
        <Stack.Screen name="StoreDetail" component={DetailProbe as ComponentType} />
      </Stack.Navigator>
    </NavigationContainer>,
    queryClient,
  );
