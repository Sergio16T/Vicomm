import React, { useState } from 'react';
import Page from './Page';
import { ProductPageContent, Body, Form  } from './Styles/ProductStyles'; 

const AddProducts = (props) => {
    return (
       <Page
       render={() => null}
       text="Add A Product"
       >
           {({ modalOpen, toggleModal, setSpinner }) => 
            <AddProductForm/>
           }
       </Page>
    );
};

const AddProductForm = (props) => {
    const [state, setState] = useState({
        name: "",
        price: "",
        salePrice: "",
        weight: "", 
    }); 
    
    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        switch(name) {
            case "weight":
                if(value > 1000) setState({...state, [name]: 1000}); 
                else setState({...state, [name]:value}); 
                break;
            default: 
            setState({...state, [name]:value}); 
        }
      
    }
    return (
        <ProductPageContent>
            <Body>
                <Form>
                    <div className="formRow">
                        <input
                        type="text"
                        name="name"
                        id="name"
                        value={state.name}
                        onChange={handleInputChange}
                        required
                        />
                          <label className={`${state.name ? "active-content": ""} p-label `} htmlFor="name">
                            Name
                        </label>
                    </div>
                    <div className="flex-row">
                        <div className="flex-group">
                            <div className="formCol">
                                <input
                                type="number"
                                name="price"
                                id="price"
                                value={state.price}
                                onChange={handleInputChange}
                                required
                                />
                                <label className={`${state.price ? "active-content": ""} p-label `} htmlFor="price">
                                    Price
                                </label>
                            </div>
                            <div className="formCol">
                                <input
                                type="number"
                                name="salePrice"
                                id="salePrice"
                                value={state.salePrice}
                                onChange={handleInputChange}
                                required
                                />
                                <label className={`${state.salePrice ? "active-content": ""} p-label `} htmlFor="salePrice">
                                    Sale Price
                                </label>
                            </div>
                        </div>
                        <div className="formCol">
                            <input
                            type="number"
                            name="weight"
                            id="productWeight"
                            value={state.weight}
                            onChange={handleInputChange}
                            min="0"
                            max="1000"
                            required
                            />
                            <label className={`${state.weight ? "active-content": ""} p-label `} htmlFor="productWeight">
                                Weight
                            </label>
                            <span className="input-addOn">lbs.</span>
                        </div>
                      
                    </div>
                </Form>
            </Body>
        </ProductPageContent>
    ); 
}

export default AddProducts;