import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, View, Text, Modal } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { PlayList, PlayListItem } from '../../constant/app';

interface MusicPlayerProps {
  style?: ViewStyle;
  visible: boolean;
  playlist: PlayList;
  startItemId: string;
  onRequestClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
  const styles = StyleSheet.create({});
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number>();

  useEffect(() => {
    setCurrentlyPlayingIndex(
      props.playlist.items.findIndex(
        (item: PlayListItem) => item.id === props.startItemId,
      ),
    );
  }, []);

  useEffect(() => {
    if (currentlyPlayingIndex !== undefined) {
      let item: PlayListItem = props.playlist.items[currentlyPlayingIndex];

      console.log('currently playing item:', item);
      // Creates the player
      TrackPlayer.setupPlayer()
        .then(async () => {
          // Adds a track to the queue
          await TrackPlayer.add({
            id: item.id,
            // url: item.url, // TODO revert
            url: require('../../../assets/demo/sample_track_01.mp3'),
            title: item.title,
            artist: item.artist,
            // artwork: item.artwork, // TODO revert
            artwork: require('../../../assets/demo/sample_artwork_01.jpg'),
          });

          // Starts playing it
          TrackPlayer.play();
        })
        .catch((e) =>
          console.error('FATAL: failed to play using TrackPlayer: reason:', e),
        );
    }
  }, [currentlyPlayingIndex]);

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={props.visible}
      hardwareAccelerated
      onRequestClose={props.onRequestClose}>
      <View>
        <Text>Music Player Screen</Text>
        <Button
          primary
          style={{
            paddingHorizontal: 20,
          }}
          onPress={props.onRequestClose}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Close
          </Text>
        </Button>
      </View>
      <View></View>
    </Modal>
  );
};

export default MusicPlayer;
