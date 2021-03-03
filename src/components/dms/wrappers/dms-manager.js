import React from "react"

import { compareActions } from "../utils"

import get from "lodash.get"

const dmsManager = Component =>
  ({ children, ...props }) => {

    const dmsActions = [];

    children = React.Children.toArray(children)
      .reduce((children, child) => {
        if (compareActions(child.props.dmsAction, props.top.dmsAction)) {

          dmsActions.push(...get(child.props, ["dmsActions"], []));

          children.push(React.cloneElement(child,
            { ...props,
              ...get(props, ["top", "props"], {}) // <-- result of DmsAction seedProps,
            }
          ));
        }
        else if (!child.props.dmsAction) {
          children.push(child);
        }
        return children;
      }, [])
      .map(child => {
        if (!compareActions(child.props.dmsAction, props.top.dmsAction)) {
          return React.cloneElement(child,
            { dmsActions,
              ...props,
              ...get(props, ["top", "props"], {}) // <-- result of DmsAction seed props
            }
          );
        }
        return child;
      })
    return (
      <Component { ...props }>{ children }</Component>
    )
  }
export default dmsManager;
