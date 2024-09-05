import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Menu from './Menu';

const MenuWrapper = () => {
  const { menuVisible, toggleMenu } = useGlobalContext();

  console.log("MenuWrapper rendered, menuVisible:", menuVisible);

  return <Menu visible={menuVisible} onClose={toggleMenu} />;
};

export default MenuWrapper;
