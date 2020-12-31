import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, View, Text, Modal } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { PlayList, PlayListItem } from '../../constant/app';

interface MusicPlayerProps {
  style?: ViewStyle;
  visible: boolean;
  playlist: PlayList;
  startItemId: string;
  onRequestClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number>();

  const styles = StyleSheet.create({
    container: {
      // height: '70%',
      // backgroundColor: 'red',

      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(100,100,100, 0.5)',
    },
    button: {
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
  });

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

  const closePlayer = () => {
    // destroy TrackPlayer
    TrackPlayer.destroy();

    props.onRequestClose();
  };

  const resetPlayer = () => {
    TrackPlayer.reset();
  };

  const playPlayer = () => {
    TrackPlayer.play();
  };

  const pausePlayer = () => {
    TrackPlayer.pause();
  };

  const stopPlayer = () => {
    TrackPlayer.stop();
  };

  const seekPlayer = (seconds: number) => {
    TrackPlayer.seekTo(seconds);
  };

  const setPlayerVolume = (volume: number) => {
    TrackPlayer.setVolume(volume);
  };

  const getPlayerVolume = () => {
    TrackPlayer.getVolume();
  };

  // To implement the follwoing player functions:
  //  getQueue()
  //  add(tracks, insertBeforeId)
  //  remove(tracks)
  //  skip(id)
  //  skipToNext()
  //  skipToPrevious()
  //  getTrack(id)
  //  getCurrentTrack()
  //  getQueue()
  //  removeUpcomingTracks()
  //  updateMetadataForTrack(id, metadata)
  //  updateOptions(options)
  //  setRate(rate)
  //  getRate()
  //  getDuration()
  //  getPosition()

  console.log('TrackPlayer.STATE_PLAYING:', TrackPlayer.STATE_PLAYING);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      hardwareAccelerated
      onRequestClose={closePlayer}>
      <View style={styles.container}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 0.85,

            // paddingTop: 25,
            backgroundColor: 'white',
            alignItems: 'center',
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            width: '100%',
          }}>
          <View>
            <Text>Music Player Screen</Text>
            <Button style={styles.button} onPress={closePlayer}>
              <Text style={styles.buttonText}>Close</Text>
            </Button>
            <View>
              <Button light style={styles.button} onPress={resetPlayer}>
                <Text style={styles.buttonText}>Reset</Text>
              </Button>
              <Button style={styles.button} onPress={playPlayer}>
                <Text style={styles.buttonText}>Play</Text>
              </Button>
              <Button style={styles.button} onPress={pausePlayer}>
                <Text style={styles.buttonText}>Pause</Text>
              </Button>
              <Button style={styles.button} onPress={stopPlayer}>
                <Text style={styles.buttonText}>Stop</Text>
              </Button>
            </View>
          </View>
          <View>
            <Text>ProgressComponent</Text>
            {/* <ProgressComponent /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MusicPlayer;
