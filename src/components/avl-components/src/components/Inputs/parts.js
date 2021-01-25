import React from "react"

import { useTheme } from "../../wrappers/with-theme"

export const ValueItem = ({ isPlaceholder, children, remove, edit, disabled = false }) => {
  const theme = useTheme();
  return (
    <div className={ `
        ${ isPlaceholder ? theme.textLight :
          `${ disabled ? theme.accent2 : (!(remove || edit) ? "" : theme.accent1) }
            mr-1 pl-2 ${ (!disabled && (remove || edit)) ? "pr-1" : "pr-2" }
          ` }
        rounded whitespace-pre-wrap mt-1 relative flex items-center
      ` }>
      { children }
      { isPlaceholder || disabled || !edit ? null :
        <div className={ `
            ${ theme.menuBgActive } ${ theme.menuBgActiveHover } ${ theme.textContrast }
            ml-2 p-1 flex justify-center items-center rounded cursor-pointer
          ` }
          onClick={ edit }>
          <svg width="8" height="8">
            <line x1="0" y1="6" x2="4" y2="2" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
            <line x1="4" y1="2" x2="8" y2="6" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
          </svg>
        </div>
      }
      { isPlaceholder || disabled || !remove ? null :
        <div className={ `
            ${ theme.menuBgActive } ${ theme.menuBgActiveHover } ${ theme.textContrast }
            ${ edit ? "ml-1" : "ml-2" } p-1 flex justify-center items-center rounded cursor-pointer
          ` }
          onClick={ remove }>
          <svg width="8" height="8">
            <line x2="8" y2="8" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
            <line y1="8" x2="8" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
          </svg>
        </div>
      }
    </div>
  )
}
export const ValueContainer = React.forwardRef(({ children, hasFocus, large, small, disabled = false, className = "", ...props }, ref) => {
  const theme = useTheme();
  return (
    <div { ...props } ref={ ref }
      className={ `
        w-full flex flex-row flex-wrap
        ${ disabled ?
            `${ theme.inputBgDisabled } ${ theme.inputBorderDisabled }` :
          hasFocus ?
            `${ theme.inputBgFocus } ${ theme.inputBorderFocus }` :
            `${ theme.inputBg } ${ theme.inputBorder }`
        }
        ${ large ? "pt-1 pb-2 px-4" : small ? "pb-1 px-1" : "pb-1 px-2" }
        ${ large ? theme.textLarge : small ? theme.textSmall : theme.textBase }
        ${ large ? "rounded-md" : "rounded" }
        ${ className }
      ` }>
      { children }
    </div>
  )
})
