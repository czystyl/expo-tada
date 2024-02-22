import { StyleSheet } from 'react-native';
import { useQuery } from 'urql';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/utils/urqlClient';

const HelloQuery = graphql(`
  query Todos($name: String) {
    hello(name: $name)
  }
`);

export default function TabOneScreen() {
  const [result] = useQuery({
    query: HelloQuery,
    variables: {
      name: 'Luke Skywalker',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{result.data?.hello}</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
