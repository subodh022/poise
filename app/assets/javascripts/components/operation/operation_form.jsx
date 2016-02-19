OperationForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      smv: '',
      section_name: this.props.sections[0].value
    };
  },
  valid: function() {
    return this.state.title && this.state.smv;
  },
  handleSectionChange: function(v){
    this.setState({section_name: v.value});
  },
  handleChange: function(e) {
    var name;
    name = e.target.name;
    return this.setState({ [name] : e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return jQuery.post('/operations', {operation: this.state}, this.resetForm, 'JSON');
  },
  resetForm: function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <Panel header={"Add New Operation"} >
      <form className="form-inline" onSubmit={this.handleSubmit} id="op-form">
        <div className="row">
          <div className="form-group rm10">
            <h6>Operation Title</h6>
            <input type="text" className="form-control" placeholder="Enter Operation Title" 
                name="title" value={this.state.title} defaultValue={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10">
            <h6>SMV Value</h6>
            <input type="text" className="form-control" placeholder="Enter SMV Value" 
                name="smv" value={this.state.smv} defaultValue={this.state.smv} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Choose Section</h6>
            <Select
                name="section_name"
                value={this.state.section_name}
                options={this.props.sections}
                onChange={this.handleSectionChange}
                clearable={false}
            />
          </div>
          <div className="form-group">
            <h6><b>&nbsp;</b></h6>
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Operation</button>
          </div>
        </div>
      </form>
      </Panel>
    );
  }
});