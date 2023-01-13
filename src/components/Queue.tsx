import React from 'react';

import { Text, View } from 'react-native';

interface QueueProps {
  title: string;
}

export const Queue = ({ title }: QueueProps) => {
  const style = { padding: 15, margin: 50 };

  return (
    <View style={style}>
      <Text>{title}</Text>
    </View>
  );
};
