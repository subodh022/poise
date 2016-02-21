OperationBulletin = React.createClass({
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
      url: "/operation_bulletins/" + this.props.record.id,
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
      style: ReactDOM.findDOMNode(this.refs.style).value,      
      takt_time: ReactDOM.findDOMNode(this.refs.takt_time).value
    };
    return $.ajax({
      method: 'PUT',
      url: "/operation_bulletins/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        operation_bulletin: data
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
        <td>{this.lineName()}</td>
        <td>{this.props.record.style}</td>
        <td>{this.props.record.takt_time}</td>
        <td>
          <a className="btn btn-default btn-xs rm10" onClick={this.handleToggle} title="Edit">
            <span className="glyphicon glyphicon-pencil"></span>
          </a>
          <a className="btn btn-danger btn-xs rm10" onClick={this.handleDelete} title="Delete">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
          <a className="btn btn-primary btn-xs rm10" title="Manage Entries" href={"/operation_bulletins/" + this.props.record.id + "/manage"}>
            <span className="glyphicon glyphicon-list-alt"></span> &nbsp;Manage
          </a>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return (
      <tr>
        <td>{this.lineName()}</td>
        <td><input className="form-control" type="text" name="style" 
              defaultValue={this.props.record.style} ref="style" /></td>
        <td><input className="form-control" type="text" name="takt_time" 
              defaultValue={this.props.record.takt_time} ref="takt_time" /></td>
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