import React from "react"
import { Link } from "react-router-dom"

import { useTheme } from "../../wrappers/with-theme"
import { composeOptions } from "../utils"

import styled, { keyframes } from "styled-components"

const scroll = keyframes`
  from {
    transform: translateX(0%);
    left: 100%;
  }
  to {
    transform: translateX(-100%);
    left: 0%;
  }
`
const ConfirmMessage = styled.div`
  position: absolute;
  white-space: nowrap;
  animation: ${ scroll } 5s linear;
`

const ConfirmButton = ({
  onClick,
  children,
  confirmMessage,
  type,
  ...props }) => {

  const [canClick, setCanClick] = React.useState(false);

  const timeout = React.useRef(null);

  const confirm = React.useCallback(e => {
    e.preventDefault();
    setCanClick(true);
    timeout.current = setTimeout(setCanClick, 5000, false);
  }, [timeout]);
  const doOnClick = React.useCallback(e => {
    setCanClick(false);
    onClick && onClick(e);
  }, [onClick]);

  React.useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, [timeout]);

  return (
    <button onClick={ canClick ? (type === "submit" ? null : doOnClick) : confirm } { ...props }
      type={ canClick ? type : "button" }>
      <div className="relative">
        { !canClick ? null :
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center overflow-hidden">
            <ConfirmMessage>
              { confirmMessage }
            </ConfirmMessage>
          </div>
        }
        <div style={ { color: canClick ? "transparent" : null } }>
          { children }
        </div>
      </div>
    </button>
  )
}

export const Button = ({
  buttonTheme = "button",
  className = "",
  type = "button",
  children,
  large, small, block, active,
  showConfirm,
  confirmMessage = "click to confirm",
  ...props }) => {

  const theme = useTheme();
  buttonTheme = `${ buttonTheme }${ composeOptions({ large, small, block, active }) }`;

  if (showConfirm) {
    return (
      <ConfirmButton type={ type } { ...props } confirmMessage={ confirmMessage }
        className={ `${ theme[buttonTheme] || theme["button"] } ${ className }` }>
        { children }
      </ConfirmButton>
    )
  }
  return (
    <button type={ type } { ...props }
      className={ `${ theme[buttonTheme] || theme["button"] } ${ className }` }>
      { children }
    </button>
  )
}

export const LinkButton = ({
  buttonTheme = "button",
  className = "",
  type,
  children, disabled,
  large, small, block, active,
  ...props }) => {
  const theme = useTheme();
  buttonTheme = `${ buttonTheme }${ composeOptions({ large, small, block, disabled, active }) }`;
  return (
  	<Link { ...props } onClick={ e => e.stopPropagation() }
    	className={ ` ${ theme[buttonTheme] || theme["button"] } ${ className }` }>
    	{ children }
  	</Link>
  )
}
