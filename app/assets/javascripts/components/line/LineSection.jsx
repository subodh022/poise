LineSection = React.createClass({
	getInitialState: function(){
		return ({
			enable: this.props.data.enabled
		});
	},
	handleChange: function(e){

	    this.setState({enable: true});
	    e.preventDefault();
	    enabled = jQuery("#section-" + this.props.data.id).prop("checked");
	    jQuery.ajax({
			method: 'put',
			url: '/sections/' + this.props.data.id + '/enable?enabled=' + enabled , 
			data: jQuery("#line").serialize(),
			success: function(result){
				alert(result);
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