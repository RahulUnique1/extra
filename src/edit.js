import React, { Component } from 'react';

const fieldStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
}

const submitStyle = {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: 'blue',
    border: 'none',
    boxShadow: '2p 2px 5px #eee',
    borderRadius: 4,
    cursor: 'pointer'
}

const textBoxStyle = {
    padding: 5,
    borderRadius: 4
}

const containerStyle={
    display: 'flex',
    justifyContent: 'center'                 
}

const divStyle = { 
    border: '1px solid #bbb', 
    padding: 10, 
    margin: 10, 
    borderRadius: 4 
}

const selectBoxStyle = {
    padding: '5px',
    borderRadius: 4,
    cursor: 'pointer'
}

class EditProduct extends Component {
  
    state = {

    }
    
    componentWillMount() {
        let { location: { state: { dataItem = {} } = {} } = {} } = this.props.router;
        
        if (Object.keys(dataItem).length > 0) {
            let { app: { products = [] } = {} } = this.props;
            
            let product = products.find(item => item.name === dataItem.name);
            
            if(product) {
                this.setState({ ...this.state, ...product })
            }
        }
    }
  
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleCheckBox = () => {
        this.setState({ isEditable: !this.state.isEditable })
    }
    
    handleRadio = (e) => {
        this.setState({ pricingTier: e.target.name })
    }
    
    submitForm = (e) => {
        let { app: { products = [] } = {} } = this.props;
        
        let editedProduct = {...this.state};
            
            
        
        let productIndex = products.findIndex(item => item.name === editedProduct.name);
        
        if(productIndex >= 0) {
            products[productIndex] = editedProduct;
        } 
        e.preventDefault();
        this.props.router.push('/')
    }
  
    render() {
        
        const { app: { pricingInfo: { budget = [], premier = [] } = {} } } = this.props;
        const { pricingTier, isEditable } = this.state;
        
      
        return(
            <div 
              style={containerStyle}            
            >
            
              <div style={divStyle}>
                <form onSubmit={this.submitForm}>
                    
                    <div style={fieldStyle}>
                        <label for="name" style={{ paddingRight: 10 }}>Name</label>
                        <input style={textBoxStyle} name="name" value={this.state.name} onChange={this.handleChange} required/>
                    </div>
                    
                    <div style={fieldStyle}>
                        <label for="weight" style={{ paddingRight: 10 }}> Weight </label>
                        <input style={textBoxStyle} name="weight" value={this.state.weight} onChange={this.handleChange} required/>
                    </div>
                    
                    <div style={fieldStyle}>
                        <label for="availability" style={{ paddingRight: 10 }}>Availability</label>
                        <input style={textBoxStyle} name="availability" value={this.state.availability} type="number" onChange={this.handleChange} />
                    </div>
                    
                    <div style={fieldStyle}>
                        <label for="productUrl" style={{ paddingRight: 10 }}>Product Url</label>
                        <input style={textBoxStyle} name="productUrl" value={this.state.productUrl} onChange={this.handleChange} required/>
                    </div>

                    <div style={fieldStyle}>
                        <label style={{ paddingRight: 10 }}> Pricing Tier</label>
                        <input name="budget" type="radio" checked={pricingTier === 'budget'} onChange={this.handleRadio} required={pricingTier === 'budget'}/>
                        <label for="budget" style={{ paddingRight: 10 }}>Budget</label>
                        
                        <input name="premier" type="radio" checked={pricingTier === 'premier'} onChange={this.handleRadio} required={pricingTier === 'premier'}/>
                        <label style={{ paddingRight: 10 }}> Premier </label>
                    </div>

                    <div style={fieldStyle}>
                        <label for="priceRange" style={{ paddingRight: 10 }}>Price Range</label>
                        
                            {
                                pricingTier === 'premier' && (
                                  <select style={selectBoxStyle} name="priceRange" onChange={this.handleChange} required>
                                    {premier.map((item, idx) => {
                                        return (
                                            <option 
                                                key={idx}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        )
                                    })}
                                  </select>
                                )
                            }
                        
                            {
                                pricingTier === 'budget' && (
                                  <select style={selectBoxStyle} name="priceRange" onChange={this.handleChange} required>
                                    {budget.map((item, idx) => {
                                        return (
                                            <option 
                                                key={idx}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        )
                                    })}
                                  </select>
                                )
                            }

                    </div>

                    <div style={{margin: '10px 10px 10px 0px'}}>
                        <label for="priceRange" style={{ paddingRight: 10 }}></label>
                        <input type="checkbox" name="isEditable" value="isEditable" checked={isEditable} onChange={this.handleCheckBox} required/> isEditable 
                    </div>
                    
                    <div style={{...fieldStyle, justifyContent: 'center'}}>
                      <input style={submitStyle} type="submit" value="submit"/>
                    </div>
                </form>
              </div>
                
            </div>
        )
    }
}

export default EditProduct;