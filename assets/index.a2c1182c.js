var R=Object.defineProperty;var I=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var C=(t,e,r)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,S=(t,e)=>{for(var r in e||(e={}))E.call(e,r)&&C(t,r,e[r]);if(I)for(var r of I(e))O.call(e,r)&&C(t,r,e[r]);return t};var P=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)};var m=(t,e,r)=>(P(t,e,"read from private field"),r?r.call(t):e.get(t)),T=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)};import{j as M,s as N,r as d,F as h,W as v,a as F,R as H,b as G}from"./vendor.691008b8.js";const K=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}};K();const a=M.exports.jsx,k=M.exports.jsxs,B=({code:t,status:e,onClick:r})=>a(j,{onClick:()=>{r(t)},status:e,children:_(t)}),_=t=>t==="<ENT>"?"ENTER":t==="<BKSP>"?"BK":t.toUpperCase(),j=N.button`
  height: 3rem;
  min-width: 3rem;
  margin: 0;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: ${({status:t,theme:e})=>t?e.matchStatus[t]:e.matchStatus.INITIAL};
  color: ${({theme:t})=>t.textColor};
  font-weight: bold;
  font-size: 1rem;
`,z=t=>{d.exports.useEffect(()=>{const e=r=>{const n=r.key.toLowerCase();n==="enter"?t("<ENT>"):n==="backspace"?t("<BKSP>"):$(n)&&t(n)};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[t])},w={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},$=t=>{const e=t.charCodeAt(0);return t.length===1&&w.a<=e&&e<=w.z},q=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],D=({keyMatchStatusMap:t,onKey:e})=>(z(e),a(h,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,children:q.map((r,n)=>a(U,{keyRow:r,onKey:e,keyMatchStatusMap:t},n))})),U=({keyRow:t,keyMatchStatusMap:e,onKey:r})=>a(h,{"aria-label":"key-row",gap:"0.25rem",center:!0,children:t.map(n=>a(B,{code:n,onClick:r,status:e[n]},n))}),W=({game:t,latestRowStatus:e})=>a(h,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:t.map((r,n)=>a(h,{"aria-label":"guess-word",gap:"0.5rem",children:r.map((o,s)=>a(V,{"aria-label":"letter",status:o.matchStatus,children:o.matchStatus==="INITIAL"?"":o.key.toUpperCase()},s))},n))}),V=N(h).attrs({center:!0})`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({theme:t})=>t.borderColor};
  background-color: ${({status:t,theme:e})=>t==="INITIAL"?void 0:e.matchStatus[t]};
  font-size: 2rem;
  font-weight: bold;
`,J=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],x=t=>J.includes(t),Q=()=>"angel",A=(t,e)=>{for(let r=0;r<t.length;r++)e(t[r],r)};var i;class X{constructor(e){T(this,i,new Map);A(e,r=>{this.increment(r)})}has(e){return m(this,i).has(e)&&this.get(e)!==0}get(e){var r;return(r=m(this,i).get(e))!=null?r:0}increment(e){this.has(e)?m(this,i).set(e,this.get(e)+1):m(this,i).set(e,1)}decrement(e){this.has(e)&&m(this,i).set(e,this.get(e)-1)}}i=new WeakMap;const Y=(t,e)=>{if(t.length!==e.length)throw new Error("chosenWord and guessWord should be of equal length");if(!x(t)||!x(e))return null;if(t===e)return new Array(t.length).fill("MATCH");const r=new X(t),n=[];return A(e,(o,s)=>{t[s]===o?(n[s]="MATCH",r.decrement(o)):n[s]="NO_MATCH"}),A(e,(o,s)=>{n[s]==="NO_MATCH"&&r.has(o)&&(n[s]="PARTIAL_MATCH",r.decrement(o))}),n},Z=()=>{const t=d.exports.useMemo(()=>Q(),[]),e=d.exports.useRef(!1),[r,n]=d.exports.useState(te),[o,s]=d.exports.useState({}),[c,L]=d.exports.useState(0),[l,y]=d.exports.useState(0);return k(h,{"aria-label":"game",column:!0,height:"100vh",alignItems:"center",justifyContent:"space-around",children:[a(W,{game:r,latestRowStatus:"IN_PROGRESS"}),a(D,{keyMatchStatusMap:o,onKey:b=>{if(!e.current){if(b==="<BKSP>"){if(l>0){const u=[...r];u[c][l-1]={key:void 0,matchStatus:"INITIAL"},n(u),y(l-1)}}else if(b==="<ENT>"){if(l===5){const u=r[c].map(f=>f.key).join(""),p=Y(t,u);if(p){const f=[...r];for(let g=0;g<p.length;g++)f[c][g].matchStatus=p[g];n(f),s(re(f[c],o)),ee(p)?e.current=!0:c<5?(L(c+1),y(0)):e.current=!0}}}else if(l<5){const u=[...r];u[c][l]={key:b,matchStatus:"IN_PROGRESS"},n(u),y(l+1)}}}})]})},ee=t=>t.every(e=>e==="MATCH"),te=()=>new Array(6).fill(null).map(()=>new Array(5).fill(null).map(()=>({key:void 0,matchStatus:"INITIAL"}))),re=(t,e)=>{const r={INITIAL:0,IN_PROGRESS:1,NO_MATCH:2,PARTIAL_MATCH:3,MATCH:4},n=(o,s)=>o==null?s:r[o]>r[s]?o:s;for(let{key:o,matchStatus:s}of t)o&&(e[o]=n(e[o],s));return S({},e)},oe={textColor:"#FFFFFF",bgColor:"#000000",borderColor:"#3A3A3C",matchStatus:{INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B"}},ne=v`
  html {
    font-family: system-ui;
    box-sizing: border-box;
  }

  body {
    color: ${t=>t.theme.textColor};
    background-color: ${t=>t.theme.bgColor};
    margin: 0;
  }
`,se=()=>k(F,{theme:oe,children:[a(ne,{}),a("main",{className:"App",children:a(Z,{})})]});H.render(a(G.StrictMode,{children:a(se,{})}),document.getElementById("root"));
