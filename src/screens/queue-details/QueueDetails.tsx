import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../../../App';
import { authStore } from '../../stores/auth';
import { queuesStore } from '../../stores/queues';
import { Queue } from '../../types/queue';

function QueueDetails({
  route,
}: NativeStackScreenProps<RootStackParamList, 'QueueDetails'>) {
  const [queue, setQueue] = useState<Queue | null>(null);

  useEffect(() => {
    setQueue(queuesStore.getQueue(route.params.id));
  }, [route.params.id]);

  const activeStyle = { backgroundColor: 'green' };
  const handleTurn = () => {
    queue?.nextTurn();
  };

  const canTakeTurn = () => {
    return queue?.activeMemberId === authStore.user?.id;
  };

  return (
    <View style={{ backgroundColor: Colors.darker, flex: 1 }}>
      <Text style={{ color: 'white' }}>{queue?.title}</Text>

      {queue?.members.map(member => (
        <View
          style={{
            ...(queue.activeMemberId === member.id ? activeStyle : {}),
            padding: 15,
          }}>
          <Text key={member.id}>{member.username}</Text>
        </View>
      ))}

      <View style={{ flex: 1 }} />
      {canTakeTurn() && (
        <View style={{ height: 50 }}>
          <Button title="I did my turn" onPress={handleTurn} />
        </View>
      )}
    </View>
  );
}

export default observer(QueueDetails);
