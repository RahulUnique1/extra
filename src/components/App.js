import React, { Component } from 'react';
import '../style/App.css';

const containerStyle = {
    padding: 10,
    height: '100%',
    // display: 'flex',
    // justifyContent: 'center',
}

const headerStyle = {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
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
            <div style={containerStyle}>
                
                <div style={headerStyle}>
                    Products Table
                </div>
                
                <div>
                  
                    {
                        products.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Weight</th>
                                        <th>Availability</th>
                                        <th>isEditable</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        products.map( (item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{item.name}</td>
                                                    <td>{item.weight}</td>
                                                    <td>{item.availability}</td>
                                                    <td>
                                                        {item.isEditable ? <button class="edit-button" onClick={this.openInNew.bind(this, item)}> Edit </button> : null}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
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
