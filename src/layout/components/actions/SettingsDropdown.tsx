import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const accountItems = [
  { text: 'Edit account', icon: 'icofont-ui-home', route: '/vertical/edit-account' },
  { text: 'User profile', icon: 'icofont-ui-user', route: '/vertical/user-profile' },
  { text: 'Calendar', icon: 'icofont-ui-calendar', route: '/vertical/events-calendar' },
  { text: 'Settings', icon: 'icofont-ui-settings', route: '/vertical/settings' },
  { text: 'Log Out', icon: 'icofont-logout', route: '/public/sign-in' }
];

const SettingsDropdown = () => {
  const accountMenu = (
    <Menu style={{ minWidth: '180px' }}>
      <Menu.Item className='action-item' key={0}>
        <NavLink className='d-flex w-100' to={'/vertical/edit-account'} replace>
          <span className={`icon mr-3 icofont-ui-home`} />
          <span className='text'>Edit account</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item className='action-item' key={1}>
        <NavLink className='d-flex w-100' to={'/vertical/user-profile'} replace>
          <span className={`icon mr-3 icofont-ui-user`} />
          <span className='text'>User profile</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item className='action-item' key={2}>
        <NavLink className='d-flex w-100' to={'/vertical/events-calendar'} replace>
          <span className={`icon mr-3 icofont-ui-calendar`} />
          <span className='text'>Calendar</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item className='action-item' key={3}>
        <NavLink className='d-flex w-100' to={'/vertical/settings'} replace>
          <span className={`icon mr-3 icofont-ui-settings`} />
          <span className='text'>Settings</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item
        className='action-item'
        key={4}
        onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }}
      >
        <NavLink className='d-flex w-100' to={'/public/sign-in'} replace>
          <span className={`icon mr-3 icofont-logout`} />
          <span className='text'>Log Out</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={accountMenu} trigger={['click']} placement='bottomRight'>
      <div className='item'>
        <Avatar
          size={40}
          className='mr-1'
          src={`${window.location.origin}/content/user-40-2.jpg`}
        />
        <span className='icofont-simple-down' />
      </div>
    </Dropdown>
  );
};

export default SettingsDropdown;
