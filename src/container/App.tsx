import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { Container, Header, Content, Toast, Button } from 'native-base';
import labels from '../label/app';
import { defaultScreen, PlayList, PlayListItem, Screen } from '../constant/app';
import { Keys } from '../constant/global/keys';
import { getItem } from '../util/LocalStorage';
import { OperationResult, OperationStatus } from '../constant/localStorage';
import LastPlayed from './lastPlayed/LastPlayed';
import MusicPlayer from './musicPlayer/MusicPlayer';

const App = () => {
  const [screen, setScreen] = useState<Screen>();
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);

  useEffect(() => {
    if (!screen) {
      console.log('loading');
      let getResult: OperationResult = getItem(Keys.defaultScreen);
      console.log('getResult:', getResult.value || Screen.lastPlayed);
      if (getResult.status === OperationStatus.SUCCESS)
        setScreen(getResult.value || Screen.lastPlayed);
      else {
        // Toast.show({
        //   text: labels.failedToFetchFromLocalStorage,
        //   buttonText: labels.okay,
        //   type: 'danger',
        // });
      }
    }
  }, []);

  const styles = StyleSheet.create({
    container: {},
    scrollView: {},
    content: {},
  });

  const renderScreen = () => {
    const renderPlayer = () => {
      const demoPlayListItem: PlayListItem = {
        id: 'shdgjs',
        url: '../../assets/demo/sample_track_01.mp3',
        title: 'New Song',
        artist: 'Michael Jackson',
        artwork: '../../assets/demo/sample_artwork_01.jpg',
      };
      const demoPlayList: PlayList = {
        id: 'pl001',
        name: 'Untitled Playlist 1',
        items: [demoPlayListItem],
      };

      return (
        <MusicPlayer
          visible={showPlayerModal}
          playlist={demoPlayList}
          startItemId={demoPlayListItem.id}
          onRequestClose={() => setShowPlayerModal(false)}
        />
      );
    };

    // switch (screen) {
    //   // case Screen.playlists:
    //   //   return <Playlists />;
    //   // case Screen.music:
    //   //   return <Music />;
    //   // case Screen.video:
    //   //   return <Video />;
    //   // case Screen.settings:
    //   //   return <Settings />;
    //   case Screen.lastPlayed:
    //   default:
    //     return <LastPlayed />;
    // }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        {showPlayerModal && renderPlayer()}
        <Button
          primary
          style={{
            paddingHorizontal: 20,
          }}
          onPress={() => setShowPlayerModal(true)}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Play demo song
          </Text>
        </Button>
      </View>
    );
  };

  return (
    <Container style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header style={styles.container}>
          <Text>{screen}</Text>
        </Header>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}>
          <Content
            style={{
              flex: 1,
              backgroundColor: 'green',
            }}>
            {renderScreen()}
          </Content>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default App;
