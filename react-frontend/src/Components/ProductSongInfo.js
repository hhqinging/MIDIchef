import React from 'react';


export default class ProductSongInfo extends React.Component {
  render() {
    return (
      <div class="right-product" style="float: left">
          <div class="title-creator container">
          <div class="imm-text">
              <label id="title"><b>SIGH</b></label>
          </div>
          <br />
          <div class="imm-text">
              <label id="owner" style="color: white">
              Owned by
              <a class="user">MIDIduck</a>
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
          <label style="color: white">
              <b>Current Price</b>
          </label>
          <div class="price-part">
              <img
              src="UI_figma/algo icon.png"
              style="width: 25px; height: 25px; margin-right: 10px"
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