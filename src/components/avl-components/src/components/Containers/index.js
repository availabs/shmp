import React from 'react'
import { useTheme } from "../../wrappers/with-theme"

export const Content = ({ children, ...rest }) => {
	const theme = useTheme();
	return (
		<div { ...rest }
			className={ `mx-auto ${ theme.contentWidth } ${ theme.contentPadding }` }>
				{ children }
			</div>
	)
}
