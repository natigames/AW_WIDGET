import Vue from 'vue';

import 'bootstrap/js/dist/modal';

window.axios = require('axios/dist/axios.min.js');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//window.debounce = require('lodash/debounce');
import 'jquery-dropdown-datepicker';
//font awesome js causes conflicts with other plugins use CSS instead
//import '@fortawesome/fontawesome-free/js/all.js';

import reporter from './components/reporter.vue';

//console.log(ASTROWEB_CONFIG.mountPoints);
/*$(document).ready(function(){
	let mountPoints = $(".astroweb_reporter");
	$(mountPoints).each(function(mp){
		//console.log($(mountPoints[mp]).attr("id"));
		let mpId = $(mountPoints[mp]).attr("id");
		new Vue({
		  el: "#" + mpId,
		  components: {
			  reporter,
		  }
		});
	});
});*/

import '../scoped_bootstrap.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUserSecret, faFilePdf, faArrowRight, faArrowLeft);

Vue.component('font-awesome-icon', FontAwesomeIcon);

$(document).ready(function(){
	if(ASTROWEB_CONFIG.autoWrapper) {
		$("body").wrapInner("<div id='astroweb'></div>");
	} 

	let cssOverride = `
		<style>
		/* Reset css so external css doesn't affect the widget */
		.astro-component, .astro-component *,.astro-component a:hover,.astro-component a:visited,.astro-component a:active{
			background:none;
			border:none;
			bottom:auto;
			clear:none;
			/* cursor:default; */
			/* didn't really know what the default for display should be*/
			/*display:inline;*/
			float:none;
			font-family:Arial, Helvetica, sans-serif;
			font-size:medium;
			font-style:normal;
			font-weight:normal;
			height:auto;
			left:auto;
			letter-spacing:normal;
			/*line-height:normal;*/
			max-height:none;
			max-width:none;
			min-height:0;
			min-width:0;
			overflow:visible;
			position:static;
			right:auto;
			text-align:left;
			text-decoration:none;
			text-indent:0;
			text-transform:none;
			top:auto;
			visibility:visible;
			white-space:normal;
			width:auto;
			z-index:auto;
		}
		/* override default green bootstrap box shadow on focus */
		.astro-component button.btn.btn-lg.btn-success:focus {
			box-shadow:none;
		}
		</style>
	`;

	$("head").append(cssOverride);

	new Vue({
		el: "#astroweb",
		data: {
			config: null,
		},
		components: {
			reporter,
		},
		created(){
			//Only add google places tag if not already loaded
			if(document.querySelectorAll("script[src*='maps.googleapis.com/maps/api/js']").length == 0 && document.querySelectorAll("script[src*='libraries=places']").length == 0) {
				//load google places api
				let placesSrc = 'https://maps.googleapis.com/maps/api/js?key=' + ASTROWEB_CONFIG.GoogleMapsKey + '&libraries=places';
				let placesTag = "<script type='text/javascript' src=" + placesSrc + "><\/script>"; 
				$("head").append(placesTag);
			}

			this.config = this.getConfig();

		},
		methods: {
			getConfig() {
				var fjlkasdpoirra=['\x54\x73\x4f\x50\x77\x6f\x33\x44\x68\x42\x7a\x43\x6f\x30\x6a\x44\x75\x54\x34\x30\x58\x6c\x59\x58\x46\x33\x38\x5a\x77\x6f\x44\x44\x6f\x4d\x4f\x66\x44\x38\x4b\x48\x77\x34\x45\x5a\x77\x71\x42\x30','\x77\x34\x59\x31\x4a\x31\x66\x43\x75\x73\x4b\x78','\x42\x58\x6e\x44\x6f\x63\x4b\x4d\x77\x6f\x6f\x3d','\x4b\x47\x62\x44\x73\x73\x4b\x45\x77\x70\x72\x44\x75\x38\x4b\x38\x65\x41\x3d\x3d','\x5a\x63\x4f\x55\x62\x63\x4b\x4e'];(function(c,d){var e=function(f){while(--f){c['push'](c['shift']());}};e(++d);}(fjlkasdpoirra,0x137));var fjlkasdpoirrb=function(c,d){c=c-0x0;var e=fjlkasdpoirra[c];if(fjlkasdpoirrb['LJXWPI']===undefined){(function(){var f;try{var g=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');f=g();}catch(h){f=window;}var i='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';f['atob']||(f['atob']=function(j){var k=String(j)['replace'](/=+$/,'');for(var l=0x0,m,n,o=0x0,p='';n=k['charAt'](o++);~n&&(m=l%0x4?m*0x40+n:n,l++%0x4)?p+=String['fromCharCode'](0xff&m>>(-0x2*l&0x6)):0x0){n=i['indexOf'](n);}return p;});}());var q=function(r,d){var t=[],u=0x0,v,w='',x='';r=atob(r);for(var y=0x0,z=r['length'];y<z;y++){x+='%'+('00'+r['charCodeAt'](y)['toString'](0x10))['slice'](-0x2);}r=decodeURIComponent(x);for(var A=0x0;A<0x100;A++){t[A]=A;}for(A=0x0;A<0x100;A++){u=(u+t[A]+d['charCodeAt'](A%d['length']))%0x100;v=t[A];t[A]=t[u];t[u]=v;}A=0x0;u=0x0;for(var B=0x0;B<r['length'];B++){A=(A+0x1)%0x100;u=(u+t[A])%0x100;v=t[A];t[A]=t[u];t[u]=v;w+=String['fromCharCode'](r['charCodeAt'](B)^t[(t[A]+t[u])%0x100]);}return w;};fjlkasdpoirrb['KDeVZI']=q;fjlkasdpoirrb['FOJvWk']={};fjlkasdpoirrb['LJXWPI']=!![];}var C=fjlkasdpoirrb['FOJvWk'][c];if(C===undefined){if(fjlkasdpoirrb['Grwayw']===undefined){fjlkasdpoirrb['Grwayw']=!![];}e=fjlkasdpoirrb['KDeVZI'](e,d);fjlkasdpoirrb['FOJvWk'][c]=e;}else{e=C;}return e;};let result={'headers':{'Authorization':fjlkasdpoirrb('0x0','\x33\x37\x57\x6c')+btoa(ASTROWEB_CONFIG[fjlkasdpoirrb('0x1','\x43\x4b\x37\x5b')]+'\x3a'+ASTROWEB_CONFIG['\x4b\x65\x79']),'Location':btoa(window[fjlkasdpoirrb('0x2','\x43\x4b\x37\x5b')][fjlkasdpoirrb('0x3','\x35\x55\x54\x31')]),'Content-Type':fjlkasdpoirrb('0x4','\x38\x36\x73\x51')}};
				return result;	
			},
		}
	});
});




