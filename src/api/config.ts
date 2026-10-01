export const config = {
  pageSize: Number(process.env.EXPO_PUBLIC_PAGE_SIZE ?? 20),
  mockLatencyMs: Number(process.env.EXPO_PUBLIC_MOCK_LATENCY_MS ?? 500),
  mockErrorRate: Number(process.env.EXPO_PUBLIC_MOCK_ERROR_RATE ?? 0),
};
