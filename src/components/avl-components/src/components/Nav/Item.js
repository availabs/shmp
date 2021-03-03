import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Icon from "../Icons";

import { useTheme } from "../../wrappers/with-theme"

import get from "lodash.get"

export default ({ to, icon, customTheme, className = "", children, type='side' }) => {
	const theme = Object.assign({}, useTheme(), customTheme),
    linkClasses = type === 'side' ? theme.navitemSide : theme.navitemTop,
    activeClasses = type === 'side' ? theme.navitemSideActive : theme.navitemTopActive;

	if (!Array.isArray(to)) {
		to = [to];
	}

	const routeMatch = to.reduce((a, c) =>
			a || Boolean(useRouteMatch({ path: get(c, "pathname", c), exact: true }))
		, false),
		navClass = routeMatch ? activeClasses : linkClasses;

  return (
    <Link to={ to[0] } className={ `${ className } ${ navClass }` }>
      { icon ? <Icon icon={ icon } className={ theme.menuIcon } showBlank={ type === "side" }/> : '' }
      { children }
    </Link>
  );
};
