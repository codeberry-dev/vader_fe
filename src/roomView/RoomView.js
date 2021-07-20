import React, { Component } from "react"
import { Link } from "react-router-dom"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { gameInfo } from "../common"
import './RoomView.css'

class RoomView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };

    // モックデータの作成
    let mock = new MockAdapter(axios);
    mock.onGet('/v1/room').reply(200, {
      rooms: [
        {
          'roomId': 10000,
          'roomUrl': '/room1234567890',
          'gameId': 10000,
          'status': '00',
          'publicFlag': true,
          'chatDisplayType': '00',
          'userId': 12345
        },
        {
          'roomId': 10000,
          'roomUrl': '/room1234567890',
          'gameId': 10000,
          'status': '00',
          'publicFlag': true,
          'chatDisplayType': '00',
          'userId': 12345
        }
      ]
    });

    // Ajax
    axios.get('/v1/room')
      .then(res => {
        this.setState({
          rooms: res.data.rooms,
        });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <RoomList rooms={this.state.rooms}/>
    );
  }
}

class RoomList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.rooms.map(room =>
            <li key={room.roomUrl}>
              <Room
                publicFlag={room.publicFlag}
                status={room.status}
                userId={room.userId}
                roomUrl={room.roomUrl}
              />
            </li>
          )
        }
      </ul>
    );
  }
}

class Room extends Component {
  render() {
    return (
      <div>
        <RoomName
          publicFlag={this.props.publicFlag}
          status={this.props.status}
          userId={this.props.userId}
          roomUrl={this.props.roomUrl}
        />
      </div>
    );
  }
}

function RoomName({ publicFlag, status, userId, roomUrl }) {
  let participationStatus = ''
  if (publicFlag) {
    participationStatus = '誰でも参加OK'
  } else {
    participationStatus = '参加不可'
  }
  let roomStatus = ''
  if (status === '00') {
    roomStatus = 'ステータス(募集中)'
  } else if (status === '01') {
    roomStatus = 'ステータス(対戦中)'
  } else if (status === '02') {
    roomStatus = 'ステータス(対戦終了)'
  }
  return <Link to={roomUrl}>
    <div className="room">
      { participationStatus } { roomStatus }
      <div>{ userId }</div>
    </div>
  </Link>
}
export default RoomView;