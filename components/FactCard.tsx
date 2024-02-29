import { FragmentOf, graphql, readFragment } from '@/graphql/client';

import { Button, Card, H3, Paragraph, View, XStack, YStack } from 'tamagui';
import { ExternalLink } from './ExternalLink';

export const FactFragment = graphql(`
  fragment FactFragment on RandomFact {
    id
    text
    sourceUrl
  }
`);

type Props = {
  data?: FragmentOf<typeof FactFragment>;
};

export function FactCard({ data }: Props) {
  const fact = readFragment(FactFragment, data);

  if (!fact) {
    return <YStack mih={300} />;
  }

  return (
    <Card elevate bordered size="$4" animation="bouncy" mih={300} scale={0.9}>
      <Card.Header>
        <H3>Random Fact</H3>
        <Paragraph theme="alt2">{fact.id}</Paragraph>
      </Card.Header>
      <View mx="$4" backgroundColor="$black025">
        <Paragraph>{fact.text}</Paragraph>
      </View>
      <Card.Footer padded>
        <XStack flex={1} />

        <ExternalLink href={fact.sourceUrl} asChild>
          <Button borderRadius="$10">Source</Button>
        </ExternalLink>
      </Card.Footer>
    </Card>
  );
}
