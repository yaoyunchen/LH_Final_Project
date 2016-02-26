import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';

import { PlayButton, Progress, Icons } from 'react-soundplayer/components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';


const {
    SoundCloudLogoSVG,
    PlayIconSVG,
    PauseIconSVG,
    NextIconSVG,
    PrevIconSVG
} = Icons;


const clientId = 'fa2d3ee788a538551b4a812ccabaf9b9';
const streamUrl = 'https://soundcloud.com/thrilljockey/future-islands-balance';

class TrackInfo extends React.Component {
    render() {
        let { track } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>{track.title}</h2>
                <h3>{track.user.username}</h3>
            </div>
        );
    }
}

class PlayPause extends React.Component {
    togglePlay() {
        let { playing, soundCloudAudio } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    }

    render() {
        let { playing } = this.props;
        let text = playing ? 'Pause' : 'Play';

        // if (!track) {
        //     return <div>Loading...</div>;
        // }

        return (
            <button onClick={this.togglePlay.bind(this)}>
                {text}
            </button>
        );
    }
}


class MusicPlayer extends React.Component {
    // play() {
    //     let { soundCloudAudio, playing } = this.props;
    //     if (playing) {
    //         soundCloudAudio.pause();
    //     } else {
    //         soundCloudAudio.play();
    //     }
    // }

    render() {
        // let { track, playing } = this.props;

        // if (!track) {
        //     return <div>Loading...</div>;
        // }

        return (
            <SoundPlayerContainer streamUrl={streamUrl} clientId={clientId}>
              <TrackInfo />
              <PlayPause />
              
            </SoundPlayerContainer>
        );
    }
}

export default MusicPlayer
