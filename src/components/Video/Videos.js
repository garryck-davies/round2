import React, {Component} from 'react';
import Iframe from 'react-iframe';
import axios from 'axios';
import './Videos.css'

export default class Videos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUrl: '',
            videoList: []
        }
    }

    componentDidMount () {
        axios.get('https://www.googleapis.com/youtube/v3/search?q=&maxResults=50&part=snippet&key=AIzaSyDu1IE4XvJ7njWQoybNu9IlLae9t5R8pW8').then(res => {
            console.log(res.data)
            axios.post('/api/videos', {videos: res.data.items})
            .then((res) => {
                this.setState({videoList: res.data})
                console.log(res.data)
            })
        })
        
    }
    addUrl(id) {
        this.setState({currentUrl: id})
    }
id

    render() {
        const videoList = this.state.videoList.map((video, i) => {
           return <img onClick={() => this.addUrl(video.id.videoId)} src={video.snippet.thumbnails.default.url} alt="thumbnail"/>
        })
        console.log(this.state.currentUrl)
        return(
            <div className="main-container">
           {videoList}     
           
            <div className="video-container">
            <Iframe url={`https://www.youtube.com/embed/${this.state.currentUrl}`}
                width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        allowFullScreen/>
            </div>
             </div>
        )
        }
}