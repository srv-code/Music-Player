import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Container from '../component/container/Container';
import labels from '../label/app';

const App = () => {
  const styles = StyleSheet.create({});

  return (
    <Container headerInfo={{ title: labels.appTitle, type: 'APP' }}>
      <Text>body</Text>
    </Container>
  );
};

export default App;
