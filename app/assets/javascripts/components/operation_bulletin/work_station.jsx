const WorkStation = React.createClass({
  getInitialState: function() {
    operations = jQuery.map( this.props.operations, function( a ) {
      return { value: a.id, label: a.title };
    });
    operators = jQuery.map( this.props.operators, function( a ) {
      return { value: a.id, label: a.emp_name, skills: a.skills };
    });
    machines = jQuery.map( this.props.machines, function( a ) {
      return { value: a.id, label: (a.name + " (Available: " + (a.tot_units - a.used_units) + ")") };
    });
    return {
      records: this.props.records,
      operations: operations,
      machines: machines,
      operators: operators
    };
  },
  addRecord: function(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    machines = jQuery.map( this.props.machines, function( a ) {
      if(a.id == record.machine_id) {
        a.used_units += 1;
      }
      return { value: a.id, label: (a.name + " (Available: " + (a.tot_units - a.used_units) + ")") };
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Work Station Added."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records,
      machines: machines
    });
  },
  deleteRecord: function(record) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
    });
    machines = jQuery.map( this.props.machines, function( a ) {
      if(a.id == record.machine_id) {
        a.used_units -= 1;
      }
      return { value: a.id, label: (a.name + " (Available: " + (a.tot_units - a.used_units) + ")") };
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Work Station Removed."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records,
      machines: machines
    });
  },
  updateRecord: function(record, data) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });
    machines = jQuery.map( this.props.machines, function( a ) {
      if(a.id == record.machine_id) {
        a.used_units += 1;
      }
      if(a.id == data.machine_id) {
        a.used_units -= 1;
      }
      return { value: a.id, label: (a.name + " (Available: " + (a.tot_units - a.used_units) + ")") };
    });
    ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={"Work Station Updated."} />, document.getElementById("alert_messages"));
    return this.setState({
      records: records,
      machines: machines
    });
  },
  render: function() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Operation</th>
              <th>SMV Value</th>
              <th>Operator</th>
              <th>Machine</th>
              <th>Attachment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record, i){
              return <WSRow operations={this.state.operations} operators={this.state.operators} machines={this.state.machines} 
                        section_id={this.props.section_id} handleDeleteRecord={this.deleteRecord} 
                        record={record} key={record.id} handleEditRecord={this.updateRecord} serial={i+1} />;
            }.bind(this))}
          </tbody>
        </table>
        <WorkStationForm key={this.props.section_id} operations={this.state.operations} ob_id={this.props.ob_id}
          machines={this.state.machines} section_id={this.props.section_id} handleNewRecord={this.addRecord} />
      </div>
    );
  }
});