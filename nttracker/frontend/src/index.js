import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";


class Index extends React.Component {
    render() {
        return <h1>Hello, world!</h1>
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));