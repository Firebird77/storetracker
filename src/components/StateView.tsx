import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type StateViewProps =
  | { variant: 'loading' }
  | { variant: 'error'; message: string; onRetry: () => void }
  | { variant: 'empty'; message: string };

export function StateView(props: StateViewProps) {
  return (
    <View style={styles.container}>
      {props.variant === 'loading' ? (
        <ActivityIndicator size="large" color={colors.primary} aria-label="Chargement" />
      ) : null}
      {props.variant === 'error' ? (
        <>
          <Text style={styles.error} role="alert">
            {props.message}
          </Text>
          <Button title="Réessayer" onPress={props.onRetry} color={colors.primary} />
        </>
      ) : null}
      {props.variant === 'empty' ? <Text style={styles.message}>{props.message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  message: { color: colors.textMuted, textAlign: 'center' },
  error: { color: colors.danger, textAlign: 'center' },
});
