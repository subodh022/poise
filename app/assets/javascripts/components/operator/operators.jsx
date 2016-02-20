Operators = React.createClass({
  getInitialState: function() {
    options = jQuery.map( this.props.lines, function( a ) {
      return { value: a.id, label: a.title, sections: jQuery.map( a.enabled_sections, function( s ) {
          return { value: s.id, label: s.name };
        })
      };
    });
    return {
      records: this.props.data,
      options: options,
      open: false
    };
  },
  getDefaultProps: function() {
    return {
      records: []
    };
  },
  addRecord: function(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operator "+ record.emp_name +" Added."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records,
      open: true
    });
  },
  deleteRecord: function(record) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operator "+ record.emp_name +" Removed."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records
    });
  },
  updateRecord: function(record, data) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operator "+ record.emp_name +" Updated."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records
    });
  },
  render: function() {
    var record;
    return (
      <div id="operations">
        <OperatorForm lines={this.state.options} handleNewRecord={this.addRecord} />
        <hr/><h5 id="operations-header" className="text-info"><span className="glyphicon glyphicon-list"></span> &nbsp;<b>Operators List</b></h5>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Info View">
            <div className="form-group"></div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Operator Name</th>
                  <th>Employee ID</th>
                  <th>Line</th>
                  <th>Section</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map(function(record, i){
                    return <Operator handleDeleteRecord={this.deleteRecord} record={record} lines={this.state.options} key={record.id}  handleEditRecord={this.updateRecord} />;
                }.bind(this))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey={2} title="Skill View">
            <div className="form-group"></div>
            <OperatorSkillMatrix records={this.state.records} lines={this.state.options} />
          </Tab>
        </Tabs> 
      </div>
    );
  }
});