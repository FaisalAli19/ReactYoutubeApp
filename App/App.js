import lodash from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";

import SearchBar from "search_bar";
import VideoList from "video_list";
import VideoDetail from "video_detail";

//css
require("style-loader!css-loader!sass-loader!./styles/app.scss");

const API_KEY = "AIzaSyAdaYPROTu0iQBK6ALWEjoI93UDwWUl2Ak";

class App extends Component  {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("Best Bollywood Songs 2017");
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            console.log('videos', videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            //similar to this.setStates({videos: videos});
        });
    }

    render () {
        const videoSearch = lodash.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div >
                <div className="search">
                    <SearchBar onSearchTermChange={videoSearch} />
                </div>
                <div className="row">
                    <VideoDetail video={this.state.selectedVideo}/>
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos={this.state.videos}/>
                </div>
            </div>
        );
    }
}

const app = document.getElementById("app");

ReactDOM.render(
    <App />,
    app
);
