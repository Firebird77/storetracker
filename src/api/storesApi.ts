import { config } from './config';
import { MOCK_STORES } from './mockStores';
import type { Page, Store } from './types';

const simulateNetwork = async () => {
  await new Promise((resolve) => setTimeout(resolve, config.mockLatencyMs));
  if (Math.random() < config.mockErrorRate) {
    throw new Error('Erreur réseau, veuillez réessayer.');
  }
};

export const searchStores = (stores: Store[], page: number, pageSize: number, search = ''): Page<Store> => {
  const term = search.trim().toLowerCase();
  const filtered = term ? stores.filter((s) => s.name.toLowerCase().includes(term)) : stores;
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    page,
    hasMore: start + pageSize < filtered.length,
  };
};

export const storesApi = {
  async getStores(page: number, search: string): Promise<Page<Store>> {
    await simulateNetwork();
    return searchStores(MOCK_STORES, page, config.pageSize, search);
  },

  async getStore(id: string): Promise<Store> {
    await simulateNetwork();
    const store = MOCK_STORES.find((s) => s.id === id);
    if (!store) throw new Error('Magasin introuvable');
    return store;
  },
};
