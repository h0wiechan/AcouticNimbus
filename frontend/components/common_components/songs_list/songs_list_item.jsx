import React from "react";
import { Link } from "react-router-dom";
import Player from "../player";

class SongsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none",
        };
        this.renderItemCreationTime = this.renderItemCreationTime.bind(this);
    }

    renderItemCreationTime(date) {
        const itemLife = Math.abs(new Date() - new Date(date)) / 1000;
        if (itemLife < 60) {
            const unit = Math.floor(itemLife) > 1 ? "seconds" : "second";
            return `${Math.floor(itemLife)} ${unit} ago`;
        } else if (itemLife < 3600) {
            const unit = Math.floor(itemLife / 60) > 1 ? "minutes" : "minute";
            return `${Math.floor(itemLife / 60)} ${unit} ago`;
        } else if (itemLife < 86400) {
            const unit = Math.floor(itemLife / 3600) > 1 ? "hours" : "hour";
            return `${Math.floor(itemLife / 3600)} ${unit} ago`;
        } else if (itemLife < 2592000) {
            const unit = Math.floor(itemLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(itemLife / 86400)} ${unit} ago`;
        } else if (itemLife < 31104000) {
            const unit = Math.floor(itemLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(itemLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(itemLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(itemLife / 31104000)} ${unit} ago`;
        }
    }

    render() {
        debugger
        return (
            <li className="songs-list-item">
                <div className="header" style={this.props.klass === "user-show-page" ? this.noneStyle : {}}>
                    <Link to={`/users/${this.props.itemArtist.id}`}><img src={this.props.itemArtist.imageURL ? this.props.itemArtist.imageURL : window.user_dp}/></Link>
                    <p><Link to={`/users/${this.props.itemArtist.id}`}>{this.props.itemArtist.username}</Link> posted a song {this.renderItemCreationTime(this.props.itemSong.createdAt)}</p> 
                </div>
                <Player
                    klass="item-player"
                    song={this.props.itemSong}
                    songId={this.props.itemSong.id}
                    currentLike={this.props.currentLike}
                    currentLikes={this.props.itemLikes}
                    currentComments={this.props.itemComments}
                    currentSong={this.props.currentSong}
                    setCurrentSong={this.props.setCurrentSong}
                    playSong={this.props.playSong}
                    pauseSong={this.props.pauseSong}
                    createLike={this.props.createLike}
                    removeLike={this.props.removeLike}
                    currentUser={this.props.currentUser}
                    currentUserId={this.props.currentUserId}
                />
            </li>
        );
    }
}

export default SongsListItem;
