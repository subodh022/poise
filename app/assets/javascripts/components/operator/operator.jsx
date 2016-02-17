Operator = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
      line_id: this.props.record.line_id,
      section_id: this.props.record.section_id
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
    this.setState({section_id: v.sections[0].value});
  },
  handleSectionChange: function(v){
    this.setState({section_id: v.value});
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
      line_id: this.state.line_id,
      section_id: this.state.section_id
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
  lineName: function() {
    return jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].label;
  },
  sectionName: function() {
    sections = jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].sections;
    return jQuery.grep(sections, function(e){ return e.value == this.state.section_id; }.bind(this))[0].label;
  },
  recordRow: function() {
    return (
      <tr>
        <td>{this.props.record.emp_name}</td>
        <td>{this.props.record.emp_id}</td>
        <td>{this.lineName()}</td>
        <td>{this.sectionName()}</td>
        <td>
          <a className="btn btn-default btn-xs rm10 pull-left" onClick={this.handleToggle} title="Edit">
            <span className="glyphicon glyphicon-pencil"></span>
          </a>
          <a className="btn btn-danger btn-xs rm10 pull-left" onClick={this.handleDelete} title="Delete">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
          <OperatorSkill name={this.props.record.emp_name} skills={this.props.record.skills} />          
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
          <div>
            <Select
              name="section_id"
              ref="section_id"
              value={this.state.section_id}
              options={jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].sections}
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