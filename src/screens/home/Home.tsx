import React, { useEffect } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Queue } from '../../components/Queue';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { queuesStore } from '../../stores/queues';
import { observer } from 'mobx-react';
import { Queue as QueueType } from '../../types/queue';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  useEffect(() => {
    queuesStore.getQueues();
  }, []);

  const handlePress = () => {
    navigation.navigate('CreateQueue');
  };

  const goToQueueDetails = (queue: QueueType) => {
    navigation.navigate('QueueDetails', { id: queue.id || '' });
  };

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {queuesStore.queues.map(queue => (
          <Queue
            key={queue.id}
            title={queue.title}
            onPress={() => goToQueueDetails(queue)}
          />
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
