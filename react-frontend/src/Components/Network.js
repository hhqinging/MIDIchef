import React from 'react';


export default class Network extends React.Component {
  render() {
    return (
        <div class="network-wrapper">
            <div class="user-wrapper">
                <div id="pfp">
                    <a href="#">
                        <img class="profile-logo" src="UI_figma/duck.jpeg" />
                    </a>
                </div>
                <div class="text-buttons">
                    <div class="n-left">
                        <div id="username">
                            <a href="#" class="user"><b>MIDIduck</b></a>
                        </div>
                        <div id="following">
                            <label class="follow-count"><b>2967 Followers</b></label>
                        </div>
                    </div>
                    <div class="n-right">
                        <button class="follow-button" type="submit">+ Follow</button>
                    </div>
                </div>
            </div>
            <div class="user-wrapper">
                <div id="pfp">
                    <a href="#">
                        <img class="profile-logo" src="UI_figma/midicat.png" />
                    </a>
                </div>
                <div class="text-buttons">
                    <div class="n-left">
                        <div id="username">
                            <a href="#" class="user"><b>MIDIcat</b></a>
                        </div>
                        <div id="following">
                            <label class="follow-count"><b>7473 Followers</b></label>
                        </div>
                    </div>
                    <div class="n-right">
                        <button class="follow-button" type="submit">Following</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
