import React, {Component} from 'react';
import Iframe from 'react-iframe';
import axios from 'axios';
import './Videos.css'

export default class Videos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUrl: '',
            currentVideo: {},
            videoList: [],
            favorites: [],
            newUrl: {}
        }
    }

    componentDidMount () {
        axios.get('https://www.googleapis.com/youtube/v3/search?q=&maxResults=50&part=snippet&key=AIzaSyDu1IE4XvJ7njWQoybNu9IlLae9t5R8pW8').then(res => {
            console.log(res.data)
            axios.post('/api/videos', {videos: res.data.items})
            .then((res) => {
                this.setState({videoList: res.data})
                console.log(res.data)
            axios.get('/api/favorites').then(res => {
                this.setState({favorites: res.data})
            })
            })
        })
        
    }

    addUrl = (id, video) => {
        this.setState({
            currentUrl: id,
            currentVideo: video
        })
    }

    addIt(){
        // console.log(value)
        axios.post('/api/addIt', {video: this.state.currentVideo}).then(res => {
            this.setState({
                favorites: res.data 
            })
        })
    }

    render() {
        console.log(this.state.currentVideo)
        const videoList = this.state.videoList.map((video, i) => {
           return <img onClick={() => this.addUrl(video.id.videoId, video)} src={video.snippet.thumbnails.default.url} alt="thumbnail"/>
        })
        console.log(this.state.currentUrl)
        const favorites = this.state.favorites.map((video, i) => {
            return <img onClick={() => this.addUrl(video.id.videoId)} src=
            {video.snippet.thumbnails.default.url} alt="thumbnail" />
        })
        console.log(this.state.favorites)
        return(
            <div className="main-container">
                <div className="vidlist">
                    {videoList}     
                </div>
            <div className="video-container">
            <Iframe url={`https://www.youtube.com/embed/${this.state.currentUrl}`}
                width="550px"
        height="550px"
        id="myId"
        className="myClassname"
        allowFullScreen/>
            </div>
            <div className="favorite">
                {favorites}
                {console.log(this.state.favorites)}
            <button onClick={e => this.addIt(e.target.value)}>Add To Playlist</button>
            </div>
             </div>
        )
        }
}