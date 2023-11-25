<template>
	<div class="content">
		<main_head></main_head>
		<div class="content-bottom">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				routepath:'/',
				numdata:[]
			}
		},
		watch: {
			$route() {
				this.routepath = this.$route.path
				if(this.routepath=='/'){
					this.initroute()
				}
			},
		},
		created() {
			this.routepath = this.$route.path
			if(this.routepath=='/'){
				this.initroute()
			}
		},
		methods: {
			initroute() {
				var that = this
				var aim_path = this.$route.path
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.content-bottom{
		width: 100%;
		height: calc(100% - 60px);
	}
</style>