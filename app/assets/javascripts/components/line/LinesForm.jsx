LinesForm = React.createClass({
	getInitialState: function(){
		return ({
			title: this.props.data.title,
    		capacity: this.props.data.capacity,
    		sections: []
		});
	},
	componentDidMount: function(){
	    if (this.isMounted()) {
			this.req = jQuery.get('/lines/' + this.props.data.id + '/get_sections', this.handleSections);
		}
	},
	componentWillUnmount: function () {
		this.req.abort();
	},
	handleSections: function(result){
		this.setState({ sections: result });
	},
	handleSubmit: function(e){
	    e.preventDefault();
	    jQuery.ajax({
			method: 'put',
			url: '/lines/' + this.props.data.id, 
			data: jQuery("#line-form").serialize(),
			success: function(message){
				ReactDOM.render(<AlertAutoDismissable type="success" header="Success!" message={this.state.title +" Updated."} />, document.getElementById("alert_messages"));
			}.bind(this),
			error: function(error){
				alert("Something went wrong.");
			}
		});
	},
	render: function(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit} id="line-form">
				<div className="row">
					<label className="col-xs-2">Line Name</label>
					<div className="col-xs-3">
						<input type="text" className='form-control' placeholder='Title' name='line[title]' defaultValue={this.state.title} />
					</div>
				</div>
				<div className="clear" />
				<div className="row">
					<label className="col-xs-2">Line Capacity</label>
					<div className="col-xs-3">
						<input type="text" className='form-control' placeholder='Capacity' name='line[capacity]' defaultValue={this.state.capacity} />
					</div>
				</div>
				<label className="col-xs-2">Sections</label>
				<div className="col-xs-10">
					{this.state.sections.map(function(section, i){
		      			return <LineSection data={section} key={section.id} serial={i+1} />;
				    })}
				</div>
				<div className="clear" />
				<div className="row">
					<label className="col-xs-2"></label>
					<div className="col-xs-3">
						<button type="submit" className="btn btn-primary">Update Line</button>
					</div>
				</div>				
			</form>
		);
	}
});