import React            from 'react';
import ReactDOM         from 'react-dom';
import {Router, 
	    Route, 
	    IndexRoute,
	    hashHistory}    from "react-router";
import LandingPage      from './flux-app/components/LandingPage.js';
import ChatAppComponent from './flux-app/components/ChatApp/ChatAppComponent.js';
import Home 			from './flux-app/components/Home.js';
import MyPage           from './flux-app/components/MyPage/MyPage.js';
import ChatNav          from './flux-app/components/ChatApp/ChatNav.js';
import ChatRoom         from './flux-app/components/ChatApp/ChatRoom.js';
import UserPage         from './flux-app/components/UserPage/UserPage.js';
import SinglePost       from './flux-app/components/Notification/SinglePost.js';
import PostAppComponent from './flux-app/components/PostApp/PostAppComponent.js';
import './css/main.scss';
import './flux-app/socket.js'; 

const app = document.getElementById('main');

ReactDOM.render(
<Router history={hashHistory}>
  <Route path="/" component={LandingPage}>
	
	<IndexRoute component={Home}></IndexRoute> 	

		<Route path="ChatApp" component={ChatAppComponent}>
			<IndexRoute component={ChatNav}></IndexRoute>
			<Route path="ChatNav" component={ChatNav}></Route>
			<Route path="ChatRoom" component={ChatRoom}></Route>
		</Route>

	<Route path="SinglePost/:postId" component={SinglePost}></Route>
	<Route path="PostApp" component={PostAppComponent}></Route>
  	<Route path="MyPage" component={MyPage}></Route>
  	<Route path="UserPage/:user" component={UserPage}/>

  </Route>
</Router>,
app); 