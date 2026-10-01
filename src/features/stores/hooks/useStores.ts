import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { storesApi } from '../../../api/storesApi';

export const useStoresInfinite = (search: string) => {
  const query = useInfiniteQuery({
    queryKey: ['stores', search],
    queryFn: ({ pageParam }) => storesApi.getStores(pageParam, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    placeholderData: (previous) => previous,
  });

  const stores = useMemo(() => query.data?.pages.flatMap((p) => p.items) ?? [], [query.data]);

  return { ...query, stores };
};

export const useStore = (id: string) =>
  useQuery({
    queryKey: ['store', id],
    queryFn: () => storesApi.getStore(id),
  });
