import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedUSer:   localStorage.getItem('selected_user') || 1
       };
    this.onUSerChange = this.onUSerChange.bind(this);
  }

  onUSerChange = function(event){
    this.setState({selectedUSer: event.target.value});
    localStorage.setItem('selected_user',  event.target.value);
    window.location.href='/'
}
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <Link className="navbar-brand"to="/" >S3 Upload App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse mr-5" id="navbarColor01">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to="/"  className="nav-link">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/file-upload"  className="nav-link">File Upload</Link>
                    </li>
                    <li className="nav-item dropdown">
                    <select className="form-control" onChange={this.onUSerChange} value={this.state.selectedUSer}>
                        <option value={1}>USER 1</option>
                        <option value={2}>USER 2</option>
                        <option value={3}>USER 3</option>
                        <option value={4}>USER 4</option>
                        <option value={5}>USER 5</option>
                    </select>
                    </li>
                </ul>
            </div>
            </nav>
            );
        }
    }
export default NavBar;