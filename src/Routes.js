
// --- Public Pages ------
import Meta from 'pages/Admin/Meta'

import CMS from 'pages/Admin/CMS/edit'
import Public from 'pages/Admin/CMS/view'
import AdminHome from 'pages/Admin/Home'
import DataSources from 'pages/Admin/DataSources'

import Auth from "pages/Auth"
import NoMatch from 'pages/404';

export default [
	// -- Public -- //
	...Public, 
	// -- Authed -- //
	AdminHome,
	...DataSources,
	CMS,
	Meta,
	Auth,

	// -- Misc
	NoMatch
];
