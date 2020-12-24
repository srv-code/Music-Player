import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface HeaderProps {
  style?: ViewStyle;
  title: string;
  icon: 'APP' | 'MUSIC' | 'VIDEO' | 'SETTINGS';
}

const Header: React.FC<HeaderProps> = (props) => {
  const styles = StyleSheet.create({
    container: {
      ...props.style,
    },
  });

  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
};

export default Header;
