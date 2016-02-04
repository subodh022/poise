LineSection = React.createClass({
	getInitialState: function(){
		return ({
			enable: this.props.data.enabled
		});
	},
	handleChange: function(e){
	    enabled = jQuery("#section-" + this.props.data.id).prop("checked");
	    this.setState({enable: enabled});
	    jQuery.ajax({
			method: 'put',
			url: '/sections/' + this.props.data.id + '/enable?enabled=' + enabled , 
			data: jQuery("#line").serialize(),
			success: function(result){
				console.log(result);
			},
			error: function(error){
				alert("Something went wrong.");
			}
		});
	},
	updateState: function(enabled) {
		this.setState({enabled: enabled});
	},
	render: function(){
		return (
			<div className="row">
				<label className="col-xs-2"/>
				<div className="col-xs-3">
					<input className="col-xs-2" type="checkbox" id={"section-" + this.props.data.id} 
						checked={this.state.enable} onChange={this.handleChange} />
					<label>{this.props.data.name}</label>
				</div>				
			</div>
		);
	}
});