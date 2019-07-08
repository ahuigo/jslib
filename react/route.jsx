import React from 'react';
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';
import Main from './Main.jsx';
import About from './About.jsx';

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ul>
                    <li><NavLink to="/main">main</NavLink></li>
                    <li><NavLink to="/about">about</NavLink></li>
                </ul>

                <Route exact path="/main" component={Main} />
                <Route path="/about" component={About} />
            </div>
        );
    }
}
