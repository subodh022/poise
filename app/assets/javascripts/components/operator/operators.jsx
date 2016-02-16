Operators = React.createClass({
  getInitialState: function() {
    options = jQuery.map( this.props.lines, function( a ) {
      return { value: a.id, label: a.title, sections: jQuery.map( a.sections, function( s ) {
          return { value: s.id, label: s.name };
        })
      };
    });
    return {
      records: JSON.parse(this.props.data),
      options: options
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
    return this.setState({
      records: records
    });
  },
  deleteRecord: function(record) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
    });
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
    return this.setState({
      records: records
    });
  },
  render: function() {
    var record;
    return (
      <div>
        <OperatorForm lines={this.state.options} handleNewRecord={this.addRecord} />
        <hr/><h5 className="text-info"><b>Operators List</b></h5>
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
        <div id="skillNode"></div>
      </div>
    );
  }
});