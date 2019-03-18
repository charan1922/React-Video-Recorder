import React, { Component } from 'react';
import MediaHandler from '../utils/MediaHandler';
import CustomButton from '../common/CustomButton';
import { connect } from "react-redux";
import { saveVideo2 } from '../actions';

class Step2 extends Component {
    constructor() {
        super();
        this.state = {
            hasMedia: false,
            videoURL: null,
            chunks: []
        };
        this.mediaHandler = new MediaHandler();
    }
    componentDidMount() {
        this.initiateRecording();
    }

    initiateRecording = () => {
        this.mediaHandler.getPermissions()
            .then((stream) => {
                try {
                    if ("srcObject" in this.myVideo) {
                        this.myVideo.srcObject = stream;
                        // this.my = stream;
                    } else { // for old browsers
                        this.myVideo.src = URL.createObjectURL(stream);
                    }
                    this.myVideo.play();
                    let mediaRecorder = new MediaRecorder(stream);
                    this.setState({ mediaRecorder })
                } catch (err) {
                    console.log(err.name, err.message);
                    alert(err.message);
                }
            })
    }

    startRecording = async () => {
        this.state.mediaRecorder.start();
        let chunks = [];
        this.state.mediaRecorder.ondataavailable = event => chunks.push(event.data);
        await this.setState({ hasMedia: true, chunks });

    }

    stopRecording = async () => {
        if (this.state.mediaRecorder) {
            this.state.mediaRecorder.stop();
            this.state.mediaRecorder.onstop = async (ev) => {
                let blob = new Blob(this.state.chunks, { 'type': 'video/mp4;' });
                let videoURL = window.URL.createObjectURL(blob);
                await this.setState({ mediaRecorder: null, videoURL });
                await this.props.saveVideo2(videoURL);
                this.props.handleNext();
            }
        }
    }

    redoRecording = () => {
        this.initiateRecording();
        this.setState({ hasMedia: false, videoURL: null });
    }

    render() {
        const { hasMedia, videoURL } = this.state
        return (
            <div className="video-container">
                <video className="my-video" onClick={this.startRecording} width="320" height="240" ref={(ref) => { this.myVideo = ref; }} autoPlay muted></video>
                <div className="btn-sec">
                    {!hasMedia ? <CustomButton onClick={this.startRecording} variant={"contained"} color={"secondary"} text={"start recording"} /> :
                        <a href={videoURL} download><CustomButton videoURL={videoURL} onClick={this.stopRecording} variant={"contained"} color={"secondary"} text={"stop recording"} disabled={!this.state.hasMedia} /></a>
                    }
                    <CustomButton onClick={this.redoRecording} variant={"contained"} color={"secondary"} text={"redo"} disabled={!this.state.hasMedia} />
                    {/* <video className="user-video" controls src={videoURL}></video> */}
                </div>
            </div>
        );
    }
}



const mapStateToProps = ({ SavedVideos }) => {
    const {
        video1,
        video2,
        video3,
    } = SavedVideos;


    return {
        video1,
        video2,
        video3,
    };
};
export default connect(
    mapStateToProps,
    {
        saveVideo2
    }
)(Step2);
