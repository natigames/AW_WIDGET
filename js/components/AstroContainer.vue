<template>
	<div id="astro-container" class="container d-flex justify-content-center align-items-center">
		<div class="m-2 w-100">
			<h1 class="screen-title">{{ null == product ? products.length > 0 ? label_select_report : "Loading Product" : product.prodname }}</h1>
			<component :is="currentPage" v-on:change-page="changePage" v-bind="props" ref="currentPage"></component>
		</div>
	</div>
</template>

<script>
import Report from './Report.vue';
import Form from './Form.vue';
import ProductPicker from './ProductPicker.vue';

export default {
	data: function(){
		return {
			currentPage: null,
			productId: 0,
			product: null,
			products: [],
			postmeta: null,
			custom: '',
			creditcodeProvidedByUser: false,
			label_select_report: ASTROWEB_CONFIG.translate('label_select_report'), 
		};
	},
	mounted(){
		//this.init();
	},
	methods: {
		init() {
			this.productId = this.$parent.params.product_id;
			this.product = null;
			this.getProduct();

			if(this.$parent.params.custom) {
				this.custom = this.$parent.params.custom;
			}

			if(this.$parent.creditcode) {
				//Display the report
				this.creditcodeProvidedByUser = true;
				this.changePage("Report");
			} 

		},
		changePage(page) {
			switch(page) {
				case "ProductPicker":
					this.currentPage = ProductPicker;
					break;
				case "Form":
					this.currentPage = Form;
					//$("form").trigger("reset");
					$("#astroweb form *[disabled='disabled']").removeAttr('disabled');
					break;
				case "Report":
					this.currentPage = Report;
					break;
				default:
					console.error("Unknown page: \"" + page + "\"");
			}
		},
		getProduct($mismatchedCreditcode = false) {
			axios.get("https://astroweb.mx/rest/aw/products", this.$parent.$parent.config)
				.then((response) => {
					if(response.data.errordata) {
						alert(response.data.errordata.message);
					}

					if(!this.productId){
						//No product ID specified, so show product picker
						this.products = response.data.data.products;
						this.changePage("ProductPicker");	
						return;
					}

					let result = {prodname: "Product not found"};

					for(let product of response.data.data.products) {
						if(this.productId == product.prodid) {
							result = product;
						}
					}

					if(result.metadata) {
						//initialize postmeta for metadata that will need to be passed when requesting a report
						this.postmeta = {};
					}
					
					this.product = result;
					if(!this.$parent.creditcode && !$mismatchedCreditcode){
						this.changePage("Form");
					}
				})
				.catch((error) => {
					//console.error(error.response);
					console.error(error);
				});
		},
	},
	computed: {
		props: function() {
			if(this.currentPage == ProductPicker) {
				return {products: this.products};
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	#astro-container {
		background-color: #ddd;
		position: relative;
		overflow: hidden;
	}
</style>
