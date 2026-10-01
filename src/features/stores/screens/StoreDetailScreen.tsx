import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { StateView } from '../../../components/StateView';
import type { RootStackScreenProps } from '../../../navigation/types';
import { colors } from '../../../theme';
import { FavoriteButton } from '../../favorites/components/FavoriteButton';
import { OpeningHoursTable } from '../components/OpeningHoursTable';
import { useStore } from '../hooks/useStores';

export function StoreDetailScreen({ route, navigation }: RootStackScreenProps<'StoreDetail'>) {
  const { storeId } = route.params;
  const { data: store, error, isPending, isError, refetch } = useStore(storeId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: store?.name ?? 'Magasin',
      headerRight: store ? () => <FavoriteButton store={store} /> : undefined,
    });
  }, [navigation, store]);

  if (isPending) return <StateView variant="loading" />;
  if (isError) return <StateView variant="error" message={error.message} onRetry={() => void refetch()} />;

  return (
    <ScrollView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: store.latitude,
          longitude: store.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: store.latitude, longitude: store.longitude }}
          title={store.name}
          description={store.address}
        />
      </MapView>

      <View style={styles.section}>
        <Text style={styles.title} role="heading">
          {store.name}
        </Text>
        <Text style={styles.muted}>
          {store.address}, {store.city}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle} role="heading">
          Horaires
        </Text>
        <OpeningHoursTable hours={store.openingHours} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  map: { height: 220 },
  section: { padding: 16, gap: 4 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 },
  muted: { color: colors.textMuted },
});
