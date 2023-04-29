import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { INotification } from '../../../interfaces/notification';

const defaultNotifications = [
  {
    text: 'Sara Crouch liked your photo',
    icon: 'icofont-heart',
    time: '17 minutes ago'
  },
  {
    text: 'New user registered',
    icon: 'icofont-users-alt-6',
    time: '23 minutes ago'
  },
  {
    text: 'Amanda Lie shared your post',
    icon: 'icofont-share',
    time: '25 minutes ago'
  },
  {
    text: 'New user registered',
    icon: 'icofont-users-alt-6',
    time: '32 minutes ago'
  },
  {
    text: 'You have a new message',
    icon: 'icofont-ui-message',
    time: '58 minutes ago'
  }
];

type Props = {
  data?: INotification[];
};

const homeRoute = 'vertical/default-dashboard';

const Notifications = ({ data = defaultNotifications }: Props) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  const handleClearAll = (e) => {
    e.preventDefault();
    setNotifications([]);
  };

  const notificationsMenu = (
    <Menu className='action-menu' style={{ minWidth: '280px' }}>
      <Menu.Item className='dropdown-header' key='header-item'>
        <h3 className='dropdown-title'>Notifications</h3>

        <a href="#" onClick={handleClearAll} className='text-danger'>
          Clear all
        </a>
      </Menu.Item>

      {notifications.length > 0 &&
        notifications.map((item, index) => (
          <Menu.Item className='action-item' key={index}>
            <NavLink className='d-flex w-100' to={homeRoute}>
              <span className={`icon mr-3 ${item.icon}`} />
              <span className='text'>
                <span className='message'>{item.text}</span>
                <span className='sub-text'>{item.time}</span>
              </span>
            </NavLink>
          </Menu.Item>
        ))}

      {!notifications.length && (
        <Menu.Item className='empty-item'>No notifications</Menu.Item>
      )}

      {notifications.length > 0 && (
        <Menu.Item className='dropdown-actions' key='actions-item'>
          <Button type='primary' className='w-100'>
            View all notifications
            <span
              style={{ fontSize: '1.2rem' }}
              className='icofont-calendar ml-3'
            />
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Dropdown
      className='mr-3'
      overlay={notificationsMenu}
      trigger={['click']}
      open={visible}
      onOpenChange={setVisible}
      placement='bottomRight'
    >
      <Badge className='action-badge' count={notifications.length}>
        <span
          className={`notification-icon icofont-notification ${
            visible ? 'active' : null
          }`}
          style={{ fontSize: '22px', cursor: 'pointer' }}
        />
      </Badge>
    </Dropdown>
  );
};

export default Notifications;
