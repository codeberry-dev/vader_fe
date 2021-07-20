import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

class User extends Component {

  render() {
    return (
      <div>
        <span>{this.props.id}: {this.props.name}</span>
      </div>
    );
  }
}

class UserList extends Component {

  render() {
    return (
      <ul>
        {
          this.props.users.map(user =>
            <li>
              <User id={user.id} name={user.name} />
            </li>
          )
        }
      </ul>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    // モックデータの作成
    let mock = new MockAdapter(axios);
    mock.onGet('/users').reply(200, {
      users: [
        { id: 1, name: 'John Lenon' },
        { id: 2, name: 'James Brown' },
      ]
    });

    // Ajax
    axios.get('/users')
      .then(res => {
        this.setState({
          users: res.data.users,
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="App">
        <UserList users={this.state.users} />
      </div>
    );
  }
}

export default App;
