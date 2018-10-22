import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Messages from './components/Messages/Messages';
import Music from './components/Music/Music';
import Videos from './components/Video/Videos';



export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/videos" component={Videos} />
        <Route path="/music" component={Music} />
        <Route path="/messages" component={Messages} />
    </Switch>
    
)