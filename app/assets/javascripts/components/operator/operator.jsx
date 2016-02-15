Operator = React.createClass({
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
      url: "/operators/" + this.props.record.id,
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
      emp_name: ReactDOM.findDOMNode(this.refs.emp_name).value,
      emp_id: ReactDOM.findDOMNode(this.refs.emp_id).value,
      line_id: this.state.line_id
    };
    return $.ajax({
      method: 'PUT',
      url: "/operators/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        operator: data
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
        <td>{this.props.record.emp_name}</td>
        <td>{this.props.record.emp_id}</td>
        <td>{jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].label}</td>
        <td>
          <a className="btn btn-default btn-sm rm10 pull-left" onClick={this.handleToggle} title="Edit">
            <span className="glyphicon glyphicon-pencil"></span>
          </a>
          <a className="btn btn-danger btn-sm rm10 pull-left" onClick={this.handleDelete} title="Delete">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
          <OperatorSkill />          
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return (
      <tr>
        <td><input className="form-control" type="text" name="emp_name" 
              defaultValue={this.props.record.emp_name} ref="emp_name" /></td>
        <td><input className="form-control" type="text" name="emp_id" 
              defaultValue={this.props.record.emp_id} ref="emp_id" /></td>
        <td>
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
        <td>
          <a className="btn btn-primary btn-sm rm10" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger btn-sm rm10" onClick={this.handleToggle}>Cancel</a>
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