var P=Object.defineProperty,F=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var E=(e,t,r)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))D.call(t,r)&&E(e,r,t[r]);if(x)for(var r of x(t))G.call(t,r)&&E(e,r,t[r]);return e},d=(e,t)=>F(e,_(t));var j=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var p=(e,t,r)=>(j(e,t,"read from private field"),r?r.call(e):t.get(e)),k=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{j as A,s as H,r as i,Z as q,F as h,a as N,R as C,W as z,b as W,c as Y}from"./vendor.37bac7ef.js";const U=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};U();const a=A.exports.jsx,g=A.exports.jsxs,R=A.exports.Fragment,V=({code:e,status:t,onClick:r})=>a(X,{"data-code":e,onClick:()=>{r(e)},status:t,specialKey:e==="<ENT>"||e==="<BKSP>",children:$(e)}),$=e=>e==="<ENT>"?"ENTER":e==="<BKSP>"?"BK":e.toUpperCase(),X=H.button.withConfig({displayName:"KeyButton"})(["height:3.5rem;flex:",";margin:0;border:none;outline:none;border-radius:0.25rem;background-color:",";color:",";font-weight:bold;font-size:",";cursor:pointer;user-select:none;"],({specialKey:e})=>e?1.6:1,({status:e,theme:t})=>e?t.bgColor[e]:t.bgColor.INITIAL,({theme:e})=>e.textColor,({specialKey:e})=>e?"0.75rem":"1rem"),T=()=>{const e="animate"in document.body,t=i.exports.useCallback((r,o,n)=>{r&&r.animate&&r.animate(o,n)},[]);return[e,t]},Z=()=>{const e=q(),[t,r]=T();return i.exports.useCallback(o=>{if(t){const n=document.querySelector(`[aria-label=keyboard] button[data-code="${o}"]`);r(n,[{backgroundColor:e.bgColor.KEY_PRESS}],100)}},[r,t,e.bgColor.KEY_PRESS])},J=e=>{i.exports.useEffect(()=>{const t=r=>{const o=r.key.toLowerCase();r.altKey||r.ctrlKey||(o==="enter"?e("<ENT>"):o==="backspace"?e("<BKSP>"):Q(o)&&e(o))};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[e])},L={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},Q=e=>{const t=e.charCodeAt(0);return e.length===1&&L.a<=t&&t<=L.z},ee=()=>{"vibrate"in navigator&&navigator.vibrate(20)},te=()=>ee,re=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],ne=({keyMatchStatusMap:e,onKey:t})=>{const r=Z(),o=te(),n=i.exports.useCallback(s=>{t(s),r(s),o()},[t,r,o]);return J(n),a(h,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,width:"100%",children:re.map((s,c)=>a(oe,{rowIndex:c,keyRow:s,onKey:n,keyMatchStatusMap:e},c))})},oe=({rowIndex:e,keyRow:t,keyMatchStatusMap:r,onKey:o})=>g(h,{"aria-label":"key-row",gap:"0.25rem",center:!0,width:"100%",children:[e===1&&a(N,{flex:.5}),t.map(n=>a(V,{code:n,onClick:o,status:r[n]},n)),e===1&&a(N,{flex:.5})]}),se=(e,t)=>{const[,r]=T();i.exports.useEffect(()=>{t==="INVALID"&&r(e.current,[{transform:"translateX(0.5rem)"},{transform:"translateX(-0.5rem)"}],{iterations:4,direction:"alternate",duration:100})})},ae=(e,t)=>{const r=i.exports.useRef(0),[o,n]=T();i.exports.useEffect(()=>{if(o&&e.current)if(t.length===0)r.current=0;else if(t.length===r.current+1){const s=e.current.querySelector(`[aria-label=letter]:nth-child(${r.current+1})`);n(s,[{transform:"scale(1.1)"}],100),r.current+=1}else r.current-=1},[e,t,o,n])},I=i.exports.forwardRef(function({type:t,row:r},o){return a(h,{ref:o,gap:"0.5rem","aria-label":"guess-word","data-word-type":t,children:t==="accepted"?r.map((n,s)=>a(M,{"aria-label":"letter",status:n.matchStatus,children:n.key},s)):r.map((n,s)=>a(M,{"aria-label":"letter",$highlightBorder:t==="current"&&n!=="",children:n},s))})}),M=H(h).attrs({center:!0}).withConfig({displayName:"LetterTile"})(["height:3.5rem;width:3.5rem;border:2px solid ",";background-color:",";font-size:2rem;font-weight:bold;text-transform:uppercase;"],({$highlightBorder:e,status:t,theme:r})=>t?"transparent":e?r.borderColor.HIGHLIGHT:r.borderColor.INITIAL,({status:e,theme:t})=>e?t.bgColor[e]:void 0),O=5,ce=6,ie=({acceptedRows:e,currentRow:t,currentRowStatus:r})=>{const o=ce-e.length;return g(h,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:[a(le,{acceptedRows:e}),o>0&&g(R,{children:[a(ue,{currentRow:t,currentRowStatus:r}),a(de,{numberOfRows:o-1})]})]})},le=C.memo(function({acceptedRows:t}){return a(R,{children:t.map((r,o)=>a(I,{type:"accepted",row:r},o))})}),ue=({currentRow:e,currentRowStatus:t})=>{const r=i.exports.useRef(null);ae(r,e),se(r,t);const o=[...e,...new Array(O-e.length).fill("")];return a(I,{ref:r,type:"current",row:o})},de=C.memo(function({numberOfRows:t}){const r=Array.from({length:t},()=>new Array(O).fill(""));return a(R,{children:r.map((o,n)=>a(I,{type:"empty",row:o},n))})}),me=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],K=e=>me.includes(e),pe=()=>"angel",w=(e,t)=>{for(let r=0;r<e.length;r++)t(e[r],r)};var m;class he{constructor(t){k(this,m,new Map);w(t,r=>{this.increment(r)})}has(t){return p(this,m).has(t)&&this.get(t)!==0}get(t){var r;return(r=p(this,m).get(t))!=null?r:0}increment(t){this.has(t)?p(this,m).set(t,this.get(t)+1):p(this,m).set(t,1)}decrement(t){this.has(t)&&p(this,m).set(t,this.get(t)-1)}}m=new WeakMap;const fe=(e,t)=>{if(e.length!==t.length)throw new Error("chosenWord and guessWord should be of equal length");if(!K(e)||!K(t))return null;if(e===t)return new Array(e.length).fill("MATCH");const r=new he(e),o=[];return w(t,(n,s)=>{e[s]===n?(o[s]="MATCH",r.decrement(n)):o[s]="NO_MATCH"}),w(t,(n,s)=>{o[s]==="NO_MATCH"&&r.has(n)&&(o[s]="PARTIAL_MATCH",r.decrement(n))}),o},ge={gameOver:!1,acceptedRows:[],currentRow:[],keyStatusMap:{},currentRowStatus:"INITIAL"},be=(e,t)=>{const{currentRow:r,acceptedRows:o,keyStatusMap:n}=e,s=r.length,c=o.length,u=d(l({},e),{currentRowStatus:"IN_PROGRESS"});switch(t.type){case"BKSP":return s>0?d(l({},u),{currentRow:r.slice(0,-1)}):u;case"ENT":if(s===5){const f=r.join(""),b=fe(t.chosenWord,f);if(b){const S=b.map((v,B)=>({key:r[B],matchStatus:v})),y=d(l({},u),{acceptedRows:[...o,S],currentRow:[],currentRowStatus:"INITIAL",keyStatusMap:we(S,n)});return ye(b)?d(l({},y),{gameOver:!0}):c<5?y:d(l({},y),{gameOver:!0})}}return d(l({},u),{currentRowStatus:"INVALID"});case"LETTER":return r.length<5?d(l({},u),{currentRow:[...r,t.code]}):u}},ye=e=>e.every(t=>t==="MATCH"),we=(e,t)=>{const r={NO_MATCH:1,PARTIAL_MATCH:2,MATCH:3},o=(s,c)=>s==null?c:r[s]>r[c]?s:c,n=l({},t);for(const{key:s,matchStatus:c}of e)n[s]=o(n[s],c);return n},Ae=()=>{const e=i.exports.useMemo(()=>pe(),[]),[{gameOver:t,acceptedRows:r,currentRow:o,currentRowStatus:n,keyStatusMap:s},c]=i.exports.useReducer(be,ge),u=i.exports.useCallback(f=>{t||c(f==="<BKSP>"?{type:"BKSP"}:f==="<ENT>"?{type:"ENT",chosenWord:e}:{type:"LETTER",code:f})},[t,c,e]);return g(h,{"aria-label":"game",column:!0,height:"100%",alignItems:"center",justifyContent:"space-around",padding:"0 0.75rem",children:[a(ie,{acceptedRows:r,currentRow:o,currentRowStatus:n}),a(ne,{keyMatchStatusMap:s,onKey:u})]})},Ce={textColor:"#FFFFFF",borderColor:{INITIAL:"#3A3A3C",HIGHLIGHT:"#565758"},bgColor:{BODY:"#000000",INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B",KEY_PRESS:"#545556"}},Re=z(["html{font-family:system-ui;box-sizing:border-box;height:100%;overflow:hidden;}body{color:",";background-color:",";height:100%;overflow:hidden;margin:0;}.App{max-width:516px;margin:auto;}#root,.App{height:100%;}input,textarea,button,select,a{-webkit-tap-highlight-color:transparent;}"],e=>e.theme.textColor,e=>e.theme.bgColor.BODY),Te=()=>g(W,{theme:Ce,children:[a(Re,{}),a("main",{className:"App",children:a(Ae,{})})]});Y.render(a(C.StrictMode,{children:a(Te,{})}),document.getElementById("root"));
