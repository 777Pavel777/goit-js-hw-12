import{a as I,S as $,i as q}from"./assets/vendor-527658dd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function v(r,a,s){const{key:i,baseUrl:e,typeImg:t,orientationImg:l,resultSearch:u}={key:"42662363-4df458c081fe5322c3af06117",baseUrl:"https://pixabay.com/api/",typeImg:"photo",orientationImg:"horizontal",resultSearch:!0},g=`${e}?key=${i}&q=${a}&image_type=${t}&orientation=${l}&safesearch=${u}`,{data:h}=await I.get(g,{params:{key:i,page:r,per_page:s,q:a}});return h}function S(r,a){const s=r.map(({webformatURL:i,largeImageURL:e,tags:t,likes:l,views:u,comments:g,downloads:h})=>`<li class="image-search">
        <a href="${e}">
        <img class="gallery-img" src="${i}" alt="${t}"/>
        </a>
        <ul class="img-info">
          <li class="img-items">
            <p class="img-value"><span class="img-subtitle">Likes</span>${l}</p>
            <p class="img-value"><span class="img-subtitle">Views</span>${u}</p>
            <p class="img-value"><span class="img-subtitle">Comments</span>${g}</p>
            <p class="img-value"><span class="img-subtitle">Downloads</span>${h}</p>
          </li>
        </ul>
      </li>`).join("");a.insertAdjacentHTML("beforeend",s)}const E="/goit-js-hw-12/assets/error-1e41ecdc.svg",f=document.querySelector(".gallery-list"),L=document.querySelector("input"),b=document.querySelector("form"),p=document.querySelector(".form-container div"),o=document.querySelector(".load-more"),d=document.querySelector(".loading"),m=15;let n=1,y;const w=new $(".gallery-list a",{captionsData:"alt",captionDelay:250});function c(r,a,s){q.show({iconUrl:s,messageColor:"#ffffff",message:r,backgroundColor:a,position:"topRight",messageSize:16,layout:2,maxWidth:380,theme:"dark"})}b.addEventListener("submit",P);async function P(r){if(r.preventDefault(),n=1,y=L.value,f.innerHTML="",L.value.trim()===""){o.classList.add("hidden"),c("Sorry, input is emty. Please try again!","#FFA000");return}try{const s=await v(n,y,m);if(s.total===0){o.classList.add("hidden"),c("Sorry, there are no images matching your search query. Please try again!","#EF4040",E),p.classList.remove("loader");return}if(S(s.hits,f),Math.floor(s.totalHits/m)===n){d.classList.remove("loader"),showErrorCustom("You have more 500 images.Please try later");return}if(p.classList.remove("loader"),o.classList.remove("hidden"),s.totalHits<n*m)return o.classList.add("hidden"),c("We're sorry, but you've reached the end of search results.","#0071BD");w.refresh()}catch{c("Something went wrong.Please try later")}b.reset()}o.addEventListener("click",M);async function M(){n+=1,d.classList.add("loader");try{const r=await v(n,y,m);if(S(r.hits,f),Math.floor(r.totalHits/m)===n){d.classList.remove("loader"),showErrorCustom("You have more 500 images.Please try later");return}if(p.classList.remove("loader"),d.classList.remove("loader"),o.classList.remove("hidden"),r.hits.length>=r.totalHits)return o.classList.add("hidden"),c("We're sorry, but you've reached the end of search results.","#0071BD");window.scrollBy({top:580,behavior:"smooth"}),w.refresh()}catch{d.classList.remove("loader"),o.classList.add("hidden"),c("Something went wrong.Please try later")}}
//# sourceMappingURL=commonHelpers.js.map