import React, { Component } from "react"
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

class CreateRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameId: '',
      publicFlag: false,
      chatDisplayType: '00',
      userId: ''
    }
  }
  handleChangeText = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleChangeSwitch = (event) => {
    console.log(event.target.checked)
    if (event.target.name === 'chatDisplayType') {
      let chatDisplayType = ''
      if(event.target.checked) {
        chatDisplayType = '01'
      } else {
        chatDisplayType = '00'
      }
      this.setState({
        chatDisplayType: chatDisplayType
    })
    } else {
      this.setState({
        [event.target.name]: event.target.checked
      })
    }
  }
  render() {
    return (
      <div>
        <h2>createRoom</h2>
        <form>
          <div>
            <p>ステートの値：{this.state.gameId}</p>
            <label>
              ゲームID：
              <input type="text" name="gameId" onChange={this.handleChangeText} />
            </label>
          </div>
          <div>
            <label>
              公開：
              <Switch
                checked={this.state.publicFlag}
                onChange={this.handleChangeSwitch}
                name="publicFlag"
                inputProps={{'aria-label': 'secondary checkbox'}}
              />
            </label>
          </div>
          <div>
            <select value={this.state.chatDisplayType} name="chatDisplayType" onChange={this.handleChangeText}>
              <option value="00">全プレイヤー</option>
              <option value="01">プレイヤー以外表示</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect() {
  const classes = useStyles();
  const [chatDisplayType, setChatDisplayType] = React.useState('00');

  const handleChange = (event) => {
    setChatDisplayType(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">チャット表示区分</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chatDisplayType}
          onChange={handleChange}
        >
          <MenuItem value={'00'}>全プレイヤー</MenuItem>
          <MenuItem value={'01'}>プレイヤー以外表示</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

function Input(props) {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    props.type === 'text' ?
      (
        <div>
          <label>
            {props.formName}：
            <input type="text"/>
          </label>
        </div>
      ) :
      (
        <div>
          <label>
            {props.formName}：
            <Switch
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              inputProps={{'aria-label': 'secondary checkbox'}}
            />
          </label>
        </div>
      )
  )
}
export default CreateRoom;