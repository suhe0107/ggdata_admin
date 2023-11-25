<template>
	<div class="swiper">
		<div class="setting-content">
			<div class="setting-content-line">
				<div class="setting-content-line-name">
					用户协议
				</div>
				<div class="setting-content-line-right">
					<div class="setting-content-line-right-button" @click="edit_UserAgreement=true">
						编辑
					</div>
				</div>
			</div>
			<div class="setting-content-line">
				<div class="setting-content-line-name">
					底部信息
				</div>
				<div class="setting-content-line-right">
					<div class="setting-content-line-right-button" @click="wechat = info.wechat,edit_bottom=true">
						编辑
					</div>
				</div>
			</div>
		</div>

		<el-dialog :title="'编辑用户协议'" :visible.sync="edit_UserAgreement" :close-on-click-modal="false">
			<div class="content-special_show">
					<div style="width: 100%;">
						<vue-ueditor-wrap ref="tips" v-model="UserAgreement" :config="editorConfig"
							:destroy="true" />
					</div>
				<div class="content-popup-button">
					<el-button size="mini" type="primary" @click="tosaveUserAgreement">确认编辑</el-button>
				</div>
			</div>
		</el-dialog>
		
		<el-dialog :title="'编辑底部信息'" :visible.sync="edit_bottom" :close-on-click-modal="false" @close="getswiperdata()">
			<div class="content-special_show">
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						tel
					</div>
					<input v-model="info.tel" type="text" placeholder="请输入tel"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						fax
					</div>
					<input v-model="info.fax" type="text" placeholder="请输入fax"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						email
					</div>
					<input v-model="info.email" type="text" placeholder="请输入email"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						time
					</div>
					<input v-model="info.time" type="text" placeholder="请输入time"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						remark
					</div>
					<input v-model="info.remark" type="text" placeholder="请输入remark"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-line">
					<div class="content-special_show-line-name">
						wechat
					</div>
					<label for="file-uploads">
						<img style="width: 50px;height: 50px;"
							:src="wechat?wechat:'https://img1.baidu.com/it/u=886800233,2359956977&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'">
					</label>
					</el-button>
					<input id="file-uploads" type="file" title="" :multiple="false" ref="myfile" accept="image/*"
						@change="handleFileChange" />
				</div>
				<div class="content-popup-button">
					<el-button size="mini" type="primary" @click="tosavebottom">确认编辑</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap';
	export default {
		components: {
			VueUeditorWrap
		},
		data() {
			return {
				info:'',
				UserAgreement:'',
				edit_UserAgreement:false,
				base64Image:'',
				wechat:'',
				edit_bottom:false,
				
				editorConfig: {
					autoHeightEnabled: true, // 自动变高
					autoFloatEnabled: true,
					initialContent: "请输入内容",
					autoClearinitialContent: true,
					initialFrameWidth: "100%", // 初始化宽
					initialFrameHeight: 500, // 初始化高
					// BaseUrl: "",
					// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口） - 修改成自己地址
					serverUrl: "",
					// UEditor 资源文件的存放路径
					UEDITOR_HOME_URL: "/UEditor/", // 重要重要重要重要重要重要重要重要重要 必须配置好径!!!
				},
			}
		},
		watch: {
			$route() {
				var that = this
				that.routepath = that.$route.path
			},
		},
		created() {
			var that = this
			that.routepath = that.$route.path
			that.getswiperdata()
		},
		methods: {
			handleFileChange(e) {
				var that = this
				var files = Array.prototype.slice.call(e.target.files)
				files.forEach((item, index) => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						var base64Image = reader.result;
						that.base64Image = base64Image
						that.wechat = base64Image
					};
				});
			},
			tosavebottomend(){
				var that = this
				that.$api.post('/OpSetting', {
					optype: 6,
					tel:that.info.tel,
					fax:that.info.fax,
					email:that.info.email,
					time:that.info.time,
					remark:that.info.remark,
					wechat:that.wechat
				}).then(res => {
					that.edit_bottom = false
					that.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
					that.getswiperdata()
				}).catch(error => {
					console.error(error)
				})
			},
			tosavebottom(){
				var that = this
				if(that.base64Image){
					that.$api.post('/GetUploadPic',{
						base64Image:that.wechat
					}).then(res => {
						that.wechat = res.data
						console.log(res)
						that.tosavebottomend()
					}).catch(error => {
						console.error(error)
					})
				}else{
					that.tosavebottomend()
				}
			},
			tosaveUserAgreement(){
				var that = this
				that.$api.post('/OpSetting', {
					optype: 5,
					UserAgreement: that.UserAgreement,
				}).then(res => {
					that.edit_UserAgreement = false
					that.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
					that.getswiperdata()
				}).catch(error => {
					console.error(error)
				})
			},
			getswiperdata() {
				var that = this
				that.wechat = ''
				that.base64Image = ''
				that.$api.post('/OpSetting', {
					optype: 1,
					page: that.page,
				}).then(res => {
					that.info = res.data
					console.log(res, 555)
					that.UserAgreement = res.data.UserAgreement
				}).catch(error => {
					console.error(error)
				})
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.setting-content{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.setting-content-line{
		width: calc((100% / 6) - 32px);
		display: flex;
		flex-direction: column;
		padding: 32px 0;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		border-radius: 8px;
		margin-right: 32px;
	}
	.setting-content-line-name{
		font-size: 32px;
		font-weight: bold;
	}
	.setting-content-line-right{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 32px;
		color: gray;
	}
	.setting-content-line-right-button{
		cursor: pointer;
	}
	
	.content-popup-button{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding: 16px 0;
	}
	.content-special_show-all-item-left-input {
		width: calc(100% - 10rem);
		background-color: #F9F9F9;
		padding: 1rem 0.7rem;
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		text-align: center;
	}
	.content-special_show-line{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
	}
	.content-special_show-line-name{
		font-size: 16px;
		width: 10rem;
	}
</style>