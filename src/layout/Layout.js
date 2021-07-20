import React, { Component } from 'react';
import './Layout.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddBox from '@material-ui/icons/AddBox';
import {Link} from "react-router-dom";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateRoomButton: false,
      page: this.props.children
    }
  }
  componentDidMount() {
    if (window.location.pathname === '/room') {
      this.setState({
        isCreateRoomButton: true,
      })
    }
  }

  render() {
    return (
      <div className="app-container">
        <SimpleMenu page={this.state.page} isCreateRoomButton={this.state.isCreateRoomButton}/>
        {this.props.children}
      </div>
    );
  }
}

function SimpleMenu(props) {
  const theme = createMuiTheme({
    overrides: {
      MuiToolbar: {
        root: {
          'justify-content': 'space-between'
        }
      },
    },
  });
  return (
    <AppBar position="static">
      <ThemeProvider theme={theme}>
      <Toolbar variant="dense">
        Vader
        <HeaderButton page={props.page} isCreateRoomButton={props.isCreateRoomButton}/>
      </Toolbar>
      </ThemeProvider>
    </AppBar>
  )
}

function HeaderButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
     props.isCreateRoomButton ?
      (
        <Link to={'/createRoom'} style={{color: 'inherit'}}>
          <AddBox/>
        </Link>
      ) :
      (
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon aria-controls="simple-menu" onClick={handleClick}/>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </IconButton>
      )
  )
}
export default Layout;