import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { List } from 'material-ui/List';

import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Logout from 'material-ui/svg-icons/action/highlight-off';
import Create from 'material-ui/svg-icons/content/create';
import Divider from 'material-ui/Divider';

class HomeAppBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  redirectToQuizCreate = () => {
    this.setState({ open: false });
    this.context.router.push('/admin/quizCreate');
  }

  redirectToViewQuiz = () => {
    this.setState({ open: false });
    this.context.router.push('/admin/viewQuiz');
  }

  handleLogOut = () => {
    this.setState({ open: false });
    this.context.router.push('/');
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return(
      <div>
        <AppBar
        title="Quiz Time"
        style={{background:'#000000'}}
        onLeftIconButtonTouchTap={() => { this.setState({open: true}); }}
        />

        <Drawer
          docked={ false }
          open={ this.state.open }
          onRequestChange={(open) => this.setState({ open })}
        >
          <div>
            <div style={{marginTop:'50px',textAlign: 'center'}}>
              <Avatar  size={150} />
              <h5>User Name</h5>
            </div>
            <Divider/>
              <List >
                <MenuItem primaryText="View Quiz" leftIcon={<DashboardIcon />} onTouchTap={this.redirectToViewQuiz} />
                <Divider/>
                <MenuItem primaryText="Create Quiz" style={{marginTop:'1%'}} leftIcon={<Create />} onTouchTap={this.redirectToQuizCreate} />
                <Divider/>                
                <MenuItem primaryText="Logout"  style={{marginTop:'1%'}} leftIcon={<Logout />} onTouchTap={this.handleLogOut} />
                <Divider/>
              </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default HomeAppBar;
