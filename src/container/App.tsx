import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Container, Header, Content, Toast } from 'native-base';
import labels from '../label/app';
import { defaultScreen, Screen } from '../constant/app';
import { Keys } from '../constant/global/keys';
import { getItem } from '../util/LocalStorage';
import { OperationResult, OperationStatus } from '../constant/localStorage';
import LastPlayed from './lastPlayed/LastPlayed';

const App = () => {
  const [screen, setScreen] = useState<Screen>();

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
    switch (screen) {
      // case Screen.playlists:
      //   return <Playlists />;
      // case Screen.music:
      //   return <Music />;
      // case Screen.video:
      //   return <Video />;
      // case Screen.settings:
      //   return <Settings />;
      case Screen.lastPlayed:
      default:
        return <LastPlayed />;
    }
  };

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header style={styles.container}>
          <Text>{screen}</Text>
        </Header>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Content>{renderScreen()}</Content>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default App;
