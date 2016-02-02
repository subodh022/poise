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
			url: '/lines/' + this.props.key, 
			data: jQuery("#line").serialize(),
			success: function(message){
				alert("updated");
			}
		});
	},
	render: function(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit} id="line">
				<div className="row">
					<label className="col-xs-2">Line Name</label>
					<div className="col-xs-3">
						<input type="text" className='form-control' placeholder='Title' name='title' defaultValue={this.state.title} />
					</div>
				</div>
				<div className="clear" />
				<div className="row">
					<label className="col-xs-2">Line Capacity</label>
					<div className="col-xs-3">
						<input type="text" className='form-control' placeholder='Capacity' name='capacity' defaultValue={this.state.capacity} />
					</div>
				</div>
				<div className="clear" />
				{this.state.sections.map(function(section, i){
	      			return <LineSection data={section} key={section.id} />;
			    })}
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