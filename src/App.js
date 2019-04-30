import React, { Component } from 'react';

const containerStyle = {
    padding: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
}

const divStyle = {
      border: '1px solid #eee',
      padding: 10,      
}

const tdStyle = {
    padding: 10
}

const buttonStyle = {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: 'blue',
    border: 'none',
    boxShadow: '2p 2px 5px #eee',
    borderRadius: 4,
    cursor: 'pointer'
}

class App extends Component {
    
    openInNew = (item) => {
        this.props.router.push({
            pathname: '/edit-product',
            state: { dataItem: item }
        })
    }

    render() {
        
        let { app: { products = [] } } = this.props;
      
        return (
            <div style={containerStyle} className="app">
                
                <div style={divStyle}>
                  
                    {
                        products.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th style={tdStyle}>Name</th>
                                        <th style={tdStyle}>Weight</th>
                                        <th style={tdStyle}>Availability</th>
                                        <th style={tdStyle}>isEditable</th>
                                    </tr>
                                </thead>
                                
                                {
                                    products.map( (item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td style={tdStyle}>{item.name}</td>
                                                <td style={tdStyle}>{item.weight}</td>
                                                <td style={tdStyle}>{item.availability}</td>
                                                <td style={tdStyle}>
                                                    {item.isEditable ? <button style={buttonStyle} onClick={this.openInNew.bind(this, item)}> Edit </button> : null}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tbody>
                                </tbody>
                            </table>
                        )
                    }
                  
                </div>
                
                
              
            </div>
        );
    }
}

export default App;
