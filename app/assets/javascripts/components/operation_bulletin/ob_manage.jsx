OBManagement = React.createClass({
  getInitialState: function() {
    return {
      record: this.props.data,
      sections: this.props.sections
    };
  },
  confirmGenerate: function(){
    return function(e) {
        e.preventDefault();
        confirm = confirm('This will override your manual allocation of operators, if any. Do you want to proceed to generate fresh bulletin?');
        return confirm;
    }.bind(this);
  },
  render: function() {
    return (
      <div>
        <div className="pull-right" style={{marginTop: '20px'}}>
          <a className="btn btn-primary btn-sm" title="OB List" href={"/operation_bulletins/"}>
            <span className="glyphicon glyphicon-list-alt"></span> &nbsp;OB List
          </a>
        </div>
        <div className="pull-right rm10" style={{marginTop: '20px'}}>
          <a className="btn btn-primary btn-sm" onClick={this.confirmGenerate} title="Generate Bulletin" id="generateOB" href={"/operation_bulletins/" + this.state.record.id + "/generate"} >
            <span className="glyphicon glyphicon-list-alt"></span> &nbsp;Generated Final Bulletin
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
                    <WorkStation records={section.workstations} operations={section.operations} 
                      machines={this.props.machines} operators={section.operators} ob_id={this.state.record.id} section_id={section.id} 
                      key={section.id} />
                  </Tab>
                );
            }.bind(this))}
          </Tabs>
        </div>
      </div>
    );
  }
});