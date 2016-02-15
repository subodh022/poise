const OperatorSkill = React.createClass({

  getInitialState() {
    return { showModal: false };
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
        <a className="btn btn-primary btn-sm rm10" onClick={this.open}>Update Skills</a>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Operator Skills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
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