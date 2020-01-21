<template>
	<div id="product-thumbs" class="d-flex flex-wrap mt-4 justify-content-end">
		<div class="thumb" :class="{ active: index == currProdIdx }" v-for="(thumb, index) in thumbs" @click="loadProd(index)">
			<img :src="thumb">
		</div>
	</div>
</template>

<script>
export default{
	props: {
		thumbs: Array,
		currProdIdx: Number,
	},
	methods: {
		loadProd(i) {
			this.$emit('loadProd', i);
		},
	},
}
</script>

<style lang="scss" scoped>
.thumb {
	cursor: pointer;
	padding: 2px;
	opacity: 0.4;
	img {
		cursor: inherit;
		width: 65px;
		height: 65px;
		object-fit: cover;
	}
}
.active {
	opacity: 1;
}
</style>
