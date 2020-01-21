<template>
	<div id="product-main-view-root" class="mb-4">
		<button class="prev-btn" @click="prevProd">
				<font-awesome-icon :icon="['fas', 'arrow-left']" />
		</button>
		<div class="row">
			<img class="prod-img col-sm-6 mx-auto" :src="product.iconame">	
			<div class="prod-details col-sm-6 d-flex flex-column justify-content-end align-items-center align-items-sm-start">
				<h4>{{ product.prodname }}</h4>
				<p class="text-left">{{ product.intro }}</p>
				<button class="btn btn-lg btn-success w-md-25" @click="selectProd">{{ button_select_report }}</button>
			</div>
		</div>
		<button class="nxt-btn" @click="nextProd">
				<font-awesome-icon :icon="['fas', 'arrow-right']" />
		</button>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			button_select_report: ASTROWEB_CONFIG.translate('button_select_report'),
		};
	},
	props: {
		product: Object,
	},
	methods: {
		prevProd() {
			this.$emit('prevProd');

			//apply previous product animations
			this.animate("back");

		},
		nextProd() {
			this.$emit('nxtProd');

			//apply next product animations
			this.animate("forward");
		},
		selectProd(){
			this.$emit('selectProd');
		},
		animate(direction) {
			let imgConfig = [];
			let productTitleConfig = [
				{
					opacity: 0,
					bottom: "50px",
				},
				{
					opacity: 1,
					bottom: "0px",
				}
			];
			let introConfig = [
				{
					opacity: 0,
					bottom: "-=50px",
				},
				{
					opacity: 1,
					bottom: "0px",
				}
			];
			let buttonConfig = [
				{
					opacity: 0,
					left: "+=50px",
				},
				{
					opacity: 1,
					left: "0px",
				}
			];
			if(direction == "forward"){
				imgConfig = [
					{
						opacity: 0.3,
						right: "+=100px",
					},
					{
						opacity: 1,
						right: "0px",
					}
				];
			} else if(direction == "back") {
				imgConfig = [
					{
						opacity: 0.3,
						right: "-=100px",
					},
					{
						opacity: 1,
						right: "0px",
					}
				];
			}
			let reporterID = "#astroweb_" + this.$parent.$parent.$parent._uid;
			//console.log(reporterID);
			$(reporterID + " .prod-img").css(imgConfig[0])
				.animate(imgConfig[1], 400);

			$(reporterID + " .prod-details h4").css(productTitleConfig[0])
				.animate(productTitleConfig[1], 400);

			$(reporterID + " .prod-details p").css(introConfig[0])
				.animate(introConfig[1], 400);

			$(reporterID + " .prod-details button").css(buttonConfig[0])
				.animate(buttonConfig[1], 400);
		},
	},
}
</script>

<style lang="scss" scoped>
#product-main-view-root {
	position: relative;
	> button {
		border: 0;
		height: 70px;
		padding: 0;
		z-index: 999;
		position: absolute;
		svg {
			color: white;
			font-size: 2.5em;
		}
	}
	.prev-btn {
		left: 0;
		top: 50%;
	}
	.nxt-btn {
		right: 0;
		top: 50%;
	}
	img {
		max-width: 368px;
		/*height: 100%;*/
	}
	.prod-details * {
		position: relative;
	}
}

</style>
