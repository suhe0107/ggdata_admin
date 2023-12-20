<template>
	<div class="content">
		<main_head v-if="!isMobile"></main_head>
		<div class="content-bottom">
			<baseindex v-if="routepath=='/'"></baseindex>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import baseindex from './../components/baseindex.vue';
	export default {
		components:{
			baseindex
		},
		data() {
			return {
				isMobile:false,
				routepath:'/'
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
			this.isMobile = this.$tool.isMobile()
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

<style scoped>
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
		display: flex;
		flex-direction: column;
	}
	
</style>