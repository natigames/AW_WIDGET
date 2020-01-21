<template>
	<div class="astro-component" :id="'astroweb_' + _uid">
	<div v-if="displaymode == 'embedded'">
		<button 
			id="astro_main_btn"
			class="btn btn-lg btn-success" 
			:class="{'d-none': loading}"
			@click="toggleAstroWidget"
	   >
			<template v-if="!widgetOpen">
				<slot>{{ btn_label }}</slot>
			</template>
			<template v-else>
				{{ btn_label }}	
			</template>
		</button>
		<div class="astroweb-embedded-display mt-4 p-4" :class="{'d-none': !widgetOpen}">
			<astro-container 
				ref="container"
			></astro-container>
			<div class="mt-4 text-right">
				<a v-if="creditcode" :href="'https://astroweb.mx/dev/pdf.cfm?creditcode=' + creditcode" target="_blank" class="btn btn-info">
					<font-awesome-icon :icon="['far', 'file-pdf']" />
				</a>
				<button class="btn btn-danger" @click="toggleAstroWidget">{{ button_close }}</button>
			</div>
		</div>
	</div>
	<div v-else-if="displaymode == 'modal'">
		<button 
			id="astro_main_btn"
			class="btn btn-lg btn-success" 
			:class="{'d-none': loading}"
			@click="toggleAstroWidget"
			data-toggle="modal"
			:data-target="'#astroModal' + _uid"
			data-backdrop="static"
	   >
			<template v-if="!widgetOpen">
				<slot>{{ btn_label }}</slot>
			</template>
			<template v-else>
				{{ btn_label }}	
			</template>
		</button>
		<div class="modal" :id="'astroModal' + _uid">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Astroweb</h4>
						<button type="button" class="close" data-dismiss="modal" @click="toggleAstroWidget">&times;</button>
					</div>
					<div class="modal-body">
						<astro-container 
							ref="container"
						></astro-container>
					</div>
					<div class="modal-footer">
						<a v-if="creditcode" :href="'https://astroweb.mx/dev/pdf.cfm?creditcode=' + creditcode" target="_blank" class="btn btn-info">
							<font-awesome-icon :icon="['far', 'file-pdf']" />
						</a>
						<button type="button" class="btn btn-danger" data-dismiss="modal" @click="toggleAstroWidget">{{ button_close }}</button>
				    </div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import AstroContainer from './AstroContainer.vue';

export default {
	data: function() {
		return {
			displaymode: ASTROWEB_CONFIG.Displaymode,
			widgetOpen: false,
			btn_label: ASTROWEB_CONFIG.translate('button_request_report'),
			//config: null,
			button_close: ASTROWEB_CONFIG.translate('button_close'),
			loading: true,
			creditcode: '',
		}
	},
	props: {
		colorscheme: String,
		stylesheet: String,
		params: {
			default: function(){return {};},
			type: Object,
		},
		debug: Boolean,
	},

	mounted() {
		this.params.default_user_data = this.params.default_user_data ? this.params.default_user_data : {};
		//load color scheme
		if(this.colorscheme) {
			//$("head").append("<link rel='stylesheet' href='" + this.colorscheme + "'>");
			$.get(this.colorscheme, function(data, status){
				$("head").append(this.scopeCSS(data));
				if(!this.stylesheet) {
					this.loading = false;
				} else {
					//nested so they load in the correct order since these are async calls
					$.get(this.stylesheet, function(data, status){
						$("head").append(this.scopeCSS(data));
						this.loading = false;
					}.bind(this));
				}
			}.bind(this));

		}
		//load custom stylesheet
		if(this.stylesheet && !this.colorscheme) {
			//let customstylesheet = "<link rel='stylesheet' href='" + this.stylesheet + "'>";
			//$("head").append(customstylesheet);
			$.get(this.stylesheet, function(data, status){
				$("head").append(this.scopeCSS(data));
				this.loading = false;
			}.bind(this));
		}

		if(!this.stylesheet && !this.colorscheme) {
			this.loading = false;
		}

		if(this.params.creditcode) {
			this.creditcode = this.params.creditcode;
		}
		
		if(this.params.autoOpen && ASTROWEB_CONFIG.Displaymode == "embedded") {
			this.toggleAstroWidget();
		}
	},
	components: {
		AstroContainer,
	},
	methods: {
		toggleAstroWidget() {
			if(!this.widgetOpen) {
				if(this.creditcode && !this.params.creditcode) {
					this.creditcode = '';
				}
				//call init before rendering
				this.$refs.container.init();
			}
			this.widgetOpen = !(this.widgetOpen);
			this.btn_label = this.widgetOpen ? ASTROWEB_CONFIG.translate('button_close') : ASTROWEB_CONFIG.translate('button_request_report');
		},
		scopeCSS(data) {
			//let componentSelector = ".astro-component[" + this.$el.attributes[0].name + "]";
			let componentSelector = "#astroweb_" + this._uid;

			data = data.replace(":root", "");

			data = data.replace(/^.*[{|,]$/gm, componentSelector + ' $&');
				
			return "<style>" + data + "</style>";
		}
	},
}
</script>

<style lang='scss' scoped>
	.astro-component /deep/ {
		#astro_main_btn * {
			pointer-events: none;
		}
		.modal {
			overflow-y: scroll;
			.modal-dialog {
				max-width: 95%;
			}
		}
		.modal-content, #astroweb-display-embedded > div {
			color: #333;
			.close {
				color: #aaa;
			}
		}
		.modal-footer .btn-info {
			border: none;
		}
	}
</style>


