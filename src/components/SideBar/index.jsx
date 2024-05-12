import React, { useContext, useEffect } from 'react';
import useWindowSize from '../../helpers/useWindowSize';
import SmallSideBar from './SmallSideBar';
import BigSideBar from './BigSideBar';
import { SidebarContext } from '../../context/SideBarContext';

const SideBar = () => {
  const { width } = useWindowSize();
  const { isToggled, setIsToggled } = useContext(SidebarContext);

  useEffect(() => {
    width <= 1320
      ? setIsToggled(false) // 1320 보다 작다 - false
      : location.pathname.startsWith('/video')
      ? setIsToggled(false) // 1320 보다 크다, /video로 시작한다면 - false
      : setIsToggled(true); // 1320 보다 크다 - true
  }, [location.pathname, setIsToggled, width]);
  // video페이지는 기본 false, 기본은 1320 크다 작다 기준
  return (
    <>
      {location.pathname.startsWith('/video/') ? ( // video로 시작한다면
        isToggled ? ( // true이면
          <BigSideBar /> // BigSideBar
        ) : (
          <></> // false이면 null
        ) // 따라서, video페이지는 기본 null, true이면 BigSideBar
      ) : width < 792 ? null : isToggled ? ( // 792보다 작을 때, null,
        // true이면 BigSideBar
        <BigSideBar /> // false이면 smallSideBar
      ) : (
        <SmallSideBar />
      )}
    </>
  );
};

export default SideBar;
