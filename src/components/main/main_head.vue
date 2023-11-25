<template>
	<div class="main_head">
		<div class="main_head-left">

		</div>
		<div class="main_head-right">
			<div class="main_head-right-userinfo" slot="reference">
				<img :src="userinfo.logo" class="main_head-right-userinfo-pic">
				<div class="main_head-right-userinfo-name">
					{{userinfo.name}}
				</div>
				
			</div>
			<div class="main_head-right-userinfo-more">
				<el-button class="main_head-right-userinfo-more-logout" type="primary" @click="$tool.login_out()">
					退出登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:'',
				routepath:'/',
				numdata:[]
			}
		},
		watch: {
			$route() {
				this.routepath = this.$route.path
				this.userinfo = this.$tool.GetUserInfo()
			},
		},
		mounted() {
			var that = this
				that.userinfo = this.$tool.GetUserInfo()
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.main_head {
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background-color: #FFFFFF;
	}

	.main_head-left {
		display: flex;
	}

	.main_head-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-items: flex-end;
	}

	.main_head-right-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.main_head-right-userinfo-pic {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 100%;
	}

	.main_head-right-userinfo-name {
		font-size: 0.9rem;
		margin-left: 0.5rem;
	}
	.main_head-right-userinfo-tips{
		margin-left: 1rem;
		font-size: 0.7rem;
		background-color: #000000;
		color: #FFFFFF;
		padding: 0.25rem 0.6rem;
		border-radius: 0.2rem;
	}
	.main_head-right-userinfo-more{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main_head-right-userinfo-more-logout{
		font-size: 13px;
		cursor: pointer;
		height: 20px;
		width:70px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 15px;
		background-color: #000000;
	}
	.el-button{
		border: none;
	}
	.el-button:hover{
		background-color: #000000;
	}
</style>