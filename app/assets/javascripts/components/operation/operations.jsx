Operations = React.createClass({
  getInitialState: function() {
    return {
      records: this.props.data
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
    return this.replaceState({
      records: records
    });
  },
  updateRecord: function(record, data) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });
    return this.replaceState({
      records: records
    });
  },
  render: function() {
    var record;
    return (
      <div>
        <OperationForm handleNewRecord={this.addRecord} />
        <hr/><h5 className="text-info"><b>Operations List</b></h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Operation Title</th>
              <th>SMV Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record, i){
                return <Operation handleDeleteRecord={this.deleteRecord} record={record} key={record.id}  handleEditRecord={this.updateRecord} />;
            }.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
});