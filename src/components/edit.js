import React, { Component } from 'react';
import '../style/edit.css'

const headerStyle = {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
}

const fieldStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 30
}

const textBoxStyle = {
    padding: 5,
    borderRadius: 4
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
        
        const { app: { pricingInfo: { budget = [], premier = [] } = {} }, isMobile } = this.props;
        const { pricingTier, isEditable } = this.state;
        
      
        return(
            <div 
              className="edit-container"          
            >
              
              <div style={ isMobile ? { width: 'auto' } : {} } className="form-container">
                <div style={headerStyle}>
                    Edit Product
                </div>
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
                        <div>                        
                            <label style={{ paddingRight: 10 }}> Pricing Tier</label>
                        </div>

                        <div style={{display: 'flex'}}>

                            <div style={{ ...fieldStyle, margin: '0px 5px' }}>
                                <input className="radio-button" name="budget" type="radio" checked={pricingTier === 'budget'} onChange={this.handleRadio} required={pricingTier === 'budget'}/>
                                <label for="budget" style={{ padding: '0px 5px' }}>Budget</label>
                            </div>
                            
                            <div style={{ ...fieldStyle, margin: '0px 5px' }}>           
                                <input className="radio-button" name="premier" type="radio" checked={pricingTier === 'premier'} onChange={this.handleRadio} required={pricingTier === 'premier'}/>
                                <label style={{ padding: '0px 5px' }}> Premier </label>                        
                            </div>

                        </div>
                    
                    </div>

                    <div style={fieldStyle}>
                        <label for="priceRange" style={{ paddingRight: 10 }}>Price Range</label>
                        
                            {
                                pricingTier === 'premier' && (
                                  <select className="select-box" name="priceRange" onChange={this.handleChange} required>
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
                                  <select className="select-box" name="priceRange" onChange={this.handleChange} required>
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

                    <div style={{display: 'flex', alignItems: 'center', margin: '10px 10px 10px 30px'}}>
                        <input className="isEditable-checkbox" type="checkbox" name="isEditable" value="isEditable" checked={isEditable} onChange={this.handleCheckBox} required/>                   
                        <label for="priceRange" style={{ paddingLeft: 10 }}>isEditable</label>
                    </div>
                    
                    <div style={{...fieldStyle, justifyContent: 'center'}}>
                      <input className="submit-style" type="submit" value="Submit"/>
                    </div>
                </form>
              </div>
                
            </div>
        )
    }
}

export default EditProduct;