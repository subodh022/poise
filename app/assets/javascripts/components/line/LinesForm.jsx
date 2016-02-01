LinesForm = React.createClass({
	getInitialState: function(){
		return ({
			title: this.props.data.title,
    		capacity: this.props.data.capacity
		});
	},
	handleSubmit: function(e){
	    e.preventDefault();
	},
	render: function(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit}>
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