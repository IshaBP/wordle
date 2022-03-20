var L=Object.defineProperty;var C=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var w=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,S=(e,t)=>{for(var r in t||(t={}))K.call(t,r)&&w(e,r,t[r]);if(C)for(var r of C(t))E.call(t,r)&&w(e,r,t[r]);return e};var P=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var m=(e,t,r)=>(P(e,t,"read from private field"),r?r.call(e):t.get(e)),x=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{j as M,s as R,Z as O,r as d,F as h,a as T,W as B,b as F,R as G,c as H}from"./vendor.4a92847d.js";const _=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}};_();const a=M.exports.jsx,I=M.exports.jsxs,j=({code:e,status:t,onClick:r})=>a(q,{"data-code":e,onClick:()=>{r(e)},status:t,specialKey:e==="<ENT>"||e==="<BKSP>",children:$(e)}),$=e=>e==="<ENT>"?"ENTER":e==="<BKSP>"?"BK":e.toUpperCase(),q=R.button`
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
`,z=()=>{const e=O();return t=>{if("animate"in document.body){const r=document.querySelector(`[aria-label=keyboard] button[data-code="${t}"]`);r&&r.animate([{backgroundColor:e.keyPressBgColor}],100)}}},D=e=>{d.exports.useEffect(()=>{const t=r=>{const s=r.key.toLowerCase();s==="enter"?e("<ENT>"):s==="backspace"?e("<BKSP>"):W(s)&&e(s)};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[e])},k={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},W=e=>{const t=e.charCodeAt(0);return e.length===1&&k.a<=t&&t<=k.z},U=()=>()=>{"vibrate"in navigator&&navigator.vibrate(25)},V=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],Z=({keyMatchStatusMap:e,onKey:t})=>{const r=z(),s=U(),o=n=>{t(n),r(n),s()};return D(o),a(h,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,width:"100%",children:V.map((n,i)=>a(J,{rowIndex:i,keyRow:n,onKey:o,keyMatchStatusMap:e},i))})},J=({rowIndex:e,keyRow:t,keyMatchStatusMap:r,onKey:s})=>I(h,{"aria-label":"key-row",gap:"0.25rem",center:!0,width:"100%",children:[e===1&&a(T,{flex:.5}),t.map(o=>a(j,{code:o,onClick:s,status:r[o]},o)),e===1&&a(T,{flex:.5})]}),Q=({game:e,latestRowStatus:t})=>a(h,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:e.map((r,s)=>a(h,{"aria-label":"guess-word",gap:"0.5rem",children:r.map((o,n)=>a(X,{"aria-label":"letter",status:o.matchStatus,children:o.matchStatus==="INITIAL"?"":o.key.toUpperCase()},n))},s))}),X=R(h).attrs({center:!0})`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({theme:e})=>e.borderColor};
  background-color: ${({status:e,theme:t})=>e==="INITIAL"?void 0:t.matchStatus[e]};
  font-size: 2rem;
  font-weight: bold;
`,Y=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],N=e=>Y.includes(e),ee=()=>"angel",A=(e,t)=>{for(let r=0;r<e.length;r++)t(e[r],r)};var c;class te{constructor(t){x(this,c,new Map);A(t,r=>{this.increment(r)})}has(t){return m(this,c).has(t)&&this.get(t)!==0}get(t){var r;return(r=m(this,c).get(t))!=null?r:0}increment(t){this.has(t)?m(this,c).set(t,this.get(t)+1):m(this,c).set(t,1)}decrement(t){this.has(t)&&m(this,c).set(t,this.get(t)-1)}}c=new WeakMap;const re=(e,t)=>{if(e.length!==t.length)throw new Error("chosenWord and guessWord should be of equal length");if(!N(e)||!N(t))return null;if(e===t)return new Array(e.length).fill("MATCH");const r=new te(e),s=[];return A(t,(o,n)=>{e[n]===o?(s[n]="MATCH",r.decrement(o)):s[n]="NO_MATCH"}),A(t,(o,n)=>{s[n]==="NO_MATCH"&&r.has(o)&&(s[n]="PARTIAL_MATCH",r.decrement(o))}),s},oe=()=>{const e=d.exports.useMemo(()=>ee(),[]),t=d.exports.useRef(!1),[r,s]=d.exports.useState(se),[o,n]=d.exports.useState({}),[i,v]=d.exports.useState(0),[l,b]=d.exports.useState(0);return I(h,{"aria-label":"game",column:!0,height:"100%",alignItems:"center",justifyContent:"space-around",padding:"0 0.75rem",children:[a(Q,{game:r,latestRowStatus:"IN_PROGRESS"}),a(Z,{keyMatchStatusMap:o,onKey:y=>{if(!t.current){if(y==="<BKSP>"){if(l>0){const u=[...r];u[i][l-1]={key:void 0,matchStatus:"INITIAL"},s(u),b(l-1)}}else if(y==="<ENT>"){if(l===5){const u=r[i].map(f=>f.key).join(""),p=re(e,u);if(p){const f=[...r];for(let g=0;g<p.length;g++)f[i][g].matchStatus=p[g];s(f),n(ae(f[i],o)),ne(p)?t.current=!0:i<5?(v(i+1),b(0)):t.current=!0}}}else if(l<5){const u=[...r];u[i][l]={key:y,matchStatus:"IN_PROGRESS"},s(u),b(l+1)}}}})]})},ne=e=>e.every(t=>t==="MATCH"),se=()=>new Array(6).fill(null).map(()=>new Array(5).fill(null).map(()=>({key:void 0,matchStatus:"INITIAL"}))),ae=(e,t)=>{const r={INITIAL:0,IN_PROGRESS:1,NO_MATCH:2,PARTIAL_MATCH:3,MATCH:4},s=(o,n)=>o==null?n:r[o]>r[n]?o:n;for(let{key:o,matchStatus:n}of e)o&&(t[o]=s(t[o],n));return S({},t)},ie={textColor:"#FFFFFF",bgColor:"#000000",borderColor:"#3A3A3C",keyPressBgColor:"#545556",matchStatus:{INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B",IN_PROGRESS:void 0}},ce=B`
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
`,le=()=>I(F,{theme:ie,children:[a(ce,{}),a("main",{className:"App",children:a(oe,{})})]});G.render(a(H.StrictMode,{children:a(le,{})}),document.getElementById("root"));
