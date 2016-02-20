const WSRow = React.createClass({
  getInitialState: function() {
    operation_id = (this.props.operations.length > 0) ? this.props.operations[0].value : 0
    machine_id = (this.props.machines.length > 0) ? this.props.machines[0].value : 0
    return {
      edit: false,
      section_id: this.props.section_id,
      operation_id: operation_id,
      machine_id: machine_id
    };
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },
  handleOperationChange: function(v){
    this.setState({operation_id: v.value});
  },
  handleMachineChange: function(v){
    this.setState({machine_id: v.value});
  },
  handleDelete: function(e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/work_stations/" + this.props.record.id,
      dataType: 'JSON',
      success: function() {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this)
    });
  },
  handleEdit: function(e) {
    var data;
    e.preventDefault();
    data = {
      section_id: this.state.section_id,
      operation_id: this.state.operation_id,
      machine_id: this.state.machine_id
    };
    return $.ajax({
      method: 'PUT',
      url: "/work_stations/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        work_station: data
      },
      success: function(data) {
        this.setState({
          edit: false
        });
        this.props.handleEditRecord(this.props.record, data);
      }.bind(this)
    });
  },
  recordRow: function() {
    return (
      <tr>
        <td>{this.props.serial}</td>
        <td>{this.props.record.operation.title}</td>
        <td>{this.props.record.operation.smv}</td>
        <td>{this.props.record.machine.name}</td>
        <td>{(this.props.record.machine.attachment == "") ? <i className="text-muted">None</i> : this.props.record.machine.attachment}</td>
        <td>{this.props.record.machine.tot_units - this.props.record.machine.used_units}</td>
        <td>
          <a className="btn btn-default btn-xs rm10" onClick={this.handleToggle} title="Edit">
            <span className="glyphicon glyphicon-pencil"></span>
          </a>
          <a className="btn btn-danger btn-xs rm10" onClick={this.handleDelete} title="Delete">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return (
      <tr>
        <td>{this.props.serial}</td>
        <td width="180px">
          <div>
            <Select
              name="operation_id"
              ref="operation_id"
              value={this.state.operation_id}
              options={this.props.operations}
              onChange={this.handleOperationChange}
              clearable={false}
            />
          </div>
        </td>
        <td>{this.props.record.operation.smv}</td>
        <td width="180px">
          <div>
            <Select
              name="machine_id"
              ref="machine_id"
              value={this.state.machine_id}
              options={this.props.machines}
              onChange={this.handleMachineChange}
              clearable={false}
            />
          </div>
        </td>
        <td>{(this.props.record.machine.attachment == "") ? <i className="text-muted">None</i> : this.props.record.machine.attachment}</td>
        <td>{this.props.record.machine.tot_units - this.props.record.machine.used_units}</td>
        <td>
          <a className="btn btn-primary btn-xs rm10" onClick={this.handleEdit} title="Save">
            <span className="glyphicon glyphicon-ok"></span>
          </a>
          <a className="btn btn-danger btn-xs rm10" onClick={this.handleToggle} title="Cancel">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </td>
      </tr>
    );
  },
  render: function() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
});