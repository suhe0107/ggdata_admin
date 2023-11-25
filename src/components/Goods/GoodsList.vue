<template>
	<div class="swiper">
		<div class="swiper-top">
			<el-select v-model="goods_type" placeholder="请选择分类" @change="changegoods_type">
			  <el-option v-for="item in classification" :key="item.id" :label="item.name"
			  	:value="item.id">
			  </el-option>
			</el-select>
			<el-button type="primary" @click="edit=true,initdata()" class="swiper-top-button">
				新增商品</el-button>
		</div>
		<div class="swiper-content">
			<div class="swiper-content-top">
				<el-table :data="data_list" stripe>
					<el-table-column prop="id" label="序号" width="100">
					</el-table-column>
					<el-table-column prop="goods_type_name" label="所属分类" width="100">
					</el-table-column>
					<el-table-column prop="name" label="商品名称">
					</el-table-column>
					<el-table-column prop="tips" label="商品说明">
					</el-table-column>
					<el-table-column label="封面" width="100">
						<template slot-scope="scope">
							<el-image
							      style="width: 50px; height: 50px"
							      :src="scope.row.pic"></el-image>
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
							<el-button type="text"  @click="toeditnow(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</div>

			
		</div>
		<div class="el-pagination-bottom" v-if="total>0">
			<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="perPage"
				:current-page="page" :total="total">
			</el-pagination>
			共{{total}}个结果
		</div>
		<el-dialog :title="aimitem?'编辑'+'商品':'新增'+'商品'" :visible.sync="edit" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-all-item">
					<div class="content-special_show-all-item-left">
						分类
					</div>
					<el-select v-model="goods_type2" placeholder="请选择分类">
					  <el-option v-for="item in classification2" :key="item.id" :label="item.name"
					  	:value="item.id">
					  </el-option>
					</el-select>
				</div>
				<div class="content-special_show-all-item">
					<div class="content-special_show-all-item-left">
						名称
					</div>
					<input v-model="name" type="text" placeholder="请输入名称"
						class="content-special_show-all-item-left-input"></input>
				</div>
				<div class="content-special_show-all-item">
					<div class="content-special_show-all-item-left">
						说明
					</div>
					<div style="width: 100%;">
						<vue-ueditor-wrap ref="tips" v-model="tips" :config="editorConfig"
							:destroy="true" />
					</div>
				</div>
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
				<div class="content-popup-button">
					<el-button size="mini" type="primary" @click="tookgoods">确认操作</el-button>
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
				perPage:10,
				goods_type:99,
				classification:[],
				page: 1,
				total: 0,
				data_list: [],
				
				edit: false,
				info:'',
				aimitem: '',
			
				pic:'',
				name: '',
				tips:'',
				piclist:[],
				classification2:[],
				goods_type2:'',
				
				routepath: '',
				base64Image:'',
				
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
			
			that.$api.post('/OpGoods', {
				optype: 4,
			}).then(res => {
				that.classification = res.data
				that.classification2 = res.data
				console.log(res, 555)
			}).catch(error => {
				console.error(error)
			})
		},
		methods: {
			changegoods_type(e){
				var that = this
				that.page = 1
				that.getswiperdata()
			},
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
				that.goods_type2 = ''
			},
			toeditnow(e){
				var that = this
				that.initdata()
				that.aimitem = e
				that.name = e.name
				that.tips = e.tips
				that.pic = e.pic
				that.goods_type2 = e.goods_type
				that.edit = true
			},
			tookgoods(){
				var that = this
				if (that.goods_type2 == '') {
					this.$notify({
						title: '缺少参数',
						message: '请选择分类',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.goods_type2 == 99) {
					this.$notify({
						title: '缺少参数',
						message: '请选择分类',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.name == '') {
					this.$notify({
						title: '缺少参数',
						message: '名称不能为空',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.tips == '') {
					this.$notify({
						title: '缺少参数',
						message: '请输入说明',
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
				if(that.base64Image){
					that.$api.post('/GetUploadPic',{
						base64Image:that.pic
					}).then(res => {
						that.pic = res.data
						that.tookgoodsup()
					}).catch(error => {
						console.error(error)
					})
				}else{
					that.tookgoodsup()
				}
			},
			tookgoodsup(){
				var that = this
					that.$api.post('/OpGoods', {
						optype: 3,
						id: that.aimitem.id,
						name:that.name,
						pic:that.pic,
						piclist:that.piclist,
						goods_type:that.goods_type2,
						tips:that.tips
					}).then(res => {
						console.log(res)
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
				that.$api.post('/OpGoods', {
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
					that.$api.post('/OpGoods', {
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
			getswiperdata() {
				var that = this
				that.$api.post('/OpGoods', {
					optype: 1,
					page: that.page,
					goods_type:that.goods_type,
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
		overflow: scroll;
	}

	.swiper-content-top {
		width: 100%;
		height: calc(100% - 50px - 50px);
	}

	.swiper-top {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
	
	.el-pagination-bottom{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		font-size: 16px;
		color: gray;
	}
</style>