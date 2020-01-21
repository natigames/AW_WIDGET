<template>
	<div id="product-picker">
		<ProductMainView
			:product="products[currProductIdx]"
			@prevProd="prevProd"
			@nxtProd="nextProd"
			@selectProd="selectProd()"
			ref="mainView"
		></ProductMainView>
		<ProductThumbs
			:thumbs="thumbs"
			:currProdIdx="currProductIdx"
			@loadProd="loadProd($event)"
		></ProductThumbs>
	</div>
</template>

<script>
import ProductMainView from './ProductMainView.vue';
import ProductThumbs from './ProductThumbs.vue';

export default {
	props: {
		products: Array,
	},
	components: {
		ProductMainView,
		ProductThumbs,
	},
	data: function() {
		return {
			currProductIdx: 0,
		};
	},
	methods: {
		nextProd() {
			this.currProductIdx = ++this.currProductIdx % this.products.length;
		},
		prevProd() {
			let temp = (this.currProductIdx - 1) % this.products.length;
			this.currProductIdx = temp < 0 ? temp + this.products.length : temp;
		},
		loadProd(i) {
			let animationDirection = i < this.currProductIdx ? "back" : "forward";
			this.currProductIdx = i;
			this.$refs.mainView.animate(animationDirection);
		},
		selectProd() {
			//selects the currently displayed product and loads the form
			let product = this.products[this.currProductIdx];
			//this.$parent.$parent.params.product_id = product.prodid;
			this.$parent.product = product;

			if(product.metadata) {
				this.$parent.postmeta = {};
			}

			this.$emit("change-page", "Form");
		},
	},
	computed: {
		thumbs: function() {
			return this.products.map(function(e){
				return e.iconame;
			});
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
