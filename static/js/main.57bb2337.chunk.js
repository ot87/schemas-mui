(this.webpackJsonpschemas=this.webpackJsonpschemas||[]).push([[0],[,,,,function(e,t,a){e.exports={plate:"Plate_plate__6E6ju",greenPlate:"Plate_greenPlate__2zV_9",goldPlate:"Plate_goldPlate__2qd3L",redPlate:"Plate_redPlate__3pckl",clickedPlate:"Plate_clickedPlate__uPfJ9",disabledPlate:"Plate_disabledPlate__25yZh",toggledPlate:"Plate_toggledPlate__3Oemj",greenTheme:"Plate_greenTheme__17YCM",goldTheme:"Plate_goldTheme__1zvtx",redTheme:"Plate_redTheme__2S6OT"}},,,,,,,,function(e,t,a){e.exports={card:"Card_card__2Yh1O",goldCard:"Card_goldCard__3ubRv",redCard:"Card_redCard__1mKA6",clicked:"Card_clicked__JyUaG",cardName:"Card_cardName__Io2pk",cardContent:"Card_cardContent__3CPJu"}},,,function(e,t,a){e.exports={schemaForm:"SchemaForm_schemaForm__ZSOQT",stickyWrapper:"SchemaForm_stickyWrapper__2zrdq",schemaBar:"SchemaForm_schemaBar__58k4K",schema:"SchemaForm_schema__1jhBp"}},,,function(e,t,a){e.exports={header:"Header_header__XyDSV",stickyHeader:"Header_stickyHeader__3OD_w",headerList:"Header_headerList__2_W6H",headerPanel:"Header_headerPanel__MtB3F"}},,function(e,t,a){e.exports={items:"SchemaFormItems_items__3Mzdw",itemsRow:"SchemaFormItems_itemsRow__2r-WJ",remove:"SchemaFormItems_remove__1pGIb",clickedItemsRow:"SchemaFormItems_clickedItemsRow__YDDPG"}},,,,function(e,t,a){e.exports={schema:"Schema_schema__3twNs",items:"Schema_items__EED5a",itemsRow:"Schema_itemsRow__HhJYQ"}},,,,,function(e,t,a){e.exports={board:"SchemasBoard_board__1vukw"}},,,,function(e,t,a){e.exports={schemasList:"SchemasList_schemasList__1I2lw"}},function(e,t,a){e.exports={schemasPanel:"SchemasPanel_schemasPanel__29TxM"}},function(e,t,a){e.exports={content:"Content_content__3ZyJB"}},function(e,t,a){e.exports={item:"Item_item__1Uhav"}},,function(e,t,a){e.exports={error:"FormField_error__BhTLT"}},function(e,t,a){e.exports={schemaFormItemsControls:"SchemaFormItemsControls_schemaFormItemsControls__2My1o"}},,function(e,t,a){e.exports={schemaButtons:"SchemaFormButtons_schemaButtons__1x5xa"}},,,function(e,t,a){e.exports=a(57)},,,,,,,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(21),r=a.n(i),l=a(6),m=(a(54),a(14)),s=(a(55),a(2)),o=a(5),d=a.n(o),u=a(18),h=a.n(u),f=a(4),_=a.n(f),p=function(e){var t,a,n=e.text,i=e.colorTheme,r=e.isClicked,l=e.isToggled,m=e.isDisabled,o=e.onClick,u=(t={},Object(s.a)(t,_.a.greenPlate,"green"===i),Object(s.a)(t,_.a.goldPlate,"gold"===i),Object(s.a)(t,_.a.redPlate,"red"===i),Object(s.a)(t,_.a.plate,-1===["green","gold","red"].indexOf(i)),t);m?(u[_.a.disabledPlate]=!0,o=null):(r&&(o=null),Object.assign(u,(a={},Object(s.a)(a,_.a.clickedPlate,r),Object(s.a)(a,_.a.toggledPlate,!r&&l),Object(s.a)(a,_.a.greenTheme,r&&"green"===i),Object(s.a)(a,_.a.goldTheme,(r||l)&&"gold"===i),Object(s.a)(a,_.a.redTheme,(r||l)&&"red"===i),a)));return c.a.createElement("div",{role:"button",className:d()(u),onClick:o},n)},E=a(33),v=a.n(E),b=a(10),C="SHOW",k="ADD",S="EDIT",y="DELETE",O=function(e){return{type:"ui/SELECT_SCHEMA",payload:{id:e}}},g=function(e){return{type:"ui/SET_MODE",payload:{mode:e}}},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{selectedSchemaId:null,mode:C},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ui/SELECT_SCHEMA":return Object(b.a)(Object(b.a)({},e),{},{selectedSchemaId:t.payload.id});case"ui/SET_MODE":return Object(b.a)(Object(b.a)({},e),{},{mode:t.payload.mode});default:return e}},I=a(11),x=a.n(I),j=a(23),D=a(17),P=a(28),w={key:null,init:function(e){this.key=e},saveData:function(e){localStorage.setItem(this.key,JSON.stringify(e))},loadData:function(){return JSON.parse(localStorage.getItem(this.key))||{schemas:[]}},addSchema:function(e){var t=this.loadData();return e.schema.id=t.schemas.length?t.schemas[t.schemas.length-1].id+1:1,t.schemas.push(e.schema),this.saveData(t),Promise.resolve({data:t.schemas[t.schemas.length-1]})},updateSchema:function(e){var t=this.loadData(),a=t.schemas.findIndex((function(t){return t.id===e.schema.id}));return t.schemas[a]=e.schema,this.saveData(t),Promise.resolve({data:t.schemas[a]})},deleteSchema:function(e){var t=this.loadData();return t.schemas=t.schemas.filter((function(t){return t.id!==e.id})),this.saveData(t),Promise.resolve()}},N=function(e){return{type:"schemas/ADD_SCHEMA",payload:{schema:e}}},R=function(e){return{type:"schemas/UPDATE_SCHEMA",payload:{schema:e}}},A=function(e){return{type:"schemas/DELETE_SCHEMA",payload:{id:e}}},M=Object(P.a)((function(e){return e.schemas}),(function(e){return e.map((function(e){return{id:e.id,name:e.name}}))})),F=Object(P.a)((function(e){return e.schemas}),(function(e){return e.length})),q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"schemas/ADD_SCHEMA":return[].concat(Object(D.a)(e),[t.payload.schema]);case"schemas/UPDATE_SCHEMA":return e.map((function(e){return e.id===t.payload.schema.id?t.payload.schema:e}));case"schemas/DELETE_SCHEMA":return e.filter((function(e){return e.id!==t.payload.id}));default:return e}},H=Object(l.b)((function(e){return{schemas:M(e),selectedSchemaId:e.ui.selectedSchemaId}}),{selectSchema:O})((function(e){var t=e.schemas,a=e.selectedSchemaId,n=e.selectSchema;return c.a.createElement("div",{className:v.a.schemasList},t.map((function(e){return c.a.createElement(p,{key:e.id,text:e.name,isClicked:e.id===a,onClick:function(){return n(e.id)}})})))})),Q=a(34),B=a.n(Q),L=Object(l.b)((function(e){return{mode:e.ui.mode,schemasCount:F(e),selectedSchemaId:e.ui.selectedSchemaId}}),{setMode:g})((function(e){var t=e.mode,a=e.schemasCount,n=e.selectedSchemaId,i=e.setMode,r=t===k,l=t===S,m=t===y,s=function(e){i(!l&&!m||t!==e||n?e:C)},o=l&&n?{isClicked:l}:{isToggled:l},d=m&&n?{isClicked:m}:{isToggled:m};return c.a.createElement("div",{className:B.a.schemasPanel},c.a.createElement(p,{text:"Add",colorTheme:"green",isClicked:r,isDisabled:n&&(l||m),onClick:function(){return i(k)}}),a?c.a.createElement(p,Object.assign({text:"Edit",colorTheme:"gold"},o,{isDisabled:r||n&&m,onClick:function(){return s(S)}})):null,a?c.a.createElement(p,Object.assign({text:"Delete",colorTheme:"red"},d,{isDisabled:r||n&&l,onClick:function(){return s(y)}})):null)})),J=Object(l.b)((function(e){return{selectedSchemaId:e.ui.selectedSchemaId,mode:e.ui.mode}}),{selectSchema:O})((function(e){var t,a=e.selectedSchemaId,n=e.mode,i=e.selectSchema,r=e.isSchemasClicked,l=e.setIsSchemasClicked,m=a&&n===C;return c.a.createElement("header",{className:d()((t={},Object(s.a)(t,h.a.header,!0),Object(s.a)(t,h.a.headerList,m),Object(s.a)(t,h.a.headerPanel,!m&&r),Object(s.a)(t,h.a.stickyHeader,!(n===k||a&&n===S)),t))},m?c.a.createElement(p,{text:"Back",onClick:function(){return i(null)}}):c.a.createElement(p,{text:"Schemas",isClicked:r,onClick:function(){return l(!0)}}),m?c.a.createElement(H,null):r?c.a.createElement(L,null):c.a.createElement("div",null))})),V=a(35),W=a.n(V),U=a(29),z=a.n(U),Y=a(12),G=a.n(Y),X=function(e){var t,a=e.name,n=e.content,i=e.colorTheme,r=e.isClicked,l=e.onClick,m=d()((t={},Object(s.a)(t,G.a.goldCard,"gold"===i),Object(s.a)(t,G.a.redCard,"red"===i),Object(s.a)(t,G.a.card,-1===["gold","red"].indexOf(i)),Object(s.a)(t,G.a.clicked,r),t));return c.a.createElement("div",{role:"button",className:m,onClick:l},c.a.createElement("div",{className:G.a.cardName},a),c.a.createElement("div",null,c.a.createElement("hr",null)),c.a.createElement("div",{className:G.a.cardContent},n))},Z=function(e){var t=e.name,a=e.content,n=e.colorTheme,i=e.cardIsClicked,r=e.onClick,l=e.buttons,m=l.first,s=l.second;return i&&(r=null,a=c.a.createElement(c.a.Fragment,null,c.a.createElement(p,{text:m.text,onClick:m.onClick}),c.a.createElement(p,{text:s.text,onClick:s.onClick}))),c.a.createElement(X,{name:t,content:a,colorTheme:n,isClicked:i,onClick:r})},K=a(24),$=a.n(K),ee=a(36),te=a.n(ee),ae=function(e){var t=e.children;return c.a.createElement("span",{className:te.a.item},t)},ne=function(e){var t=e.schema;return c.a.createElement("div",{role:"table",className:$.a.schema},c.a.createElement("div",{role:"row"},t.name),"undefined"!==typeof t.description?c.a.createElement("div",{role:"row"},t.description):null,c.a.createElement("div",{className:$.a.items},t.items.map((function(e,t){return c.a.createElement("div",{key:t,role:"row",className:$.a.itemsRow},c.a.createElement(ae,null,e.name),c.a.createElement(ae,null,e.quantity),c.a.createElement(ae,null,e.time))}))))},ce=a(9),ie=a(37),re=a(15),le=a.n(re),me=a(38),se=a.n(me),oe=function(e){var t=e.name,a=e.type,n=e.tag,i=e.validate,r=e.disabled,l=e.placeholder,m={input:"input",textarea:"textarea"}[n]||"input";return c.a.createElement(ce.a,{name:t,type:a,validate:i},(function(e){var t=e.input,n=e.meta,o=d()(Object(s.a)({},se.a.error,i&&n.touched&&n.error));return c.a.createElement("div",null,c.a.createElement(m,Object.assign({},t,{type:a,className:o,disabled:r,placeholder:l})))}))},de=a(39),ue=a.n(de),he=function(e){var t=e.isRemoveClicked,a=e.showRemove,n=e.isRemoveAllClicked,i=e.addOnClick,r=e.removeOnClick,l=e.removeAllOnClick;return c.a.createElement("div",{className:ue.a.schemaFormItemsControls},c.a.createElement(p,{text:"Add",colorTheme:"green",isDisabled:t,onClick:i}),a?c.a.createElement(p,{text:"Remove",colorTheme:"red",isToggled:t,onClick:r}):null,t?c.a.createElement(p,{text:"All",colorTheme:"red",isToggled:n,onClick:l}):null)},fe=a(40),_e=a(20),pe=a.n(_e),Ee=function(e){var t=e.initItems,a=e.onValidate,n=e.isRemoveClicked,i=e.itemsIdsToRemove,r=e.handleRemoveOnItemsRowClick;return c.a.createElement("div",{className:pe.a.items},c.a.createElement(fe.a,{name:"items",initialValue:t,render:function(e){return e.fields.map((function(e,t){var l,m=d()((l={},Object(s.a)(l,pe.a.itemsRow,!0),Object(s.a)(l,pe.a.remove,n),Object(s.a)(l,pe.a.clickedItemsRow,n&&-1!==i.indexOf(t)),l));return c.a.createElement("div",{key:t,role:"row",onClick:function(){return n&&r(t)},className:m},c.a.createElement(ae,null,c.a.createElement(oe,{name:"".concat(e,".name"),type:"text",tag:"input",validate:a,disabled:n,placeholder:"Name"})),c.a.createElement(ae,null,c.a.createElement(oe,{name:"".concat(e,".quantity"),type:"text",tag:"input",validate:a,disabled:n,placeholder:"Quantity"})),c.a.createElement(ae,null,c.a.createElement(oe,{name:"".concat(e,".time"),type:"text",tag:"input",disabled:n,placeholder:"Time"})))}))}}))},ve=a(41),be=a.n(ve),Ce=function(e){var t=e.submit,a=e.reset,n=e.cancel;return c.a.createElement("div",{className:be.a.schemaButtons},c.a.createElement(p,{text:"Submit",colorTheme:"green",isDisabled:t.isDisabled,onClick:t.onClick}),c.a.createElement(p,{text:"Reset",colorTheme:"gold",isDisabled:a.isDisabled,onClick:a.onClick}),c.a.createElement(p,{text:"Cancel",colorTheme:"red",isDisabled:n.isDisabled,onClick:n.onClick}))},ke=function(e){var t=e.schema,a=e.onSubmit,i=e.onCancel,r=Object(n.useState)(!1),l=Object(m.a)(r,2),s=l[0],o=l[1],d=Object(n.useState)([]),u=Object(m.a)(d,2),h=u[0],f=u[1],_=Object(n.useState)(!1),p=Object(m.a)(_,2),E=p[0],v=p[1],C=function(e){return!e};return c.a.createElement(ce.b,{onSubmit:a,initialValues:t,mutators:Object(b.a)({},ie.a),render:function(e){var t,a=e.handleSubmit,n=e.form,r=n.mutators,l=r.push,m=r.removeBatch,d=n.submit,u=n.reset,_=e.submitting,p=e.dirty,b=e.initialValues,k=e.values;return c.a.createElement("div",{className:le.a.schemaForm},c.a.createElement("div",{className:le.a.stickyWrapper},c.a.createElement("div",{className:le.a.stickyWrapper},c.a.createElement("div",{className:le.a.schemaBar},c.a.createElement(Ce,{submit:{isDisabled:s||_,onClick:d},reset:{isDisabled:s||_||!p,onClick:u},cancel:{isDisabled:s||_,onClick:i}}),c.a.createElement(he,{isRemoveClicked:s,showRemove:!!k.items.length,isRemoveAllClicked:E,addOnClick:function(){return function(e,t){e("items",{id:t.length?t[t.length-1].id+1:1,name:"",quantity:"",time:""})}(l,k.items)},removeOnClick:function(){return function(e){s&&h.length&&(e("items",h),f([]),v(!1)),o(!s)}(m)},removeAllOnClick:function(){return e=k.items,f(E?[]:Object(D.a)(e.keys())),void v(!E);var e}})))),c.a.createElement("form",{role:"table",className:le.a.schema,onSubmit:a},c.a.createElement(oe,{name:"name",type:"text",tag:"input",validate:C,disabled:s,placeholder:"Schema Name"}),c.a.createElement(oe,{name:"description",type:"text",tag:"textarea",disabled:s,placeholder:"Schema Description"}),c.a.createElement(Ee,{initItems:b.items,onValidate:C,isRemoveClicked:s,itemsIdsToRemove:h,handleRemoveOnItemsRowClick:(t=k.items,function(e){var a=Object(D.a)(h);a=-1!==h.indexOf(e)?h.filter((function(t){return t!==e})):h.concat(e),f(a),v(t.length===a.length)})})))}})},Se=Object(l.b)((function(e){return{schemas:e.schemas,selectedSchemaId:e.ui.selectedSchemaId,mode:e.ui.mode}}),{addSchema:function(e){return function(){var t=Object(j.a)(x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.addSchema({schema:e});case 2:n=t.sent,a(N(n.data)),a(g(C));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},updateSchema:function(e){return function(){var t=Object(j.a)(x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.updateSchema({schema:e});case 2:n=t.sent,a(R(n.data)),a(O(null));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},deleteSchema:function(e){return function(){var t=Object(j.a)(x.a.mark((function t(a){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.deleteSchema({id:e});case 2:a(A(e)),a(O(null));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},selectSchema:O,setMode:g})((function(e){var t,a=e.schemas,n=e.selectedSchemaId,i=e.mode,r=e.addSchema,l=e.updateSchema,m=e.deleteSchema,s=e.selectSchema,o=e.setMode,d=i===k,u=i===S,h=i===y;if(n)t=u?c.a.createElement(ke,{schema:a.find((function(e){return e.id===n})),onSubmit:l,onCancel:function(){return s(null)}}):h?c.a.createElement("div",{className:z.a.board},a.map((function(e){return c.a.createElement(Z,{key:e.id,name:e.name,content:e.items.map((function(e){return c.a.createElement("div",{key:e.id},e.name)})),colorTheme:"red",cardIsClicked:e.id===n,onClick:function(){return s(e.id)},buttons:{first:{text:"Delete",onClick:function(){return m(e.id)}},second:{text:"Cancel",onClick:function(){return s(null)}}}})}))):c.a.createElement(ne,{schema:a.find((function(e){return e.id===n}))});else if(d)t=c.a.createElement(ke,{schema:{items:[]},onSubmit:r,onCancel:function(){return o(C)}});else{var f=null;u&&(f="gold"),h&&(f="red"),t=c.a.createElement("div",{className:z.a.board},a.map((function(e){return c.a.createElement(X,{key:e.id,name:e.name,content:e.items.map((function(e){return c.a.createElement("div",{key:e.id},e.name)})),colorTheme:f,onClick:function(){return s(e.id)}})})))}return t})),ye=function(e){var t=e.isSchemasClicked;return c.a.createElement("div",{className:W.a.content},t&&c.a.createElement(Se,null))},Oe=function(){var e=Object(n.useState)(!0),t=Object(m.a)(e,2),a=t[0],i=t[1];return c.a.createElement("div",{className:"app-wrapper"},c.a.createElement(J,{isSchemasClicked:a,setIsSchemasClicked:i}),c.a.createElement(ye,{isSchemasClicked:a}))},ge=a(8),Te=a(42),Ie=a(43),xe=a.n(Ie),je=Object(ge.c)({schemas:q,ui:T});w.init("Profile 1"),w.loadData().schemas.length||w.saveData({schemas:[{id:1,name:"Demo Schema 1",description:"Demo Schema 1 Description",items:[{id:1,name:"Item 1",quantity:"Quantity 1",time:"Time 1"},{id:2,name:"Item 2",quantity:"Quantity 2",time:"Time 2"},{id:3,name:"Item 3",quantity:"Quantity 3",time:"Time 3"},{id:4,name:"Item 4",quantity:"Quantity 4",time:"Time 4"},{id:5,name:"Item 5",quantity:"Quantity 5",time:"Time 5"},{id:6,name:"Item 6",quantity:"Quantity 6",time:"Time 6"},{id:7,name:"Item 7",quantity:"Quantity 7",time:"Time 7"},{id:8,name:"Item 8",quantity:"Quantity 8",time:"Time 8"},{id:10,name:"Item 10",quantity:"Quantity 10",time:"Time 10"},{id:11,name:"Item 11",quantity:"Quantity 11",time:"Time 11"},{id:12,name:"Item 12",quantity:"Quantity 12",time:"Time 12"},{id:13,name:"Item 13",quantity:"Quantity 13",time:"Time 13"},{id:14,name:"Item 14",quantity:"Quantity 14",time:"Time 14"},{id:15,name:"Item 15",quantity:"Quantity 15",time:"Time 15"}]}]});var De=function(e){var t=[Te.a,xe.a],a=[ge.a.apply(void 0,t)],n=("undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ge.d).apply(void 0,a);return Object(ge.e)(je,e,n)}(w.loadData());r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(l.a,{store:De},c.a.createElement(Oe,null))),document.getElementById("root"))}],[[44,1,2]]]);
//# sourceMappingURL=main.57bb2337.chunk.js.map