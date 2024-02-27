import { useQuery } from 'urql';
import { graphql } from '@/graphql/client';

import { Button, Spinner, YStack } from 'tamagui';
import { FactCard, FactFragment } from '@/components/FactCard';

const FactQuery = graphql(
  `
    query RandomFact {
      randomFact {
        id
        ...FactFragment
      }
    }
  `,
  [FactFragment]
);

export default function TabOneScreen() {
  const [{ data, fetching }, executeQuery] = useQuery({ query: FactQuery });

  return (
    <YStack justifyContent="center" flex={1} mx={10}>
      <Button onPress={() => executeQuery({ requestPolicy: 'network-only' })}>
        Fetch fact
        {fetching && <Spinner size="small" color="$green10" />}
      </Button>

      <FactCard data={data?.randomFact} />
    </YStack>
  );
}
