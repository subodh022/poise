OperationForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      smv: ''
    };
  },
  valid: function() {
    return this.state.title && this.state.smv;
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
      <form className="form-inline" onSubmit={this.handleSubmit} id="op-form">
        <h5 className="text-info">Add New Operation</h5>
        <div className="row">
          <div className="form-group rm10">
            <input type="text" className="form-control" placeholder="Enter Operation Title" 
                name="title" value={this.state.title} defaultValue={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-group rm10">
            <input type="text" className="form-control" placeholder="Enter SMV Value" 
                name="smv" value={this.state.smv} defaultValue={this.state.smv} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Add Operation</button>
          </div>
        </div>
      </form>
    );
  }
});