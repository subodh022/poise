LineSection = React.createClass({
	handleChange: function(e){
	    e.preventDefault();
	},
	render: function(){
		return (
			<div className="row">
				<label className="col-xs-2"/>
				<div className="col-xs-3">
					<input className="col-xs-2" type="checkbox" value={this.props.data.name} checked={this.props.data.enabled} />
					<label>{this.props.data.name}</label>
				</div>				
			</div>
		);
	}
});