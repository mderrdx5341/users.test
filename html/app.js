(()=>{"use strict";const t=function(){function t(t,e,n,r){this._id=t,this._name=e,this._email=n,this._address=r}return t.prototype.id=function(){return this._id},t.prototype.name=function(){return this._name},t.prototype.email=function(){return this._email},t.prototype.address=function(){return this._address},t}(),e=function(){function t(){}return t.trigger=function(t){void 0!==this._subscribers[t.name()]&&this._subscribers[t.name()].forEach((function(e){e.invoke(t.name(),t.data())}))},t.subscribe=function(t,e){void 0!==this._subscribers[e]?this._subscribers[e].push(t):this._subscribers[e]=[t]},t._subscribers={},t}(),n=function(){function t(t,e){this._name=t,this._eventData=e}return t.prototype.name=function(){return this._name},t.prototype.data=function(){return this._eventData},t}(),r=function(){function t(t,e){void 0===e&&(e=0),this._data=t,this._id=e}return t.prototype.data=function(){return this._data},t.prototype.id=function(){return this._id},t}(),i=function(){function t(t){this._user=t}return t.prototype.buildHtmlElement=function(){var t=document.createElement("div");return t.innerHTML="\n\t\t\t\t".concat(this._user.id(),"\n\t\t\t\t").concat(this._user.name(),"\n\t\t\t\t").concat(this._user.email(),"\n\t\t\t\t").concat(this._user.address(),'\n\t\t\t\t<input type="checkbox" class="delete" name="userDelete" value="').concat(this._user.id(),'">\n\t\t\t'),t.appendChild(this._buildLinkEdit()),t},t.prototype._buildLinkEdit=function(){var t=this,i=document.createElement("a");return i.innerHTML="Edit",i.setAttribute("href","/"),i.addEventListener("click",(function(i){i.preventDefault(),e.trigger(new n("changePanel",new r("EditUser",t._user.id())))})),i},t}();const o=function(){function i(){this._form=document.createElement("form")}return i.prototype.buildHtmlElement=function(){var e=this;return this._form.innerHTML='\n\t\t\t\t<div>Name: <input class="name" required name="name"></div>\n\t\t\t\t<div>Email: <input class="email" required name="email"></div>\n\t\t\t\t<div>Address: <input class="address" required name="address"></div>\n\t\t\t\t<div><input type="submit"></div>\n\t\t\t',this._form.appendChild(this._buildLinkToList()),this._form.addEventListener("submit",(function(n){n.preventDefault();var r=e._form.querySelector(".name"),i=e._form.querySelector(".email"),o=e._form.querySelector(".address"),s=new t(0,r.value,i.value,o.value);e._createUser(s)})),this._form},i.prototype._buildLinkToList=function(){var t=document.createElement("a");return t.innerHTML="to List",t.setAttribute("href","/"),t.addEventListener("click",(function(t){t.preventDefault(),e.trigger(new n("changePanel",new r("UserList")))})),t},i.prototype._createUser=function(t){return i=this,o=void 0,a=function(){var i,o;return function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,(function(s){switch(s.label){case 0:return i={name:t.name(),email:t.email(),address:t.address()},[4,fetch("/users/create/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})];case 1:return(o=s.sent()).ok?[4,o.json()]:[3,3];case 2:return"not_auth"===s.sent().message?(e.trigger(new n("changePanel",new r("Auth"))),[2]):(alert("User added"),[3,4]);case 3:alert("Error HTTP: "+o.status),s.label=4;case 4:return[2]}}))},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{u(a.next(t))}catch(t){e(t)}}function r(t){try{u(a.throw(t))}catch(t){e(t)}}function u(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}u((a=a.apply(i,o||[])).next())}));var i,o,s,a},i}();const s=function(){function i(t){this._user=t,this._form=document.createElement("form")}return i.prototype.buildHtmlElement=function(){var e=this;return this._form.innerHTML='\n\t\t\t\t<input type="hidden" class="id" name="id" value="'.concat(this._user.id(),'">\n\t\t\t\t<div>Name: <input class="name" required name="name" value="').concat(this._user.name(),'"></div>\n\t\t\t\t<div>Email: <input class="email" required name="email" value="').concat(this._user.email(),'"></div>\n\t\t\t\t<div>Address: <input class="address" required name="address" value="').concat(this._user.address(),'"></div>\n\t\t\t\t<div><input type="submit"></div>\n\t\t\t'),this._form.appendChild(this._buildLinkToList()),this._form.addEventListener("submit",(function(n){n.preventDefault();var r=e._form.querySelector(".id"),i=e._form.querySelector(".name"),o=e._form.querySelector(".email"),s=e._form.querySelector(".address"),a=new t(parseInt(r.value),i.value,o.value,s.value);e._updateUser(a)})),this._form},i.prototype._buildLinkToList=function(){var t=document.createElement("a");return t.innerHTML="to List",t.setAttribute("href","/"),t.addEventListener("click",(function(t){t.preventDefault(),e.trigger(new n("changePanel",new r("UserList")))})),t},i.prototype._updateUser=function(t){return i=this,o=void 0,a=function(){var i,o;return function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,(function(s){switch(s.label){case 0:return i={id:t.id(),name:t.name(),email:t.email(),address:t.address()},[4,fetch("/users/update/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})];case 1:return(o=s.sent()).ok?[4,o.json()]:[3,3];case 2:return"not_auth"===s.sent().message?(e.trigger(new n("changePanel",new r("Auth"))),[2]):(alert("User updated"),[3,4]);case 3:alert("Error HTTP: "+o.status),s.label=4;case 4:return[2]}}))},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{u(a.next(t))}catch(t){e(t)}}function r(t){try{u(a.throw(t))}catch(t){e(t)}}function u(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}u((a=a.apply(i,o||[])).next())}));var i,o,s,a},i}();const a=function(){function t(){this._form=document.createElement("form")}return t.prototype.buildHtmlElement=function(){var t=this;return this._form.innerHTML='\n\t\t\t\t<div>Login: <input class="login" required name="name"></div>\n\t\t\t\t<div>Password: <input class="password" type="password" required name="email"></div>\n\t\t\t\t<div><input type="submit"></div>\n\t\t\t',this._form.addEventListener("submit",(function(e){e.preventDefault();var n=t._form.querySelector(".login"),r=t._form.querySelector(".password");t._auth(n.value,r.value)})),this._form},t.prototype._auth=function(t,i){return o=this,s=void 0,u=function(){var o,s;return function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,(function(a){switch(a.label){case 0:return o={login:t,password:i},[4,fetch("/admin/auth/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})];case 1:return(s=a.sent()).ok?[4,s.json()]:[3,3];case 2:return"not_auth"!==a.sent().message?(f.auth=!0,e.trigger(new n("changePanel",new r("UserList")))):alert("error Login or Password"),[3,4];case 3:alert("Error HTTP: "+s.status),a.label=4;case 4:return[2]}}))},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{i(u.next(t))}catch(t){e(t)}}function r(t){try{i(u.throw(t))}catch(t){e(t)}}function i(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}i((u=u.apply(o,s||[])).next())}));var o,s,a,u},t}();var u=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}u((r=r.apply(t,e||[])).next())}))},c=function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};const l=function(){function l(){this._html=document.createElement("div"),this._html.className="user_panel",this._template="list"}return l.prototype.switchToListUsers=function(){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this._clearHtml(),[4,this._listUsers()];case 1:return t.sent(),[2]}}))}))},l.prototype.switchToAddUser=function(){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this._clearHtml(),[4,this._addUser()];case 1:return t.sent(),[2]}}))}))},l.prototype.switchToEditUser=function(t){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return this._clearHtml(),[4,this._editUser(t)];case 1:return e.sent(),[2]}}))}))},l.prototype.switchToAuthAdmin=function(){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this._clearHtml(),[4,this._adminAuth()];case 1:return t.sent(),[2]}}))}))},l.prototype.buildHtmlElement=function(){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,this._html]}))}))},l.prototype._clearHtml=function(){this._html.innerHTML=""},l.prototype._listUsers=function(){return u(this,void 0,void 0,(function(){var t,e=this;return c(this,(function(n){switch(n.label){case 0:return[4,this._getUsers()];case 1:return t=n.sent(),console.log(f.auth),0===t.length&&!1===f.auth||(t.forEach((function(t){var n=new i(t);e._html.appendChild(n.buildHtmlElement())})),this._html.appendChild(this._buildHtmlButtonAdd()),this._html.appendChild(this._buildHtmlButtonDelete())),[2]}}))}))},l.prototype._addUser=function(){return u(this,void 0,void 0,(function(){var t;return c(this,(function(e){return t=new o,this._html.appendChild(t.buildHtmlElement()),[2]}))}))},l.prototype._editUser=function(t){return u(this,void 0,void 0,(function(){var e,n;return c(this,(function(r){switch(r.label){case 0:return[4,this._getUser(t)];case 1:return e=r.sent(),n=new s(e),this._html.appendChild(n.buildHtmlElement()),[2]}}))}))},l.prototype._adminAuth=function(){return u(this,void 0,void 0,(function(){var t;return c(this,(function(e){return t=new a,this._html.appendChild(t.buildHtmlElement()),[2]}))}))},l.prototype._getUser=function(i){return u(this,void 0,void 0,(function(){var o,s,a,u;return c(this,(function(c){switch(c.label){case 0:return o={id:i},[4,fetch("/users/get-by-id/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})];case 1:return(a=c.sent()).ok?[4,a.json()]:[3,3];case 2:return"not_auth"===(u=c.sent()).message?(e.trigger(new n("changePanel",new r("Auth"))),[2]):(s=new t(u.id,u.name,u.email,u.address),[3,4]);case 3:alert("Error HTTP: "+a.status),c.label=4;case 4:return[2,s]}}))}))},l.prototype._getUsers=function(){return u(this,void 0,void 0,(function(){var i,o,s;return c(this,(function(a){switch(a.label){case 0:return i=[],[4,fetch("/users/")];case 1:return(o=a.sent()).ok?[4,o.json()]:[3,3];case 2:return"not_auth"===(s=a.sent()).message?(e.trigger(new n("changePanel",new r("Auth"))),[2,i]):(s.forEach((function(e){var n=new t(e.id,e.name,e.email,e.address);i.push(n)})),[3,4]);case 3:alert("Error HTTP: "+o.status),a.label=4;case 4:return[2,i]}}))}))},l.prototype._buildHtmlButtonAdd=function(){var t=document.createElement("button");return t.innerHTML="Add",t.addEventListener("click",(function(t){t.preventDefault(),e.trigger(new n("changePanel",new r("AddUser")))})),t},l.prototype._buildHtmlButtonDelete=function(){var t=this,e=document.createElement("button");return e.innerHTML="Delete",e.addEventListener("click",(function(e){t._deleteUsers()})),e},l.prototype._deleteUsers=function(){return u(this,void 0,void 0,(function(){var t,i,o;return c(this,(function(s){switch(s.label){case 0:return 0!==(t=document.querySelectorAll(".delete:checked")).length?[3,1]:[2];case 1:return i=[],t.forEach((function(t){i.push(parseInt(t.value))})),[4,fetch("/users/delete/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})];case 2:return(o=s.sent()).ok?[4,o.json()]:[3,4];case 3:return"not_auth"===s.sent().message?(e.trigger(new n("changePanel",new r("Auth"))),[2]):(e.trigger(new n("changePanel",new r("UserList"))),[3,5]);case 4:alert("Error HTTP: "+o.status),s.label=5;case 5:return[2]}}))}))},l}();var d=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}u((r=r.apply(t,e||[])).next())}))},h=function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};const f=function(){function t(t){e.subscribe(this,"changePanel"),this._appContainer=document.querySelector(t),this._usersPanel=new l}return t.prototype.run=function(){return d(this,void 0,void 0,(function(){var t,e;return h(this,(function(n){switch(n.label){case 0:return[4,this._usersPanel.switchToListUsers()];case 1:return n.sent(),e=(t=this._appContainer).appendChild,[4,this._usersPanel.buildHtmlElement()];case 2:return e.apply(t,[n.sent()]),[2]}}))}))},t.prototype.invoke=function(t,e){return d(this,void 0,void 0,(function(){return h(this,(function(t){switch(t.label){case 0:switch(e.data()){case"UserList":return[3,1];case"AddUser":return[3,3];case"EditUser":return[3,5];case"Auth":return[3,7]}return[3,9];case 1:return[4,this._usersPanel.switchToListUsers()];case 2:case 4:case 6:case 8:return t.sent(),[3,9];case 3:return[4,this._usersPanel.switchToAddUser()];case 5:return[4,this._usersPanel.switchToEditUser(e.id())];case 7:return[4,this._usersPanel.switchToAuthAdmin()];case 9:return[2]}}))}))},t.auth=!1,t}();window.onload=function(){return new f("#app").run()}})();
//# sourceMappingURL=app.js.map