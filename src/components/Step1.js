import React, { Component } from 'react';
import MediaHandler from '../utils/MediaHandler';
import CustomButton from '../common/CustomButton';

class Step1 extends Component {
    constructor() {
        super();
        this.state = {
            hasMedia: false,
            videoURL: null
        };
        this.mediaHandler = new MediaHandler();
    }

    initiateRecording = () => {
        this.mediaHandler.getPermissions()
            .then((stream) => {
                try {
                    if ("srcObject" in this.myVideo) {
                        this.myVideo.srcObject = stream;
                    } else { // for old browsers
                        this.myVideo.src = URL.createObjectURL(stream);
                    }
                    this.myVideo.play();
                    let mediaRecorder = new MediaRecorder(stream);
                    let chunks = [];
                    mediaRecorder.ondataavailable = event => chunks.push(event.data);
                    mediaRecorder.start();
                    this.setState({ chunks, mediaRecorder })
                } catch (err) {
                    console.log(err.name, err.message);
                }
            })
    }

    startRecording = () => {
        this.setState({ hasMedia: true });
        this.initiateRecording();
    }

    stopRecording = () => {
        // if (this.state.mediaRecorder) {
        this.state.mediaRecorder.stop();
        this.state.mediaRecorder.onstop = (ev) => {
            let blob = new Blob(this.state.chunks, { 'type': 'video/mp4;' });
            let videoURL = window.URL.createObjectURL(blob);
            this.setState({ videoURL, mediaRecorder: null })
        }
        // }
    }

    redoRecording = () => {
        this.setState({ hasMedia: false, videoURL: null, mediaRecorder: null });
    }

    render() {
        const { hasMedia, videoURL } = this.state
        return (
            <div className="video-container">
                <video className="my-video" onClick={this.startRecording} width="320" height="240" ref={(ref) => { this.myVideo = ref; }} autoPlay muted></video>
                <div className="btn-sec">
                    {!hasMedia ? <CustomButton onClick={this.startRecording} variant={"contained"} color={"secondary"} text={"start recording"} /> :
                        <CustomButton onClick={this.stopRecording} variant={"contained"} color={"secondary"} text={"stop recording"} disabled={!this.state.hasMedia} />}
                    <CustomButton onClick={this.redoRecording} variant={"contained"} color={"secondary"} text={"redo"} disabled={!this.state.hasMedia} />
                    {/* <video className="user-video" controls src={videoURL} ref={(ref) => { this.userVideo = ref; }}></video> */}
                </div>
            </div>
        );
    }
}


export default Step1;