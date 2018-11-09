import React from "react";
import { Link } from "react-router-dom";

class ArtistListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleFollow = this.handleFollow.bind(this);
    }

    // componentDidMount() {
    // }

    handleFollow(e) {
        e.preventDefault();
        if (this.props.artistFollow) {
            // debugger
            this.props.removeFollow(this.props.artistFollow.id);
        } else {
            const follow = {
                followed_user_id: this.props.artist.id,
                follower_id: this.props.currentUser.id
            }
            // debugger
            this.props.createFollow(follow);
        }
    }

    renderNumber(data) {
        if (data < 1000) {
            return data;
        } else if (data < 10000) {
            const thousand = data.toString().slice(0,1);
            const lastThreeDigits = data.toString().slice(1);
            return `${thousand},${lastThreeDigits}`;
        } else {
            const integerDigits = Math.floor(data / 1000);
            const decimalDigit = (data % 1000).toString().slice(0, 1);
            return `${integerDigits}.${decimalDigit} k`;
        }
    }

    render() {
        // debugger
        // if (!this.props.artistSongs || this.props.artistFollowers) {
        //     return <img src={window.loading5}></img>;
        // } else {
            return (
                <li>
                    <div className="item-info-container">
                        <img src={this.props.artist.imageURL ? this.props.artist.imageURL : window.user_dp} className="item-img"></img>
                        <div className="item-info">
                            <Link to={`/users/${this.props.artist.id}`}>{this.props.artist.username}</Link>
                            <div className="social">
                                <p><i class="fas fa-user-friends"></i> {this.renderNumber(this.props.artistFollowers.length)}</p>
                                <p><i class="fas fa-music"></i> {this.renderNumber(this.props.artistSongs.length)}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={(e) => this.handleFollow(e)}>{this.props.artistFollow ? "Following" : "Follow"}</button>
                </li>
            );
        // }
    }
}

export default ArtistListItem;