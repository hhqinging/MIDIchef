import React from 'react';
import ReactDOM from 'react-dom';
import './css/product-page.css'
import ProductActivity from './Components/ProductActivity.js'
import ProductSongInfo from './Components/ProductSongInfo.js'

class APP extends React.Component {
    render() {
        return (
            <div id="APP">
                <ProductSongInfo />
                <ProductActivity />
            </div>
        )
    }
}


ReactDOM.render(
    <APP />,
    document.getElementById('root')
);
