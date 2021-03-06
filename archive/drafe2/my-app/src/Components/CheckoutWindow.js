import React from 'react';


export default class CheckoutWindow extends React.Component {
  render() {
    return (
        <div class="checkout-wrapper">
        <div class="title">
            <label><b>Complete Checkout</b></label>
        </div>
        <div class="secondary">
            <label class="secondary-title co-left" style="top: 6px;"><b>Track</b></label>
            <label class="secondary-title co-right"><b>Subtotal</b></label>
        </div>
        <div class="product table-set" style="border-bottom: 1px solid black;">
            <div class="co-left ">
                <img class="cell" src="UI_figma/sign.jpeg" style="max-width: 25%; padding-top: 10px; padding-bottom: 10px;"/>
                <label class="cell" style="padding-top: 20px; padding-left: 15px;"><b>SIGH</b></label>
            </div>
            <div class="co-right">
                <label class="cell" style="padding: 15px 5px 0 60px; float: right;"><b>1 Algo</b></label>
                <img class="cell" src="UI_figma/algo icon.png" style="max-width: 15%; padding-top: 10px; padding-bottom: 10px; float: right;"/>
            </div>
        </div>
        <div class="total" style="border-bottom: 1px solid black; padding-bottom: 10px;">
            <label class="secondary-title co-left" style="top: 6px;"><b>Total</b></label>
            <div class="secondary-title co-right">
                <label class="cell" style="padding: 0 0 0 32px; float: right;"><b>1 Algo</b></label>
                <img class="cell" src="UI_figma/algo icon.png" style="max-width: 15%;  float: right;"/>
            </div>
        </div>
        <div class="conclusion">
            <form class="checkout">
                <div>
                    <input type="checkbox" name="toc" value="Yes"/>
                    <b>I have read and agree to the Terms and Conditions.</b>
                </div>
                <br/>
                <button class="checkout-button" type="submit">Checkout</button>
            </form>
        </div>
    </div>
    )
  }
}

