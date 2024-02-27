import { Input, Text, Label, XStack, YStack } from 'tamagui';
import { SelectNumberType } from '@/components/Select';
import { useColorScheme } from 'react-native';

export default function TabTwoScreen() {
  const color = useColorScheme();

  return (
    <YStack
      gap="$4"
      justifyContent="center"
      flex={1}
      mx={10}
      alignContent="center"
    >
      <XStack gap="$2">
        <Label theme={color}>Custom</Label>

        <SelectNumberType />
      </XStack>
      <Text theme={color}>Hello</Text>
      <Input size="$4" borderWidth={2} keyboardType="numeric" />
    </YStack>
  );
}
