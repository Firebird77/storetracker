import { render, screen, userEvent } from '@testing-library/react-native';

import { makeStore } from '../../../test/utils';
import { useFavoritesStore } from '../../favorites/favoritesStore';
import { StoreCard } from '../components/StoreCard';

const store = makeStore({
  id: 'store-42',
  name: 'Casa Nova Bordeaux',
  address: '12 rue du Commerce',
  city: 'Bordeaux',
});

beforeEach(() => useFavoritesStore.setState({ favorites: [] }));

describe('StoreCard', () => {
  it('affiche les informations principales du magasin', async () => {
    await render(<StoreCard store={store} onPress={jest.fn()} />);

    expect(screen.getByText('Casa Nova Bordeaux')).toBeOnTheScreen();
    expect(screen.getByText('12 rue du Commerce, Bordeaux')).toBeOnTheScreen();
  });

  it('expose un libellé accessible et transmet l’id au clic', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<StoreCard store={store} onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Casa Nova Bordeaux, Bordeaux' }));

    expect(onPress).toHaveBeenCalledWith('store-42');
  });

  it('le cœur est une cible séparée qui ne déclenche pas la navigation', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<StoreCard store={store} onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Ajouter Casa Nova Bordeaux aux favoris' }));

    expect(onPress).not.toHaveBeenCalled();
    expect(useFavoritesStore.getState().favorites).toEqual([store]);
  });
});
