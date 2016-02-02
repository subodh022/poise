Lines = React.createClass({
	getInitialState: function(){
		options = jQuery.map( this.props.data, function( a ) {
		  return { value: a.id, label: a.title };
		});
		return ({
			records: this.props.data,
			options: options,
			current_record_index: 0
		});
	},
	handleChange: function(value){
	    this.setState({current_record_index: this.state.options.indexOf(value)});
	},
	render: function(){
		return (
			<div>
				<div className="row">
					<label className="col-xs-2">Choose Line</label>
					<div className="col-xs-3">
						<Select
						    name="line-title"
						    value={this.state.options[this.state.current_record_index].value}
						    options={this.state.options}
						    onChange={this.handleChange}
						    clearable={false}
						/>
					</div>
				</div>
				<LinesForm key={this.state.records[this.state.current_record_index].id} 
					data={this.state.records[this.state.current_record_index]}
					url=('/lines/' + this.state.records[this.state.current_record_index].id + '/get_sections') />
			</div>
		);
	}
});