import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';
import { products, pricingInfo } from './products_1.js';
import './style/App.css';

class Main extends Component {

    state = {
        
    }
    
    componentWillMount(){
        let { sendProducts } = this.props;
                
        if(window.screen.width <= 768) {
            this.setState ({
                isMobile: true
            })
        } else {
            this.setState({
                isMobile: true
            })
        }
        sendProducts(products, pricingInfo);
        console.log('width', window.screen.width);
    }
    
    render () {
      let isMobile = this.state ? this.state.isMobile : false;
        
        return (
            <div className="app">
                { this.props.children !== null ? (
                    React.cloneElement(this.props.children, {...this.props, isMobile})
                ): (
                    ''
                )}
            </div>

        );
    }
}

function mapStateToProps (state) {
    return state;
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);