import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router-dom';
import { SvgIcon, Tooltip } from '@material-ui/core';



export const MainListItems = () => {
  const history = useHistory();
  return (
    <div>
      <ListItem button onClick={_ => history.push('/')}>
        <Tooltip title='Dashboard' arrow placement='right'>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={_ => history.push('/Orders')}>
        <Tooltip title='Orders' arrow placement='right'>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={_ => history.push('/customers')}>
        <Tooltip title='Customers' arrow placement='right'>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button onClick={_ => history.push('/process')}>
        <Tooltip title='Process' arrow placement='right'>
          <ListItemIcon>
            <SvgIcon>
              <g><rect fill="none" height="24" width="24" /></g><g><g><path d="M11,8v5l4.25,2.52l0.77-1.28l-3.52-2.09V8H11z M21,10V3l-2.64,2.64C16.74,4.01,14.49,3,12,3c-4.97,0-9,4.03-9,9 s4.03,9,9,9s9-4.03,9-9h-2c0,3.86-3.14,7-7,7s-7-3.14-7-7s3.14-7,7-7c1.93,0,3.68,0.79,4.95,2.05L14,10H21z" /></g></g>
            </SvgIcon>
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Process" />
      </ListItem>
    </div>
  );
}


export const SecondaryListItems = () => {
  const history = useHistory();

  return (
    <div>
      <ListSubheader inset>Managment</ListSubheader>
      <ListItem button onClick={_ => history.push('/Products')}>
        <Tooltip title='Products' arrow placement='right'>
          <ListItemIcon>
            {/* <AssignmentIcon /> */}
            <SvgIcon ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z" /></SvgIcon>
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem button onClick={_ => history.push('/Services')}>
        <Tooltip title='Services' arrow placement='right'>
          <ListItemIcon>
            <SvgIcon>
              <g>
                <g>
                  <g>
                    <path d="M21.67,18.17l-5.3-5.3h-0.99l-2.54,2.54v0.99l5.3,5.3c0.39,0.39,1.02,0.39,1.41,0l2.12-2.12 C22.06,19.2,22.06,18.56,21.67,18.17z M18.84,19.59l-4.24-4.24l0.71-0.71l4.24,4.24L18.84,19.59z" />
                  </g>
                  <g>
                    <path d="M17.34,10.19l1.41-1.41l2.12,2.12c1.17-1.17,1.17-3.07,0-4.24l-3.54-3.54l-1.41,1.41V1.71L15.22,1l-3.54,3.54l0.71,0.71 h2.83l-1.41,1.41l1.06,1.06l-2.89,2.89L7.85,6.48V5.06L4.83,2.04L2,4.87l3.03,3.03h1.41l4.13,4.13l-0.85,0.85H7.6l-5.3,5.3 c-0.39,0.39-0.39,1.02,0,1.41l2.12,2.12c0.39,0.39,1.02,0.39,1.41,0l5.3-5.3v-2.12l5.15-5.15L17.34,10.19z M9.36,15.34 l-4.24,4.24l-0.71-0.71l4.24-4.24l0,0L9.36,15.34L9.36,15.34z" />
                  </g>
                </g>
              </g>
            </SvgIcon>
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Services" />
      </ListItem>
    </div>)
}
