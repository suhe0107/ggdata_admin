<template>
	<div class="login-content">
		<div class="login-content-top">
			<img src="../assets/logo.png" class="login-content-top-pic">
			<div class="login-content-top-name">
				登录管理后台
			</div>
		</div>
		<div class="login-content-middle">
			<div class="login-content-middle-line">
				<div class="login-content-middle-line-name">
					用户名或手机号
				</div>
				<input v-model="username" type="text" :maxlength="11" placeholder="请输入登录账号"
					class="login-content-middle-line-input" autocomplete="off">
			</div>
			<div class="login-content-middle-line" style="margin-top: 16px;">
				<div class="login-content-middle-line-name">
					密码
				</div>
				<input type="password" v-model="password" placeholder="请输入登录密码" autocomplete="new-password"
					class="login-content-middle-line-input">
			</div>
			<div class="login-content-middle-button">
				<el-button class="login-content-middle-button-name" type="primary" :loading="loading" @click="tologin">
					立即登录</el-button>
			</div>
		</div>
		<div class="login-content-bottom">
			<div class="login-content-bottom-name">
				浙ICP备2001XXXX号
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				username: '',
				password: '',
				loading: false
			};
		},
		created() {
			var that = this
			if (that.$store.state.userinfo) { // 判断当前用户的登录信息是否存在
				that.$router.push('/')
			}
		},
		methods: {
			tologin() {
				var that = this
				if (that.loading) {
					return
				}
				if (that.username == '') {
					this.$notify({
						title: '缺少参数',
						message: '登录账号不能为空',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.password == '') {
					this.$notify({
						title: '缺少参数',
						message: '登录密码不能为空',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				that.loading = true
				var password = that.password
				axios.get(
					'https://control.gugesport.com/api/keji/gguser/marketUserInfo?phone='+that.username+'&password='+password
					).then(res => {
						console.log(res)
					this.$notify({
						title: '登录成功',
						message: res.msg,
						position: 'bottom-right',
						type: 'success'
					});
					that.$store.commit('setUserInfo',res.data.data)
					that.$router.push('/')
				}).catch(res=>{
					console.log(res)
					this.$notify({
						title: '登录失败',
						message: res.data,
						position: 'bottom-right',
						type: 'error'
					});
					that.username = ''
					that.password = ''
					that.loading = false
				})
			}
		}
	}
</script>

<style scoped>
	.login-content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-content-top {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50px;
	}

	.login-content-top-name {
		font-size: 20px;
		margin: 24px 0;
	}

	.login-content-top-pic {
		width: 64px;
		height: 64px;
		border-radius: 100%;
	}

	.login-content-middle {
		width: 350px;
		border: 1px solid #ededed;
		background-color: #f6f8fa;
		padding: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}

	.login-content-middle-line {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.login-content-middle-line-name {
		font-size: 18px;
		color: #5f5f5f;
	}

	.login-content-middle-button {
		width: 100%;
		display: flex;
		margin-top: 20px;
	}

	.login-content-middle-button-name {
		width: 100%;
		height: 45px;
		background-color: #00aa00;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		border-radius: 5px;
	}

	.login-content-middle-line-input {
		width: 100%;
		border: 1.5px solid #ededed;
		margin-top: 0.7rem;
		border-radius: 0.3rem;
		height: 45px;
		outline: none;
		font-size: 16px;
		box-sizing: border-box;
		padding: 16px 16px;
	}

	.login-content-bottom {
		width: 350px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
	}

	.login-content-bottom-name {
		margin-right: 16px;
		color: gray;
		font-size: 16px;
		cursor: pointer;
	}

	input {
		border: none;
	}

	.el-button {
		border: none;
	}
</style>