OperatorForm = React.createClass({
  getInitialState: function() {
    return {
      emp_name: '',
      emp_id: '',
      line_id: this.props.lines[0].value,
      section_id: this.props.lines[0].sections[0].value
    };
  },
  valid: function() {
    return this.state.emp_name && this.state.emp_id;
  },
  handleChange: function(e) {
    var name;
    name = e.target.name;
    return this.setState({ [name] : e.target.value});
  },
  handleLineChange: function(v){
    this.setState({line_id: v.value});
    this.setState({section_id: v.sections[0].value});
  },
  handleSectionChange: function(v){
    this.setState({section_id: v.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return jQuery.post('/operators', {operator: this.state}, this.resetForm, 'JSON');
  },
  resetForm: function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <div>
      <Panel header={"Add New Operator"} >
      <form className="form-inline" onSubmit={this.handleSubmit} id="op-form">
        <div className="row">
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Operator Name</h6>
            <input type="text" className="form-control" placeholder="Enter Operator Name" 
                name="emp_name" value={this.state.emp_name} defaultValue={this.state.emp_name} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Employee ID</h6>
            <input type="text" className="form-control" placeholder="Enter Employee ID" 
                name="emp_id" value={this.state.emp_id} defaultValue={this.state.emp_id} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Choose Line</h6>
            <Select
                name="line_id"
                value={this.state.line_id}
                options={this.props.lines}
                onChange={this.handleLineChange}
                clearable={false}
            />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Choose Section</h6>
            <Select
                name="section_id"
                value={this.state.section_id}
                options={jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].sections}
                onChange={this.handleSectionChange}
                clearable={false}
            />
          </div>
          <div className="form-group">
            <h6><b>&nbsp;</b></h6>
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Operator</button>
          </div>
        </div>
      </form>
      </Panel>
      </div>
    );
  }
});