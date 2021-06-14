const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`);class r{constructor(t,e){this.parts=[],this.element=e;const i=[],r=[],a=document.createTreeWalker(e.content,133,null,!1);let h=0,d=-1,p=0;const{strings:u,values:{length:_}}=t;for(;p<_;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)o(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=u[p],s=c.exec(e)[2],i=s.toLowerCase()+"$lit$",r=t.getAttribute(i);t.removeAttribute(i);const o=r.split(n);this.parts.push({type:"attribute",index:d,name:s,strings:o}),p+=o.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,r=e.split(n),a=r.length-1;for(let e=0;e<a;e++){let i,n=r[e];if(""===n)i=l();else{const t=c.exec(n);null!==t&&o(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===r[a]?(s.insertBefore(l(),t),i.push(t)):t.data=r[a],p+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&d!==h||(d++,e.insertBefore(l(),t)),h=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=r.pop()}for(const t of i)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},a=t=>-1!==t.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,133,null,!1);let r=p(i),o=i[r],a=-1,l=0;const c=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,r=p(i,r),o=i[r]}c.forEach((t=>t.parentNode.removeChild(t)))}const d=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},p=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(a(e))return s}return-1};const u=new WeakMap,_=t=>"function"==typeof t&&u.has(t),m={},f={};class g{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let r,o=0,l=0,c=n.nextNode();for(;o<i.length;)if(r=i[o],a(r)){for(;l<r.index;)l++,"TEMPLATE"===c.nodeName&&(s.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=s.pop(),c=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),v=` ${s} `;class w{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let r=0;r<t;r++){const t=this.strings[r],o=t.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===t.indexOf("--\x3e",o+1);const a=c.exec(t);e+=null===a?t+(n?v:i):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==y&&(e=y.createHTML(e)),t.innerHTML=e,t}}const S=t=>null===t||!("object"==typeof t||"function"==typeof t),b=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!b(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=s[n];if(void 0!==e){const t=e.value;if(S(t)||!b(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||S(t)&&t===this.value||(this.value=t,_(t)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class T{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof w?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):b(t)?this.__commitIterable(t):t===f?(this.value=f,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const s=new g(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)s=e[i],void 0===s&&(s=new T(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class C{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class N extends x{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends P{}let V=!1;(()=>{try{const t={get capture(){return V=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class E{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=$(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const $=t=>t&&(V?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function O(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return i=e.keyString.get(n),void 0===i&&(i=new r(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const A=new Map,U=new WeakMap;const R=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];if("."===n){return new N(t,e.slice(1),s).parts}if("@"===n)return[new E(t,e.slice(1),i.eventContext)];if("?"===n)return[new C(t,e.slice(1),s)];return new x(t,e,s).parts}handleTextExpression(t){return new T(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const z=(t,...e)=>new w(t,e,"html",R),M=(t,e)=>`${t}--${e}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const I=t=>e=>{const i=M(e.type,t);let n=A.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},A.set(i,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(s);if(o=n.keyString.get(a),void 0===o){const s=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,t),o=new r(e,s),n.keyString.set(a,o)}return n.stringsArray.set(e.strings,o),o},q=["html","svg"],L=new Set,F=(t,e,s)=>{L.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{q.forEach((e=>{const s=A.get(M(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),h(t,s)}))}))})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let o=p(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=d(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=p(n,o);return}o=p(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),h(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const B={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:H};class D extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=H){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||B,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||B.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=W){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const n=this.constructor;s=s||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}D.finalized=!0;const J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(t,e){if(e!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(t,...e)=>{const s=e.reduce(((e,s,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1]),t[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),i=[];s.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new Q(String(e),K)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return Y}}Z.finalized=!0,Z.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=U.has(s),o=j&&11===s.nodeType&&!!s.host,a=o&&!L.has(n),l=a?document.createDocumentFragment():s;if(((t,s,i)=>{let n=U.get(s);void 0===n&&(e(s,s.firstChild),U.set(s,n=new T(Object.assign({templateFactory:O},i))),n.appendInto(s)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:I(n)},i)),a){const t=U.get(l);U.delete(l);const i=t.value instanceof g?t.value.template:void 0;F(n,l,i),e(s,s.firstChild),s.appendChild(l),U.set(s,t)}!r&&o&&window.ShadyCSS.styleElement(s.host)};var tt,et="1.0.0";class st extends Z{setConfig(t){if(this._config=t,!t.entity)throw new Error("No entity specified.")}async resized(){await this.updateComplete}async firstUpdated(){await this.resized()}render(){var t,e,s,i,n,r,o,a,l,c,h,d,p,u,_,m,f,g,y,v,w,S,b,x,P,T,C,N,k,V,E,$,O;if(this._state=this.hass.states[this._config.entity],!this._state)return z`
        <hui-warning>
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found","entity",this._config.entity)}
        </hui-warning>
      `;const A=null!==(e=null!==(t=this._config.unit)&&void 0!==t?t:this._state.attributes.unit_of_measurement)&&void 0!==e?e:"%",U=this._config.value?this._getTemplateOrValue(this._state,this._config.value):this._config.attribute?this._state.attributes[this._config.attribute]:this._state.state;var R,M=this._config.min,j=this._config.max,I=this._getTemplateOrValue(this._state,this._config.value_string);if("number"==typeof U)U>0&&U<1&&!M&&!j&&"%"==A&&(M=0,j=1),R=U;else{const t=parseFloat(U);null!=t&&(t>0&&t<1&&!M&&!j&&"%"==A&&(M=0,j=1),R=t)}M=null!=M?M:0,j=null!=j?j:100;const q=null!==(s=this._getTemplateOrValue(this._state,this._config.round_precision))&&void 0!==s?s:0,L=null!=R?Math.min((R-M)/(j-M),1):1,F=null==R||I,B=null!=R?"%"==A?this._roundValue((R-M)/(j-M)*100,q):this._roundValue(R,q):void 0;I=I?`${I}`:null!=B?`${B}`:`${U}`;const H=null!==(i=this._getTemplateOrValue(this._state,this._config.icon))&&void 0!==i?i:this._state.attributes.icon,W=null!==(n=this._getTemplateOrValue(this._state,this._config.size))&&void 0!==n?n:100,D=null!==(r=this._getTemplateOrValue(this._state,this._config.thickness))&&void 0!==r?r:4,J=null!==(o=this._getTemplateOrValue(this._state,this._config.icon_size))&&void 0!==o?o:46,G=null!==(a=this._getTemplateOrValue(this._state,this._config.font_size))&&void 0!==a?a:16,K=null!==(l=this._getTemplateOrValue(this._state,this._config.unit_font_size))&&void 0!==l?l:.75*G,Q=null!==(h=this._getTemplateOrValue(this._state,null===(c=this._config.colors)||void 0===c?void 0:c.progress))&&void 0!==h?h:"var(--paper-item-icon-color, #44739e)",X=null!==(p=this._getTemplateOrValue(this._state,null===(d=this._config.colors)||void 0===d?void 0:d.track))&&void 0!==p?p:"var(--divider-color, #e8e8e8)",Y=null!==(_=this._getTemplateOrValue(this._state,null===(u=this._config.colors)||void 0===u?void 0:u.text))&&void 0!==_?_:"var(--primary-text-color)",Z=null!==(f=this._getTemplateOrValue(this._state,null===(m=this._config.colors)||void 0===m?void 0:m.icon))&&void 0!==f?f:"var(--primary-text-color)",tt=Math.floor(25-D/2),et=2*tt*Math.PI,st=null!==(g=this._getTemplateOrValue(this._state,this._config.value_position))&&void 0!==g?g:"inside",it=(null!==(v=this._getTemplateOrValue(this._state,null===(y=this._config.show)||void 0===y?void 0:y.icon))&&void 0!==v?v:!R||"below"==st)&&H,nt=null!==(S=this._getTemplateOrValue(this._state,null===(w=this._config.show)||void 0===w?void 0:w.value))&&void 0!==S?S:!it||"below"==st,rt=null===(x=this._getTemplateOrValue(this._state,null===(b=this._config.show)||void 0===b?void 0:b.track))||void 0===x||x,ot=null===(T=this._getTemplateOrValue(this._state,null===(P=this._config.show)||void 0===P?void 0:P.progress))||void 0===T||T,at=null===(N=this._getTemplateOrValue(this._state,null===(C=this._config.show)||void 0===C?void 0:C.background))||void 0===N||N,lt=null===(V=this._getTemplateOrValue(this._state,null===(k=this._config.show)||void 0===k?void 0:k.shadow))||void 0===V||V,ct=null!==(E=this._getTemplateOrValue(this._state,this._config.animation_type))&&void 0!==E?E:"load",ht=null!==($=this._getTemplateOrValue(this._state,this._config.animation_time))&&void 0!==$?$:"0.8s",dt=this._config.tap_action&&"none"!==(null===(O=this._config.tap_action)||void 0===O?void 0:O.action);return z`
    <ha-card style="${at?"":"background: none; box-shadow: none;"} ${dt?"cursor: pointer;":""}"
    @click=${t=>{var e,s;return this._handleClick(t,null!==(s=null===(e=this._config.tap_action)||void 0===e?void 0:e.entity)&&void 0!==s?s:this._config.entity,dt)}}>
      <div class="wrapper" style="
      --animation-type: animate-${ct};
      --animation-time: ${ht};
      --stroke-circumference: ${et}; 
      --stroke-offset: ${et-L*et}; 
      --stroke-width: ${D}; 
      --progress-color: ${Q}; 
      --track-color: ${X}; 
      --text-color: ${Y}; 
      --icon-color: ${Z};
      --size: ${W}%;
      --font-size: ${G}px;
      --unit-font-size: ${K}px;">

        <div class="circle-wrapper">
          <svg viewBox="0 0 50 50" width="100%" height="100%">
            <circle class="track-bar" cx="25" cy="25" r="${tt}" fill="none" style="${rt?"":"display: none;"}"/>
            <circle class="progress-bar animate ${lt?"shadow":""}" cx="25" cy="25" r="${tt}" fill="none" style="${ot?"":"display: none;"}"/>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle" style="${nt&&"inside"==st?"":"display: none;"}">
              ${I}<tspan style="${F?"display: none;":""}">${A}</tspan>
            </text>
          </svg>
          ${it?z`
          <div class="icon-wrapper">
            <ha-icon id="progress-icon" icon="${H}" style="color: ${Z}; --mdc-icon-size: ${J}%;"></ha-icon>
          </div>`:""}
        </div>
        <svg viewBox="0 0 50 ${G}" class="text-below" style="${nt&&"below"==st?"":"display: none;"}">
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle">
              ${I}<tspan style="${F?"display: none;":""}">${A}</tspan>
            </text>
          </svg>
      </div>
    </ha-card>
    `}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","html",`'use strict'; ${e}`).call(this,this.hass.states,t,this.hass.user,this.hass,z)}catch(t){const s=e.length<=100?e.trim():`${e.trim().substring(0,98)}...`;throw t.message=`${t.name}: ${t.message} in '${s}'`,t.name="CircleProgressCardJSTemplateError",t}}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach((s=>{e[s]=this._getTemplateOrValue(t,e[s])})),e;const s=e.trim();return"[[["===s.substring(0,3)&&"]]]"===s.slice(-3)?this._evalTemplate(t,s.slice(3,-3)):e}_handleClick(t,e,s){s&&(t.stopPropagation(),((t,e,s,i,n)=>{let r;switch(i.action){case"more-info":r=new Event("hass-more-info",{composed:!0}),r.detail={entityId:n},t.dispatchEvent(r);break;case"navigate":if(!i.navigation_path)return;window.history.pushState(null,"",i.navigation_path),r=new Event("location-changed",{composed:!0}),r.detail={replace:!1},window.dispatchEvent(r);break;case"call-service":{if(!i.service)return;const[t,s]=i.service.split(".",2),n=Object.assign({},i.service_data);e.callService(t,s,n);break}case"url":if(!i.url)return;window.location.href=i.url;break;case"fire-dom-event":r=new Event("ll-custom",{composed:!0,bubbles:!0}),r.detail=i,t.dispatchEvent(r)}})(this,this.hass,this._config,this._config.tap_action,e.entity_id||e))}_roundValue(t,e){const s=Math.pow(10,e||0);return Math.round(t*s)/s}static get styles(){return X`
      .wrapper {
        padding: calc((100% - var(--size)) / 2);
      }
      .circle-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
      }
      circle {
        stroke-width: var(--stroke-width);
      }
      circle.track-bar {
        stroke: var(--track-color);
      }
      circle.progress-bar {
        stroke: var(--progress-color);
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        stroke-linecap: round;
        transition: all 0.5s ease-in-out;
        stroke-dasharray: var(--stroke-circumference);
        stroke-dashoffset: var(--stroke-offset);
      }
      circle.progress-bar.shadow {
        -webkit-filter: drop-shadow(0 0px 2px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 2px);
      }
      svg {
        overflow: visible
      }
      path,
      text,
      text tspan {
        fill: var(--text-color);
      }
      text {
        font-size: var(--font-size, 16px);
        alignment-baseline: central;
      }
      tspan {
        font-size: var(--unit-font-size, 12px);
        alignment-baseline: mathematical;
      }
      .text-below {
        margin-top: 10%;
      }
      @keyframes animate-load {
        0% {
          stroke-dashoffset: var(--stroke-circumference);
        }
        100% {
          stroke-dashoffset: var(--stroke-offset, 0);
        }
      }
      @keyframes animate-wrap {
        0% {
          stroke-dashoffset: var(--stroke-circumference);
          transform: rotate(270deg);
        }
        100% {
          stroke-dashoffset: 0;
          transform: rotate(90deg);
        }
      }
      circle.animate {
        animation: var(--animation-type, animate-load) var(--animationTime, 0.8s);
      }
      .icon-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
      }
      .icon-wrapper ha-icon {
        display: flex;
        justify-content: center;
      }
    `}}!function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);r>3&&o&&Object.defineProperty(e,s,o)}([(t,e)=>void 0!==e?((t,e,s)=>{e.constructor.createProperty(s,t)})(tt,t,e):J(tt,t)],st.prototype,"hass",void 0),customElements.get("circle-progress-card")||(customElements.define("circle-progress-card",st),console.info(`%cCIRCLE-PROGRESS-CARD ${et} IS INSTALLED`,"color: green; font-weight: bold",""));
