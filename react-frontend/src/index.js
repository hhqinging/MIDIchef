import React from 'react';
import ReactDOM from 'react-dom';
import './product-style.css'
import ProductActivity from './Components/ProductActivity.js'
// import ProductSongInfo from './Components/ProductSongInfo.js'

class Main extends React.Component {
    render() {
        return (
            <div>
                <ProductActivity />
            </div>
        )
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
