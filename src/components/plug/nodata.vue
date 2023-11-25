<template>
	<div class="content">
		<img src="https://pic.suhejishi.com/178291692029221.png" class="content-pic">
		<div class="content-title">
			{{title}}
		</div>
		<div class="content-tips" v-if="tips">
			{{tips}}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title:{
				type: String,
				default: () => '没有找到相关内容'
			},
			tips:{
				type: String,
				default: () => ''
			},
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped>
	.content {
		width: 100%;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content-pic {
		width: 15rem;
	}

	.content-title {
		font-size: 1.2rem;
		font-weight: bold;
		margin-top: 1rem;
	}

	.content-tips {
		font-size: 0.9rem;
		color: gray;
		margin-top: 1rem;
	}
</style>