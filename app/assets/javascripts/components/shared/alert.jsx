const AlertAutoDismissable = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <div>
          <Fade in={this.state.alertVisible} timeout={1000}>
            <Alert bsStyle={this.props.type} onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
              <strong>{this.props.header}</strong> {this.props.message}
            </Alert>
          </Fade>
        </div>
      );
    }
    return (
      <div></div>
    );
  },

  unmount() {
    var node = ReactDOM.findDOMNode(this);
    ReactDOM.unmountComponentAtNode(node);
    $(node).remove();
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
    this.unmount();
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});