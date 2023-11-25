<template>
	<div class="swiper">
		<div class="swiper-top">
			<div class="swiper-top-item" v-for="(item,index) in router">
				{{item.name}}
			</div>
		</div>
		<div class="swiper-bottom">
			<div class="swiper-top-item-top">
				<el-select v-model="ClassificationName" placeholder="全部运营指标" style="width: 150px;"
					@change="Change_Inspiration_Product_Classification">
					<el-option v-for="item in ClassificationData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-button type="success" plain @click="initdata(),edit_aim=true" size="mini">新增指标</el-button>
			</div>
			<div class="swiper-bottom-bottom">
				<div class="swiper-bottom-bottom-top">
					<el-table :data="info" stripe style="width: 100%;overflow-y: scroll;">
						<el-table-column prop="id" label="ID" width="100"></el-table-column>
						<el-table-column prop="classification_name" label="分类"></el-table-column>
						<el-table-column prop="name" label="名称"></el-table-column>
						<el-table-column prop="tips" label="说明"></el-table-column>
						<el-table-column prop="state_name" label="状态" width="100"></el-table-column>
						<el-table-column prop="create_time" label="创建时间"></el-table-column>
						<el-table-column label="操作" width="180">
							<template slot-scope="scope">
								<el-button @click="todeletegoods(scope.row)" type="text" size="small">删除</el-button>
								
								
								<el-button @click="toupgoods(2,scope.row)" type="text" size="small" v-if="scope.row.status==1">下架</el-button>
								<el-button @click="toupgoods(1,scope.row)" type="text" size="small" v-if="scope.row.status==2">上架</el-button>
								<el-button type="text" size="small" @click="aimitem=scope.row,getdata(),edit_aim=true">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="swiper-bottom-bottom-bottom">
					<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="perPage"
						:current-page="page" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>

		<el-dialog :title="aimitem?'编辑运营指标':'新增运营指标'" :visible.sync="edit_aim" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-top">
					<div class="content-special_show-top-line">
						<div class="content-special_show-top-line-name">
							分类
						</div>
						<el-select v-model="Classification_id" placeholder="请选择运营指标" style="width: 250px;">
							<el-option v-for="item in ClassificationData" :key="item.id" :label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</div>
					<div class="content-special_show-top-line">
						<div class="content-special_show-top-line-name">
							名称
						</div>
						<el-input v-model="name" placeholder="请输入名称"
							class="content-special_show-top-line-right"></el-input>
					</div>
					<div class="content-special_show-top-line">
						<div class="content-special_show-top-line-name">
							提示
						</div>
						<el-input v-model="tips" placeholder="请输入提示"
							class="content-special_show-top-line-right"></el-input>
					</div>
				</div>
				<div class="content-popup-button">
					<el-button size="mini" type="success" @click="toeditgoods">确认操作</el-button>
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
				router: [{
					name: '运营指标',
					links: ''
				}, ],
				info: [],
				ClassificationName: '',
				ClassificationData: [],
				page: 1,
				total: 0,
				edit_aim: false,
				aimitem: '',
				perPage:12,
				Classification_id: '',
				name: '',
				tips: '',

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
			that.getGGClassification()
		},
		methods: {
			getdata(){
				var that = this
				that.Classification_id = that.aimitem.classification_id
				that.name =that.aimitem.name
				that.tips = that.aimitem.tips
			},
			Change_Inspiration_Product_Classification(e) {
				var that = this
				that.page = 1
				that.getswiperdata()
			},
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
						that.base64Image = base64Image
						that.wechat = base64Image
					};
				});
			},
			getGGClassification() {
				var that = this
				that.wechat = ''
				that.base64Image = ''
				that.$api.post('/GGClassification').then(res => {
					that.ClassificationData = res.data
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			todeletegoods(es) {
				var that = this
				that.$api.post('/GGAddClassification', {
					optype:2,
					delete:1,
					id: es.id
				}).then(res => {
					if (res.code == 200) {
						that.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						that.edit_aim = false
						that.initdata()
					}
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			toupgoods(e,es) {
				var that = this
				that.$api.post('/GGAddClassification', {
					optype:2,
					delete:0,
					id: es.id,
					status:e
				}).then(res => {
					if (res.code == 200) {
						that.$notify({
							title: '成功',
							message: '操作成功',
							type: 'success'
						});
						that.edit_aim = false
						that.initdata()
					}
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			toeditgoods() {
				var that = this
				if (that.name == '') {
					this.$notify({
						title: '缺少参数',
						message: '请输入名称',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.Classification_id == '') {
					this.$notify({
						title: '缺少参数',
						message: '请选择分类',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				that.$api.post('/GGAddClassification', {
					optype:1,
					id:that.aimitem.id,
					name: that.name,
					tips: that.tips,
					classification_id: that.Classification_id
				}).then(res => {
					if (res.code == 200) {
						that.$notify({
							title: '成功',
							message: '新增成功',
							type: 'success'
						});
						that.edit_aim = false
						that.initdata()
						that.page = 1
						that.getswiperdata()
					}
					console.log(res, 555)
				}).catch(error => {
					console.error(error)
				})
			},
			initdata() {
				var that = this
				that.name = ''
				that.tips = ''
				that.Classification_id = ''
				that.aimitem = ''
			},
			getswiperdata() {
				var that = this
				that.$api.post('/GGClassificationList', {
					optype: 1,
					page: that.page,
					perPage:that.perPage,
					ClassificationName: that.ClassificationName
				}).then(res => {
					that.info = res.data
					that.total = res.count
					console.log(res, 555)
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
		padding: 0 2rem;
		justify-content: space-between;
	}

	.swiper-top {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.swiper-bottom {
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.swiper-top-item-top {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.swiper-bottom-bottom {
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.swiper-bottom-bottom-top {
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
	}

	.swiper-bottom-bottom-bottom {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.content-special_show-top {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.content-special_show-top-line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F9F9F9;
		padding: 1rem 0;
	}

	.content-special_show-top-line-name {
		width: 80px;
		text-align: center;
	}

	.content-special_show-top-line-right {
		width: calc(100% - 80px - 1rem);
	}

	.content-popup-button {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding-top: 1rem;
	}
</style>