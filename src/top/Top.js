import React, { Component } from 'react'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import './Top.css'

class Top extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };

    // モックデータの作成
    let mock = new MockAdapter(axios);
    mock.onGet('/v1/games').reply(200, {
      games: [
        {
          gameId: '10000',
          gameName: '○×ゲーム',
          gameType: '00',
          maxParticipants: 2,
          minParticipants: 2,
        },
        {
          gameId: '20000',
          gameName: '五目並べ',
          gameType: '00',
          maxParticipants: 2,
          minParticipants: 2,
        },
      ]
    });

    // Ajax
    axios.get('/v1/games')
      .then(res => {
        this.setState({
          games: res.data.games,
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <GameList games={this.state.games} />
      </div>
    );
  }
}

class GameList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.games.map(game =>
            <li key={game.gameId}>
              <Game id={game.gameId} name={game.gameName} />
            </li>
          )
        }
      </ul>
    );
  }
}

class Game extends Component {

  render() {
    return (
      <div>
        <div>
          <a href={'/room'}>{this.props.name}</a>
        </div>
        <div>
          <a href={'/room'}>
            <img src={`${process.env.PUBLIC_URL}/image/${this.props.id}.png`} alt="GameImage" />
          </a>
        </div>
      </div>
    );
  }
}

export default Top;