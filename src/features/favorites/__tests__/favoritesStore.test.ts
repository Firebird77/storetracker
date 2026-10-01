import AsyncStorage from '@react-native-async-storage/async-storage';

import { makeStore } from '../../../test/utils';
import { useFavoritesStore } from '../favoritesStore';

const store = makeStore({ id: 'a', name: 'A' });

beforeEach(() => useFavoritesStore.setState({ favorites: [] }));

describe('favoritesStore', () => {
  it('ajoute puis retire un magasin avec toggle', () => {
    useFavoritesStore.getState().toggle(store);
    expect(useFavoritesStore.getState().favorites).toEqual([store]);

    useFavoritesStore.getState().toggle(store);
    expect(useFavoritesStore.getState().favorites).toEqual([]);
  });

  it('persiste les favoris dans AsyncStorage', async () => {
    useFavoritesStore.getState().toggle(store);

    const raw = await AsyncStorage.getItem('favorites');
    expect(JSON.parse(raw ?? '{}')).toMatchObject({ state: { favorites: [{ id: 'a' }] } });
  });
});
