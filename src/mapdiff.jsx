var React = require('react');
var ReactDOM = require('react-dom');
var OreController = React.createClass({
  getInitialState() {
    return {
      visibility: "visible",
      opacity: 0.5,
      scale: 1.00,
      x: 0,
      y: 0,
      src: "map/24/24_sqa.jpg",
      srcInput: "map/24/24_sqa.jpg",
      srcWidth: 599,
      srcHeight: 1166
    };
  },
  onChangeVisibility(e) {
    var state = {};
    state["visibility"] = (e.target.checked)? "visible": "hidden";
    this.setState(state);
  },
  onChangeValue(e) {
    var state = {};
    state[e.target.dataset["name"]] = e.target.value;
    this.setState(state);
  },
  onChangeSrc(e) {
    var img = new Image();
    var that = this;
    var state = {
      src: "",
      srcWidth: 0,
      srcHeight: 0,
    };
    this.setState(state);
    img.onload = function() {
      var state = {
        src: img.src,
        srcWidth: img.width,
        srcHeight: img.height,
      };
      that.setState(state);
    }
    img.src = e.target.value;
    this.onChangeValue(e);
  },
   getWidth() {
    var n = this.state.srcWidth * this.state.scale;
    return n.toFixed(3);
  },
  getHeight() {
    var n = this.state.srcHeight * this.state.scale;
    return n.toFixed(3);
  },
  getControllerStyle() {
    var css = {
      position: "fixed",
      top: (this.props.label == "base") ? 8: 32,
      left: 10,
    };
    return css;
  },
  getTargetStyle() {
    var transform = "";
    transform += "translateX(" + this.state.x + "px) ";
    transform += "translateY(" + this.state.y + "px) ";
    transform += "scale(" + this.state.scale + ") ";
    var css = {
      visibility: this.state.visibility,
      position: "absolute",
      top: 60,
      left: 10,
      opacity: this.state.opacity,
      transform: transform,
      WebkitTransform: transform,
      transformOrigin: "top left",
      transition: "transform 0.2s",
      WebkitTransition: "-webkit-transform 0.2s",
    };
    return css;
  },
  render() {
    return (
      <div className="react-OreController">
        <div className="z-index-controller" style={this.getControllerStyle()}>
          visibility: <input type="checkbox" checked={this.state.visibility == "visible"} onChange={this.onChangeVisibility} />
          src:        <input type="text"   value={this.state.srcInput} onChange={this.onChangeSrc} data-name="srcInput" />
          opacity:    <input className="input-number" type="number" value={this.state.opacity} step="0.1" min="0" max="1" onChange={this.onChangeValue} data-name="opacity" />
          x:          <input className="input-number" type="number" value={this.state.x} step="1" onChange={this.onChangeValue} data-name="x" />
          y:          <input className="input-number" type="number" value={this.state.y} step="1" onChange={this.onChangeValue} data-name="y" />
          scale:      <input className="input-number" type="number" value={this.state.scale} step="0.001" onChange={this.onChangeValue} data-name="scale" />
          width:      <input className="input-number" type="number" value={this.getWidth()} disabled="disabled" />
          height:     <input className="input-number" type="number" value={this.getHeight()} disabled="disabled" />
        </div>
        <div className="z-index-target" style={this.getTargetStyle()}>
          <img ref="targetImg" src={this.state.src} />
        </div>
      </div>
    );
  }
});
ReactDOM.render(
  <div className="react-Root">
    <OreController label="base" />
    <OreController label="compare" />
  </div>,
  document.getElementById('content')
);

