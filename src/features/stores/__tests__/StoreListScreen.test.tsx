import { act, fireEvent, screen, userEvent, waitFor } from '@testing-library/react-native';

import { storesApi } from '../../../api/storesApi';
import type { Page, Store } from '../../../api/types';
import { makeStores, renderScreen } from '../../../test/utils';
import { StoreListScreen } from '../screens/StoreListScreen';

jest.mock('../../../api/storesApi', () => ({
  ...jest.requireActual('../../../api/storesApi'),
  storesApi: { getStores: jest.fn(), getStore: jest.fn() },
}));

const getStores = storesApi.getStores as jest.MockedFunction<typeof storesApi.getStores>;
const ALL = makeStores(30);

const page = (items: Store[], pageNumber: number, hasMore = false): Page<Store> => ({
  items,
  page: pageNumber,
  hasMore,
});

beforeEach(() => getStores.mockReset());

describe('StoreListScreen', () => {
  it('affiche un loader puis la liste des magasins', async () => {
    let resolve!: (value: Page<Store>) => void;
    getStores.mockReturnValue(new Promise((r) => (resolve = r)));
    await renderScreen(StoreListScreen);

    expect(screen.getByLabelText('Chargement')).toBeOnTheScreen();

    await act(async () => resolve(page(ALL.slice(0, 20), 1, true)));

    expect(await screen.findByText(ALL[0]!.name)).toBeOnTheScreen();
    expect(screen.queryByLabelText('Chargement')).not.toBeOnTheScreen();
  });

  it('affiche une erreur plein écran puis recharge au clic sur Réessayer', async () => {
    const user = userEvent.setup();
    getStores
      .mockRejectedValueOnce(new Error('Le serveur ne répond pas.'))
      .mockResolvedValue(page(ALL.slice(0, 20), 1, true));
    await renderScreen(StoreListScreen);

    expect(await screen.findByRole('alert')).toHaveTextContent('Le serveur ne répond pas.');

    await user.press(screen.getByRole('button', { name: 'Réessayer' }));

    expect(await screen.findByText(ALL[0]!.name)).toBeOnTheScreen();
  });

  it('transmet la recherche (debouncée) à l’API et affiche l’état vide', async () => {
    const user = userEvent.setup();
    getStores.mockImplementation(async (_page, search) =>
      search ? page([], 1) : page(ALL.slice(0, 20), 1, true),
    );
    await renderScreen(StoreListScreen);
    await screen.findByText(ALL[0]!.name);

    await user.type(screen.getByRole('searchbox'), 'zzz');

    expect(await screen.findByText('Aucun magasin trouvé')).toBeOnTheScreen();
    expect(getStores).toHaveBeenLastCalledWith(1, 'zzz');
  });

  it('charge la page suivante en fin de liste (infinite scroll)', async () => {
    getStores.mockImplementation(async (p) =>
      p === 1 ? page(ALL.slice(0, 20), 1, true) : page(ALL.slice(20), 2),
    );
    await renderScreen(StoreListScreen);
    await screen.findByText(ALL[0]!.name);

    const list = screen.getByTestId('store-list');
    await fireEvent(list, 'onEndReached');

    expect(getStores).toHaveBeenLastCalledWith(2, '');
    await waitFor(() => expect(screen.queryByLabelText('Chargement de la suite')).not.toBeOnTheScreen());
  });

  it('navigue vers le détail au clic sur un magasin', async () => {
    const user = userEvent.setup();
    getStores.mockResolvedValue(page(ALL.slice(0, 20), 1, true));
    await renderScreen(StoreListScreen);

    await user.press(await screen.findByRole('button', { name: new RegExp(`^${ALL[0]!.name},`) }));

    expect(await screen.findByText(`Détail ${ALL[0]!.id}`)).toBeOnTheScreen();
  });
});
