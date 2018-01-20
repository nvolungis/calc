import React, { Component } from 'react';
import vidBackground from './vid-background.jpg';
import playButton from './play-button.jpg';
import volumeButton from './volume-button.jpg';
import './Display.css';

const heightToWidth = (ratio, height) => ratio * height;
const widthToHeight = (ratio, width) => width / ratio;

class Display extends Component {

  get height() {
    const height = widthToHeight(this.props.ratio, this.props.maxWidth);

    return height >= this.props.maxHeight ? this.props.maxHeight : height;
  }

  render() {
    const height = this.height;
    const width = heightToWidth(this.props.ratio, height);

    return (
      <div
        className='Display'
        style={{
          backgroundImage: `url(${vidBackground}`,
          backgroundPosition: 'bottom center',
          backgroundSize: '800px',
          transition: `height 100ms ease, width 100ms ease`,
          height: `${height}px`,
          width: `${width}px`,
        }}
      >
        <div className='Display__controls'>
          <div
            className='Display__controls__play'
            style={{backgroundImage: `url(${playButton})`}}
          />
          <div className='Display__controls__playbar' />
          <div
            className='Display__controls__volume'
            style={{backgroundImage: `url(${volumeButton})`}}
          />
        </div>
      </div>
    );
  }
}

export default Display;
