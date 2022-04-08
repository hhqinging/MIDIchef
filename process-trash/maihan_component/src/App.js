import './App.css';
import React,{ Component } from 'react';
import NaiveBar from './component/Naivebar/Naivebar';
import Musicplayer from './component/musicplayer_user/musicplayer_user';
import Mainplayer from './component/musicplayer_home/musicplayer_home';
import Naivebaruser from './component/Naivebaruser/Naivebaruser';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div classname='App'>

      
      < Mainplayer />
      

      </div>
  
    );
  }
 
}

export default App;
