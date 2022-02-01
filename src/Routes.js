
// --- Public Pages ------
import Meta from 'pages/Admin/Meta'

//import CMS from 'pages/Admin/CMS/edit'
import Public from 'pages/Admin/Meta/view'
import AdminHome from 'pages/Admin/Home'
import Map from 'pages/Admin/ScenarioMap'
import Assets from 'pages/Admin/StateAssets'
import DataSources from 'pages/Admin/DataSources'

import Auth from "pages/Auth"
import NoMatch from 'pages/404';

export default [
	// -- Public -- //
	...Public, 
	// -- Authed -- //
	AdminHome,
	Map,
	Assets,
	...DataSources,
	Meta,
	Auth,

	// -- Misc
	NoMatch
];
