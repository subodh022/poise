ProgressCircle = React.createClass({
  getInitialState: function() {
    return {
      size: this.props.size,
      value: this.props.value
    };
  },

  componentWillReceiveProps: function(props) {
    this.setState({size: props.size, value: props.value});
  },

  getColor: function() {
    if(this.state.value < 4) {
      return " red";
    } else if(this.state.value < 7) {
      return " orange";
    } else {
      return " green";
    }
  },

  getSize: function() {
    return (" p" + this.state.value*10);
  },

  percValue: function() {
    return (this.state.value*10 + "%");
  },

  getClass: function() {
    return ("c100 " + this.state.size + this.getColor() + this.getSize());
  },

  render: function() {
    return (
      <div className={this.getClass()}>
        <span>{this.percValue()}</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
    );
  }
});