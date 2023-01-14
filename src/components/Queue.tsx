import React from 'react';

import { Text, View } from 'react-native';

interface QueueProps {
  title: string;
  onPress: () => void;
}

export const Queue = ({ title, onPress }: QueueProps) => {
  const style = { padding: 15, margin: 50 };

  return (
    <View style={style} onTouchEnd={() => onPress()}>
      <Text>{title}</Text>
    </View>
  );
};
