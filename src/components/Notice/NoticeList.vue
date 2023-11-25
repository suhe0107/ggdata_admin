<template>
	<div class="swiper">
		<div class="swiper-top">
			<el-button type="primary" @click="edit=true,name='',aimitem=''" class="swiper-top-button">
				新增公告</el-button>
		</div>
		<div class="swiper-content">

			<div class="swiper-content-top">
				<el-table :data="data_list" stripe style="width: 100%">
					<el-table-column prop="id" label="序号" width="100">
					</el-table-column>
					<el-table-column prop="name" label="名称" width="300">
					</el-table-column>
					<el-table-column label="内容">
						<template slot-scope="scope">
							<div v-html="scope.row.info" class="HomePage-middle-all-title"></div> 
						</template>
					</el-table-column>
					
					<el-table-column prop="status_name" label="状态" width="150">
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" width="200">
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间" width="200">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text"  @click="todelete(scope.row)">删除</el-button>
							<el-button type="text"  v-if="scope.row.status==2" @click="toshow(scope.row,1)">显示</el-button>
							<el-button type="text" v-if="scope.row.status==1" @click="toshow(scope.row,2)">隐藏</el-button>
							<el-button type="text"  @click="aimitem=scope.row,name=scope.row.name,info=scope.row.info,edit=true">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			
		</div>
		<div class="el-pagination-bottom">
			<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="perPage"
				:current-page="page" :total="total">
			</el-pagination>
		</div>

		<el-dialog :title="aimitem?'编辑'+'公告':'新增'+'公告'" :visible.sync="edit" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							名称
						</div>
						<input v-model="name" type="text" placeholder="请输入公告名称"
							class="content-special_show-all-item-left-input"></input>
					</div>
				</div>
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							内容
						</div>
						<div style="width: calc(100% - 4rem);">
							<vue-ueditor-wrap ref="tips" v-model="info" :config="editorConfig"
								:destroy="true" />
						</div>
						
					</div>
				</div>
				<div class="content-popup-button">
					<el-button size="mini" type="primary" @click="toedit">确认操作</el-button>
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
				edit: false,
				info:'',
				aimitem: '',
				name: '',
				total: 0,
				keyword: '',
				data_list: [],
				page: 1,
				perPage:10,
				routepath: '',
				
				editorConfig: {
					autoHeightEnabled: true, // 自动变高
					autoFloatEnabled: true,
					initialContent: "请输入内容",
					autoClearinitialContent: true,
					initialFrameWidth: "100%", // 初始化宽
					initialFrameHeight: 100, // 初始化高
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
			nextpage(e) {
				var that = this
				that.page = e
				that.getswiperdata()
			},
			onEditorChange(){
				var that = this
			},
			toshow(e,es){
				var that = this
				that.$api.post('/OpNoticeList', {
					optype: 2,
					delete: 0,
					id: e.id,
					status:es
				}).then(res => {
					that.edit = false
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
			todelete(e){
				var that = this
				that.$confirm('确定要删除吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$api.post('/OpNoticeList', {
						optype: 2,
						delete: 1,
						id: e.id
					}).then(res => {
						that.edit = false
						that.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
						that.getswiperdata()
					}).catch(error => {
						console.error(error)
					})
				}).catch(() => {
							
				});
			},
			toedit() {
				var that = this
				if (that.name == '') {
					this.$notify({
						title: '缺少参数',
						message: '名称不能为空',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.info == '') {
					this.$notify({
						title: '缺少参数',
						message: '内容不能为空',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				that.$api.post('/OpNoticeList', {
					optype: 3,
					name: that.name,
					id: that.aimitem.id,
					info:that.info
				}).then(res => {
					that.edit = false
					that.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
					that.getswiperdata()
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			getswiperdata() {
				var that = this
				that.$api.post('/OpNoticeList', {
					optype: 1,
					page: that.page,
				}).then(res => {
					that.data_list = res.data.data
					console.log(res, 555)
					that.total = res.data.total
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

	.swiper-content {
		padding: 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		height: calc(100% - 50px);
		background-color: #FFFFFF;
		border-radius: 0.3rem;
	}

	.swiper-content-top {
		width: 100%;
		height: calc(100% - 50px);
		display: flex;
	}

	.swiper-top {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.swiper-top-search {
		width: 200px;
	}

	.swiper-top-button {
		padding: 0 30px;
		height: 40px;
		margin-left: 14px;
	}

	.swiper-content-top-name {
		font-size: 14px;
	}

	.content-popup-button {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding-top: 1rem;
	}

	.content-special_show-all {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.content-special_show-all-item {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.content-special_show-all-item-left {
		width: 4rem;
		font-size: 0.8rem;
	}

	.content-special_show-all-item-left-pic {
		width: 4rem;
		height: 4rem;
		border-radius: 0.5rem;
	}

	.content-special_show-all-item-left-input {
		width: calc(100% - 5rem);
		background-color: #F9F9F9;
		padding: 1rem 0.7rem;
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		text-align: center;
	}
</style>