import{Aa as P,U as i,X as e,Y as p,f as a,g as r,i as m,na as s,oa as c,ra as f,sa as d,ta as l,ua as h,va as u,wa as g,xa as C,ya as D,za as j}from"./chunk-ZMPZ2IZI.js";var S=(o,t)=>{let x=r(p),n=r(i);return console.log("adminGuard"),x.role==="ADMIN_ROLE"?!0:(n.navigateByUrl("/dashboard"),!1)};var G=[{path:"",component:s,data:{title:"Dashboard"}},{path:"progress",component:c,data:{title:"Progress"}},{path:"grafica1",component:f,data:{title:"Gr\xE1ficas"}},{path:"search/:term",component:P,data:{title:"Searchs"}},{path:"account-settings",component:d,data:{title:"Settings"}},{path:"promises",component:l,data:{title:"Promises"}},{path:"rxjs",component:h,data:{title:"Rxjs"}},{path:"profile",component:u,data:{title:"Profile"}},{path:"users",canActivate:[S],component:g,data:{title:"Users maintenance"}},{path:"hospitals",component:D,data:{title:"Hospitals maintenance"}},{path:"doctors",component:C,data:{title:"Doctors maintenance"}},{path:"doctor/:id",component:j,data:{title:"Doctors maintenance"}}],K=(()=>{let t=class t{};t.\u0275fac=function(A){return new(A||t)},t.\u0275mod=m({type:t}),t.\u0275inj=a({imports:[e.forChild(G),e]});let o=t;return o})();export{K as ChildRoutesModule};