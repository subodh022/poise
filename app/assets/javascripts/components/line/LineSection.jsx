LineSection = React.createClass({
	handleChange: function(e){
	    e.preventDefault();
	},
	render: function(){
		return (
			<div className="row">
				<label className="col-xs-2">{this.props.data.name}</label>
				<div className="col-xs-3">
					<checkbox id={this.props.data.id} checked={this.props.data.enabled} onChange={this.handleChange} />
				</div>
			</div>
		);
	}
});