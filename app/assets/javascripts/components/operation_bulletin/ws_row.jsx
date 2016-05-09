const WSRow = React.createClass({
  getInitialState: function() {
    operation_id = (this.props.operations.length > 0) ? (this.props.record.operation.id != undefined ? this.props.record.operation.id : this.props.operations[0].value) : 0
    operator_ids = (this.props.record.operators.length > 0) ? jQuery.map(this.props.record.operators, function(op){ return op.id; }) : [0]
    machine_id = (this.props.machines.length > 0) ? (this.props.record.machine.id != undefined ? this.props.record.machine.id : this.props.machines[0].value) : 0
    return {
      edit: false,
      section_id: this.props.section_id,
      operation_id: operation_id,
      operator_ids: operator_ids,
      machine_id: machine_id
    };
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },
  getOperatorOptions: function(operators, i) {
    var operation_id = this.props.record.operation.id;
    var result = jQuery.map(operators, function(op){
      var new_op = {};
      new_op["index"] = i;
      new_op["value"] = op["value"];
      new_op["skill"] = " (Skill: --)";
      jQuery.each(op["skills"], function(i, skill){
        if(skill["operation_id"] == operation_id) {
          new_op["skill"] = " (Skill: " + skill["value"]*10 + "%)";
        }
      });
      new_op["label"] = op["label"] + new_op["skill"];
      return new_op;
    });
    return result;
  },
  handleOperationChange: function(v){
    this.setState({operation_id: v.value});
  },
  handleOperatorChange: function(v){
    operator_ids = this.state.operator_ids;
    operator_ids[v.index] = v.value;
    this.setState({operator_ids: operator_ids});
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
      machine_id: this.state.machine_id,
      operator_ids: this.state.operator_ids
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
        <td>{this.props.record.operator_name}</td>
        <td>{this.props.record.machine.name}</td>
        <td>{(this.props.record.machine.attachment == "") ? <i className="text-muted">None</i> : this.props.record.machine.attachment}</td>
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
        <td>
          {this.state.operator_ids.map(function(op_id, i){
              return (
                <div>
                  <Select
                    name={"operator_id"}
                    ref="operator_id"
                    value={op_id}
                    options={this.getOperatorOptions(this.props.operators, i)}
                    onChange={this.handleOperatorChange}
                    clearable={false}
                  />
                </div>
              );
          }.bind(this))}
        </td>
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