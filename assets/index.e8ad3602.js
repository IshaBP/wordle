var E=Object.defineProperty;var C=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var w=(e,t,r)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,x=(e,t)=>{for(var r in t||(t={}))P.call(t,r)&&w(e,r,t[r]);if(C)for(var r of C(t))v.call(t,r)&&w(e,r,t[r]);return e};var F=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var m=(e,t,r)=>(F(e,t,"read from private field"),r?r.call(e):t.get(e)),S=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{j as k,s as L,r as d,F as h,a as T,W as K,b as O,R as H,c as B}from"./vendor.d2dc90b0.js";const G=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}};G();const a=k.exports.jsx,I=k.exports.jsxs,_=({code:e,status:t,onClick:r})=>a($,{onClick:()=>{r(e)},status:t,specialKey:e==="<ENT>"||e==="<BKSP>",children:j(e)}),j=e=>e==="<ENT>"?"ENTER":e==="<BKSP>"?"BK":e.toUpperCase(),$=L.button`
  height: 3rem;
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
`,z=e=>{d.exports.useEffect(()=>{const t=r=>{const s=r.key.toLowerCase();s==="enter"?e("<ENT>"):s==="backspace"?e("<BKSP>"):q(s)&&e(s)};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[e])},N={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},q=e=>{const t=e.charCodeAt(0);return e.length===1&&N.a<=t&&t<=N.z},D=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],U=({keyMatchStatusMap:e,onKey:t})=>(z(t),a(h,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,width:"100%",children:D.map((r,s)=>a(W,{rowIndex:s,keyRow:r,onKey:t,keyMatchStatusMap:e},s))})),W=({rowIndex:e,keyRow:t,keyMatchStatusMap:r,onKey:s})=>I(h,{"aria-label":"key-row",gap:"0.25rem",center:!0,width:"100%",children:[e===1&&a(T,{flex:.5}),t.map(o=>a(_,{code:o,onClick:s,status:r[o]},o)),e===1&&a(T,{flex:.5})]}),V=({game:e,latestRowStatus:t})=>a(h,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:e.map((r,s)=>a(h,{"aria-label":"guess-word",gap:"0.5rem",children:r.map((o,n)=>a(J,{"aria-label":"letter",status:o.matchStatus,children:o.matchStatus==="INITIAL"?"":o.key.toUpperCase()},n))},s))}),J=L(h).attrs({center:!0})`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({theme:e})=>e.borderColor};
  background-color: ${({status:e,theme:t})=>e==="INITIAL"?void 0:t.matchStatus[e]};
  font-size: 2rem;
  font-weight: bold;
`,Q=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],M=e=>Q.includes(e),X=()=>"angel",b=(e,t)=>{for(let r=0;r<e.length;r++)t(e[r],r)};var c;class Y{constructor(t){S(this,c,new Map);b(t,r=>{this.increment(r)})}has(t){return m(this,c).has(t)&&this.get(t)!==0}get(t){var r;return(r=m(this,c).get(t))!=null?r:0}increment(t){this.has(t)?m(this,c).set(t,this.get(t)+1):m(this,c).set(t,1)}decrement(t){this.has(t)&&m(this,c).set(t,this.get(t)-1)}}c=new WeakMap;const Z=(e,t)=>{if(e.length!==t.length)throw new Error("chosenWord and guessWord should be of equal length");if(!M(e)||!M(t))return null;if(e===t)return new Array(e.length).fill("MATCH");const r=new Y(e),s=[];return b(t,(o,n)=>{e[n]===o?(s[n]="MATCH",r.decrement(o)):s[n]="NO_MATCH"}),b(t,(o,n)=>{s[n]==="NO_MATCH"&&r.has(o)&&(s[n]="PARTIAL_MATCH",r.decrement(o))}),s},ee=()=>{const e=d.exports.useMemo(()=>X(),[]),t=d.exports.useRef(!1),[r,s]=d.exports.useState(re),[o,n]=d.exports.useState({}),[i,R]=d.exports.useState(0),[l,y]=d.exports.useState(0);return I(h,{"aria-label":"game",column:!0,height:"100%",alignItems:"center",justifyContent:"space-around",padding:"0 0.75rem",children:[a(V,{game:r,latestRowStatus:"IN_PROGRESS"}),a(U,{keyMatchStatusMap:o,onKey:A=>{if(!t.current){if(A==="<BKSP>"){if(l>0){const u=[...r];u[i][l-1]={key:void 0,matchStatus:"INITIAL"},s(u),y(l-1)}}else if(A==="<ENT>"){if(l===5){const u=r[i].map(f=>f.key).join(""),p=Z(e,u);if(p){const f=[...r];for(let g=0;g<p.length;g++)f[i][g].matchStatus=p[g];s(f),n(oe(f[i],o)),te(p)?t.current=!0:i<5?(R(i+1),y(0)):t.current=!0}}}else if(l<5){const u=[...r];u[i][l]={key:A,matchStatus:"IN_PROGRESS"},s(u),y(l+1)}}}})]})},te=e=>e.every(t=>t==="MATCH"),re=()=>new Array(6).fill(null).map(()=>new Array(5).fill(null).map(()=>({key:void 0,matchStatus:"INITIAL"}))),oe=(e,t)=>{const r={INITIAL:0,IN_PROGRESS:1,NO_MATCH:2,PARTIAL_MATCH:3,MATCH:4},s=(o,n)=>o==null?n:r[o]>r[n]?o:n;for(let{key:o,matchStatus:n}of e)o&&(t[o]=s(t[o],n));return x({},t)},ne={textColor:"#FFFFFF",bgColor:"#000000",borderColor:"#3A3A3C",matchStatus:{INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B"}},se=K`
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
`,ae=()=>I(O,{theme:ne,children:[a(se,{}),a("main",{className:"App",children:a(ee,{})})]});H.render(a(B.StrictMode,{children:a(ae,{})}),document.getElementById("root"));
