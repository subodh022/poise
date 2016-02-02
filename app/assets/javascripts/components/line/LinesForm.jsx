LinesForm = React.createClass({
	getInitialState: function(){
		// sections = jQuery.ajax({
		// 	method: 'get',
		// 	url: '/lines/' + this.props.data.id + '/get_sections',
		// 	success: function(data){
		// 		return data;
		// 	}
		// });
		return ({
			title: this.props.data.title,
    		capacity: this.props.data.capacity,
    		sections: this.props.sections
		});
	},
	// getSections: function(){
	// 	jQuery.ajax({
	// 		method: 'get',
	// 		url: '/lines/' + '1' + '/get_sections',
	// 		success: function(data){
	// 			return data;
	// 		}
	// 	});
	// },
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