import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../theme';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function OpeningHoursTable({ hours }: { hours: string[] }) {
  return (
    <View>
      {DAYS.map((day, i) => (
        <View key={day} style={styles.row}>
          <Text style={styles.text}>{day}</Text>
          <Text style={styles.text}>{hours[i]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  text: { color: colors.text },
});
