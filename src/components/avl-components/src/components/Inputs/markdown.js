import React from "react"

import { Button } from "../Button"

import { composeOptions, useSetRefs, useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

import MarkdownRenderer from "react-markdown-renderer"

import styled from "styled-components"

const MarkdownDiv = styled.div`
  h1 {
    font-size: 1.875rem;
    font-weight: 800;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }
`

export const MarkdownViewer = ({ markdown }) =>
  <MarkdownDiv className="markdown-renderer">
    <MarkdownRenderer markdown={ markdown }/>
  </MarkdownDiv>

export default React.forwardRef(({ large, small, className = "", children, onChange, value, autoFocus, ...props }, ref) => {
  const [editing, setEditing] = React.useState(false),
    prev = React.useRef(false)

  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];

  const [innerRef, setInnerRef] = React.useState({}),
    [height, setHeight] = React.useState("10rem");

  React.useEffect(() => {
    if (autoFocus && innerRef.focus) {
      innerRef.focus();
      setEditing(true);
    }
  }, [autoFocus, innerRef])

  React.useEffect(() => {
    if (innerRef.scrollHeight > innerRef.clientHeight) {
      setHeight(`calc(${ innerRef.scrollHeight }px + 0.25rem)`);
    }
    if (prev.current !== editing) {
      if (editing) {
        innerRef.focus();
      }
      prev.current = editing;
    }
  }, [value, editing, innerRef]);

  const clickedOutside = React.useCallback(e => {
      setEditing(false);
    }, []),
    [setNode] = useClickOutside(clickedOutside);

  return (
    <div ref={ setNode } tabIndex={ 0 }
      onFocus={ e => setEditing(true) }
      onBlur={ e => setEditing(false) }>
      <div style={ { display: editing ? "block" : "none" } }
        className="relative">
        <div className="absolute ml-2" style={ { left: "100%" } }>
          <Button onClick={ e => setEditing(false) }>
            preview
          </Button>
        </div>
        <div>
          <textarea { ...props } style={ { height } }
            onChange={ e => onChange(e.target.value) } value={ value || "" }
            className={ `${ inputTheme } ${ className }` }
            ref={ useSetRefs(ref, setInnerRef) } rows={ 6 }/>
        </div>
      </div>
      <MarkdownDiv className="markdown-renderer"
        style={ { display: editing ? "none" : "block" } }
        onClick={ e => setEditing(true) }>
     		<MarkdownRenderer markdown={ value || "" }
          className={ `${ inputTheme } ${ className }` }
          style={ { minHeight: "2rem" } }
          options={ { html: true } }/>
      </MarkdownDiv>
    </div>
  )
})
