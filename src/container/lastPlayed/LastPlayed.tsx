import React from 'react';
import { StyleSheet, ViewStyle, View, Text } from 'react-native';

interface LastPlayedProps {
  style?: ViewStyle;
}

const LastPlayed: React.FC<LastPlayedProps> = (props) => {
  return (
    <View>
      <Text>Last Played</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LastPlayed;
