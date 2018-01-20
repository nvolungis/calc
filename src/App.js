import React, { Component } from 'react';
import Display              from './Display';
import logo                 from './wistia-logo-white.png';
import './App.css';

const heightToWidth = (ratio, height) => ratio * height;
const widthToHeight = (ratio, width) => width / ratio;
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const startRatio = 16/9;
const startWidth = 1080;

const displayHeight = 337.5;
const displayWidth  = 600;

const notes = {
  [16/9]: '16:9 is the standard image aspect ratio for HDTV and traditional web video.',
  [4/3]: '4:3 is used by most digital point-and-shoot cameras and was the standard definition of video before it switched to 16:9.',
  [21/9]: '21:9 is the current widescreen cinema standard for film and otherwise known as Anamorphic.',
};


class App extends Component {
  constructor() {
    super();

    this.state = {
      ratio: startRatio,
      width: startWidth,
      height: widthToHeight(startRatio, startWidth),
    };

    this.onWidthChange = ({target: {value}}) => {
      if (isNumeric(value) && value >= 0) {
        this.setState({
          width: value,
          height: widthToHeight(this.state.ratio, value),
        })
      }

      if (value === '') {
        this.setState({width: '', height: ''});
      }
    }

    this.onHeightChange = ({target: {value}}) => {
      if (isNumeric(value) && value >= 0) {
        this.setState({
          height: value,
          width: heightToWidth(this.state.ratio, value),
        })
      }

      if (value === '') {
        this.setState({width: '', height: ''});
      }
    };

    this.onRatioChange = ratio => {
      this.setState({
        ratio,
        height: widthToHeight(ratio, this.state.width),
      });

    };
  }

  buttonClassname = ratio => {
    return [
      'ARCalculator__button',
      ratio === this.state.ratio ? 'ARCalculator__button--is-selected' : '',
    ].join(' ');
  }

  render() {
    return (
      <main className='ARCalculator'>
        <h1 className='ARCalculator__title'>Aspect Ratio Calculator</h1>
        <hr className='ARCalculator__break' />

        <section className='ARCalculator__controls'>
          <div className='ARCalculator__inputs'>
            <div className='ARCalculator__field'>
              <label className='ARCalculator__label'>Width</label>
              <input
                type='text'
                placeholder='enter width'
                className='ARCalculator__input'
                value={this.state.width}
                onChange={this.onWidthChange}
              />
            </div>

            <div className='ARCalculator__x'>X</div>

            <div className='ARCalculator__field'>
              <label className='ARCalculator__label'>Height</label>
              <input
                type='text'
                placeholder='enter height'
                className='ARCalculator__input'
                value={this.state.height}
                onChange={this.onHeightChange}
              />
            </div>
          </div>

          <div className='ARCalculator__buttons'>
            <button
              className={this.buttonClassname(16/9)}
              onClick={() => this.onRatioChange(16/9)}
            > 16:9 </button>

            <button
              className={this.buttonClassname(4/3)}
              onClick={() => this.onRatioChange(4/3)}
            > 4:3 </button>

            <button
              className={this.buttonClassname(21/9)}
              onClick={() => this.onRatioChange(21/9)}
            > 21/9</button>
          </div>
        </section>

        <section
          className='ARCalculator__display'
          style={{
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
          }}
        >
          <Display
            ratio={this.state.ratio}
            maxWidth={displayWidth}
            maxHeight={displayHeight}
          />
        </section>

        <section className='ARCalculator__note'>
          <p>{notes[this.state.ratio]}</p>
        </section>

        <footer>
          <a href='https://wistia.com'>
            <img className='ARCalculator__logo' src={logo} />
          </a>
        </footer>
      </main>
    );
  }
}

export default App;
