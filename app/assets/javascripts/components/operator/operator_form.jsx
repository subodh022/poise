OperatorForm = React.createClass({
  getInitialState: function() {
    return {
      emp_name: '',
      emp_id: '',
      line_id: this.props.lines[0].value
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
      <form className="form-inline" onSubmit={this.handleSubmit} id="op-form">
        <h5 className="text-info">Add New Operator</h5>
        <div className="row">
          <div className="form-group rm10">
            <input type="text" className="form-control" placeholder="Enter Operator Name" 
                name="emp_name" value={this.state.emp_name} defaultValue={this.state.emp_name} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10">
            <input type="text" className="form-control" placeholder="Enter Employee ID" 
                name="emp_id" value={this.state.emp_id} defaultValue={this.state.emp_id} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <div>
              <Select
                  name="line_id"
                  value={this.state.line_id}
                  options={this.props.lines}
                  onChange={this.handleLineChange}
                  clearable={false}
              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Operator</button>
          </div>
        </div>
      </form>
    );
  }
});