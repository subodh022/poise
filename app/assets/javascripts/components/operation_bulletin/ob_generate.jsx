OBGenerate = React.createClass({
  getInitialState: function() {
    return {
      record: this.props.data,
      sections: this.props.sections
    };
  },
  render: function() {
    return (
      <div>
        <div className="pull-right" style={{marginTop: '20px'}}>
          <a className="btn btn-primary btn-sm" title="Manage Entries" href={"/operation_bulletins/" + this.state.record.id + "/manage"}>
            <span className="glyphicon glyphicon-list-alt"></span> &nbsp;Back to OB Manage
          </a>
        </div>
        <div className="clear"></div>
        <hr/>
        <h5 className="text-info">
          <span className="glyphicon glyphicon-list-alt"></span> &nbsp;
          <b>OB Details</b>
        </h5>
        <table className="table borderless">
          <tbody>
            <tr>
              <td width="150px"><strong>Line</strong></td>
              <td> :&nbsp;&nbsp;&nbsp;&nbsp; {this.state.record.line_name}</td>
            </tr>
            <tr>
              <td width="150px"><strong>Style Name</strong></td>
              <td> :&nbsp;&nbsp;&nbsp;&nbsp; {this.state.record.style}</td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <h5 className="text-info bm10">
          <span className="glyphicon glyphicon-cog"></span> &nbsp;
          <b>Work Stations</b>
        </h5>
        <div>
          <Tabs defaultActiveKey={0}>
            {this.state.sections.map(function(section, i){
                return (
                  <Tab eventKey={i} title={section.name}>
                    <div className="form-group"></div>
                    <OBWorkStation records={section.workstations} 
                      line_capacity={this.state.record.line_capacity} 
                      ob_id={this.state.record.id} section_id={section.id} key={section.id} />
                  </Tab>
                );
            }.bind(this))}
          </Tabs>
        </div>
      </div>
    );
  }
});