import { render, screen, userEvent } from '@testing-library/react-native';

import { makeStore } from '../../../test/utils';
import { FavoriteButton } from '../components/FavoriteButton';
import { useFavoritesStore } from '../favoritesStore';

const store = makeStore({ id: 'store-1', name: 'Pixel Store Lyon' });

beforeEach(() => useFavoritesStore.setState({ favorites: [] }));

describe('FavoriteButton', () => {
  it('ajoute le magasin aux favoris et reflète l’état sélectionné', async () => {
    const user = userEvent.setup();
    await render(<FavoriteButton store={store} />);

    const button = screen.getByRole('button', { name: 'Ajouter Pixel Store Lyon aux favoris' });
    expect(button).not.toBeSelected();

    await user.press(button);

    expect(useFavoritesStore.getState().favorites).toEqual([store]);
    expect(screen.getByRole('button', { name: 'Retirer Pixel Store Lyon des favoris' })).toBeSelected();
  });

  it('retire le magasin s’il était déjà favori', async () => {
    const user = userEvent.setup();
    useFavoritesStore.getState().toggle(store);
    await render(<FavoriteButton store={store} />);

    await user.press(screen.getByRole('button', { name: 'Retirer Pixel Store Lyon des favoris' }));

    expect(useFavoritesStore.getState().favorites).toEqual([]);
    expect(screen.getByRole('button', { name: 'Ajouter Pixel Store Lyon aux favoris' })).toBeOnTheScreen();
  });
});
