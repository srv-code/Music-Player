import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import Header from '../component/header/Header';
import labels from '../label/app';

const App = () => {
  const styles = StyleSheet.create({
    scrollView: {},
  });

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}></ScrollView>
        <Header title={labels.appTitle} icon="APP" />
      </SafeAreaView>
    </View>
  );
};

export default App;
