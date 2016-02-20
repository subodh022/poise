MachineForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      mac_id: '',
      attachment: '',
      line_id: this.props.lines[0].value,
      tot_units: 0
    };
  },
  valid: function() {
    return this.state.name && this.state.mac_id && this.state.tot_units;
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
    return jQuery.post('/machines', {machine: this.state}, this.resetForm, 'JSON');
  },
  resetForm: function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <Panel header={<span><span className="glyphicon glyphicon-plus-sign"></span> &nbsp;Add New Machine</span>} >
      <form className="form-inline" onSubmit={this.handleSubmit} id="op-form">
        <div className="row">
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Machine Name</h6>
            <input type="text" className="form-control" placeholder="Enter Machine Name" 
                name="name" value={this.state.name} defaultValue={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Machine ID</h6>
            <input type="text" className="form-control" placeholder="Enter Machine ID" 
                name="mac_id" value={this.state.mac_id} defaultValue={this.state.mac_id} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10" style={{width: 200}}>
            <h6>Attachment</h6>
            <input type="text" className="form-control" placeholder="Enter Attachment (If any)" 
                name="attachment" value={this.state.attachment} defaultValue={this.state.attachment} onChange={this.handleChange} />
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
            <h6>Total Units</h6>
            <input type="text" className="form-control" placeholder="Enter Total Units" 
                name="tot_units" value={this.state.tot_units} defaultValue={this.state.tot_units} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <h6/>
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Machine</button>
          </div>
        </div>
      </form>
      </Panel>
    );
  }
});