import React from 'react';
import algo_logo from "../img/algo icon.png"



export default class ProductSongInfo extends React.Component {
    render() {
        // TODO: hard coded values
        return (
            <div class="right-product" id="right-product-wrapper">
                <div class="title-creator container">
                    <div class="imm-text">
                        <label id="title"><b>SIGH</b></label>
                    </div>
                    <br />
                    <div class="imm-text">
                        <label id="owner">
                            Owned by

                            <a href="/" class="user">MIDIduck</a>
                        </label>
                    </div>
                </div>
                <div class="favorites container">
                    <div id="heart-icon">
                        <i class="fa fa-heart"></i>
                    </div>
                    <label id="fav-num">387 Favorited</label>
                </div>
                <div class="pricing container">
                    <label id="price-label">
                        <b>Current Price</b>
                    </label>
                    <div class="price-part">
                        <img id="algo-logo"
                            src={algo_logo}
                            alt='Algo Logo'
                        />
                        <label id="price"><b>1 Algo</b></label>
                    </div>
                </div>
                <div class="play-part container">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <label id="playtime"><b>0:28</b></label>
                    <div class="played-button">
                        <i class="fa fa-play"></i>
                    </div>
                    <label id="played"><b>3921</b></label>
                </div>
                <div class="interact-part container">
                    <div class="button-container">
                        <input
                            class="buttons"
                            type="submit"
                            value="Favorite"
                            onclick="window.location.href='./#';"
                        />
                        <input
                            class="buttons"
                            type="submit"
                            value="Buy Now"
                            onclick="window.location.href='./#';"
                        />
                    </div>
                </div>
            </div>
        )
    }
}