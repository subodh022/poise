const OperatorSkill = React.createClass({

  getInitialState() {
    return { showModal: false };
  },

  componentDidMount() {
    $('input[type="range"]').rangeslider({polyfill: true});
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>
        <a className="btn btn-primary btn-sm rm10" onClick={this.open} title="Update Skills">
          <span className="glyphicon glyphicon-list-alt"></span>
        </a>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Operator Skills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <label className="col-xs-3">Op Name</label>
              <div className="col-xs-9">
                <input type="range" min="1" max="10" step="0.5" defaultValue="3" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close}>Cancel</Button>
            <Button onClick={this.close}>Update</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});