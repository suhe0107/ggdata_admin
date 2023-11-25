<template>
	<div class="content">
		<div class="content-title">
			404 NotFound
		</div>
		<div class="content-tips">
			抱歉 未找到该页面 {{countDown}}s后自动跳转回首页
		</div>
	</div>
</template>

<script>
	export default {
		name: "NF404",
		data() {
			return {
				countDown: 5,
				timer: null
			}
		},
		methods: {
			goHome() {
				this.$router.push('/')
				clearInterval(this.timer)
			}
		},
		created() {
			var that = this
			this.timer = setInterval(() => {
				this.countDown > 1 ? this.countDown-- : this.goHome()
			}, 1000)
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content-pic {
		width: 15rem;
	}

	.content-title {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 1rem;
	}

	.content-tips {
		font-size: 1rem;
		color: gray;
		margin-top: 1rem;
	}
</style>