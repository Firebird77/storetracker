import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen, userEvent } from '@testing-library/react-native';

import { storesApi } from '../../../api/storesApi';
import type { RootStackParamList } from '../../../navigation/types';
import { makeStore, renderWithProviders } from '../../../test/utils';
import { useFavoritesStore } from '../../favorites/favoritesStore';
import { StoreDetailScreen } from '../screens/StoreDetailScreen';

jest.mock('../../../api/storesApi', () => ({
  ...jest.requireActual('../../../api/storesApi'),
  storesApi: { getStores: jest.fn(), getStore: jest.fn() },
}));

const getStore = storesApi.getStore as jest.MockedFunction<typeof storesApi.getStore>;
const store = makeStore({ id: '7', name: 'Run Club Nantes' });

const Stack = createNativeStackNavigator<RootStackParamList>();
const renderDetail = () =>
  renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StoreDetail" component={StoreDetailScreen} initialParams={{ storeId: '7' }} />
      </Stack.Navigator>
    </NavigationContainer>,
  );

beforeEach(() => {
  getStore.mockReset();
  useFavoritesStore.setState({ favorites: [] });
});

describe('StoreDetailScreen', () => {
  it('affiche la carte et les horaires de la semaine', async () => {
    getStore.mockResolvedValue(store);
    await renderDetail();

    expect(await screen.findByRole('heading', { name: 'Run Club Nantes' })).toBeOnTheScreen();
    expect(screen.getByTestId('map-view')).toBeOnTheScreen();
    expect(screen.getByTestId('map-marker')).toHaveProp('title', 'Run Club Nantes');
    for (const day of ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']) {
      expect(screen.getByText(day)).toBeOnTheScreen();
    }
  });

  it('ajoute aux favoris depuis le header', async () => {
    const user = userEvent.setup();
    getStore.mockResolvedValue(store);
    await renderDetail();

    await user.press(await screen.findByRole('button', { name: 'Ajouter Run Club Nantes aux favoris' }));

    expect(useFavoritesStore.getState().favorites).toEqual([store]);
  });

  it('affiche une erreur quand le magasin est inconnu et injoignable', async () => {
    getStore.mockRejectedValue(new Error('Magasin introuvable'));
    await renderDetail();

    expect(await screen.findByText('Magasin introuvable')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Réessayer' })).toBeOnTheScreen();
  });
});
