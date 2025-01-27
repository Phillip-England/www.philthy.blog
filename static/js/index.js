class TwMarkdown extends HTMLElement{constructor(){super()}connectedCallback(){const e=Array.from(this.children).map(e=>e.cloneNode(!0));this.innerHTML="",e.forEach(this.styleElement),e.forEach(e=>this.appendChild(e))}styleElement=e=>{const t=e.nodeName.toLowerCase();switch(t){case"pre":e.classList.add("custom-scroll","p-4","text-sm","overflow-x-auto","rounded","mb-4");break;case"h1":e.classList.add("font-bold","text-3xl","pb-4");break;case"h2":e.classList.add("font-bold","text-2xl","pb-4","pt-4","border-t","border-gray-200","dark:border-gray-800");break;case"h3":e.classList.add("font-bold","text-xl","mt-6","mb-4");break;case"p":let n=e.parentElement,t=null;n!=null&&(t=n.nodeName.toLowerCase()),t==null&&e.classList.add("text-sm","leading-6","mb-4"),t=="blockquote"&&e.classList.add("text-sm","leading-6");break;case"ul":e.classList.add("pl-6","mb-4","list-disc");break;case"ol":e.classList.add("pl-6","mb-4","list-decimal");break;case"li":e.classList.add("mb-2","text-sm");break;case"blockquote":e.classList.add("bg-gray-200","dark:bg-dracula-background","w-fit","p-4","rounded","italic","text-gray-800","dark:text-gray-200","mb-4");break;case"code":e.parentElement.nodeName.toLowerCase()!=="pre"&&e.classList.add("font-mono","px-1","rounded","text-sm","border","border-gray-200","dark:border-gray-800");break;case"hr":e.classList.add("border-t","border-gray-300","dark:border-gray-800","my-4");break;case"a":e.classList.add("text-blue-800","underline","visited:text-purple-500");break;case"img":e.classList.add("max-w-full","h-auto","rounded","my-4");break}Array.from(e.children).forEach(this.styleElement)}}class RandomBeads extends HTMLElement{connectedCallback(){this.classList.add("flex","flex-row","gap-2");const n=this.getAttribute("count"),t=parseInt(n);if(isNaN(t)){console.error('<random-beads> requires an integer in the "count" attribute');return}this.beads=[];let e=4;for(let o=0;o<t;o++){const n=document.createElement("div");n.classList.add("rounded-full","transition-colors","duration-1000");const s=this.generateRandomColor();n.style.height=`${e}px`,n.style.width=`${e}px`,n.style.backgroundColor=`rgb(${s.r}, ${s.g}, ${s.b})`,this.appendChild(n),this.beads.push(n),e+=1}this.colorIntervalId=setInterval(()=>this.transitionBeadColors(),2e3)}generateRandomColor(){return{r:Math.floor(Math.random()*256),g:Math.floor(Math.random()*256),b:Math.floor(Math.random()*256)}}transitionBeadColors(){this.beads.forEach(e=>{const t=this.generateRandomColor();e.style.backgroundColor=`rgb(${t.r}, ${t.g}, ${t.b})`})}disconnectedCallback(){this.colorIntervalId&&clearInterval(this.colorIntervalId)}}class TheBlinker extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const n=parseInt(this.getAttribute("rate")||"1000"),e=document.createElement("span");e.textContent=this.textContent||"_";const t=document.createElement("style");t.textContent=`
		  @keyframes blink {
			0%, 100% { opacity: 1; }
			50% { opacity: 0; }
		  }
		  span {
			animation: blink ${n}ms step-end infinite;
		  }
		`,this.shadowRoot.appendChild(t),this.shadowRoot.appendChild(e)}}class TitleLinks extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.getAttribute("target"),n=this.getAttribute("link-class"),s=this.getAttribute("link-wrapper-class"),o=n.split(" "),i=s.split(" "),a=parseInt(this.getAttribute("offset"),10)||0,t=document.querySelector(e);if(!t){console.error(`Target element "${e}" not found.`);return}const r=t.querySelectorAll("h1, h2, h3, h4, h5, h6");r.forEach(e=>{if(e.id){const n=document.createElement("div");i.forEach(e=>{n.classList.add(e)});const t=document.createElement("a");o.forEach(e=>{t.classList.add(e)}),t.classList.add("title-link"),t.href=`#${e.id}`,t.textContent=e.textContent,n.appendChild(t),this.appendChild(n)}});const c=document.createElement("style");this.appendChild(c),this.addEventListener("click",e=>{if(e.target.tagName==="A"){e.preventDefault();const t=e.target.getAttribute("href").substring(1);history.pushState({},document.title,window.location.pathname+"#"+t);const n=document.getElementById(t);if(n){const e=n.getBoundingClientRect().top+window.pageYOffset+a;window.scrollTo({top:e,behavior:"smooth"})}}})}}class CustomScroll extends HTMLElement{constructor(){super()}connectedCallback(){this.innerHTML=`
			  <style>
				  .custom-scroll::-webkit-scrollbar {
					  width: 8px;
					  height: 8px;
				  }
				  .custom-scroll::-webkit-scrollbar-thumb {
					  background-color: #4B5563; /* Gray-600 */
					  border-radius: 4px;
				  }
				  .custom-scroll::-webkit-scrollbar-track {
					  background-color: #1F2937; /* Gray-800 */
				  }
				  /* Custom CSS to hide the scrollbar */
				  .scrollbar-hidden::-webkit-scrollbar {
					display: none;
				  }
  
				  .scrollbar-hidden {
					-ms-overflow-style: none;  /* For Internet Explorer and Edge */
					scrollbar-width: none;     /* For Firefox */
				  }
			  </style>
		  `}}class HashTitleScroll extends HTMLElement{connectedCallback(){let s=parseInt(this.getAttribute("offset"),10)||0,o=window.location.href,e=o.split("/"),t=e[e.length-1];if(!t.includes("#"))return;let i=t.split("#")[1],n=document.getElementById(i);if(!n)return;const a=n.getBoundingClientRect().top+window.scrollY+s;window.scrollTo({top:a,behavior:"smooth"})}}class BibleQuote extends HTMLElement{constructor(){super(),this.title=this.getAttribute("title")||"Verse",this.translation=this.getAttribute("translation")||"Translation",this.verse=this.innerHTML.trim()||"Verse text goes here."}connectedCallback(){this.render()}render(){this.innerHTML=`
        <div class="bible-quote p-4 border border-gray-300 dark:border-dracula-background rounded mb-4 text-gray-800 dark:text-gray-400">
          <div class="bible-quote-header mb-4">
            <h2 class="text-lg">${this.title}</h2>
            <p class="text-xs italic">(${this.translation})</p>
          </div>
          <div class="bible-quote-body">
            <p class="text-sm">${this.verse}</p>
          </div>
        </div>
      `}}window.addEventListener("DOMContentLoaded",()=>{customElements.define("the-blinker",TheBlinker),customElements.define("tw-markdown",TwMarkdown),customElements.define("random-beads",RandomBeads),customElements.define("title-links",TitleLinks),customElements.define("hash-title-scroll",HashTitleScroll),customElements.define("custom-scroll",CustomScroll),customElements.define("bible-quote",BibleQuote)})