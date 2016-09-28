/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	!function(global, factory) {
	     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
	}(this, function(exports) {
	    function VNode(nodeName, attributes, children) {
	        this.nodeName = nodeName;
	        this.attributes = attributes;
	        this.children = children;
	        this.key = attributes && attributes.key;
	    }
	    function extend(obj, props) {
	        if (props) for (var i in props) if (void 0 !== props[i]) obj[i] = props[i];
	        return obj;
	    }
	    function clone(obj) {
	        return extend({}, obj);
	    }
	    function delve(obj, key) {
	        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
	        return obj;
	    }
	    function toArray(obj, offset) {
	        return [].slice.call(obj, offset);
	    }
	    function isFunction(obj) {
	        return 'function' == typeof obj;
	    }
	    function isString(obj) {
	        return 'string' == typeof obj;
	    }
	    function empty(x) {
	        return void 0 === x || null === x;
	    }
	    function falsey(value) {
	        return value === !1 || empty(value);
	    }
	    function hashToClassName(c) {
	        var str = '';
	        for (var prop in c) if (c[prop]) {
	            if (str) str += ' ';
	            str += prop;
	        }
	        return str;
	    }
	    function h(nodeName, attributes, firstChild) {
	        var children, arr, lastSimple, len = arguments.length;
	        if (len > 2) {
	            var type = typeof firstChild;
	            if (3 === len && 'object' !== type && 'function' !== type) {
	                if (!falsey(firstChild)) children = [ String(firstChild) ];
	            } else {
	                children = [];
	                for (var i = 2; i < len; i++) {
	                    var _p = arguments[i];
	                    if (!falsey(_p)) {
	                        if (_p.join) arr = _p; else (arr = SHARED_TEMP_ARRAY)[0] = _p;
	                        for (var j = 0; j < arr.length; j++) {
	                            var child = arr[j], simple = !(falsey(child) || isFunction(child) || child instanceof VNode);
	                            if (simple && !isString(child)) child = String(child);
	                            if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) {
	                                children.push(child);
	                                lastSimple = simple;
	                            }
	                        }
	                    } else ;
	                }
	            }
	        } else if (attributes && attributes.children) return h(nodeName, attributes, attributes.children);
	        if (attributes) {
	            if (attributes.children) delete attributes.children;
	            if (!isFunction(nodeName)) {
	                if ('className' in attributes) {
	                    attributes.class = attributes.className;
	                    delete attributes.className;
	                }
	                lastSimple = attributes.class;
	                if (lastSimple && !isString(lastSimple)) attributes.class = hashToClassName(lastSimple);
	            }
	        }
	        var p = new VNode(nodeName, attributes || void 0, children);
	        if (options.vnode) options.vnode(p);
	        return p;
	    }
	    function cloneElement(vnode, props) {
	        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? toArray(arguments, 2) : vnode.children);
	    }
	    function createLinkedState(component, key, eventPath) {
	        var path = key.split('.'), p0 = path[0];
	        return function(e) {
	            var _component$setState;
	            var v, i, t = e && e.currentTarget || this, s = component.state, obj = s;
	            if (isString(eventPath)) v = delve(e, eventPath); else v = t.nodeName ? (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value : e;
	            if (path.length > 1) {
	                for (i = 0; i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = {});
	                obj[path[i]] = v;
	                v = s[p0];
	            }
	            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
	        };
	    }
	    function enqueueRender(component) {
	        if (1 === items.push(component)) (options.debounceRendering || defer)(rerender);
	    }
	    function rerender() {
	        if (items.length) {
	            var p, currentItems = items;
	            items = itemsOffline;
	            itemsOffline = currentItems;
	            while (p = currentItems.pop()) if (p._dirty) renderComponent(p);
	        }
	    }
	    function isFunctionalComponent(vnode) {
	        var nodeName = vnode && vnode.nodeName;
	        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	    }
	    function buildFunctionalComponent(vnode, context) {
	        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
	    }
	    function ensureNodeData(node, data) {
	        return node[ATTR_KEY] || (node[ATTR_KEY] = data || {});
	    }
	    function getNodeType(node) {
	        if (node instanceof Text) return 3;
	        if (node instanceof Element) return 1; else return 0;
	    }
	    function removeNode(node) {
	        var p = node.parentNode;
	        if (p) p.removeChild(node);
	    }
	    function setAccessor(node, name, value, old, isSvg) {
	        ensureNodeData(node)[name] = value;
	        if ('key' !== name && 'children' !== name && 'innerHTML' !== name) if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
	            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
	            if (value && 'object' == typeof value) {
	                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
	                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
	            }
	        } else if ('dangerouslySetInnerHTML' === name) {
	            if (value) node.innerHTML = value.__html;
	        } else if ('o' == name[0] && 'n' == name[1]) {
	            var l = node._listeners || (node._listeners = {});
	            name = toLowerCase(name.substring(2));
	            if (value) {
	                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            l[name] = value;
	        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
	            setProperty(node, name, empty(value) ? '' : value);
	            if (falsey(value)) node.removeAttribute(name);
	        } else {
	            var ns = isSvg && name.match(/^xlink\:?(.+)/);
	            if (falsey(value)) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
	        }
	    }
	    function setProperty(node, name, value) {
	        try {
	            node[name] = value;
	        } catch (e) {}
	    }
	    function eventProxy(e) {
	        return this._listeners[e.type](options.event && options.event(e) || e);
	    }
	    function getRawNodeAttributes(node) {
	        var attrs = {};
	        for (var i = node.attributes.length; i--; ) attrs[node.attributes[i].name] = node.attributes[i].value;
	        return attrs;
	    }
	    function isSameNodeType(node, vnode) {
	        if (isString(vnode)) return 3 === getNodeType(node);
	        if (isString(vnode.nodeName)) return isNamedNode(node, vnode.nodeName);
	        if (isFunction(vnode.nodeName)) return node._componentConstructor === vnode.nodeName || isFunctionalComponent(vnode); else ;
	    }
	    function isNamedNode(node, nodeName) {
	        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
	    }
	    function getNodeProps(vnode) {
	        var defaultProps = vnode.nodeName.defaultProps, props = clone(defaultProps || vnode.attributes);
	        if (defaultProps) extend(props, vnode.attributes);
	        if (vnode.children) props.children = vnode.children;
	        return props;
	    }
	    function collectNode(node) {
	        removeNode(node);
	        if (1 === getNodeType(node)) {
	            cleanNode(node);
	            var name = toLowerCase(node.nodeName), list = nodes[name];
	            if (list) list.push(node); else nodes[name] = [ node ];
	        }
	    }
	    function createNode(nodeName, isSvg) {
	        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
	        ensureNodeData(node);
	        node.normalizedNodeName = name;
	        return node;
	    }
	    function cleanNode(node) {
	        ensureNodeData(node, getRawNodeAttributes(node));
	        node._component = node._componentConstructor = null;
	    }
	    function flushMounts() {
	        var c;
	        while (c = mounts.pop()) if (c.componentDidMount) c.componentDidMount();
	    }
	    function diff(dom, vnode, context, mountAll, parent, rootComponent) {
	        diffLevel++;
	        var ret = idiff(dom, vnode, context, mountAll, rootComponent);
	        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
	        if (!--diffLevel) flushMounts();
	        return ret;
	    }
	    function idiff(dom, vnode, context, mountAll, rootComponent) {
	        var originalAttributes = vnode && vnode.attributes;
	        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
	        if (empty(vnode)) {
	            vnode = '';
	            if (rootComponent) {
	                if (dom) {
	                    if (8 === dom.nodeType) return dom;
	                    recollectNodeTree(dom);
	                }
	                return document.createComment(vnode);
	            }
	        }
	        if (isString(vnode)) {
	            if (dom) {
	                if (3 === getNodeType(dom) && dom.parentNode) {
	                    dom.nodeValue = vnode;
	                    return dom;
	                }
	                recollectNodeTree(dom);
	            }
	            return document.createTextNode(vnode);
	        }
	        var out = dom, nodeName = vnode.nodeName, prevSvgMode = isSvgMode;
	        if (isFunction(nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
	        if (!isString(nodeName)) nodeName = String(nodeName);
	        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
	        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
	            out = createNode(nodeName, isSvgMode);
	            while (dom.firstChild) out.appendChild(dom.firstChild);
	            recollectNodeTree(dom);
	        }
	        if (vnode.children && 1 === vnode.children.length && 'string' == typeof vnode.children[0] && 1 === out.childNodes.length && out.firstChild instanceof Text) out.firstChild.nodeValue = vnode.children[0]; else if (vnode.children || out.firstChild) innerDiffNode(out, vnode.children, context, mountAll);
	        diffAttributes(out, vnode.attributes);
	        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
	        isSvgMode = prevSvgMode;
	        return out;
	    }
	    function innerDiffNode(dom, vchildren, context, mountAll) {
	        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
	        if (len) for (var i = 0; i < len; i++) {
	            var _child = originalChildren[i], key = vlen ? (c = _child._component) ? c.__key : (c = _child[ATTR_KEY]) ? c.key : null : null;
	            if (key || 0 === key) {
	                keyedLen++;
	                keyed[key] = _child;
	            } else children[childrenLen++] = _child;
	        }
	        if (vlen) for (var i = 0; i < vlen; i++) {
	            vchild = vchildren[i];
	            child = null;
	            var key = vchild.key;
	            if (!empty(key)) {
	                if (keyedLen && key in keyed) {
	                    child = keyed[key];
	                    keyed[key] = void 0;
	                    keyedLen--;
	                }
	            } else if (!child && min < childrenLen) {
	                for (j = min; j < childrenLen; j++) {
	                    c = children[j];
	                    if (c && isSameNodeType(c, vchild)) {
	                        child = c;
	                        children[j] = void 0;
	                        if (j === childrenLen - 1) childrenLen--;
	                        if (j === min) min++;
	                        break;
	                    }
	                }
	                if (!child && min < childrenLen && isFunction(vchild.nodeName) && mountAll) {
	                    child = children[min];
	                    children[min++] = void 0;
	                }
	            }
	            child = idiff(child, vchild, context, mountAll);
	            if (child !== originalChildren[i]) dom.insertBefore(child, originalChildren[i] || null);
	        }
	        if (keyedLen) for (var i in keyed) if (keyed[i]) children[min = childrenLen++] = keyed[i];
	        if (min < childrenLen) removeOrphanedChildren(children);
	    }
	    function removeOrphanedChildren(children, unmountOnly) {
	        for (var i = children.length; i--; ) {
	            var child = children[i];
	            if (child) recollectNodeTree(child, unmountOnly);
	        }
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var component = node._component;
	        if (component) unmountComponent(component, !unmountOnly); else {
	            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
	            if (!unmountOnly) collectNode(node);
	            if (node.childNodes && node.childNodes.length) removeOrphanedChildren(node.childNodes, unmountOnly);
	        }
	    }
	    function diffAttributes(dom, attrs) {
	        var old = dom[ATTR_KEY] || getRawNodeAttributes(dom);
	        for (var _name in old) if (!(attrs && _name in attrs)) setAccessor(dom, _name, null, old[_name], isSvgMode);
	        if (attrs) for (var _name2 in attrs) if (!(_name2 in old) || attrs[_name2] != old[_name2] || ('value' === _name2 || 'checked' === _name2) && attrs[_name2] != dom[_name2]) setAccessor(dom, _name2, attrs[_name2], old[_name2], isSvgMode);
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name, list = components[name];
	        if (list) list.push(component); else components[name] = [ component ];
	    }
	    function createComponent(Ctor, props, context) {
	        var inst = new Ctor(props, context), list = components[Ctor.name];
	        inst.props = props;
	        inst.context = context;
	        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
	            inst.nextBase = list[i].nextBase;
	            list.splice(i, 1);
	            break;
	        }
	        return inst;
	    }
	    function triggerComponentRender(component) {
	        if (!component._dirty) {
	            component._dirty = !0;
	            enqueueRender(component);
	        }
	    }
	    function setComponentProps(component, props, opts, context, mountAll) {
	        var b = component.base;
	        if (!component._disableRendering) {
	            component._disableRendering = !0;
	            if (component.__ref = props.ref) delete props.ref;
	            if (component.__key = props.key) delete props.key;
	            if (empty(b) || mountAll) {
	                if (component.componentWillMount) component.componentWillMount();
	            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
	            if (context && context !== component.context) {
	                if (!component.prevContext) component.prevContext = component.context;
	                component.context = context;
	            }
	            if (!component.prevProps) component.prevProps = component.props;
	            component.props = props;
	            component._disableRendering = !1;
	            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !b) renderComponent(component, 1, mountAll); else triggerComponentRender(component);
	            if (component.__ref) component.__ref(component);
	        }
	    }
	    function renderComponent(component, opts, mountAll) {
	        if (!component._disableRendering) {
	            var skip, rendered, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, initialBase = isUpdate || component.nextBase, initialChildComponent = component._component;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	            component._dirty = !1;
	            if (!skip) {
	                if (component.render) rendered = component.render(props, state, context);
	                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
	                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
	                var toUnmount, base, childComponent = rendered && rendered.nodeName;
	                if (isFunction(childComponent) && childComponent.prototype.render) {
	                    var inst = initialChildComponent, childProps = getNodeProps(rendered);
	                    if (inst && inst.constructor === childComponent) setComponentProps(inst, childProps, 1, context); else {
	                        toUnmount = inst;
	                        inst = createComponent(childComponent, childProps, context);
	                        inst.nextBase = inst.nextBase || mountAll && initialBase;
	                        inst._parentComponent = component;
	                        component._component = inst;
	                        setComponentProps(inst, childProps, 0, context);
	                        renderComponent(inst, 1);
	                    }
	                    base = inst.base;
	                } else {
	                    var cbase = initialBase;
	                    toUnmount = initialChildComponent;
	                    if (toUnmount) cbase = component._component = null;
	                    if (initialBase || 1 === opts) {
	                        if (cbase) cbase._component = null;
	                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
	                    }
	                }
	                if (initialBase && base !== initialBase) {
	                    var baseParent = initialBase.parentNode;
	                    if (baseParent && base !== baseParent) baseParent.replaceChild(base, initialBase);
	                    if (!toUnmount && component._parentComponent) {
	                        initialBase._component = null;
	                        recollectNodeTree(initialBase);
	                    }
	                }
	                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
	                component.base = base;
	                if (base) {
	                    var componentRef = component, t = component;
	                    while (t = t._parentComponent) componentRef = t;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	            }
	            if (!isUpdate || mountAll) {
	                mounts.unshift(component);
	                if (!diffLevel) flushMounts();
	            } else if (!skip && component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
	            var fn, cb = component._renderCallbacks;
	            if (cb) while (fn = cb.pop()) fn.call(component);
	            return rendered;
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context, mountAll) {
	        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
	        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
	        if (isOwner && (!mountAll || c._component)) {
	            setComponentProps(c, props, 3, context, mountAll);
	            dom = c.base;
	        } else {
	            if (c && !isDirectOwner) {
	                unmountComponent(c, !0);
	                dom = oldDom = null;
	            }
	            c = createComponent(vnode.nodeName, props, context);
	            if (dom && !c.nextBase) c.nextBase = dom;
	            setComponentProps(c, props, 1, context, mountAll);
	            dom = c.base;
	            if (oldDom && dom !== oldDom) {
	                oldDom._component = null;
	                recollectNodeTree(oldDom);
	            }
	        }
	        return dom;
	    }
	    function unmountComponent(component, remove) {
	        var base = component.base;
	        component._disableRendering = !0;
	        if (component.componentWillUnmount) component.componentWillUnmount();
	        component.base = null;
	        var inner = component._component;
	        if (inner) unmountComponent(inner, remove); else if (base) {
	            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
	            component.nextBase = base;
	            if (remove) {
	                removeNode(base);
	                collectComponent(component);
	            }
	            removeOrphanedChildren(base.childNodes, !remove);
	        }
	        if (component.__ref) component.__ref(null);
	        if (component.componentDidUnmount) component.componentDidUnmount();
	    }
	    function Component(props, context) {
	        this._dirty = !0;
	        this._disableRendering = !1;
	        this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
	        this.context = context;
	        this.props = props;
	        this.state = this.getInitialState && this.getInitialState() || {};
	    }
	    function render(vnode, parent, merge) {
	        return diff(merge, vnode, {}, !1, parent);
	    }
	    var options = {};
	    var lcCache = {};
	    var toLowerCase = function(s) {
	        return lcCache[s] || (lcCache[s] = s.toLowerCase());
	    };
	    var resolved = 'undefined' != typeof Promise && Promise.resolve();
	    var defer = resolved ? function(f) {
	        resolved.then(f);
	    } : setTimeout;
	    var SHARED_TEMP_ARRAY = [];
	    var EMPTY = {};
	    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
	    var NON_DIMENSION_PROPS = {
	        boxFlex: 1,
	        boxFlexGroup: 1,
	        columnCount: 1,
	        fillOpacity: 1,
	        flex: 1,
	        flexGrow: 1,
	        flexPositive: 1,
	        flexShrink: 1,
	        flexNegative: 1,
	        fontWeight: 1,
	        lineClamp: 1,
	        lineHeight: 1,
	        opacity: 1,
	        order: 1,
	        orphans: 1,
	        strokeOpacity: 1,
	        widows: 1,
	        zIndex: 1,
	        zoom: 1
	    };
	    var NON_BUBBLING_EVENTS = {
	        blur: 1,
	        error: 1,
	        focus: 1,
	        load: 1,
	        resize: 1,
	        scroll: 1
	    };
	    var items = [];
	    var itemsOffline = [];
	    var nodes = {};
	    var mounts = [];
	    var diffLevel = 0;
	    var isSvgMode = !1;
	    var components = {};
	    extend(Component.prototype, {
	        linkState: function(key, eventPath) {
	            var c = this._linkedStates || (this._linkedStates = {}), cacheKey = key + '|' + eventPath;
	            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
	        },
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.prevState) this.prevState = clone(s);
	            extend(s, isFunction(state) ? state(s, this.props) : state);
	            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
	            triggerComponentRender(this);
	        },
	        forceUpdate: function() {
	            renderComponent(this, 2);
	        },
	        render: function() {
	            return null;
	        }
	    });
	    exports.h = h;
	    exports.cloneElement = cloneElement;
	    exports.Component = Component;
	    exports.render = render;
	    exports.rerender = rerender;
	    exports.options = options;
	});
	//# sourceMappingURL=preact.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var finished = _ref.finished;
	  var url = _ref.url;
	  var id = _ref.id;
	  return finished ? (0, _preact.h)(
	    'div',
	    { 'class': 'card' },
	    (0, _preact.h)(
	      'h2',
	      null,
	      'That\'s it. Your form has been created.'
	    ),
	    (0, _preact.h)(
	      'p',
	      null,
	      'The form you just created is available to be filled by other people. You can embed it as an iframe or distribute the link.'
	    ),
	    (0, _preact.h)(
	      'p',
	      null,
	      'You may want to change the questions or their order. You can do that in our main edition interface.'
	    ),
	    (0, _preact.h)(
	      'p',
	      null,
	      (0, _preact.h)(
	        'a',
	        { href: 'https://coralproject.net/products/ask.html', target: '_blank' },
	        'Ask'
	      ),
	      ' has an API for creating forms and this is an experiment for an alternative way of creating forms. You can ',
	      (0, _preact.h)(
	        'a',
	        { href: 'https://github.com/impronunciable/askme', target: '_blank' },
	        'check out the code'
	      ),
	      ' and make your on version.'
	    ),
	    (0, _preact.h)(
	      'div',
	      { 'class': 'card-actions' },
	      (0, _preact.h)(
	        'a',
	        { href: url, 'class': 'btn large primary', target: '_blank' },
	        'View the form page'
	      ),
	      (0, _preact.h)(
	        'a',
	        { href: _config2.default.cayBaseUrl + '/forms/' + id, 'class': 'btn large', target: '_blank' },
	        'Edit the form'
	      )
	    ),
	    (0, _preact.h)(
	      'p',
	      null,
	      'Also this is how it looks inside an iframe:'
	    ),
	    (0, _preact.h)('iframe', { src: url, width: '80%', height: '500', style: styles.iframe, frameBorder: '0' })
	  ) : (0, _preact.h)(
	    'div',
	    { 'class': 'card' },
	    (0, _preact.h)(Loader, null)
	  );
	};

	var Loader = function Loader() {
	  return (0, _preact.h)(
	    'svg',
	    { width: '38', height: '38', viewBox: '0 0 38 38', stroke: '#fff' },
	    (0, _preact.h)(
	      'g',
	      { fill: 'none', 'fill-rule': 'evenodd' },
	      (0, _preact.h)(
	        'g',
	        { transform: 'translate(1 1)', 'stroke-width': '2' },
	        (0, _preact.h)('circle', { 'stroke-opacity': '.5', cx: '18', cy: '18', r: '18' }),
	        (0, _preact.h)(
	          'path',
	          { d: 'M36 18c0-9.94-8.06-18-18-18', transform: 'rotate(192.247 18 18)' },
	          (0, _preact.h)('animateTransform', { attributeName: 'transform', type: 'rotate', from: '0 18 18', to: '360 18 18', dur: '1s', repeatCount: 'indefinite' })
	        )
	      )
	    )
	  );
	};

	var styles = {
	  iframe: {
	    background: '#fff',
	    borderRadius: 8,
	    margin: '0 auto',
	    marginTop: 30
	  },
	  actions: {
	    margin: 50
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  cayBaseUrl: 'https://web01_stg.coralproject.net',
	  elkHornBaseUrl: 'https://elkhorn_stg.coralproject.net'
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(17);

	var _preact = __webpack_require__(0);

	var _Intro = __webpack_require__(5);

	var _Intro2 = _interopRequireDefault(_Intro);

	var _QuestionFields = __webpack_require__(8);

	var _QuestionFields2 = _interopRequireDefault(_QuestionFields);

	var _TitleField = __webpack_require__(13);

	var _TitleField2 = _interopRequireDefault(_TitleField);

	var _DescriptionField = __webpack_require__(4);

	var _DescriptionField2 = _interopRequireDefault(_DescriptionField);

	var _FinishedCard = __webpack_require__(1);

	var _FinishedCard2 = _interopRequireDefault(_FinishedCard);

	var _form = __webpack_require__(15);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FormCreator = function (_Component) {
	  _inherits(FormCreator, _Component);

	  function FormCreator(props) {
	    _classCallCheck(this, FormCreator);

	    var _this = _possibleConstructorReturn(this, (FormCreator.__proto__ || Object.getPrototypeOf(FormCreator)).call(this, props));

	    _this.state = { submitted: false, finished: false, title: '', description: '', url: '', id: '' };
	    _this.onPublish = _this.onPublish.bind(_this);
	    _this.onDescriptionChange = _this.onDescriptionChange.bind(_this);
	    _this.onTitleChange = _this.onTitleChange.bind(_this);
	    _this._refs = {};
	    return _this;
	  }

	  _createClass(FormCreator, [{
	    key: 'onPublish',
	    value: function onPublish(questions) {
	      var _this2 = this;

	      var _refs = this._refs;
	      var title = _refs.title;
	      var description = _refs.description;

	      this.setState({ submitted: true });

	      var data = (0, _form.createFormStructure)(title.state.title, description.state.description, questions);

	      fetch(_config2.default.elkHornBaseUrl + '/create', {
	        method: 'POST',
	        mode: 'cors',
	        body: JSON.stringify(data),
	        headers: new Headers({
	          'Content-Type': 'application/json'
	        })
	      }).then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        _this2.setState({ finished: true, url: data.urls.iframe, id: data.data.id });
	      });
	    }
	  }, {
	    key: 'onDescriptionChange',
	    value: function onDescriptionChange(description) {
	      this.setState({ description: description });
	    }
	  }, {
	    key: 'onTitleChange',
	    value: function onTitleChange(e) {
	      this.setState({ title: e.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render(props, _ref) {
	      var _this3 = this;

	      var submitted = _ref.submitted;
	      var finished = _ref.finished;
	      var title = _ref.title;
	      var description = _ref.description;
	      var url = _ref.url;
	      var id = _ref.id;

	      return (0, _preact.h)(
	        'div',
	        { 'class': 'form-creator' },
	        !submitted ? (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(_Intro2.default, null),
	          (0, _preact.h)(_TitleField2.default, { ref: function ref(titleRef) {
	              return _this3._refs.title = titleRef;
	            } }),
	          (0, _preact.h)(_DescriptionField2.default, { ref: function ref(descRef) {
	              return _this3._refs.description = descRef;
	            } }),
	          (0, _preact.h)(_QuestionFields2.default, { onPublish: this.onPublish })
	        ) : (0, _preact.h)(_FinishedCard2.default, { finished: finished, url: url, id: id })
	      );
	    }
	  }]);

	  return FormCreator;
	}(_preact.Component);

	exports.default = FormCreator;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(0);

	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DescriptionField = function (_Component) {
	  _inherits(DescriptionField, _Component);

	  function DescriptionField(props) {
	    _classCallCheck(this, DescriptionField);

	    var _this = _possibleConstructorReturn(this, (DescriptionField.__proto__ || Object.getPrototypeOf(DescriptionField)).call(this, props));

	    _this.state = { what: '', why: '', how: '', description: '', dirty: false };
	    _this.onQuestionChange = _this.onQuestionChange.bind(_this);
	    _this.onDescriptionChange = _this.onDescriptionChange.bind(_this);
	    return _this;
	  }

	  _createClass(DescriptionField, [{
	    key: 'onDescriptionChange',
	    value: function onDescriptionChange(e) {
	      this.setState({
	        dirty: true,
	        description: e.target.value
	      });
	    }
	  }, {
	    key: 'onQuestionChange',
	    value: function onQuestionChange(type, value) {
	      this.setState(_defineProperty({}, type, value));

	      this.setState({
	        description: this.state.dirty ? this.state.description : [this.state.what, this.state.why, this.state.how].join('\n')
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref, _ref2) {
	      var _this2 = this;

	      var what = _ref2.what;
	      var why = _ref2.why;
	      var how = _ref2.how;
	      var description = _ref2.description;

	      _objectDestructuringEmpty(_ref);

	      return (0, _preact.h)(
	        'div',
	        { 'class': 'card' },
	        (0, _preact.h)(
	          'h2',
	          null,
	          'The Description'
	        ),
	        (0, _preact.h)(
	          'p',
	          null,
	          'After your readers agreed to continue with your questionnaire is important to let them know about some aspect keys'
	        ),
	        (0, _preact.h)(
	          'ul',
	          null,
	          (0, _preact.h)(
	            'li',
	            null,
	            (0, _preact.h)(
	              'strong',
	              null,
	              'What'
	            ),
	            ' is this really about ',
	            (0, _preact.h)('input', { 'class': 'small', type: 'text',
	              placeholder: 'Tell us your story on...', value: what, onInput: function onInput(e) {
	                return _this2.onQuestionChange('what', e.target.value);
	              } })
	          ),
	          (0, _preact.h)(
	            'li',
	            null,
	            (0, _preact.h)(
	              'strong',
	              null,
	              'Why'
	            ),
	            ' are you asking this specific questions ',
	            (0, _preact.h)('input', { 'class': 'small', type: 'text',
	              placeholder: 'We want to know more about what you think because...', value: why, onInput: function onInput(e) {
	                return _this2.onQuestionChange('why', e.target.value);
	              } })
	          ),
	          (0, _preact.h)(
	            'li',
	            null,
	            (0, _preact.h)(
	              'strong',
	              null,
	              'How'
	            ),
	            ' are the answers going to be used ',
	            (0, _preact.h)('input', { 'class': 'small', type: 'text',
	              placeholder: 'We will be anonymizing and aggregating the answers...', value: how, oninput: function oninput(e) {
	                return _this2.onQuestionChange('how', e.target.value);
	              } })
	          )
	        ),
	        (0, _preact.h)('textarea', { value: description, onInput: this.onDescriptionChange })
	      );
	    }
	  }]);

	  return DescriptionField;
	}(_preact.Component);

	exports.default = DescriptionField;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	exports.default = function () {
	  return (0, _preact.h)(
	    'div',
	    null,
	    (0, _preact.h)(
	      'h1',
	      null,
	      'Hi, this is an alternative Coral Project\'s ask creator.'
	    ),
	    (0, _preact.h)(
	      'p',
	      { style: styles.paragraph },
	      'In this oportunity we will guide you into the creation of useful forms focusing on your audience perspective.'
	    )
	  );
	};

	var styles = {
	  paragraph: {
	    fontSize: '1.2em',
	    marginTop: 40
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	exports.default = function (_ref) {
	  var options = _ref.options;
	  return (0, _preact.h)(
	    'ul',
	    { style: styles.container },
	    options.map(function (option) {
	      return (0, _preact.h)(
	        'li',
	        { style: styles.item },
	        option
	      );
	    })
	  );
	};

	var styles = {
	  container: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    listStyle: 'none',
	    padding: 0,
	    justifyContent: 'space-between'
	  },
	  item: {
	    background: '#ddd',
	    padding: 20,
	    width: '45%',
	    minWidth: 250,
	    marginTop: 20,
	    color: '#333',
	    borderRadius: 8
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(0);

	var _QuestionTypesDropdown = __webpack_require__(10);

	var _QuestionTypesDropdown2 = _interopRequireDefault(_QuestionTypesDropdown);

	var _TextField = __webpack_require__(12);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _TextAreaField = __webpack_require__(11);

	var _TextAreaField2 = _interopRequireDefault(_TextAreaField);

	var _MultipleChoiceField = __webpack_require__(6);

	var _MultipleChoiceField2 = _interopRequireDefault(_MultipleChoiceField);

	var _QuestionFooter = __webpack_require__(9);

	var _QuestionFooter2 = _interopRequireDefault(_QuestionFooter);

	var _inferQuestionType = __webpack_require__(16);

	var _inferQuestionType2 = _interopRequireDefault(_inferQuestionType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuestionField = function (_Component) {
	  _inherits(QuestionField, _Component);

	  function QuestionField(props) {
	    _classCallCheck(this, QuestionField);

	    var _this = _possibleConstructorReturn(this, (QuestionField.__proto__ || Object.getPrototypeOf(QuestionField)).call(this, props));

	    _this.state = {
	      question: {
	        title: '',
	        description: '',
	        props: {},
	        type: 'TextField',
	        options: ['First option', 'Second option']
	      }
	    };

	    _this.cardTitle = getCardTitle(props.isFirst);
	    _this.cardDescription = getCardDescription(props.isFirst);
	    return _this;
	  }

	  _createClass(QuestionField, [{
	    key: 'onChange',
	    value: function onChange(key, e) {
	      var val = e.target.value;
	      var question = Object.assign({}, this.state.question);
	      question[key] = val;

	      if (key === 'title' && !question.dirty) {
	        question['type'] = (0, _inferQuestionType2.default)(val);
	      }

	      question['dirty'] = key === 'type' ? true : question.dirty;
	      this.setState({ question: question });
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref, _ref2) {
	      var isFirst = _ref.isFirst;
	      var isLast = _ref.isLast;
	      var onAddQuestion = _ref.onAddQuestion;
	      var onPublish = _ref.onPublish;
	      var onChange = _ref.onChange;
	      var question = _ref2.question;

	      return (0, _preact.h)(
	        'div',
	        { 'class': 'card' },
	        (0, _preact.h)(
	          'h2',
	          null,
	          this.cardTitle
	        ),
	        (0, _preact.h)(
	          'p',
	          null,
	          this.cardDescription
	        ),
	        (0, _preact.h)('input', { type: 'text', placeholder: 'Question title', value: question.title,
	          onInput: this.onChange.bind(this, 'title') }),
	        (0, _preact.h)('textarea', { placeholder: 'Question description', value: question.description,
	          onInput: this.onChange.bind(this, 'description') }),
	        question.type === 'MultipleChoice' ? (0, _preact.h)(ChoiceEditor, { onChange: this.onChange.bind(this, 'options') }) : null,
	        (0, _preact.h)(
	          'h3',
	          null,
	          'Question preview'
	        ),
	        renderQuestionPreview(question),
	        isFirst ? (0, _preact.h)(
	          'p',
	          null,
	          'We tried to infer the best interface for asking the question but we can be wrong so you can manually select the question type'
	        ) : null,
	        (0, _preact.h)(_QuestionTypesDropdown2.default, { type: question.type, onTypeChange: this.onChange.bind(this, 'type') }),
	        isLast ? (0, _preact.h)(_QuestionFooter2.default, { onAddQuestion: onAddQuestion, onPublish: onPublish }) : null
	      );
	    }
	  }]);

	  return QuestionField;
	}(_preact.Component);

	exports.default = QuestionField;


	var ChoiceEditor = function ChoiceEditor(_ref3) {
	  var onChange = _ref3.onChange;
	  var options = _ref3.options;
	  return (0, _preact.h)(
	    'div',
	    null,
	    (0, _preact.h)(
	      'h3',
	      null,
	      'Write down the question options'
	    ),
	    (0, _preact.h)(
	      'textarea',
	      { onInput: function onInput(e) {
	          return onChange({ target: { value: e.target.value.split('\n').filter(function (l) {
	                return l.length;
	              }) } });
	        } },
	      'First option\nSecond option'
	    )
	  );
	};

	var renderQuestionPreview = function renderQuestionPreview(question) {
	  switch (question.type) {
	    case 'EmailField':
	      return (0, _preact.h)(_TextField2.default, { type: 'email' });
	    case 'NumberField':
	      return (0, _preact.h)(_TextField2.default, { type: 'number' });
	    case 'DateField':
	      return (0, _preact.h)(_TextField2.default, { type: 'date' });
	    case 'PhoneNumber':
	      return (0, _preact.h)(_TextField2.default, { type: 'tel' });
	    case 'TextArea':
	      return (0, _preact.h)(_TextAreaField2.default, null);
	    case 'MultipleChoice':
	      return (0, _preact.h)(_MultipleChoiceField2.default, { options: question.options });
	    case 'TextField':
	    default:
	      return (0, _preact.h)(_TextField2.default, { type: 'text' });
	  }
	};

	var getCardTitle = function getCardTitle(isFirst) {
	  var titles = ['a new', 'another', 'add another', 'ask a new'];

	  if (isFirst) {
	    return 'Your first question';
	  } else {
	    return titles[Math.floor(Math.random() * titles.length)] + ' question';
	  }
	};

	var getCardDescription = function getCardDescription(isFirst) {
	  var descriptions = ['Just apply what you learned from the previous questions', 'You can do it one more time', 'This is looking good!', '📝 ？'];

	  if (isFirst) {
	    return 'A question needs context. Providing a title and description for your questions will help your users\n    to understand better what you need. You don\'t need a sexy title here, try to be clear on your needs.';
	  } else {
	    return descriptions[Math.floor(Math.random() * descriptions.length)];
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(0);

	var _QuestionField = __webpack_require__(7);

	var _QuestionField2 = _interopRequireDefault(_QuestionField);

	var _FinishedCard = __webpack_require__(1);

	var _FinishedCard2 = _interopRequireDefault(_FinishedCard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuestionFields = function (_Component) {
	  _inherits(QuestionFields, _Component);

	  function QuestionFields(props) {
	    _classCallCheck(this, QuestionFields);

	    var _this = _possibleConstructorReturn(this, (QuestionFields.__proto__ || Object.getPrototypeOf(QuestionFields)).call(this, props));

	    _this.state = {
	      questions: 1
	    };

	    _this.onAddQuestion = _this.onAddQuestion.bind(_this);
	    _this.onPublish = _this.onPublish.bind(_this);
	    _this._fieldRefs = [];
	    return _this;
	  }

	  _createClass(QuestionFields, [{
	    key: 'onAddQuestion',
	    value: function onAddQuestion() {
	      this.setState({
	        questions: this.state.questions + 1
	      });
	    }
	  }, {
	    key: 'onPublish',
	    value: function onPublish() {
	      var data = this._fieldRefs.map(function (field) {
	        return field.state.question;
	      });
	      this.props.onPublish(data);
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref, _ref2) {
	      var _this2 = this;

	      var onPublish = _ref.onPublish;
	      var questions = _ref2.questions;
	      var finished = _ref2.finished;

	      var Fields = [];

	      var _loop = function _loop(i) {
	        Fields.push((0, _preact.h)(_QuestionField2.default, { key: i,
	          isFirst: !i, isLast: i === questions - 1,
	          onPublish: _this2.onPublish,
	          ref: function ref(fieldWrapper) {
	            return _this2._fieldRefs[i] = fieldWrapper;
	          },
	          onAddQuestion: _this2.onAddQuestion }));
	      };

	      for (var i = 0; i < questions; i++) {
	        _loop(i);
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        Fields
	      );
	    }
	  }]);

	  return QuestionFields;
	}(_preact.Component);

	exports.default = QuestionFields;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	exports.default = function (_ref) {
	  var onAddQuestion = _ref.onAddQuestion;
	  var onPublish = _ref.onPublish;
	  return (0, _preact.h)(
	    "div",
	    { "class": "card-footer" },
	    (0, _preact.h)(
	      "button",
	      { onClick: onAddQuestion, "class": "btn large primary" },
	      "Add another question"
	    ),
	    (0, _preact.h)(
	      "button",
	      { onClick: onPublish, "class": "btn large" },
	      "Publish the form"
	    )
	  );
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	exports.default = function (_ref) {
	  var onTypeChange = _ref.onTypeChange;
	  var type = _ref.type;
	  return (0, _preact.h)(
	    "div",
	    { "class": "select" },
	    (0, _preact.h)(
	      "select",
	      { value: type, onChange: onTypeChange },
	      (0, _preact.h)(
	        "option",
	        { value: "TextField" },
	        "Short Text Answer"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "TextArea" },
	        "Long Text Answer"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "NumberField" },
	        "Number"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "MultipleChoice" },
	        "Multiple Choice"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "EmailField" },
	        "Email"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "DateField" },
	        "Date"
	      ),
	      (0, _preact.h)(
	        "option",
	        { value: "PhoneNumber" },
	        "Phone"
	      )
	    )
	  );
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

	exports.default = function (_ref) {
	  _objectDestructuringEmpty(_ref);

	  return (0, _preact.h)('textarea', null);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(0);

	exports.default = function (_ref) {
	  var type = _ref.type;
	  return (0, _preact.h)('input', { placeholder: type[0].toUpperCase() + type.slice(1), type: type });
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(0);

	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TitleField = function (_Component) {
	  _inherits(TitleField, _Component);

	  function TitleField(props) {
	    _classCallCheck(this, TitleField);

	    var _this = _possibleConstructorReturn(this, (TitleField.__proto__ || Object.getPrototypeOf(TitleField)).call(this, props));

	    _this.state = { title: '' };
	    return _this;
	  }

	  _createClass(TitleField, [{
	    key: 'render',
	    value: function render(_ref, _ref2) {
	      var title = _ref2.title;

	      _objectDestructuringEmpty(_ref);

	      return (0, _preact.h)(
	        'div',
	        { 'class': 'card' },
	        (0, _preact.h)(
	          'h2',
	          null,
	          'The Title'
	        ),
	        (0, _preact.h)(
	          'p',
	          null,
	          'The first thing a person ( or a 😺 ) will want to know before filling your form is what is this all about.'
	        ),
	        (0, _preact.h)(
	          'p',
	          null,
	          'Let\'s start by adding an informative and appealing title.'
	        ),
	        (0, _preact.h)('input', { type: 'text', placeholder: 'Form title', onInput: this.linkState('title'), value: title })
	      );
	    }
	  }]);

	  return TitleField;
	}(_preact.Component);

	exports.default = TitleField;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _preact = __webpack_require__(0);

	var _FormCreator = __webpack_require__(3);

	var _FormCreator2 = _interopRequireDefault(_FormCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _preact.render)((0, _preact.h)(_FormCreator2.default, null), document.querySelector('#root'));

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var defaultForm = {
	  target: '#ask-form',
	  theme: {
	    headerBackground: '#FFFFFF',
	    headerText: '#222222',
	    headerIntroText: '#444444',
	    formBackground: '#FFFFFF',
	    footerBackground: '#FFFFFF',
	    requiredAsterisk: '#939393',
	    inputBackground: '#FFFFFF',
	    inputText: '#222222',
	    footerText: '#222222',
	    fieldTitleText: '#222222',
	    progressBar: '#44AA44',
	    progressBarBackground: '#CCCCCC',
	    submitButtonBackground: '#F67D6E',
	    submitButtonText: '#FFFFFF',
	    selectedItemBackground: '#2E343B',
	    selectedItemText: '#FAFAFA'
	  },
	  settings: {
	    saveDestination: 'https://coralproject.net',
	    showFieldNumbers: true,
	    inactiveMessage: 'We are not currently accepting submissions. Thank you.',
	    recaptcha: false,
	    baseUrl: ''
	  },
	  header: {
	    title: '',
	    description: '',
	    heading: ''
	  },
	  footer: {
	    conditions: ''
	  },
	  finishedScreen: {
	    title: 'Thanks.',
	    description: 'Thank you for helping us with our journalism. We read all submissions, and will be in touch if we have any more questions.'
	  },
	  steps: [{
	    id: '1',
	    name: 'first_page'
	  }],
	  status: 'closed'
	};

	var createFormStructure = exports.createFormStructure = function createFormStructure() {
	  var title = arguments.length <= 0 || arguments[0] === undefined ? 'Untitled Form' : arguments[0];
	  var description = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var questions = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	  return Object.assign({}, defaultForm, {
	    header: {
	      title: title,
	      description: description,
	      heading: title
	    },
	    status: 'open',
	    steps: [{
	      createdAt: Date.now(),
	      id: Math.floor(Math.random() * 9999) + '',
	      name: 'first step',
	      widgets: questions.map(function (question) {
	        if (question.type === 'MultipleChoice') {
	          var opts = question.options.map(function (opt) {
	            return { title: opt, placeholder: false };
	          });
	          question.props.options = opts;
	        }
	        question.options = undefined;

	        var type = question.type;
	        question.component = type;
	        question.type = 'field';

	        question.friendlyType = 'Short Answer';
	        question.id = Math.floor(Math.random() * 123123123) + '';
	        question.identity = false;
	        question.wrapper = {};

	        return question;
	      })
	    }]
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (str) {
	  if (/e-?mail/gi.test(str)) {
	    return 'EmailField';
	  } else if (/age|how many|how old/gi.test(str)) {
	    return 'NumberField';
	  } else if (/^when/gi.test(str)) {
	    return 'DateField';
	  } else if (/^which/gi.test(str)) {
	    return 'MultipleChoice';
	  } else if (/\?.*\?/gi.test(str)) {
	    return 'TextArea';
	  } else if (/phone/gi.test(str)) {
	    return 'PhoneNumber';
	  } else {
	    return 'TextField';
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);