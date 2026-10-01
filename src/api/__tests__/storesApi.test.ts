import { MOCK_STORES } from '../mockStores';
import { searchStores } from '../storesApi';

describe('searchStores', () => {
  it('contient au moins 50 magasins', () => {
    expect(MOCK_STORES.length).toBeGreaterThanOrEqual(50);
  });

  it('pagine les résultats', () => {
    const first = searchStores(MOCK_STORES, 1, 20);
    const last = searchStores(MOCK_STORES, 5, 20);

    expect(first.items).toHaveLength(20);
    expect(first.hasMore).toBe(true);
    expect(last.hasMore).toBe(false);
  });

  it('filtre par nom sans tenir compte de la casse', () => {
    const result = searchStores(MOCK_STORES, 1, 100, 'CASA');

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((s) => s.name.includes('Casa Nova'))).toBe(true);
  });
});
