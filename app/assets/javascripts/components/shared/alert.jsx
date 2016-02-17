const AlertAutoDismissable = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    if (this.state.alertVisible) {
      return (
          <Alert bsStyle={this.props.type} onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
            <strong>{this.props.header}</strong> {this.props.message}
          </Alert>
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