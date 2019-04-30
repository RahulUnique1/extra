import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';
import { products, pricingInfo } from './products_1.js';

class Main extends Component {

    constructor (props) {
        super();
    }
    
    componentWillMount(){
        this.props.sendProducts(products, pricingInfo);
        console.log('it hit', products);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.app.landingRoute !== this.props.app.landingRoute && nextProps.app.landingRoute !== undefined) {
            nextProps.router.replace(nextProps.app.landingRoute);
        }
    }

    render () {

        return (
            <div>
                { this.props.children !== null ? (
                    React.cloneElement(this.props.children, {...this.props})
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