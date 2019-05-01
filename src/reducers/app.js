
function app( state = { products: [], pricingInfo: []}, action ) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products,
                pricingInfo: action.pricingInfo
            }
            
        default:
            return state;

    }
}

export default app;
