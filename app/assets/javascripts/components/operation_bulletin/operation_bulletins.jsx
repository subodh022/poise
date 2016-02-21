OperationBulletins = React.createClass({
  getInitialState: function() {
    options = jQuery.map( this.props.lines, function( a ) {
      return { value: a.id, label: a.title };
    });
    return {
      records: this.props.data,
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
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operation Bulletin for "+ record.style +" Added."} />, document.getElementById("alert_messages"));
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
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operation Bulletin for "+ record.style +" Removed."} />, document.getElementById("alert_messages"));
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
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Operation Bulletin for "+ record.style +" Updated."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records
    });
  },
  render: function() {
    var record;
    return (
      <div>
        <OperationBulletinForm lines={this.state.options} handleNewRecord={this.addRecord} />
        <hr/><h5 className="text-info"><span className="glyphicon glyphicon-list"></span> &nbsp;<b>List of Operation Bulletins</b></h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Line</th>
              <th>Style Name</th>
              <th>Takt Time (Minutes)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record, i){
                return <OperationBulletin lines={this.state.options} handleDeleteRecord={this.deleteRecord} record={record} key={record.id} handleEditRecord={this.updateRecord} />;
            }.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
});