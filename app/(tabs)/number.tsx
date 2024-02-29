import { Input, Text, Label, XStack, YStack, Button, Spinner } from 'tamagui';
import { useColorScheme } from 'react-native';
import { graphql } from '@/graphql/client';
import { useQuery } from 'urql';
import { useState } from 'react';

const numberFactQuery = graphql(`
  query numberFact($number: Int!) {
    numberFact(number: $number) {
      text
    }
  }
`);

export default function TabTwoScreen() {
  const color = useColorScheme();
  const [inputValue, setInputValue] = useState<number | undefined>();

  const [{ data, fetching }, executeFactQuery] = useQuery({
    query: numberFactQuery,
    variables: {
      number: inputValue!,
    },
    pause: true,
  });

  return (
    <YStack
      gap="$4"
      justifyContent="center"
      flex={1}
      mx={10}
      alignContent="center"
    >
      {fetching ? <Spinner /> : null}
      <Text
        fontSize="$8"
        color={'$green10Dark'}
        textAlign="center"
        theme={color}
      >
        {data?.numberFact.text}
      </Text>

      <XStack alignItems="center" columnGap="$2" mt="$41">
        <Input
          flex={1}
          value={inputValue?.toString() ?? ''}
          onChangeText={(text) => {
            if (text === '') {
              setInputValue(undefined);
            }

            if (!isNaN(parseInt(text))) {
              setInputValue(parseInt(text));
            }
          }}
          placeholder="Enter a number"
          keyboardType="number-pad"
          theme={color}
          borderColor="$green10Dark"
        />
        <Button
          size="$4"
          backgroundColor="$green10Dark"
          onPress={executeFactQuery}
        >
          Search
        </Button>
      </XStack>
    </YStack>
  );
}
