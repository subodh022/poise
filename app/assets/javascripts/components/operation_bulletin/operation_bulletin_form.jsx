OperationBulletinForm = React.createClass({
  getInitialState: function() {
    return {
      style: '',
      line_id: this.props.lines[0].value
    };
  },
  valid: function() {
    return this.state.style && true;
  },
  handleLineChange: function(v){
    this.setState({line_id: v.value});
  },
  handleChange: function(e) {
    var name;
    name = e.target.name;
    return this.setState({ [name] : e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return jQuery.post('/operation_bulletins', {operation_bulletin: this.state}, this.resetForm, 'JSON');
  },
  resetForm: function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <Panel header={<span><span className="glyphicon glyphicon-plus-sign"></span> &nbsp;Add New Operation Bulletin</span>} >
      <form className="form-inline" onSubmit={this.handleSubmit} id="ob-form">
        <div className="row">
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
          <div className="form-group rm10">
            <h6>Style Name</h6>
            <input type="text" className="form-control" placeholder="Enter Style Name" 
                name="style" value={this.state.style} defaultValue={this.state.style} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <h6><b>&nbsp;</b></h6>
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Operation Bulletin</button>
          </div>
        </div>
      </form>
      </Panel>
    );
  }
});