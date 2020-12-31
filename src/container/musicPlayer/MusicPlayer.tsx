import { Button, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { PlayList, PlayListItem } from '../../constant/app';
import Slider from '@react-native-community/slider';

interface MusicPlayerProps {
  style?: ViewStyle;
  visible: boolean;
  playlist: PlayList;
  startItemId: string;
  onRequestClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
  const [
    currentlyPlayingSong,
    setCurrentlyPlayingSong,
  ] = useState<PlayListItem>();

  const styles = StyleSheet.create({
    container: {
      // height: '70%',
      // backgroundColor: 'red',

      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // justifyContent: 'flex-end',
      backgroundColor: 'rgba(100,100,100, 0.5)',
    },
    button: {
      // width: 100,
      // height: 100,
      // alignItems: 'center',
      // justifyContent: 'center',
      // borderRadius: 78,
      backgroundColor: 'white',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
  });

  useEffect(() => {
    setCurrentlyPlayingSong(
      props.playlist.items.find(
        (item: PlayListItem) => item.id === props.startItemId,
      ),
    );
  }, []);

  useEffect(() => {
    if (currentlyPlayingSong) {
      console.log('currently playing item:', currentlyPlayingSong);
      // Creates the player
      TrackPlayer.setupPlayer()
        .then(async () => {
          // Adds a track to the queue
          await TrackPlayer.add({
            id: currentlyPlayingSong.id,
            // url: currentlyPlayingSong.url, // TODO revert
            url: require('../../../assets/demo/sample_track_01.mp3'),
            title: currentlyPlayingSong.title,
            artist: currentlyPlayingSong.artist,
            // artwork: currentlyPlayingSong.artwork, // TODO revert
            artwork: require('../../../assets/demo/sample_artwork_01.jpg'),
          });

          // Starts playing it
          // TrackPlayer.play(); // TODO uncomment
        })
        .catch((e) =>
          console.error('FATAL: failed to play using TrackPlayer: reason:', e),
        );
    }
  }, [currentlyPlayingSong]);

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

  const skipPlayerToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const skipPlayerToNext = () => {
    TrackPlayer.skipToNext();
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

  const renderButton = (
    size: 'PRIMARY' | 'SECONDARY',
    iconColor: string,
    iconName: string,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      onPress={() => {
        console.log(
          'TrackPlayer.STATE_PLAYING:',
          TrackPlayer.STATE_PLAYING,
          ', TrackPlayer.STATE_PAUSED:',
          TrackPlayer.STATE_PAUSED,
          ', TrackPlayer.STATE_READY:',
          TrackPlayer.STATE_READY,
          ', TrackPlayer.STATE_STOPPED:',
          TrackPlayer.STATE_STOPPED,
        );
        onPress();
      }}>
      <Icon
        type="FontAwesome5"
        name={iconName}
        style={{
          fontSize: size === 'PRIMARY' ? 90 : 60,
          color: iconColor,
        }}
      />
    </TouchableOpacity>
  );

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
            borderRadius: 8,
            flex: 0.98,

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
            width: '96%',

            paddingVertical: 40,
          }}>
          <View
            style={{
              elevation: 10,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              // borderWidth: 1,
              borderColor: 'black',
              overflow: 'hidden',
              borderRadius: 10,
            }}>
            <Image
              source={require('../../../assets/demo/sample_artwork_01.jpg')}
              style={{
                resizeMode: 'cover',
                height: 300,
                width: 300,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 60,
              // borderWidth: 1,
              height: '40%',
            }}>
            <Slider
              style={{
                marginVertical: 10,
                height: 20,
                width: 350,
                borderRadius: 20,
              }}
              minimumValue={0}
              maximumValue={1}
              value={0.25}
              minimumTrackTintColor="#111000"
              maximumTrackTintColor="#000000"
              //  onSlidingStart={slidingStarted}
              //  onSlidingComplete={slidingCompleted}
              thumbTintColor="#000"
            />
            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              {renderButton(
                'SECONDARY',
                '#5858a7',
                'step-backward',
                skipPlayerToPrevious,
              )}
              {renderButton(
                'PRIMARY',
                '#8989ff',
                TrackPlayer.STATE_PLAYING ? 'play' : 'pause',
                TrackPlayer.STATE_PLAYING ? pausePlayer : playPlayer,
              )}
              {renderButton(
                'SECONDARY',
                '#5858a7',
                'step-forward',
                skipPlayerToNext,
              )}

              {/* // name={'step-forward'}
        // name={'step-backward'} */}
              {/* <Button style={styles.button} onPress={closePlayer}>
                <Icon
                  type="FontAwesome5"
                  name="play"
                  style={{
                    fontSize: 50,
                    color: 'lightblue',
                  }}
                />
              </Button>
              <Button style={styles.button} onPress={pausePlayer}>
                <Icon
                  type="FontAwesome5"
                  name="play"
                  style={{
                    fontSize: 50,
                    color: 'lightblue',
                  }}
                />
              </Button> */}
            </View>

            <View
              style={{
                
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Icon
                  type="MaterialIcons"
                  name="playlist-play"
                  style={{
                    fontSize: 35,
                    color: 'blue',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View>
            <Text>Music Player Screen</Text>
            <Buttlon style={styles.button} onPress={closePlayer}>
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
            // <ProgressComponent />
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default MusicPlayer;
