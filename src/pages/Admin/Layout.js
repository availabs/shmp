import React from "react";
import { /*useTheme,*/ SideNav, ThemeContext } from "@availabs/avl-components";
// import { useTheme, SideNav } from 'components/avl-components/src/'
import AuthMenu from "pages/Auth/AuthMenu";
import logo from "./Logo.js";
import Theme from "./adminTheme";

/*const AdminTheme = {
  sidebarBg: 'bg-white',
  navitemSide: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-grey-800 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
  //navitemSideActive: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-blue-500 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
}*/

const AdminLayout = ({ children }) => {
	return (
		<ThemeContext.Provider value={Theme}>
			<div className="w-full">
				<div className="flex min-h-screen">
					<SideNav
						//customTheme={AdminTheme}
						logo={<div className="">{logo("SHMP")}</div>}
						topMenu={
							<div className="border border-gray-200 mb-10">
								<AuthMenu />
							</div>
						}
						menuItems={[
							{
								name: "Home",
								path: `/admin/`,
								icon: "os-icon os-icon-layout",
								className: "font-medium text-lg",
							},
							{
								name: "Plan",
								path: `/meta/`,
								icon: "os-icon os-icon-agenda-1",
							},
							{
								name: "Data Sources",
								icon: "os-icon os-icon-database",
								path: "/data",
								children: [
									{
										name: "Asset Inventory",
										path: `/data/assets`,
										//icon: 'far fa-building',
									},
									{
										name: "Actions",
										path: `/data/actions`,
										//icon: 'fa fa-toolbox',
									},
									{
										name: "Capabilities",
										path: `/data/capabilities`,

										//icon: 'fa fa-buffer'
									},
								],
							},
							{
								name: "State Assets Map",
								path: "/scenariomap",
								icon: "os-icon os-icon-map",
							},
						]}
						fixed={true}
					/>
					<div className={`flex-1 md:ml-${Theme.sidebarW} ${Theme.bg}`}>
						{children}
					</div>
				</div>
			</div>
		</ThemeContext.Provider>
	);
};

export default AdminLayout;
