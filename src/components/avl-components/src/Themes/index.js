import { makeProxy, composeTheme } from "./utils"

import { $compositions } from "./compositions"

export const flat_base = {
	bg: 'custom-bg',
	ySpace: 'py-4',
	contentPadding: 'py-4',
	menuBg: 'custom-bg',
	contentWidth: '',
	text: 'text-blue-800',
	sidebarW: '64',
	sidebarBorder: '',
	menuIcon: 'mr-3 h-5 w-5',
	navitemTop: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemTopActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out',
	navitemSide: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemSideActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-sm font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out',

	// header
	headerBg: 'custom-bg',
	headerShadow: '',

	//
	contentBg: '',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	accent4: 'bg-gray-500',
	lighter: 'bg-gray-50',
	// buttons
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out',
	textbutton: 'text-sm text-blue-500 hover:text-blue-300 px-2',

	input: "block",

	// table
	tableRow: 'bg-white border-b border-blue-100 hover:bg-blue-50',
	tableRowStriped: 'bg-white even:bg-gray-50',
	tableCell: 'px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-600',
	tableCellCondensed: 'px-3 py-2 whitespace-no-wrap text-sm leading-5 text-gray-600',
	tableHeader: "px-6 pt-2 pb-1	border-b border-gray-400 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md"
}
export const flat = makeProxy(flat_base);


const dark_base = {
	bg: 'bg-gray-300',
	menuBg: 'bg-gray-800',
	sidebarW: '56',
	sidebarBorder: '',
	shadow: '',
	ySpace: 'py-5',
	contentPadding: 'py-5',
	text: 'text-gray-300',
	contentWidth: 'max-w-7xl mx-auto',
	menuIcon: 'mr-3 h-4 w-4',
	topNavHeight: 'h-16',
	navitemTop: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemTopActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemSide: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	navitemSideActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
	headerBg: 'bg-gray-800',
	headerShadow: 'shadow',
	contentBg: 'bg-gray-100',
	accent1: 'bg-gray-600',
	accent2: 'bg-gray-500',
	accent3: 'bg-gray-400',
	lighter: 'bg-gray-700',
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	textbutton: 'text-sm text-blue-500 hover:text-blue-300 px-2',
	tableRow: 'bg-white border-b border-gray-200',
	tableRowStriped: 'bg-white even:bg-gray-50'
}
export const dark = makeProxy(dark_base);

const blue_base = {
	bg: 'bg-gray-200',
	menuBg: 'bg-indigo-800',
	sidebarW: '56',
	sidebarBorder: '',
	shadow: 'shadow',
	ySpace: 'py-5',
	contentPadding: 'py-5',
	text: 'text-gray-300',
	contentWidth: 'max-w-7xl mx-auto',
	menuIcon: 'mr-3 h-4 w-4',
	topNavHeight: 'h-16',
	navitemTop: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemTopActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemSide: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	navitemSideActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
	headerBg: 'bg-gray-800',
	headerShadow: 'shadow',
	contentBg: 'bg-gray-100',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	light: "bg-gray-50",
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	tableRow: 'bg-white border-b border-gray-200',
	tableRowStriped: 'bg-white even:bg-gray-50'
}
export const blue = makeProxy(blue_base);

