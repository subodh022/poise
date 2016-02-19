const OperatorSkill = React.createClass({

  getInitialState() {
    return { 
      showModal: false,
      skills: this.props.record.skills
    };
  },

  componentDidMount() {
    $('input[type="range"]').rangeslider();
  },

  handleSliderChange(e) {
    jQuery(e.target).parent().next().html(jQuery(e.target).val()*10 + "%");
  },

  saveSkills() {
    data = []
    $('input[type="range"]').map(function(i, e){
      data.push({'id': $(e).prop('id'), 'value': $(e).val()});
    });
    console.log(data);
    return $.ajax({
      method: 'POST',
      url: "/operators/update_skill",
      dataType: 'JSON',
      data: {
        skills: data
      },
      success: function(data) {
        this.setState({skills: data.skills});
        // console.log("Updated");
        this.props.handleSkillUpdate(this.props.record, data);
        ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Skills Updated for Operator "+ this.props.name +"."} />, document.getElementById("alert_messages"));
        this.setState({ showModal: false });
      }.bind(this)
    });
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
          <span className="glyphicon glyphicon-list-alt"></span> &nbsp;Update Skills
        </a>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Skill Levels for {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.skills.map(function(skill, i){
                return (
                  <div className="row">
                    <label className="col-xs-2">{skill.operation_title}</label>
                    <div className="col-xs-9">
                      <input type="range" id={skill.id} min="1" max="10" step="1" defaultValue={skill.value} onChange={this.handleSliderChange} />
                    </div>
                    <label className="col-xs-1">{skill.value*10 + "%"}</label>
                  </div>
                );
            }.bind(this))}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close}>Cancel</Button>
            <Button onClick={this.saveSkills}>Update</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});