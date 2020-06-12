import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Alert extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.elementDisplay === 'error'){
            return(
                <div className='alert alert-danger'>
                    { this.props.message }
                </div>
            );
        }else if(this.props.elementDisplay === 'loading'){
            return (
                <div className='d-flex col-md-12 justify-content-center'>
                    <img src='/images/loading.gif' alt='loading' width='30%' className='p-0'/>
                </div>
            );
        }else if(this.props.elementDisplay === 'redirect'){
            return <Redirect to={this.props.redirect}/>;
        }else{
            return <span></span>;
        }
    }
}

export default Alert;