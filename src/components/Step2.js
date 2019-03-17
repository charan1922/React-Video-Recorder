import React, { Component } from 'react';
import CustomButton from '../common/CustomButton';

const constraintObj = {
    audio: true,

    video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
    }
};


class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chunks: [],
            mediaStreamObj: {}
        }
    }

    componentDidMount() {
    }

    startRecording = async () => {
        try {
            let mediaStreamObj = await navigator.mediaDevices.getUserMedia(constraintObj)
            this.setState({ mediaStreamObj })
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                // video.srcObject = mediaStreamObj;
            } else {
                //old version
                // video.src = window.URL.createObjectURL(mediaStreamObj);
            }
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            mediaRecorder.ondataavailable = event => chunks.push(event.data);
            mediaRecorder.start();
            this.setState({ chunks, mediaRecorder , recording : true})
        }
        catch (err) {
            console.log(err.name, err.message);
        }
    }

    stopRecording = () => {
        this.state.mediaRecorder.stop();
        this.state.mediaRecorder.onstop = (ev) => {
            let blob = new Blob(this.state.chunks, { 'type': 'video/mp4;' });
            let videoURL = window.URL.createObjectURL(blob);
            this.setState({ videoURL ,  recording : true })
        }
    }


    render() {

        return (
            <div>
                <video width="320" height="240" autoplay muted>
                    <source src={this.state.mediaStreamObj} autoplay muted />
                </video >
                <div>
                   { !this.state.recording  ? <CustomButton onClick={this.startRecording} variant={"contained"} color={"secondary"} text={"start recording"} /> :
                    <CustomButton onClick={this.stopRecording} variant={"contained"} color={"secondary"} text={"stop recording"} />} 
                    <CustomButton onClick={this.startRecording} variant={"contained"} color={"secondary"} text={"redo"} disabled={!this.state.recording} />
                </div>
                {this.state.videoURL ? <video src={this.state.videoURL} controls></video> : " "}
            </div>
        );
    }
}

export default Step2;