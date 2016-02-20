OperatorSkillMatrix = React.createClass({
  getInitialState: function() {
    line_id = this.props.lines[0].value;
    section_id = this.props.lines[0].sections[0].value;
    records = this.filterRecords(this.props.records, line_id, section_id);
    return {
      all_records: this.props.records,
      records: records,
      line_id: line_id,
      section_id: section_id
    };
  },
  updateRecords: function(record, data) {
    index = this.state.all_records.indexOf(record);
    all_records = React.addons.update(this.state.all_records, {
      $splice: [[index, 1, data]]
    });
    records = this.filterRecords(all_records, line_id, section_id);
    this.setState({
      all_records: all_records,
      records: records
    });
  },
  handleLineChange: function(v) {
    line_id = v.value;
    section_id = v.sections[0].value;
    records = this.filterRecords(this.state.all_records, line_id, section_id);
    this.setState({
      line_id: line_id,
      section_id: section_id,
      records: records
    });
  },
  handleSectionChange: function(v){
    line_id = this.state.line_id;
    section_id = v.value;
    records = this.filterRecords(this.state.all_records, line_id, section_id);
    this.setState({
      line_id: line_id,
      section_id: section_id,
      records: records
    });
  },
  filterRecords: function(records, line_id, section_id) {
    f_records = []
    jQuery.each(records, function(i, record) {
      if(record.line_id == line_id && record.section_id == section_id) {
        f_records.push(record);
      }
    });
    return f_records;
  },
  render: function() {
    return (
      <div>
        <div className="row form-inline">
          <div className="form-group rm10">
            <label>Filters: </label>
          </div>
          <OverlayTrigger placement="top" overlay={<Tooltip>Choose Line</Tooltip>}>
            <div className="form-group rm10" style={{width: 200}}>
              <Select
                name="line_id"
                ref="line_id"
                value={this.state.line_id}
                options={this.props.lines}
                onChange={this.handleLineChange}
                clearable={false}
              />
            </div>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Choose Section</Tooltip>}>
            <div className="form-group rm10" style={{width: 200}}>
              <Select
                name="section_id"
                ref="section_id"
                value={this.state.section_id}
                options={jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].sections}
                onChange={this.handleSectionChange}
                clearable={false}
              />
            </div>
          </OverlayTrigger>
        </div>
        <div>
          {(() => {
            if(this.state.records.length > 0) {
              return (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="200px">Operator (Emp ID)</th>
                      {this.state.records[0].skills.map(function(op, i){
                        return (
                          <th>{op.operation_title}</th>
                        );
                      })}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map(function(record, i){
                      return (
                        <tr>
                          <td><span className="glyphicon glyphicon-user"></span> &nbsp;{record.emp_name + " (" + record.emp_id + ")"}</td>
                          {record.skills.map(function(op, i){
                            return (
                              <td><ProgressCircle key={op.id} size="small" value={op.value} /></td>
                            );
                          })}
                          <td>
                            <OperatorSkill key={record.emp_id} name={record.emp_name} record={record} handleSkillUpdate={this.updateRecords} />
                          </td>
                        </tr>
                      );
                    }.bind(this))}
                  </tbody>
                </table>
              );
            } else {
              return (
                <div className="row">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center"><i>No Records Found</i></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
});