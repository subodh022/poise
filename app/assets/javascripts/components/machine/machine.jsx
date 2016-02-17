Machine = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
      line_id: this.props.record.line_id
    };
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },
  handleLineChange: function(v) {
    this.setState({line_id: v.value});
  },
  handleDelete: function(e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/machines/" + this.props.record.id,
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
      name: ReactDOM.findDOMNode(this.refs.name).value,
      mac_id: ReactDOM.findDOMNode(this.refs.mac_id).value,
      attachment: ReactDOM.findDOMNode(this.refs.attachment).value,
      line_id: this.state.line_id,
      tot_units: ReactDOM.findDOMNode(this.refs.tot_units).value
    };
    return $.ajax({
      method: 'PUT',
      url: "/machines/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        machine: data
      },
      success: function(data) {
        this.setState({
          edit: false
        });
        this.props.handleEditRecord(this.props.record, data);
      }.bind(this)
    });
  },
  lineName: function() {
    return jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].label;
  },
  recordRow: function() {
    return (
      <tr>
        <td>{this.props.record.name}</td>
        <td>{this.props.record.mac_id}</td>
        <td>{(this.props.record.attachment == "") ? <i className="text-muted">None</i> : this.props.record.attachment}</td>
        <td>{this.lineName()}</td>
        <td>{this.props.record.tot_units}</td>
        <td>{this.props.record.tot_units - this.props.record.used_units}</td>
        <td>
          <a className="btn btn-default btn-xs rm10 pull-left" onClick={this.handleToggle} title="Edit">
            <span className="glyphicon glyphicon-pencil"></span>
          </a>
          <a className="btn btn-danger btn-xs rm10 pull-left" onClick={this.handleDelete} title="Delete">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return (
      <tr>
        <td><input className="form-control" type="text" name="name" 
              defaultValue={this.props.record.name} ref="name" /></td>
        <td width="150px"><input className="form-control" type="text" name="mac_id" 
              defaultValue={this.props.record.mac_id} ref="mac_id" /></td>
        <td><input className="form-control" type="text" name="attachment" 
              defaultValue={this.props.record.attachment} ref="attachment" /></td>
        <td width="180px">
          <div>
            <Select
              name="line_id"
              ref="line_id"
              value={this.state.line_id}
              options={this.props.lines}
              onChange={this.handleLineChange}
              clearable={false}
            />
          </div>
        </td>
        <td width="130px"><input className="form-control" type="text" name="tot_units" 
              defaultValue={this.props.record.tot_units} ref="tot_units" /></td>
        <td width="150px"><input className="form-control" type="text" name="avl_units" 
              defaultValue={this.props.record.tot_units - this.props.record.used_units} 
              ref="avl_units" disabled="true" /></td>
        <td>
          <a className="btn btn-primary btn-xs rm10" onClick={this.handleEdit} title="Save">
            <span className="glyphicon glyphicon-floppy-disk"></span>
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