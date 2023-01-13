import React, { useEffect } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Queue } from '../../components/Queue';
import { FAB, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { queuesStore } from '../../stores/queues';
import { observer } from 'mobx-react';

const Home = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  useEffect(() => {
    queuesStore.getQueues();
  }, []);

  const handlePress = () => {
    navigation.navigate('CreateQueue');
  };

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>test</Text>
        {queuesStore.queues.map(queue => (
          <Queue key={queue.id} title={queue.title} />
        ))}
      </ScrollView>
      <FAB
        icon={<Icon name="comments" size={10} color="white" />}
        placement={'right'}
        onPress={handlePress}
      />
    </View>
  );
};

export default observer(Home);
