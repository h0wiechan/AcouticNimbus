import React from "react";
import { FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { Link, withRouter } from "react-router-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "Ambient",
      description: "",
      availability: true,
      audio: null,
      audioURL: "",
      image: null,
      imageURL: "",
      artistId: this.props.currentUser.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this)
  }

  getValidationState() {
    const titleLength = this.state.title.length;
    if (titleLength > 2) return "success";
    else if (titleLength > 0) return "error";
    else return null;
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  updateAvailability() {
    return e => {
      const publicity = (e.currentTarget.value === "Public") ? true : false ;
      this.setState({
        availability: publicity,
      });
    };
  }

  handleAudio(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({
        audio: file,
        audioURL: reader.result,
      });
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleImage(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({
        image: file,
        imageURL: reader.result,
      });
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  renderErrors() {
    const errors = this.props.errors || [];
    return (
      <ul>
        {errors.map( (error, i) => {
          return (
            <li key={`error${i}}`}>{error}</li>
          );
        })}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let songData = new FormData();
    songData.append('song[title]', this.state.title);
    songData.append('song[genre]', this.state.genre);
    songData.append('song[description]', this.state.description);
    songData.append('song[availability]', this.state.availability);
    songData.append('song[audio]', this.state.audio);
    songData.append('song[audio_url]', this.state.audioURL);
    songData.append('song[image]', this.state.image);
    songData.append('song[image_url]', this.state.imageURL);
    songData.append('song[artist_id]', this.state.artistId);
    this.props.submitAction(songData).then(
      (action) => {
        this.props.setCurrentSong(action.song);
        debugger
        this.props.history.push(`/songs/${action.song.id}`);
        debugger
      }
    );
  }

  render () {
    const imagePreview = this.state.imageURL ? <img src={this.state.imageURL} className="song-image-preview" /> : null;
    const audioPreview = this.state.audioURL ? <ReactAudioPlayer src={this.state.audioURL} className="upload-audio-preview" autoPlay controls /> : null;
    return (
      <form className="upload-form-container">
        <div className="upload-form-header">
          <h2 className="upload-form-subheader">We can't wait for your jam!</h2>
          <br/>
          <div className="song-uploader-container">
            <input type="file" className="audio-uploader" value="" accept=".mp3, .wav" onChange={this.handleAudio} />
            {audioPreview}
          </div>
        </div>

        <div className="upload-fill-in-form">
          <div className="upload-form-content">
            <div className="upload-form-left">
              {imagePreview}
              <input type="file" className="image-uploader" value="" accept=".jpg, .png" onChange={this.handleImage} />
            </div>
            <div className="upload-form-right">
              {this.renderErrors}
              <FormGroup
                controlId="uploadFormTitle"
                validationState={this.getValidationState()}>
                <ControlLabel className="upload-form-data-name">Title</ControlLabel>
                <FormControl type="text"
                             value={this.state.title}
                             placeholder="Enter a title with minimum length of 3"
                             className="upload-form-title"
                             onChange={this.update("title")}
                />
              </FormGroup>
              <FormControl.Feedback />
              <FormGroup controlId="uploadFormGenre">
                <ControlLabel className="upload-form-data-name">Genre</ControlLabel>
                <FormControl componentClass="select" placeholder="None" className="upload-form-genre" onChange={this.update("genre")}>
                    <option value="Ambient">Ambient</option>
                    <option value="Classical">Classical</option>
                    <option value="Country">Country</option>
                    <option value="Dance">Dance</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Hip-Hop">Hip-hop</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Metal">Metal</option>
                    <option value="Piano">Piano</option>
                    <option value="Piano">Pop</option>
                    <option value="Soul">Soul</option>
                    <option value="Rock">Rock</option>
                    <option value="World">World</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="uploadFormDescription">
                <ControlLabel className="upload-form-data-name">Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Description is optional." className="upload-form-description" onChange={this.update("description")} />
              </FormGroup>
              <FormGroup controlId="uploadFormAvailability" onChange={this.updateAvailability()}>
                <ControlLabel className="upload-form-data-name">Availability</ControlLabel>
                <Radio name="radioGroup" defaultChecked>
                  Public
                </Radio>
                <Radio name="radioGroup">
                  Private
                </Radio>
              </FormGroup>
            </div>
          </div>
          <div className="upload-form-footer">
            <div className="requirement-reminder">
              <p className="required-field">Required fields</p><span className="required-marker">*</span>
              {this.renderErrors()}
            </div>
            <div className="upload-form-buttons-container">
              <Link to="/stream" className="upload-form-end-buttons upload-cancel-button">Cancel</Link>
              <input type="submit" value="Upload" className="upload-form-end-buttons upload-form-submit-button" onClick={this.handleSubmit} />
            </div>
          </div>
        </div>
      </form>
    );
  }


}

export default withRouter(UploadForm);
