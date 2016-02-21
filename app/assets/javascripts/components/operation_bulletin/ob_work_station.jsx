const OBWorkStation = React.createClass({
  getInitialState: function() {
    return {
      records: this.props.records
    };
  },
  rowSpanCount: function(numberOfOperators) {
    if(numberOfOperators == 0) {
      return 1;
    } else {
      return numberOfOperators;
    }
  },
  render: function() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Operation</th>
              <th>SMV (Minutes)</th>
              <th>DHU Value</th>
              <th>Workstations</th>
              <th>Operator</th>
              <th>Operator Skill</th>
              <th>Machine</th>
              <th>Attachment</th>
              <th>Standard Output</th>
              <th>Actual Output</th>
            </tr>
          </thead>
            {this.state.records.map(function(record, i){
              if(this.rowSpanCount(record.operators.length) == 1) {
                return (
                  <tbody>
                    <tr>
                      <td>{i+1}</td>
                      <td>{record.operation.title}</td>
                      <td>{record.operation.smv}</td>
                      <td>{record.operation.dhu}</td>
                      <td>{record.operators.length}</td>
                      <td>{record.operators.length == 1 ? record.operators[0].operator_name : "--"}</td>
                      <td>{record.operators.length == 1 ? <ProgressCircle size="small" value={record.operators[0].operator_skill} /> : "--"}</td>
                      <td>{record.machine.name}</td>
                      <td>{(record.machine.attachment == "") ? <i className="text-muted">None</i> : record.machine.attachment}</td>
                      <td>{this.props.line_capacity}</td>
                      <td>--</td>
                    </tr>
                  </tbody>
                );
              } else {
                return (
                  <tbody>
                    <tr>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{i+1}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{record.operation.title}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{record.operation.smv}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{record.operation.dhu}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{record.operators.length}</td>
                      <td>{record.operators[0].operator_name}</td>
                      <td><ProgressCircle size="small" value={record.operators[0].operator_skill} /></td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{record.machine.name}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{(record.machine.attachment == "") ? <i className="text-muted">None</i> : record.machine.attachment}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>{this.props.line_capacity}</td>
                      <td rowSpan={this.rowSpanCount(record.operators.length)}>--</td>
                    </tr>                    
                    {record.operators.map(function(operator, i){
                      if(i > 0) {
                        return (
                          <tr>
                            <td>{operator.operator_name}</td>
                            <td><ProgressCircle size="small" value={operator.operator_skill} /></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
              }              
            }.bind(this))}
        </table>
      </div>
    );
  }
});