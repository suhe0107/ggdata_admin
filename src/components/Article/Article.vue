<template>
	<div class="swiper">
		<div class="swiper-top">
			<el-button type="primary" @click="edit=true,initdata()" class="swiper-top-button">
				新增文章</el-button>
		</div>
		<div class="swiper-content">

			<div class="swiper-content-top">
				<el-table :data="data_list" stripe style="width: 100%">
					<el-table-column prop="id" label="序号" width="100">
					</el-table-column>
					<el-table-column prop="classification_names" label="所属分类" width="200">
					</el-table-column>
					<el-table-column prop="classification_name" label="所属板块" width="200">
					</el-table-column>
					<el-table-column prop="name" label="名称">
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
							<el-button type="text"  @click="toeditnow(scope.row)">编辑</el-button>
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
		<el-dialog :title="aimitem?'编辑'+'文章':'新增'+'文章'" :visible.sync="edit" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							分类
						</div>
						<el-select v-model="classification_id" placeholder="请选择分类">
						  <el-option v-for="item in classification" :key="item.id" :label="item.name"
						  	:value="item.id">
						  </el-option>
						</el-select>
					</div>
				</div>

				<div v-if="classification_id==8">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							名称
						</div>
						<input v-model="name" type="text" placeholder="请输入文章名称"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							提示
						</div>
						<input v-model="tips" type="text" placeholder="请输入提示"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							招聘人数
						</div>
						<input v-model="work_num" type="number" placeholder="请输入招聘人数"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							职位类型
						</div>
						<input v-model="work_type" type="text" placeholder="请输入职位类型"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							工作内容
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="work_content" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							任职要求
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="work_ask" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							职位待遇
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="work_happy" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
				</div>
				
				<div v-if="classification_id==7">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							名称
						</div>
						<input v-model="name" type="text" placeholder="请输入文章名称"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							内容
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="info" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
				</div>
				
				<div v-if="classification_id==6">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							二级分类
						</div>
						<el-select v-model="classification_id2" placeholder="请选择二级分类">
						  <el-option v-for="item in classification2" :key="item.id" :label="item.name"
						  	:value="item.id">
						  </el-option>
						</el-select>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							名称
						</div>
						<input v-model="name" type="text" placeholder="请输入文章名称"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							人民币价格
						</div>
						<input v-model="pirce_cn" type="text" placeholder="请输入人民币价格"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							日元价格
						</div>
						<input v-model="prcie_jn" type="text" placeholder="请输入日元价格"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							提示
						</div>
						<input v-model="tips" type="text" placeholder="提示"
							class="content-special_show-all-item-left-input"></input>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							详情
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="more_info" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							推荐理由
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="re" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							备注
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="remark" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							物件所在地
						</div>
						<div style="width: calc(100% - 10rem);">
							<vue-ueditor-wrap ref="tips" v-model="address" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
				</div>

			<!-- 	<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							内容
						</div>
						<div style="width: calc(100% - 4rem);">
							<vue-ueditor-wrap ref="tips" v-model="info" :config="editorConfig"
								:destroy="true" />
						</div>
					</div>
				</div> -->
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							图片
						</div>
						<label for="file-uploads">
							<img style="width: 50px;height: 50px;"
								:src="pic?pic:'https://img1.baidu.com/it/u=886800233,2359956977&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'">
						</label>
						</el-button>
						<input id="file-uploads" type="file" title="" :multiple="false" ref="myfile" accept="image/*"
							@change="handleFileChange" />
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
			
				total: 0,
				keyword: '',
				data_list: [],
				page:1,
				perPage:10,
				routepath: '',
				base64Image:'',
				
				classification:[],
				classification_id:'',
				
				classification2:[],
				classification_id2:'',
				
				pic:'',
				name: '',
				tips:'',
				work_num:'',
				work_content:'',
				work_ask:'',
				work_happy:'',
				work_type:'',
				
				more_info:'',
				re:'',
				remark:'',
				address:'',
				pirce_cn:'',
				prcie_jn:'',
				
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
			
			that.$api.post('/OpArticle', {
				optype: 4,
			}).then(res => {
				console.log(res, 555)
				that.classification = res.data.classification1
				that.classification2 = res.data.classification2
				console.log(that.classification, 666)
			}).catch(error => {
				console.error(error)
			})
		},
		methods: {
			nextpage(e) {
				var that = this
				that.page = e
				that.getswiperdata()
			},
			initdata(){
				var that = this
				that.aimitem = ''
				that.name = ''
				that.tips = ''
				that.pic = ''
				that.classification_id = ''
				that.classification_id2 = ''
				that.work_num = ''
				that.work_content=''
				that.work_ask=''
				that.work_happy=''
				that.base64Image = ''
				that.work_type=''
				that.info = ''
				
				that.more_info=''
				that.re=''
				that.remark=''
				that.address=''
				that.pirce_cn=''
				that.prcie_jn=''
			},
			toeditnow(e){
				var that = this
				that.initdata()
				that.aimitem = e
				that.name = e.name
				that.tips = e.tips
				that.pic = e.pic
				that.classification_id = e.classification_id
				that.classification_id2 = e.classification_id
				that.work_num = e.work_num
				that.work_content=e.work_content
				that.work_ask=e.work_ask
				that.work_happy=e.work_happy
				that.work_type=e.work_type
				that.info = e.info
				
				that.more_info=e.more_info
				that.re=e.re
				that.remark=e.remark
				that.address=e.address
				that.pirce_cn=e.pirce_cn
				that.prcie_jn=e.prcie_jn
				
				that.edit = true
			},
			handleFileChange(e) {
				var that = this
				var files = Array.prototype.slice.call(e.target.files)
				files.forEach((item, index) => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						var base64Image = reader.result;
						that.pic = base64Image
						that.base64Image = base64Image
					};
				});
			},
			onEditorChange(){
				var that = this
			},
			toshow(e,es){
				var that = this
				that.$api.post('/OpArticle', {
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
					that.$api.post('/OpArticle', {
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
				if (that.pic == '') {
					this.$notify({
						title: '缺少参数',
						message: '请上传图片',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.classification_id == 6 && that.classification_id2=='') {
					this.$notify({
						title: '缺少参数',
						message: '请选择二级分类',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if(that.base64Image){
					that.$api.post('/GetUploadPic',{
						base64Image:that.pic
					}).then(res => {
						that.pic = res.data
						// console.log(res)
						that.toeditup()
					}).catch(error => {
						console.error(error)
					})
				}else{
					that.toeditup()
				}
			},
			toeditup(){
				var that = this
				var data = {
					optype: 3,
					name: that.name,
					id: that.aimitem.id,
					tips:that.tips,
					pic:that.pic,
					classification_id:that.classification_id
				}
				data.work_num=that.work_num
				data.work_content=that.work_content
				data.work_ask=that.work_ask
				data.work_happy=that.work_happy
				data.work_type=that.work_type
				data.info=that.info
				
				data.more_info = that.more_info
				data.re = that.re
				data.remark = that.remark
				data.address = that.address
				data.pirce_cn = that.pirce_cn
				data.prcie_jn = that.prcie_jn
				data.classification_id2 = that.classification_id2
				console.log(data)
				that.$api.post('/OpArticle',data).then(res => {
					that.edit = false
					// that.initdata()
					// that.$notify({
					// 	title: '成功',
					// 	message: res.msg,
					// 	type: 'success'
					// });
					// that.getswiperdata()
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			getswiperdata() {
				var that = this
				that.$api.post('/OpArticle', {
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
		width: calc(100% - 15rem);
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