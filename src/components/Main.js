import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './home/Home';
import Header from './header/Header';
import Footer from './footer/Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Detail from './details/Detail';
import { fetchUser } from '../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    // console.log("Main: mapStateToProps", state);
    return {
        user: state.user.user,
        isLoadingUser: state.user.isLoadingUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser())
    }
}

class Main extends Component {
    
    componentDidMount() {
        this.props.fetchUser();
        // console.log("Main: componentDidMount", this.props);
    }

    componentDidUpdate() {
        // console.log("Main: componentDidUpdate", this.props);
    }

    render() {
        let routes = this.props.user ? (
            <Switch>
                <Route exact path="/" render={()=>(<Home />)} />
                <Route exact path="/detail" component={Detail} />
                <Redirect to="/" />
            </Switch>) : (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/" render={()=>(<Home />)} />
                <Redirect to="/" />
            </Switch>)
        return (
            <div>
                <Header />
                {routes}
                <Footer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);