OperatorSkillMatrix = React.createClass({
  getInitialState: function() {
    line_id = this.props.lines[0].value;
    section_id = this.props.lines[0].sections[0].value;
    records = this.filterRecords(line_id, section_id);
    return {
      records: records,
      line_id: line_id,
      section_id: section_id
    };
  },
  handleLineChange: function(v) {
    this.setState({
      line_id: v.value,
      section_id: v.sections[0].value,
    });
    this.setState({records :this.filterRecords(this.state.line_id, this.state.section_id)});
  },
  handleSectionChange: function(v){
    this.setState({section_id: v.value});
    this.setState({records :this.filterRecords(this.state.line_id, this.state.section_id)});
  },
  filterRecords: function(line_id, section_id) {
    f_records = []
    jQuery.each(this.props.records, function(i, record) { 
      if(record.line_id == line_id && record.section_id == section_id) {
        f_records.push(record);
      }
    });
    return f_records;
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="form-group rm10 col-xs-1">
            <label>Filters: </label>
          </div>
          <div className="form-group rm10 col-xs-2">
            <Select
              name="line_id"
              ref="line_id"
              value={this.state.line_id}
              options={this.props.lines}
              onChange={this.handleLineChange}
              clearable={false}
            />
          </div>
          <div className="form-group rm10 col-xs-2">
            <Select
              name="section_id"
              ref="section_id"
              value={this.state.section_id}
              options={jQuery.grep(this.props.lines, function(e){ return e.value == this.state.line_id; }.bind(this))[0].sections}
              onChange={this.handleSectionChange}
              clearable={false}
            />
          </div>
        </div>
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Operator Name</th>
                <th>Employee ID</th>
                <th>Line</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {this.state.records.map(function(record, i){
                return (
                  <tr>
                    <td>{record.emp_name}</td>
                    <td>{record.emp_id}</td>
                    <td>{record.line_id}</td>
                    <td>{record.section_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});