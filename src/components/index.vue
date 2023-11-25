<template>
	<div class="content">
		<main_head></main_head>
		<!-- <div class="content-right">
		
			<div class="content-right-view">
				<router-view ></router-view>
				
				<div class="content-right-view-content" v-if="routepath=='/'">

				</div>
			</div>
		</div> -->
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
		flex-direction: row;
		justify-content: space-between;
	}
	.content-left{
		width: 200px;
		height: 100vh;
	}
	.content-right{
		width: calc(100% - 200px);
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.content-right-view{
		width: 100%;
		height: calc(100% - 4rem);
		background-color: #F2F2F2;
		padding:1rem;
		
/* 		padding-bottom: 0;
		overflow: scroll; */
	}
	.content-right-view-content{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.content-right-view-content-item{
		width: calc((100% - 9rem) / 3);
		margin-right: 3rem;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 0.5rem;
		margin-top: 2rem;
		padding: 2rem;
	}
	.content-right-view-content-item-name{
		font-size: 0.9rem;
		font-weight: bold;
	}
	.content-right-view-content-item-bottom{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>