const light_base = {
	shadow: 'shadow',
	ySpace: 'py-4',
	contentPadding: 'py-4',
	sidebarBorder: '',
	text: 'text-gray-800',
	textContrast: "text-white",
	border: "border-gray-400",

	textInfo: "text-teal-400",
	bgInfo: "bg-teal-400",
	borderInfo: "border-teal-400",

	textSuccess: "text-green-400",
	bgSuccess: "bg-green-400",
	borderSuccess: "border-green-400",

	textDanger: "text-red-400",
	bgDanger: "bg-red-400",
	borderDanger: "border-red-400",

	textWarning: "text-yellow-400",
	bgWarning: "bg-yellow-400",
	borderWarning: "border-yellow-400",

	textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
	// these 2 should be equal
	placeholder: 'placeholder-gray-400',
	borderLight: "border-gray-400",
	bgLight: "bg-gray-400",

	menuIcon: 'mr-3 h-6 w-6',
	topMenuBorder: 'border-b border-gray-200',
	headerShadow: '',
	navitemTop: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemTopActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 bg-indigo-100 focus:outline-none hover:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',
	navitemSide: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemSideActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-600 bg-indigo-100 focus:outline-none hover:text-indigo-800 focus:text-indigo-800 hover:bg-indigo-200 focus:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',

	bg: 'bg-gray-100',

	menuBg: 'bg-gray-200',
	menuBgHover: 'hover:bg-gray-300',
	menuBgActive: 'bg-teal-200',
	menuBgActiveHover: 'hover:bg-teal-300',
	menuText : "text-gray-500",
	menuTextHover: "hover:text-gray-700",
	menuTextActive: "text-teal-500",
	menuTextActiveHover: "hover:text-teal-700",

	headerBg: 'bg-gray-200',
	headerBgHover: "hover:bg-gray-400",

	inputBg: "bg-white disabled:bg-gray-200 cursor-pointer focus:outline-none",
	inputBorder: "rounded border border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
	inputBgDisabled: "bg-gray-200 cursor-not-allowed focus:outline-none",
	inputBorderDisabled: "rounded border border-gray-200 hover:border-gray-200",
	inputBgFocus: "bg-white cursor-pointer focus:outline-none",
	inputBorderFocus: "rounded border border-transparent hover:border-gray-600 focus:border-gray-600 border-gray-600",

	textBase: "text-base",
	textSmall: "text-sm",
	textLarge: "text-lg",
	paddingBase: "py-1 px-2",
	paddingSmall: "py-0 px-1",
	paddingLarge: "py-2 px-4",

	contentBg: 'bg-white',
	contentWidth: 'max-w-7xl mx-auto',

	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	accent4: 'bg-gray-500',

	highlight1: "bg-teal-200",
	highlight2: "bg-teal-300",
	highlight3: "bg-teal-400",
	highlight4: "bg-teal-500",

	sidebarW: '56',
	transition: "transition ease-in-out duration-150",

	button: `
		inline-flex items-center
		px-4 py-2 border border-gray-300
		text-sm leading-5 font-medium
		rounded-md text-gray-700 bg-white
		hover:text-gray-500
		focus:outline-none focus:shadow-outline-blue focus:border-blue-300
		active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out
		disabled:cursor-not-allowed`,
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed',

	tableRow: 'bg-gray-100 hover:bg-gray-200 transition ease-in-out duration-150',
	tableRowStriped: 'bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-150',

	tableCell: 'px-4 py-1 whitespace-no-wrap',

	tableHeader: "px-4 py-2 pb-1 border-b-2 border-gray-300 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md"
}
export const light = makeProxy(light_base);

const TEST_THEME_BASE = {
	text: 'text-gray-800',
	textContrast: "text-white",
	border: "border-gray-400",

	ySpace: "",

	textInfo: "text-teal-400",
	bgInfo: "bg-teal-400",
	borderInfo: "border-teal-400",

	textSuccess: "text-green-400",
	bgSuccess: "bg-green-400",
	borderSuccess: "border-green-400",

	textDanger: "text-red-400",
	bgDanger: "bg-red-400",
	borderDanger: "border-red-400",

	textWarning: "text-yellow-400",
	bgWarning: "bg-yellow-400",
	borderWarning: "border-yellow-400",

	textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
	// these 2 should be equal
	placeholder: 'placeholder-gray-400',

	menuIcon: 'mr-3 h-6 w-6',
	topMenuBorder: 'border-b border-gray-200',
	headerShadow: '',

	bg: 'bg-gray-100',

	menuBg: 'bg-gray-200',
	menuBgHover: 'hover:bg-gray-300',
	menuBgActive: 'bg-teal-200',
	menuBgActiveHover: 'hover:bg-teal-300',
	menuText : "text-gray-500",
	menuTextHover: "hover:text-gray-700",
	menuTextActive: "text-teal-500",
	menuTextActiveHover: "hover:text-teal-700",

	sidebarBg: 'bg-gray-200',
	sidebarBorder: '',

	headerBg: 'bg-gray-200',
	headerBgHover: "hover:bg-gray-400",

	inputBg: "bg-white disabled:bg-gray-200 cursor-pointer focus:outline-none",
	inputBorder: "rounded border border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
	inputBgDisabled: "bg-gray-200 cursor-not-allowed focus:outline-none",
	inputBorderDisabled: "rounded border border-gray-200 hover:border-gray-200",
	inputBgFocus: "bg-white cursor-pointer focus:outline-none",
	inputBorderFocus: "rounded border border-transparent hover:border-gray-600 focus:border-gray-600 border-gray-600",

	textBase: "text-base",
	textSmall: "text-sm",
	textLarge: "text-lg",
	paddingBase: "py-1 px-2",
	paddingSmall: "py-0 px-1",
	paddingLarge: "py-2 px-4",


	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	accent4: 'bg-gray-500',

	highlight1: "bg-teal-200",
	highlight2: "bg-teal-300",
	highlight3: "bg-teal-400",
	highlight4: "bg-teal-500",

	contentBg: 'bg-white',
	contentWidth: 'w-full max-w-7xl mx-auto',
	contentPadding: 'py-4',

	sidebarW: '56',
	transition: "transition ease-in-out duration-150",

	tableInfoBar: "bg-white",
	tableRow: 'bg-white hover:bg-gray-200 @transition',
	tableRowStriped: 'bg-white even:bg-gray-100 hover:bg-gray-200 @transition',

	tableCell: 'px-4 py-1 whitespace-no-wrap',

	tableHeader: "px-4 py-2 pb-1 border-b-2 border-gray-300 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md",

	$compositions
}
export const TEST_THEME = composeTheme(TEST_THEME_BASE);

// console.log("TEST_THEME", TEST_THEME)
