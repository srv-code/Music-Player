import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {
  Container as NativeContainer,
  Header as NativeHeader,
  Content,
} from 'native-base';

interface ContainerProps {
  style?: ViewStyle;
  contentStyle: ViewStyle;
  headerInfo?: {
    type: 'APP' | 'MUSIC' | 'VIDEO' | 'SETTINGS';
    title: string;
  };
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  const styles = StyleSheet.create({
    container: {
      ...props.style,
    },
    scrollView: {},
    content: { ...props.contentStyle },
  });

  const renderHeader = () => (
    <NativeHeader style={styles.container}>
      <Text>{props.headerInfo?.title}</Text>
    </NativeHeader>
  );

  return (
    <NativeContainer style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {props.headerInfo && renderHeader()}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Content>{props.children}</Content>
        </ScrollView>
      </SafeAreaView>
    </NativeContainer>
  );
};

export default Container;
