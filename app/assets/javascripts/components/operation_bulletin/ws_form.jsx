WorkStationForm = React.createClass({
  getInitialState: function() {
    operation_id = (this.props.operations.length > 0) ? this.props.operations[0].value : 0
    machine_id = (this.props.machines.length > 0) ? this.props.machines[0].value : 0
    return {
      open: false,
      operation_bulletin_id: this.props.ob_id,
      section_id: this.props.section_id,
      operation_id: operation_id,
      machine_id: machine_id
    };
  },
  valid: function() {
    return (this.state.operation_id != 0) && (this.state.machine_id != 0);
  },
  open: function() {
    this.setState({open: true});
  },
  close: function() {
    this.setState({open: false});
  },
  handleOperationChange: function(v){
    this.setState({operation_id: v.value});
  },
  handleMachineChange: function(v){
    this.setState({machine_id: v.value});
  },
  handleChange: function(e) {
    var name;
    name = e.target.name;
    return this.setState({ [name] : e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return jQuery.post('/work_stations', {work_station: this.state}, this.resetForm, 'JSON');
  },
  resetForm: function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
  },
  render: function() {
    if (this.state.open) {
      return (    
        <div>
          <Well bsSize="small">
          <form className="form-inline" onSubmit={this.handleSubmit} id="ws-form">
            <div className="row">
              <div className="form-group rm10" style={{width: 200}}>
                <h6>Choose Operation</h6>
                <Select
                    name="operation_id"
                    value={this.state.operation_id}
                    options={this.props.operations}
                    onChange={this.handleOperationChange}
                    clearable={false}
                />
              </div>
              <div className="form-group rm10" style={{width: 200}}>
                <h6>Choose Machine</h6>
                <Select
                    name="machine_id"
                    value={this.state.machine_id}
                    options={this.props.machines}
                    onChange={this.handleMachineChange}
                    clearable={false}
                />
              </div>
              <div className="form-group">
                <h6><b>&nbsp;</b></h6>
                <button type="submit" className="btn btn-default btn-sm" disabled={!this.valid()}>
                  <span className="glyphicon glyphicon-plus"></span> Add
                </button>&nbsp;&nbsp;
                <button className="btn btn-danger btn-sm" onClick={this.close}>
                  <span className="glyphicon glyphicon-remove"></span> Cancel
                </button>
              </div>
            </div>
          </form>
          </Well>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <a className="btn btn-primary btn-sm rm10" onClick={this.open} title="Work Station">
            <span className="glyphicon glyphicon-plus"></span> &nbsp;Work Station
          </a>
        </div>
      );
    }
  }
});