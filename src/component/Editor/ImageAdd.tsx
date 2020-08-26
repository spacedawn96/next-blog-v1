import React, { Component } from 'react';
import styles from './styles.module.css';

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    open: false,
    fileInputState: '',
    selectedFile: '',
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addImage = base64EncodedImag => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, base64EncodedImag));
  };

  changeUrl = evt => {
    this.setState({ fileInputState: evt.target.value });
  };

  handleFileInputChange = e => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
    this.setState({ fileInputState: e.target.value });
  };

  handleSubmitFile = e => {
    e.preventDefault();
    if (!this.state.selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectedFile);
    reader.onloadend = () => {
      this.addImage(reader.result);
    };
  };

  render() {
    const popoverClassName = this.state.open
      ? styles.addImagePopover
      : styles.addImageClosedPopover;
    const buttonClassName = this.state.open
      ? styles.addImagePressedButton
      : styles.addImageButton;

    return (
      <>
        <div className={styles.addImage}>
          <button className={buttonClassName} onMouseUp={this.openPopover} type="button">
            +
          </button>
          <div className={popoverClassName} onClick={this.onPopoverClick}>
            <input
              type="text"
              placeholder="Paste the image url …"
              className={styles.addImageInput}
              onChange={this.changeUrl}
              value={this.state.fileInputState}
            />
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={this.handleFileInputChange}
              value={this.state.fileInputState}
              className={styles.addImageConfirmButton}
            />
            <button
              className={styles.addImageConfirmButton}
              type="button"
              onClick={this.handleSubmitFile}>
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}
