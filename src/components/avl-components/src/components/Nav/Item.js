import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Icon from "../Icons";

// import { useTheme } from "../../wrappers/with-theme"
import {useTheme} from '@availabs/avl-components'

import get from "lodash.get"

export default ({ to, icon, customTheme, className = "", children, type='side' }) => {
	const theme = Object.assign({}, useTheme(), customTheme),
    linkClasses = type === 'side' ? theme.navitemSide : theme.navitemTop,
    activeClasses = type === 'side' ? theme.navitemSideActive : theme.navitemTopActive;

	const routeMatch = useRouteMatch({ path: get(to, "pathname", to), exact: true }),
		navClass = routeMatch ? activeClasses : linkClasses;

  return (
    to ? <Link to={ to } className={ `${ navClass } ${ className }` }>
      { icon ? <Icon icon={ icon } className={ theme.menuIcon } showBlank={ type === "side" }/> : '' }
      { children }
    </Link> :
    <div to={ to } className={ `${ navClass } ${ className } ` }>
      { icon ? <Icon icon={ icon } className={ theme.menuIcon } showBlank={ type === "side" }/> : '' }
      { children }
    </div>
  );
};
