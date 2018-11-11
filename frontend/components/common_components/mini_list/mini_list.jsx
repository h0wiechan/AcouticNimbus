import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchLikes } from "../../../actions/like_actions";
import { fetchComments } from "../../../actions/comment_actions";
import { isEmpty } from "../../../util/general_api_util"
import { relatedSongsOf } from "../../../util/song_api_util";
import { likesOf } from "../../../util/like_api_util";
import { commentsOf } from "../../../util/comment_api_util";
import MiniListItem from "./mini_list_item";

const msp = (state, ownProps) => {
    const song = ownProps.song;
    const songId = ownProps.songId;
    const currentLikes = ownProps.currentLikes;
    return ({
        // songs: isEmpty(state.entities.songs) ? null : state.entities.songs,
        // comments: isEmpty(state.entities.comments) ? null : state.entities.comments,
        song: song,
        songId: songId,
        songs: state.entities.songs,
        likes: state.entities.likes,
        comments: state.entities.comments,
        latestThreeLikes: currentLikes ? currentLikes.slice(0, 3) : null,
    })
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchComments: () => dispatch(fetchComments()),
    });
}

class MiniList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSongs().then(
            this.props.fetchLikes().then(
                this.props.fetchComments()
            )
        )
    }

    render() {
        switch (this.props.klass) {
            case "likes-section":
                this.miniListItems = this.props.latestThreeLikes;
                break;
            case "song-show-page":
                // this.miniListItems = 
                break;
            default:
                break;
        }
        if (!isEmpty(this.props.songs) && this.miniListItems) {
            debugger
            return (
                <ul>
                    {this.miniListItems.map((like) => {
                        return (
                            <MiniListItem
                            key={like.id}
                            like={like}
                            song={this.props.songs[like.likeableId]}
                            songLikes={likesOf("Song", like.likeableId, this.props.likes)}
                            songComments={commentsOf(like.likeableId, this.props.comments)}
                            />
                        );
                    })}
                </ul>
            );    
        } else {
            debugger
            return null;
        }

    }
}

export default withRouter(connect(msp, mdp)(MiniList));