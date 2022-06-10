(()=>{"use strict";var t=function(){function t(t){this.cells=t,this.highlightedCellIndex=null}return t.prototype.fillBoard=function(t){for(var e=0;e<81;e++)t[e]?(this.cells[e].textContent=t[e],this.cells[e].classList.add("preFilledCell")):(this.cells[e].textContent="",this.cells[e].classList.remove("preFilledCell"))},t.prototype.isPrefilled=function(t){return this.cells[t].classList.contains("preFilledCell")},t.prototype.highlightCell=function(t){this.cells[t].classList.add("highlightedCell"),this.highlightedCellIndex=t},t.prototype.markInvalid=function(t){this.cells[t].classList.add("invalid")},t.prototype.removeHighlight=function(){null!==this.highlightedCellIndex&&(this.cells[this.highlightedCellIndex].classList.remove("highlightedCell"),this.cells[this.highlightedCellIndex].classList.remove("invalid"))},t.prototype.updateValue=function(t,e){if(this.isPrefilled(t))throw new Error("tried to update prefilled cell: ".concat(t));this.cells[t].textContent=e},t.prototype.removeValue=function(t,e){if(this.isPrefilled(t))throw new Error("tried to update prefilled cell: ".concat(t));this.cells[t].textContent=""},t}();const e=t;var n=function(){function t(t,e,n,r){void 0===n&&(n=0),void 0===r&&(r=0),this.time=60*n+r,this.flag=null,this.minuteDis=t,this.secondDis=e}return t.prototype.start=function(){var t=this;this.flag||(this.flag=setInterval((function(){t.time+=1;var e=t.getTime();t.minuteDis.textContent="".concat(e.minutes,"M"),t.secondDis.textContent="".concat(e.seconds,"S")}),1e3))},t.prototype.pause=function(){this.flag&&(clearInterval(this.flag),this.flag=null)},t.prototype.reset=function(){this.pause(),this.time=0,this.minuteDis.textContent="".concat(0,"M"),this.secondDis.textContent="".concat(0,"S")},t.prototype.getTime=function(){return{minutes:Math.floor(this.time/60),seconds:this.time%60}},t}();const r=n;var i=function(t,e){var n=Math.random();return n>.5?0:Math.floor(n*(e-t)+t)},o=function(t){var e=l(t);if(null===e)return!0;for(var n=1;n<10;n++)if(d(t,e,n)){if(t[e]=n,o(t))return!0;t[e]=0}return!1},l=function(t){for(var e=0;e<81;e++)if(0===t[e])return e;return null},s=function(t,e,n){for(var r=e;r%9>0;)if(t[r-=1]===n)return!0;for(r=e;r%9<8;)if(t[r+=1]===n)return!0;return!1},a=function(t,e,n){for(var r=e;r>0;)if(t[r-=9]===n)return!0;for(r=e;r<81;)if(t[r+=9]===n)return!0;return!1},u=function(t,e,n){for(var r=[],i=e;i%3>0&&i>=0;)i-=1,r.push(t[i]);for(i=e;i%3<2&&i<81;)i+=1,r.push(t[i]);for(i=e%3==0?e-7:e%3==1?e-8:e-9;i>=0&&c(i)===c(e);){for(;i>=0&&c(i)===c(e);)r.push(t[i]),i-=1;i-=6}for(i=e%3==0?e+9:e%3==1?e+8:e+7;i<81&&c(i)===c(e);){for(;i<81&&c(i)===c(e);)r.push(t[i]),i+=1;i+=6}return r.includes(n)},c=function(t){return 3*Math.floor(t/27)+Math.floor(t/3%3)},d=function(t,e,n){return!s(t,e,n)&&!a(t,e,n)&&!u(t,e,n)},f=function(t,e){return!(s(t,e,t[e])||a(t,e,t[e])||u(t,e,t[e]))};const h=o;var p=function(){function t(t){void 0===t&&(t=[]),this.board=t.length?t:this.generateBoard()}return t.prototype.updateValue=function(t,e){this.board[t]=e},t.prototype.isFilled=function(){for(var t=0;t<81;t++)if(0===this.board[t])return!1;return!0},t.prototype.isCellValid=function(t){return f(this.board,t)},t.prototype.isBoardValid=function(){return function(t){for(var e=0;e<81;e++)if(!f(t,e))return!1;return!0}(this.board)},t.prototype.solve=function(t){void 0===t&&(t=this.board),h(t)},t.prototype.generateBoard=function(){for(var t=new Array(81).fill(0),e=[],n=[],r=0;r<5;r++){for(var o=i(0,81);e.includes(o);)o=i(1,9);e.push(o)}for(r=0;r<5;r++){for(var l=i(1,9);n.includes(l);)l=i(1,9);n.push(l)}for(r=0;r<5;r++)t[e[r]]=n[r];for(this.solve(t),r=0;r<81;r++)Math.random()>.7&&(t[r]=0);return t},t.prototype.generateRandomBoard=function(){for(var t=0;t<81;t++)this.board[t]=i(0,9);return this.board},t}();const v=p;var g=document.querySelector("#minute"),m=document.querySelector("#second"),C=document.querySelectorAll(".cell"),y=document.querySelectorAll(".numberInput"),b=null,x=null;"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js");var w=new r(g,m);w.start();var L=new e(C),V=new v;L.fillBoard(V.board),C.forEach((function(t,e){t.addEventListener("click",(function(n){L.removeHighlight(),b=null,x=null,L.isPrefilled(e)||(L.highlightCell(e),b=t,x=e)}))})),y.forEach((function(t){t.addEventListener("click",(function(e){e.preventDefault(),b&&(V.updateValue(x,"X"===t.textContent?0:Number(t.textContent)),L.updateValue(x,"X"===t.textContent?null:t.textContent),V.isFilled()&&V.isBoardValid()&&(alert("Solved!"),w.pause()))}))})),document.querySelector("#reset").addEventListener("click",(function(){for(var t=0;t<81;t++)C[t].classList.contains("preFilledCell")||(L.updateValue(t,null),V.updateValue(t,0))})),document.querySelector("#validate").addEventListener("click",(function(){for(var t=0;t<81;t++)C[t].classList.contains("preFilledCell")||0===V.board[t]||V.isCellValid(t)||L.markInvalid(t)})),document.querySelector("#new").addEventListener("click",(function(){V.board=V.generateBoard(),L.fillBoard(V.board),w.reset(),w.start()})),window.enableDebugging=function(){window.logic=V,window.board=L}})();