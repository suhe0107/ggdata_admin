<template>
	<div class="main_head">
		<div class="main_head-left">
			<div class="main_head-left-cop" @click="toindex">
				<img src="../../assets/logo.png" class="main_head-left-cop-pic" />
				<div class="main_head-left-cop-name">
					咕鸽体育运营数据平台
				</div>
			</div>
		</div>
		<div class="main_head-right">
			<div class="main_head-right-name" @click="$router.push('/setting')">
				设置
			</div>
			<el-popover placement="top-start" width="50" trigger="hover">
				<div class="main_head-right-more">
					<div class="main_head-right-more-info" @click="$tool.login_out()">
						退出登录
					</div>
				</div>
				<div class="main_head-right-userinfo" slot="reference">
					<img src="../../assets/logo.png" class="main_head-right-userinfo-pic" />
					<div class="main_head-right-userinfo-name">
						{{userinfo.name}}
					</div>
				</div>
			</el-popover>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: '',
				routepath: '/',
				numdata: []
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
			toindex(){
				var that = this
				if(this.routepath!=='/'){
					that.$router.push('/')
				}
			}
		}
	}
</script>

<style scoped>
	.main_head {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background: rgba(0, 0, 0, 0.1);
	}

	.main_head-left-cop {
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
	}

	.main_head-left-cop-name {
		font-size: 1.1rem;
		margin-left: 0.5rem;
		font-weight: bold;
	}

	.main_head-left-cop-pic {
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
	}

	.main_head-right {
		display: flex;
		flex-direction: row;
		align-items: center;
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
		margin-right: 0.5rem;
	}

	.main_head-right-name {
		margin-right: 1.5rem;
		cursor: pointer;
	}
	.main_head-right-more{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main_head-right-more-info{
		font-size: 0.9rem;
		cursor: pointer;
	}
</style>