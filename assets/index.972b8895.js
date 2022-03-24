var O=Object.defineProperty,P=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var T=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))F.call(t,r)&&T(e,r,t[r]);if(k)for(var r of k(t))H.call(t,r)&&T(e,r,t[r]);return e},u=(e,t)=>P(e,B(t));var _=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var d=(e,t,r)=>(_(e,t,"read from private field"),r?r.call(e):t.get(e)),S=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{j as w,s as N,r as h,Z as j,F as m,a as x,W as $,b as q,R as z,c as G}from"./vendor.4a92847d.js";const D=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}};D();const a=w.exports.jsx,f=w.exports.jsxs,A=w.exports.Fragment,W=({code:e,status:t,onClick:r})=>a(V,{"data-code":e,onClick:()=>{r(e)},status:t,specialKey:e==="<ENT>"||e==="<BKSP>",children:U(e)}),U=e=>e==="<ENT>"?"ENTER":e==="<BKSP>"?"BK":e.toUpperCase(),V=N.button`
  height: 3.5rem;
  flex: ${({specialKey:e})=>e?1.6:1};
  margin: 0;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: ${({status:e,theme:t})=>e?t.matchStatus[e]:t.matchStatus.INITIAL};
  color: ${({theme:e})=>e.textColor};
  font-weight: bold;
  font-size: ${({specialKey:e})=>e?"0.75rem":"1rem"};
  cursor: pointer;
  user-select: none;
`,Z=()=>{const e=j();return h.exports.useCallback(t=>{if("animate"in document.body){const r=document.querySelector(`[aria-label=keyboard] button[data-code="${t}"]`);r&&r.animate([{backgroundColor:e.keyPressBgColor}],100)}},[e])},J=e=>{h.exports.useEffect(()=>{const t=r=>{const s=r.key.toLowerCase();s==="enter"?e("<ENT>"):s==="backspace"?e("<BKSP>"):Q(s)&&e(s)};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[e])},M={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},Q=e=>{const t=e.charCodeAt(0);return e.length===1&&M.a<=t&&t<=M.z},X=()=>{"vibrate"in navigator&&navigator.vibrate(20)},Y=()=>X,ee=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],te=({keyMatchStatusMap:e,onKey:t})=>{const r=Z(),s=Y(),n=h.exports.useCallback(o=>{t(o),r(o),s()},[t,r,s]);return J(n),a(m,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,width:"100%",children:ee.map((o,c)=>a(re,{rowIndex:c,keyRow:o,onKey:n,keyMatchStatusMap:e},c))})},re=({rowIndex:e,keyRow:t,keyMatchStatusMap:r,onKey:s})=>f(m,{"aria-label":"key-row",gap:"0.25rem",center:!0,width:"100%",children:[e===1&&a(x,{flex:.5}),t.map(n=>a(W,{code:n,onClick:s,status:r[n]},n)),e===1&&a(x,{flex:.5})]}),C=({type:e,row:t})=>a(m,{gap:"0.5rem","aria-label":"guess-word","data-word-type":e,children:e==="accepted"?t.map((r,s)=>a(E,{"aria-label":"letter",status:r.matchStatus,children:r.key},s)):t.map((r,s)=>a(E,{"aria-label":"letter",children:r},s))}),E=N(m).attrs({center:!0})`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({theme:e})=>e.borderColor};
  background-color: ${({status:e,theme:t})=>e?t.matchStatus[e]:void 0};
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`,K=5,oe=6,ne=({acceptedRows:e,currentRow:t})=>{const r=oe-e.length;return f(m,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:[a(se,{acceptedRows:e}),r>0&&f(A,{children:[a(ae,{currentRow:t}),a(ce,{numberOfRows:r-1})]})]})},se=({acceptedRows:e})=>a(A,{children:e.map((t,r)=>a(C,{type:"accepted",row:t},r))}),ae=({currentRow:e})=>{const t=[...e,...new Array(K-e.length).fill("")];return a(C,{type:"current",row:t})},ce=({numberOfRows:e})=>{const t=Array.from({length:e},()=>new Array(K).fill(""));return a(A,{children:t.map((r,s)=>a(C,{type:"empty",row:r},s))})},ie=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],v=e=>ie.includes(e),le=()=>"angel",b=(e,t)=>{for(let r=0;r<e.length;r++)t(e[r],r)};var i;class ue{constructor(t){S(this,i,new Map);b(t,r=>{this.increment(r)})}has(t){return d(this,i).has(t)&&this.get(t)!==0}get(t){var r;return(r=d(this,i).get(t))!=null?r:0}increment(t){this.has(t)?d(this,i).set(t,this.get(t)+1):d(this,i).set(t,1)}decrement(t){this.has(t)&&d(this,i).set(t,this.get(t)-1)}}i=new WeakMap;const de=(e,t)=>{if(e.length!==t.length)throw new Error("chosenWord and guessWord should be of equal length");if(!v(e)||!v(t))return null;if(e===t)return new Array(e.length).fill("MATCH");const r=new ue(e),s=[];return b(t,(n,o)=>{e[o]===n?(s[o]="MATCH",r.decrement(n)):s[o]="NO_MATCH"}),b(t,(n,o)=>{s[o]==="NO_MATCH"&&r.has(n)&&(s[o]="PARTIAL_MATCH",r.decrement(n))}),s},he={gameOver:!1,acceptedRows:[],currentRow:[],keyStatusMap:{}},me=(e,t)=>{const{currentRow:r,acceptedRows:s,keyStatusMap:n}=e,o=r.length,c=s.length;switch(t.type){case"BKSP":return o>0?u(l({},e),{currentRow:r.slice(0,-1)}):e;case"ENT":if(o===5){const p=r.join(""),g=de(t.chosenWord,p);if(g){const R=g.map((I,L)=>({key:r[L],matchStatus:I})),y=u(l({},e),{acceptedRows:[...s,R],currentRow:[],keyStatusMap:fe(R,n)});return pe(g)?u(l({},y),{gameOver:!0}):c<5?y:u(l({},y),{gameOver:!0})}}return e;case"LETTER":return r.length<5?u(l({},e),{currentRow:[...r,t.code]}):e}},pe=e=>e.every(t=>t==="MATCH"),fe=(e,t)=>{const r={IN_PROGRESS:1,NO_MATCH:2,PARTIAL_MATCH:3,MATCH:4},s=(o,c)=>o==null?c:r[o]>r[c]?o:c,n=l({},t);for(let{key:o,matchStatus:c}of e)n[o]=s(n[o],c);return n},ge=()=>{const e=h.exports.useMemo(()=>le(),[]),[{gameOver:t,acceptedRows:r,currentRow:s,keyStatusMap:n},o]=h.exports.useReducer(me,he),c=h.exports.useCallback(p=>{t||o(p==="<BKSP>"?{type:"BKSP"}:p==="<ENT>"?{type:"ENT",chosenWord:e}:{type:"LETTER",code:p})},[t,o,e]);return f(m,{"aria-label":"game",column:!0,height:"100%",alignItems:"center",justifyContent:"space-around",padding:"0 0.75rem",children:[a(ne,{acceptedRows:r,currentRow:s}),a(te,{keyMatchStatusMap:n,onKey:c})]})},ye={textColor:"#FFFFFF",bgColor:"#000000",borderColor:"#3A3A3C",keyPressBgColor:"#545556",matchStatus:{INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B",IN_PROGRESS:void 0}},be=$`
  html {
    font-family: system-ui;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }

  body {
    color: ${e=>e.theme.textColor};
    background-color: ${e=>e.theme.bgColor};
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .App {
    max-width: 516px;
    margin: auto;
  }

  #root, .App {
    height: 100%;
  }

  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: transparent; // https://stackoverflow.com/questions/45049873/how-to-remove-the-blue-highlight-of-button-on-mobile
  }
`,we=()=>f(q,{theme:ye,children:[a(be,{}),a("main",{className:"App",children:a(ge,{})})]});z.render(a(G.StrictMode,{children:a(we,{})}),document.getElementById("root"));
