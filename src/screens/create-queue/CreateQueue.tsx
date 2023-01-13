import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { QueueMember } from '../../types/queue-member';
import { observer } from 'mobx-react';

function CreateQueue() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  const [text, setText] = useState<string>('');
  const [members, setMembers] = useState<QueueMember[]>([{ name: 'Baraa' }]);

  const handleSubmitMember = () => {
    if (text.length) {
      setMembers([...members, { name: text }]);
      setText('');
    }
  };

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View style={{ padding: 5 }}>
        <TextInput placeholder="Title" />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {members.map((m, i) => (
            <View key={i} style={{ padding: 5 }}>
              <Text>{m.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          paddingRight: 5,
          paddingLeft: 5,
        }}>
        <TextInput
          style={{ flex: 1, color: 'black' }}
          value={text}
          onChangeText={val => setText(val)}
          onSubmitEditing={handleSubmitMember}
        />
        {!!text.length && (
          <View>
            <Button type="outline" title="Add" onPress={handleSubmitMember} />
          </View>
        )}
      </View>
    </View>
  );
}

export default observer(CreateQueue);
