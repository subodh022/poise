Operation = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
      section_name: this.props.record.section_name
    };
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },
  handleSectionChange: function(v) {
    this.setState({section_name: v.value});
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
      smv: ReactDOM.findDOMNode(this.refs.smv).value,
      section_name: this.state.section_name
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
  sectionName: function() {
    return jQuery.grep(this.props.sections, function(e){ return e.value == this.state.section_name; }.bind(this))[0].label;
  },
  recordRow: function() {
    return (
      <tr>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.smv}</td>
        <td>{this.sectionName()}</td>
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
        <td><input className="form-control" type="text" name="title" 
              defaultValue={this.props.record.title} ref="title" /></td>
        <td><input className="form-control" type="text" name="smv" 
              defaultValue={this.props.record.smv} ref="smv" /></td>
        <td width="180px">
          <div>
            <Select
              name="section_name"
              ref="section_name"
              value={this.state.section_name}
              options={this.props.sections}
              onChange={this.handleSectionChange}
              clearable={false}
            />
          </div>
        </td>
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