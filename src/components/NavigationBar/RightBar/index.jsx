import React from 'react';
import { MdApps as Apps, MdNotifications as Notification, MdVideoCall as VideoIcon } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const RightBar = () => {
  return (
    <div className="buttons">
      <button className="icon-container">
        <VideoIcon size={25} data-tooltip-content="Create" data-tooltip-id="navbar" />
      </button>
      <button className="icon-container">
        <Apps size={25} data-tooltip-content="YouTube Apps" data-tooltip-id="navbar" />
      </button>
      <button className="icon-container">
        <Notification size={25} data-tooltip-content="Notifications" data-tooltip-id="navbar" />
      </button>

      <Tooltip id="navbar" backgroundColor="gray" effect="solid" delayHide={150} arrowColor="transparent" />
    </div>
  );
};

export default RightBar;
