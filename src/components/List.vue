<template>
	<li class="dc-list-item">
		<div class="item-column1"></div>
		<div class="item-column2"></div>
		<div class="item-column3"></div>
		<div class="item-column4"></div>
	</li>
</template>

<script>
	export default {
		name: 'dc-list-item',
		props: ['dcList'],
	}
</script>

<style lang="stylus">
.dc-list-item
	width 100%
	.item-column1
		width 120px
		height 140px
</style>