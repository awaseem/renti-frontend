import React from "react";
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                <Header/>
                <div className="ui main container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
});
