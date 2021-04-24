import AudioRecorderPlayer from 'react-native-audio-recorder-player';

let audioRecorderPlayer = undefined;
let currentPath = undefined;
let currentCallback = () => {};
let currentPosition = 0;

const AUDIO_STATUS = {
  play: 'play',
  begin: 'begin',
  pause: 'pause',
  resume: 'resume',
  stop: 'stop',
};

async function startPlayer(path, callback) {
  console.log({currentPath, path});

  if (currentPath === undefined) {
    currentPath = path;
    currentCallback = callback;
  } else if (currentPath !== path) {
    if (audioRecorderPlayer !== undefined) {
      try {
        await stopPlayer();
      } catch (error) {
        console.log('ERROR STOP PLAYER TOP');
      }
    }
    currentPath = path;
    currentCallback = callback;
  }

  if (audioRecorderPlayer === undefined) {
    audioRecorderPlayer = new AudioRecorderPlayer();
  }

  try {
    const activePath = await audioRecorderPlayer.startPlayer(currentPath);
    console.log({activePath});
    currentCallback({
      status:
        currentPath === path && currentPosition > 0
          ? AUDIO_STATUS.resume
          : AUDIO_STATUS.begin,
    });
    audioRecorderPlayer.addPlayBackListener(async (e) => {
      if (e.current_position === e.duration) {
        try {
          await stopPlayer();
        } catch (error) {
          console.log('ERROR STOP PLAYER IN LISTENER');
        }
      } else {
        currentCallback({
          status: AUDIO_STATUS.play,
          data: e,
          playPositionString: audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        });
      }
      return;
    });
  } catch (error) {
    console.log({'ERROR PLAY PLAYER': error});
  }
}

async function pausePlayer() {
  try {
    await audioRecorderPlayer.pausePlayer();
    currentCallback({status: AUDIO_STATUS.pause});
  } catch (error) {
    console.log({'ERROR PAUSE PLAYER': error});
  }
}

async function stopPlayer() {
  await audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
  currentPosition = 0;
  currentCallback({status: AUDIO_STATUS.stop});
  audioRecorderPlayer = undefined;
}

export {AUDIO_STATUS, startPlayer, stopPlayer, pausePlayer};

import Sound from 'react-native-sound';

let audioPlayer = null;

/*-------------- sound ----------------*/
const SetupPayer = (url: string) => {
  var audioPlayer = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Error loading sound: ' + error);
      return;
    } else {
      audioPlayer.play((success) => {
        if (success) {
          console.log('Sound playing');
        } else {
          console.log('Issue playing file');
        }
      });
    }
  });
  audioPlayer.setVolume(0.9);
  return audioPlayer;
};

// Get the current playback point in seconds
const getTotalTime = () => {
  audioPlayer.getDuration();
};

const getCurrentTime = () => {
  audioPlayer.getCurrentTime();
};

const pauseAudio = () => {
  audioPlayer.pause();
};

const stopAudio = () => {
  audioPlayer.stop();
};

const releaseAudio = () => {
  audioPlayer.release();
};

export {
  SetupPayer,
  getTotalTime,
  getCurrentTime,
  pauseAudio,
  stopAudio,
  releaseAudio,
};
