var L=Object.defineProperty,O=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var T=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,u=(e,t)=>{for(var r in t||(t={}))B.call(t,r)&&T(e,r,t[r]);if(k)for(var r of k(t))F.call(t,r)&&T(e,r,t[r]);return e},d=(e,t)=>O(e,P(t));var H=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var h=(e,t,r)=>(H(e,t,"read from private field"),r?r.call(e):t.get(e)),S=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{j as w,s as v,r as m,Z as _,F as l,a as x,W as j,b as $,R as q,c as z}from"./vendor.4a92847d.js";const G=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}};G();const s=w.exports.jsx,f=w.exports.jsxs,A=w.exports.Fragment,D=({code:e,status:t,onClick:r})=>s(U,{"data-code":e,onClick:()=>{r(e)},status:t,specialKey:e==="<ENT>"||e==="<BKSP>",children:W(e)}),W=e=>e==="<ENT>"?"ENTER":e==="<BKSP>"?"BK":e.toUpperCase(),U=v.button`
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
`,V=()=>{const e=_();return m.exports.useCallback(t=>{if("animate"in document.body){const r=document.querySelector(`[aria-label=keyboard] button[data-code="${t}"]`);r&&r.animate([{backgroundColor:e.keyPressBgColor}],100)}},[e])},Z=e=>{m.exports.useEffect(()=>{const t=r=>{const a=r.key.toLowerCase();a==="enter"?e("<ENT>"):a==="backspace"?e("<BKSP>"):J(a)&&e(a)};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[e])},M={a:"a".charCodeAt(0),z:"z".charCodeAt(0)},J=e=>{const t=e.charCodeAt(0);return e.length===1&&M.a<=t&&t<=M.z},Q=()=>{"vibrate"in navigator&&navigator.vibrate(20)},X=()=>Q,Y=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["<ENT>","z","x","c","v","b","n","m","<BKSP>"]],ee=({keyMatchStatusMap:e,onKey:t})=>{const r=V(),a=X(),n=m.exports.useCallback(o=>{t(o),r(o),a()},[t,r,a]);return Z(n),s(l,{as:"section","aria-label":"keyboard",gap:"0.25rem",column:!0,width:"100%",children:Y.map((o,c)=>s(te,{rowIndex:c,keyRow:o,onKey:n,keyMatchStatusMap:e},c))})},te=({rowIndex:e,keyRow:t,keyMatchStatusMap:r,onKey:a})=>f(l,{"aria-label":"key-row",gap:"0.25rem",center:!0,width:"100%",children:[e===1&&s(x,{flex:.5}),t.map(n=>s(D,{code:n,onClick:a,status:r[n]},n)),e===1&&s(x,{flex:.5})]}),N=5,re=6,oe=({acceptedRows:e,currentRow:t})=>{const r=re-e.length;return f(l,{as:"section",column:!0,gap:"0.5rem","aria-label":"wordboard",children:[s(ne,{acceptedRows:e}),r>0&&f(A,{children:[s(ae,{currentRow:t}),s(se,{numberOfRows:r-1})]})]})},ne=({acceptedRows:e})=>s(A,{children:e.map((t,r)=>s(l,{gap:"0.5rem","aria-label":"guess-word","data-word-type":"accepted",children:t.map((a,n)=>s(C,{"aria-label":"letter",status:a.matchStatus,children:a.key},n))},r))}),ae=({currentRow:e})=>{const t=[...e,...new Array(N-e.length).fill("")];return s(l,{gap:"0.5rem","aria-label":"guess-word","data-word-type":"current",children:t.map((r,a)=>s(C,{"aria-label":"letter",children:r},a))})},se=({numberOfRows:e})=>{const t=Array.from({length:e},()=>new Array(N).fill(""));return s(A,{children:t.map((r,a)=>s(l,{gap:"0.5rem","aria-label":"guess-word","data-word-type":"empty",children:r.map((n,o)=>s(C,{"aria-label":"letter"},o))},a))})},C=v(l).attrs({center:!0})`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({theme:e})=>e.borderColor};
  background-color: ${({status:e,theme:t})=>e?t.matchStatus[e]:void 0};
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`,ce=["allow","angel","baton","beads","baths","basis","glean","nudge","nuked","ounce"],E=e=>ce.includes(e),ie=()=>"angel",y=(e,t)=>{for(let r=0;r<e.length;r++)t(e[r],r)};var i;class le{constructor(t){S(this,i,new Map);y(t,r=>{this.increment(r)})}has(t){return h(this,i).has(t)&&this.get(t)!==0}get(t){var r;return(r=h(this,i).get(t))!=null?r:0}increment(t){this.has(t)?h(this,i).set(t,this.get(t)+1):h(this,i).set(t,1)}decrement(t){this.has(t)&&h(this,i).set(t,this.get(t)-1)}}i=new WeakMap;const ue=(e,t)=>{if(e.length!==t.length)throw new Error("chosenWord and guessWord should be of equal length");if(!E(e)||!E(t))return null;if(e===t)return new Array(e.length).fill("MATCH");const r=new le(e),a=[];return y(t,(n,o)=>{e[o]===n?(a[o]="MATCH",r.decrement(n)):a[o]="NO_MATCH"}),y(t,(n,o)=>{a[o]==="NO_MATCH"&&r.has(n)&&(a[o]="PARTIAL_MATCH",r.decrement(n))}),a},de={gameOver:!1,acceptedRows:[],currentRow:[],keyStatusMap:{}},he=(e,t)=>{const{currentRow:r,acceptedRows:a,keyStatusMap:n}=e,o=r.length,c=a.length;switch(t.type){case"BKSP":return o>0?d(u({},e),{currentRow:r.slice(0,-1)}):e;case"ENT":if(o===5){const p=r.join(""),g=ue(t.chosenWord,p);if(g){const R=g.map((K,I)=>({key:r[I],matchStatus:K})),b=d(u({},e),{acceptedRows:[...a,R],currentRow:[],keyStatusMap:pe(R,n)});return me(g)?d(u({},b),{gameOver:!0}):c<5?b:d(u({},b),{gameOver:!0})}}return e;case"LETTER":return r.length<5?d(u({},e),{currentRow:[...r,t.code]}):e}},me=e=>e.every(t=>t==="MATCH"),pe=(e,t)=>{const r={IN_PROGRESS:1,NO_MATCH:2,PARTIAL_MATCH:3,MATCH:4},a=(o,c)=>o==null?c:r[o]>r[c]?o:c,n=u({},t);for(let{key:o,matchStatus:c}of e)n[o]=a(n[o],c);return n},fe=()=>{const e=m.exports.useMemo(()=>ie(),[]),[{gameOver:t,acceptedRows:r,currentRow:a,keyStatusMap:n},o]=m.exports.useReducer(he,de),c=m.exports.useCallback(p=>{t||o(p==="<BKSP>"?{type:"BKSP"}:p==="<ENT>"?{type:"ENT",chosenWord:e}:{type:"LETTER",code:p})},[t,o,e]);return f(l,{"aria-label":"game",column:!0,height:"100%",alignItems:"center",justifyContent:"space-around",padding:"0 0.75rem",children:[s(oe,{acceptedRows:r,currentRow:a}),s(ee,{keyMatchStatusMap:n,onKey:c})]})},ge={textColor:"#FFFFFF",bgColor:"#000000",borderColor:"#3A3A3C",keyPressBgColor:"#545556",matchStatus:{INITIAL:"#818384",MATCH:"#538D4E",NO_MATCH:"#3A3A3C",PARTIAL_MATCH:"#B59F3B",IN_PROGRESS:void 0}},be=j`
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
`,ye=()=>f($,{theme:ge,children:[s(be,{}),s("main",{className:"App",children:s(fe,{})})]});q.render(s(z.StrictMode,{children:s(ye,{})}),document.getElementById("root"));
