import React from 'react';
import {connect} from 'react-redux';
import {postEmail} from '../../actions';

class PresentationEmailForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			message: null,
			cc: null,
			bcc:null,
		}

		this.onHandleChange = this.onHandleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onHandleChange(ev) {
		let payload = {...this.state};
		let {value, id} = ev.target;
		payload[id] = value;
		this.setState({...payload});
	}

	handleSubmit(e) {
		e.preventDefault();
		let payload = {...this.state};

		if(!payload.message) {
			return;
		}

		if(payload.cc){
			// validate
			let cc = payload.cc.split(' ');
			for (let i=0 ; i< cc.length ; i++) {
				if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(cc[i]))
				{
					alert(`invalid email ${cc[i]}`);
					return;
				}
			}
		}

		if(payload.bcc){
			// validate
			let bcc = payload.bcc.split(' ');
			for (let i=0 ; i< bcc.length ; i++) {
				if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(bcc[i]))
				{
					alert(`invalid email ${bcc[i]}`);
					return;
				}
			}
		}

		this.props.postEmail(
			this.props.presentation.id, 
			{
				message: this.state.message,
				cc: this.state.cc,
				bcc: this.state.bcc,
				name: window.TrackChairAppConfig.userinfo.name			
			}
		);

		this.setState({...this.state,
			message: null,
			cc: null,
			bcc:null,
		});
	}

	render() {
		const {presentation} = this.props;

		return (
	        <div className="chat-form">
	        	{presentation.emailSuccess &&
	        		<div className="alert alert-success">
	        			Email sent!
	        		</div>
	        	}
	           <form role="form" onSubmit={this.handleSubmit}>

	              <div className="form-group">
					  <label htmlFor="message">TO: All Speakers</label>
	                 <textarea
						id="message"
	                 	placeholder="Write your message..."
	                 	value={this.state.message}
	                 	onChange={this.onHandleChange}
	                 	className="form-control"
	                 	rows={10} />
	              </div>
				   <div className="form-group">
					   <label htmlFor="cc">CC</label>
					   <input type="text" onChange={this.onHandleChange} value={this.state.cc} className="form-control" id="cc"/>
						<label htmlFor="bcc">BCC</label>
						<input type="text" onChange={this.onHandleChange} value={this.state.bcc} className="form-control" id="bcc"/>
				   </div>
	              <div className="text-right">
	                 <button type="submit" className="btn btn-sm btn-primary m-t-n-xs">
	                 	{presentation.sending &&
	                 		<strong>Sending...</strong>
	                 	}
	                 	{!presentation.sending &&
	                 		<strong>
	                 			Send email to {presentation.speakers.length}&nbsp;
	                 			{presentation.speakers.length === 1 ? 'speaker' : 'speakers'}
	                 		</strong>
	                 	}
	                 </button>
	              </div>
	           </form>
	        </div>
	    );
	}
}

export default connect (
	state => ({
		presentation: state.detailPresentation
	}),
	dispatch => ({
		postEmail(presentationID, data) {
			dispatch(postEmail(presentationID, data));
		}
	})
)(PresentationEmailForm);