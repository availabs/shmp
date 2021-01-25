import { processAction, checkAuth } from "../../utils"

import get from "lodash.get"

const flattenAttributes = (Sections, Attributes = [], depth = 0, id = [0]) => {
  if (!Sections.length) return Attributes;

  const { attributes, sections, ...rest } = Sections.pop();
  if (sections) {
    flattenAttributes(sections, Attributes, depth + 1, [...id, 0]);
  }
  if (attributes) {
    Attributes.push(...attributes.map((att, i) => {
      const Att = {
        ...rest,
        ...att,
        depth,
        id: `${ att.key }-${ id.join(".") }.${ i }`
      }
      if ((Att.type === "boolean")) {
        Att.default = Boolean(Att.default);
      }
      return Att;
    }))
  }
  const last = id.pop()
  return flattenAttributes(Sections, Attributes, depth, [...id, last + 1]);
}

export const processFormat = (format, formats = {}) => {
  format = JSON.parse(JSON.stringify(format));

  if (format.registerFormats) {
    format.registerFormats.forEach(f => processFormat(f, formats));
  }

  if (!format.sections) {
    const attributes = format.attributes;
    format.attributes = flattenAttributes([{ attributes }]);
  }
  else {
    format.attributes = flattenAttributes(format.sections.reverse());
  }

  formats[`${ format.app }+${ format.type }`] = format;

  return formats;
}

export const getItem = (id, props) => {
  return (props.dataItems || []).reduce((a, c) => c.id === id ? c : a, null);
}

const makePath = (basePath, action, itemId = null, props = null) =>
  `${ basePath }/${ action }${ itemId ? `/${ itemId }` : "" }`

const normalizeArgs = (dmsAction, item, props) => {
  let itemId = null;
  if (typeof item === "object") {
    itemId = get(item, "id", null);
  }
  else if ((typeof item === "string") || (typeof item === "number")) {
    itemId = item;
    item = getItem(itemId, props);
  }
  else if (!item) {
    item = get(props, "item", null);
    itemId = get(item, "id", null);
  }
  return [
    processAction(dmsAction),
    item, itemId,
    props,
    props.interact
  ]
}
export const makeInteraction = (...args) => {
  const [
    { action, seedProps, disabled, doThen, goBackAfterApiAction, ...rest },
    item, itemId,
    props,
    interact
  ] = normalizeArgs(...args);

  const { authRules, useRouter, basePath, location, history } = props,

    hasAuth = checkAuth(authRules, action, props, item),

    propsToSeed = seedProps(props, item);

  if (useRouter && hasAuth && !disabled) {
    const { push } = history,
      { pathname, search = "" } = location,

      stack = get(location, ["state", "stack"], []),
      stackLength = stack.length,

      searchStack = get(location, ["state", "search"], []),
      searchLength = searchStack.length;

    return /^(dms:)*back$/.test(action) ?
      { type: "link",
        key: action,
        action,
        ...rest,
        to: {
          pathname: get(stack, [stackLength - 1], basePath),
          search: get(searchStack, [searchLength - 1], ""),
          state: {
            stack: stack.slice(0, -1),
            search: searchStack.slice(0, -1)
          }
        }
      }
      : /^(dms:)*home$/.test(action) ?
        { type: "link",
          key: action,
          action,
          ...rest,
          to: {
            pathname: basePath,
            state: {
              stack: [],
              search: []
            }
          }
        }
      : /^api:/.test(action) ?
        { type: "button",
          key: action,
          action,
          ...rest,
          onClick: e => {
            e.stopPropagation();
            return Promise.resolve(interact(action, itemId, propsToSeed))
              .then(() => doThen())
              .then(() => goBackAfterApiAction && push({
                  pathname: get(stack, [stackLength - 1], basePath),
                  search: get(searchStack, [searchLength - 1], ""),
                  state: {
                    stack: stack.slice(0, -1),
                    search: searchStack.slice(0, -1)
                  }
                })
              )
          }
        }
      : { type: "link",
          key: action,
          action,
          ...rest,
          to: {
            pathname: makePath(basePath, action, itemId),
            search: !propsToSeed ? "" : `?${ Object.keys(propsToSeed).map(k => `${ k }=${ propsToSeed[k] }`).join('&') }`,
            state: {
              stack: [...stack, pathname],
              search: [...searchStack, search]
            }
          }
        }
  }
  return {
    type: "button",
    key: action,
    action,
    disabled: disabled || !hasAuth,
    ...rest,
    onClick: e => {
      e.stopPropagation();
      if (!hasAuth) return Promise.resolve();
      return Promise.resolve(interact(action, itemId, propsToSeed))
        .then(() => /^api:/.test(action) && doThen())
        .then(() => /^api:/.test(action) && interact("dms:back"));
    }
  }
}

export const makeOnClick = (...args) => {
  const [
    { action, seedProps, doThen },
    item, itemId,
    props,
    interact
  ] = normalizeArgs(...args);

  const { authRules, useRouter, basePath, location, history } = props,

    hasAuth = checkAuth(authRules, action, props, item),

    propsToSeed = seedProps(props, item);

  if (useRouter && hasAuth) {
    const { push } = history,
      { pathname, search = "" } = location,

      stack = get(location, ["state", "stack"], []),
      stackLength = stack.length,

      searchStack = get(location, ["state", "search"], []),
      searchLength = searchStack.length;

    return /^(dms:)*back$/.test(action) ?
      (e => {
        e.stopPropagation();
        push({
          pathname: get(stack, [stackLength - 1], basePath),
          search: get(searchStack, [searchLength - 1], ""),
          state: {
            stack: stack.slice(0, -1),
            search: searchStack.slice(0, -1)
          }
        });
      })
      : /^(dms:)*home$/.test(action) ?
        (e => {
          e.stopPropagation();
          push({
            pathname: basePath,
            state: {
              stack: [],
              search: []
            }
          });
        })
      : /^api:/.test(action) ?
        (e => {
          e.stopPropagation();
          return Promise.resolve(interact(action, itemId, propsToSeed))
            .then(() => doThen())
            .then(() => push({
              pathname: get(stack, [stackLength - 1], basePath),
              search: get(searchStack, [searchLength - 1], ""),
              state: {
                stack: stack.slice(0, -1),
                search: searchStack.slice(0, -1)
              }
            }))
        })
      : (e => {
          e.stopPropagation();
          push({
            pathname: makePath(basePath, action, itemId, propsToSeed),
            search: !propsToSeed ? "" : `?${ Object.keys(propsToSeed).map(k => `${ k }=${ propsToSeed[k] }`).join('&') }`,
            state: {
              stack: [...stack, pathname],
              search: [...searchStack, search]
            }
          })
        })
  }
  return (
    e => {
      e.stopPropagation();
      if (!hasAuth) return Promise.resolve();
      return Promise.resolve(interact(action, itemId, propsToSeed))
        .then(() => /^api:/.test(action) && doThen())
        .then(() => /^api:/.test(action) && interact("dms:back"));
    }
  )
}
