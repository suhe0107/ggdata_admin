<template>
	<div class="swiper">
		<div class="swiper-top">
			<el-button type="primary" @click="edit=true,name='',aimitem='',tips=''" class="swiper-top-button">
				新增合作伙伴</el-button>
		</div>
		<div class="swiper-content">

			<div class="swiper-content-top">
				<el-table :data="data_list" stripe style="width: 100%">
					<el-table-column prop="id" label="序号">
					</el-table-column>
					<el-table-column prop="name" label="合作伙伴名称">
					</el-table-column>
					<el-table-column prop="tips" label="说明">
					</el-table-column>
					<el-table-column prop="status_name" label="状态">
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间">
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间">
					</el-table-column>
					<el-table-column fixed="right" label="图片">
						<template slot-scope="scope">
							<el-image
							      style="width: 50px; height: 50px"
							      :src="scope.row.pic"></el-image>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button type="text"  @click="todelete(scope.row)">删除</el-button>
							<el-button type="text" v-if="scope.row.status==2" @click="toshow(scope.row,1)">显示</el-button>
							<el-button type="text" v-if="scope.row.status==1" @click="toshow(scope.row,2)">隐藏</el-button>
							<el-button type="text" @click="aimitem=scope.row,name=scope.row.name,tips=scope.row.tips,edit=true,pic=scope.row.pic">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		
		</div>
	<div class="el-pagination-bottom">
				<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="10"
					:current-page="page" :total="total">
				</el-pagination>
			</div>
		<el-dialog :title="aimitem?'编辑'+'合作伙伴':'新增'+'合作伙伴'" :visible.sync="edit" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							名称
						</div>
						<input v-model="name" type="text" placeholder="请输入合作伙伴名称"
							class="content-special_show-all-item-left-input"></input>
					</div>
				</div>
				<div class="content-special_show-all">
					<div class="content-special_show-all-item">
						<div class="content-special_show-all-item-left">
							说明
						</div>
						<input v-model="tips" type="text" placeholder="请输入说明内容"
							class="content-special_show-all-item-left-input"></input>
					</div>
				</div>
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
	export default {
		data() {
			return {
				edit: false,
				aimitem: '',
				name: '',
				tips:'',
				pic:'',
				total: 0,
				keyword: '',
				data_list: [],
				page: 1,
				routepath: '',
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
			handleFileChange(e) {
				var that = this
				var files = Array.prototype.slice.call(e.target.files)
				files.forEach((item, index) => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						var base64Image = reader.result;
						that.pic = base64Image
					};
				});
			},
			toshow(e,es){
				var that = this
				that.$api.post('/OpPartners', {
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
					that.$api.post('/OpPartners', {
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
				if(!that.name){
					this.$notify({
						title: '操作失败',
						message: '请输入合作伙伴名称',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if(!that.tips){
					this.$notify({
						title: '操作失败',
						message: '请输入备注',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if(!that.pic){
					this.$notify({
						title: '操作失败',
						message: '请上传图片',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}

				that.$api.post('/GetUploadPic',{
					base64Image:that.pic
				}).then(res => {
					that.pic = res.data
					// console.log(res)
					
					that.$api.post('/OpPartners', {
						optype: 3,
						name: that.name,
						id: that.aimitem.id,
						tips:that.tips,
						pic:that.pic
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
				}).catch(error => {
					console.error(error)
				})
			},
			getswiperdata() {
				var that = this
				that.$api.post('/OpPartners', {
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
		height: calc(100% - 100px);
		background-color: #FFFFFF;
		border-radius: 0.3rem;
	}

	.swiper-content-top {
		width: 100%;
		height: calc(100% - 10px);
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