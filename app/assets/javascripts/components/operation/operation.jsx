Operation = React.createClass({
  getInitialState: function() {
    return {
      edit: false
    };
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },
  handleDelete: function(e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/operations/" + this.props.record.id,
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
      title: ReactDOM.findDOMNode(this.refs.title).value,
      smv: ReactDOM.findDOMNode(this.refs.smv).value
    };
    return $.ajax({
      method: 'PUT',
      url: "/operations/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        operation: data
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
        <td>{this.props.record.title}</td>
        <td>{this.props.record.smv}</td>
        <td>
          <a className="btn btn-default btn-xs rm10" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger btn-xs rm10" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return (
      <tr>
        <td><input className="form-control" type="text" name="title" 
              defaultValue={this.props.record.title} ref="title" /></td>
        <td><input className="form-control" type="text" name="smv" 
              defaultValue={this.props.record.smv} ref="smv" /></td>
        <td>
          <a className="btn btn-primary btn-xs rm10" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger btn-xs rm10" onClick={this.handleToggle}>Cancel</a>
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