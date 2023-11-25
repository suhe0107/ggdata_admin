<template>
	<div class="web_head">
		<div class="web_head-top">
			<div class="web_head-top-name">
				管理后台
			</div>
		</div>
		<div class="content-bottom">
			<el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				background-color="transparent" text-color="#fff">
				<el-submenu index="0">
					<template slot="title">
						<span>文章管理</span>
					</template>
				
					<el-menu-item-group>
						<el-menu-item index="4-3" @click="topages('/Classification')">分类管理</el-menu-item>
						<el-menu-item index="4-1" @click="topages('/Article')">最新情报</el-menu-item>
						<el-menu-item index="4-2" @click="topages('/Notice')">公告列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="6" @click="topages('/GoodsList')">
					<span slot="title">商品列表</span>
				</el-menu-item>
				<el-menu-item index="3" @click="topages('/HomestayFacilities')">
					<span slot="title">民宿设施</span>
				</el-menu-item>
				<el-menu-item index="4" @click="topages('/Partners')">
					<span slot="title">合作伙伴</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<span>工单管理</span>
					</template>
				
					<el-menu-item-group>
						<el-menu-item index="2-1" @click="topages('/AccommodationRegistration')">住宿登记</el-menu-item>
						<el-menu-item index="2-2" @click="topages('/FacilitiesRegistration')">设施外玄关帐场</el-menu-item>
						<el-menu-item index="2-3" @click="topages('/RealEstateIntermediaryRegistration')">中介委托登记</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				
				<el-submenu index="4">
					<template slot="title">
						<span>设置</span>
					</template>
				
					<el-menu-item-group>
						<el-menu-item index="4-1" @click="topages('/setting/setting')">系统设置</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:''
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
			topages(e) {
				var that = this
				that.$router.push(e)
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.web_head {
		width: 200px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #383c41;
	}

	.web_head-top {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #3c444d;
	}

	.content-bottom {
		width: 100%;
		height: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		background-color: transparent;
		overflow-y: scroll;
	}

	.web_head-top-name {
		width: 100%;
		text-align: center;
		font-size: 0.9rem;
		font-weight: bold;
		color: #FFFFFF;
	}

	.content-el-container {
		width: 100%;
		height: 100%;
		background-color: transparent;
		display: flex;
	}

	.content-el-container-el-aside {
		width: 100%;
		background-color: transparent;
		color: #FFFFFF;
	}

	.el-submenu.el-submenu:hover {
		background-color: #2e3137;
	}
	.el-menu-item{
		/* color: #FFFFFF; */
	}
</style>