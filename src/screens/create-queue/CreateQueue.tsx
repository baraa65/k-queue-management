import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
  TextInput,
  SectionList,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { observer } from 'mobx-react';
import { usersStore } from '../../stores/users';
import { queuesStore } from '../../stores/queues';
import { User } from '../../types/user';
import { RootStackParamList } from '../../Main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

function CreateQueue({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CreateQueue'>) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  const [title, setTitle] = useState<string>('');
  const [members, setMembers] = useState<User[]>([]);

  const addMember = (user: User) => {
    setMembers([...members, user]);
  };

  const isValidForm = () => {
    return title.length && members.length;
  };

  const handleSave = () => {
    if (!isValidForm()) return;

    queuesStore.addQueue({
      title,
      members,
      activeMemberId: members[0].id,
    });
    navigation.navigate('Home');
  };

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 5 }}>
        <TextInput
          style={{ flex: 1 }}
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder="Title"
        />
        <View style={{ width: 100 }}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {members.map((m, i) => (
            <View key={i} style={{ padding: 5 }}>
              <Text>{m.username}</Text>
            </View>
          ))}
        </ScrollView>
        <SectionList
          style={{ backgroundColor: 'gray' }}
          sections={[
            {
              data: usersStore.users.filter(
                u => !members.map(m => m.id).includes(u.id),
              ),
            },
          ]}
          keyExtractor={item => item?.id || ''}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.username}</Text>
              <View style={{ width: 100 }}>
                <Button title="add" onPress={() => addMember(item)} />
              </View>
            </View>
          )}
          renderSectionHeader={({}) => <></>}
        />
      </View>
    </View>
  );
}

export default observer(CreateQueue);
