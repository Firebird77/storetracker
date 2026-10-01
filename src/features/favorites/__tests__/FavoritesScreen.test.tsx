import { screen, userEvent } from '@testing-library/react-native';

import { makeStores, renderScreen } from '../../../test/utils';
import { useFavoritesStore } from '../favoritesStore';
import { FavoritesScreen } from '../screens/FavoritesScreen';

const stores = makeStores(2);
const first = stores[0]!;
const second = stores[1]!;

beforeEach(() => useFavoritesStore.setState({ favorites: [] }));

describe('FavoritesScreen', () => {
  it('affiche un état vide explicite sans favori', async () => {
    await renderScreen(FavoritesScreen);

    expect(screen.getByText('Aucun favori pour le moment')).toBeOnTheScreen();
  });

  it('liste les favoris persistés et retire un magasin au clic sur le cœur', async () => {
    const user = userEvent.setup();
    useFavoritesStore.setState({ favorites: [first, second] });
    await renderScreen(FavoritesScreen);

    expect(screen.getByText(first.name)).toBeOnTheScreen();
    expect(screen.getByText(second.name)).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: `Retirer ${first.name} des favoris` }));

    expect(screen.queryByText(first.name)).not.toBeOnTheScreen();
    expect(screen.getByText(second.name)).toBeOnTheScreen();
  });

  it('ouvre le détail depuis un favori', async () => {
    const user = userEvent.setup();
    useFavoritesStore.setState({ favorites: [first] });
    await renderScreen(FavoritesScreen);

    await user.press(screen.getByRole('button', { name: new RegExp(`^${first.name},`) }));

    expect(await screen.findByText(`Détail ${first.id}`)).toBeOnTheScreen();
  });
});
