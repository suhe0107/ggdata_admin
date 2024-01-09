<template>
	<div style="height: 100%;">
		<universalskeletonscreen v-if="showuniversalskeletonscreen"></universalskeletonscreen>
		<div class="content-bottom-sum" :style="isMobile?'':'padding: 2rem;padding-top: 1rem;'" v-else>
			<div class="content-bottom-sum-top">
				<div class="content-bottom-sum-top-left">
					<div class="content-bottom-sum-top-left-item">
						<div class="content-bottom-sum-top-left-item-num">
							{{first_data.wait_work}}
						</div>
						<div class="content-bottom-sum-top-left-item-data">
							待办
						</div>
					</div>
					<!-- 					<div class="content-bottom-sum-top-left-item">
						<div class="content-bottom-sum-top-left-item-num">
							15
						</div>
						<div class="content-bottom-sum-top-left-item-data" style="color: red;">
							即将到期
						</div>
					</div>
					<div class="content-bottom-sum-top-left-item">
						<div class="content-bottom-sum-top-left-item-num">
							20
						</div>
						<div class="content-bottom-sum-top-left-item-data">
							已延期
						</div>
					</div> -->
					<div class="content-bottom-sum-top-left-item">
						<div class="content-bottom-sum-top-left-item-num">
							{{first_data.wait_ok}}
						</div>
						<div class="content-bottom-sum-top-left-item-data">
							待您/您上级确认
						</div>
					</div>
					<div class="content-bottom-sum-top-left-item">
						<div class="content-bottom-sum-top-left-item-num">
							{{first_data.all_ok}}
						</div>
						<div class="content-bottom-sum-top-left-item-data">
							已确认完工
						</div>
					</div>
					<div class="content-bottom-sum-bottom-top-item">
						<div class="content-bottom-sum-bottom-top-item-name" style="width: 4rem;">
							查看对象
						</div>
						<el-select v-model="aim_user_id" placeholder="请选择查看对象" style="width: 150px;" clearable
							@change="chageaim_user_id">
							<el-option v-for="item in user_id_relationship" :key="item.user_id"
								:label="item.up_user_name" :value="item.user_id">
							</el-option>
						</el-select>
					</div>
					<div class="content-bottom-sum-bottom-top-item">
						<div class="content-bottom-sum-bottom-top-item-name" style="width: 4rem;">
							任务状态
						</div>
						<el-select v-model="status" placeholder="请选择任务状态" style="width: 150px;" clearable
							@change="chageaim_status">
							<el-option v-for="item in status_list" :key="item.id"
								:label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<div class="content-bottom-sum-bottom-top-item">
						<div class="content-bottom-sum-bottom-top-item-name">
							搜索任务
						</div>
						<el-input v-model="keyword" placeholder="请输入任务名称" clearable><i slot="prefix"
								class="el-input__icon el-icon-search"></i></el-input>
					</div>

					<el-button type="primary" icon="el-icon-search" @click="getdata" size="medium">搜索</el-button>
				</div>
				<div class="content-bottom-sum-top-right">

					<div class="content-bottom-sum-top-right-item" style="margin-left: 1rem;">
						<el-button type="primary" @click="initdata(),edit_aim=true" size="medium">新增任务</el-button>
					</div>
				</div>
			</div>
			<div class="content-bottom-sum-bottom">
				<el-table :data="data" stripe style="width: 100%;overflow-y: scroll;min-height: 100%;">
					<el-table-column prop="id" label="ID" width="100"></el-table-column>
					<el-table-column prop="name" label="任务名称"></el-table-column>
					<el-table-column prop="create_name" label="创建人" width="150"></el-table-column>
					<el-table-column prop="create_times" label="创建时间" width="180"></el-table-column>
					<el-table-column prop="workok_times" label="完成时间" width="180"></el-table-column>
					<el-table-column prop="complete_times" label="确认时间" width="180"></el-table-column>
					<el-table-column label="状态" width="100">
						<template slot-scope="scope">
							<div v-if="scope.row.status==1">
								待办
							</div>
							<div v-if="scope.row.status==2" style="color: red;">
								进行中
							</div>
							<div v-if="scope.row.status==3">
								已完成
							</div>
							<div v-if="scope.row.status==4">
								已确认
							</div>
							<div v-if="scope.row.status==5">
								已取消
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="showdetail(scope.row)" type="text" size="small">详情</el-button>
							<el-button @click="cancel(scope.row)" type="text" size="small"
								v-if="scope.row.status==1">取消</el-button>
							<el-button @click="okwork(scope.row)" type="text" size="small"
								v-if="scope.row.status==1">完成</el-button>
							<el-button @click="allok(scope.row)" type="text" size="small"
								v-if="scope.row.status==3">确认完工</el-button>
							<el-button type="text" size="small" @click="editdetail(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="content-bottom-sum-pagination">
				<div style="color: gray;font-size: 0.85rem;">
					每页 {{perPage}} 行 共 {{total}} 行
				</div>
				<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="perPage"
					:current-page="page" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog :title="'查看任务详情'" :visible.sync="detail_show" :close-on-click-modal="false">
			<div class="content-special_show">
				<div class="content-special_show-line">
					<div class="content-special_show-line-left">
						任务名称
					</div>
					<div class="content-special_show-line-name">
						{{aimdetail.name}}
					</div>
				</div>
				<div class="content-special_show-line" style="align-items: flex-start;">
					<div class="content-special_show-line-left">
						任务内容
					</div>
					<div class="content-special_show-line-name"
						style="min-height: 30vh;background-color: #F9F9F9;padding:0rem 1rem;border-radius: 0.3rem;"
						v-html="aimdetail.content">

					</div>
				</div>
				<div class="content-special_show-line" v-if="aimdetail.create_time">
					<div class="content-special_show-line-left">
						创建时间
					</div>
					<div class="content-special_show-line-name">
						{{aimdetail.create_times}}
					</div>
				</div>
				<div class="content-special_show-line" v-if="aimdetail.workok_time">
					<div class="content-special_show-line-left">
						完成时间
					</div>
					<div class="content-special_show-line-name">
						{{aimdetail.workok_times}}   【完成耗时：{{diffInHours(aimdetail.create_time,aimdetail.workok_time)}}】
					</div>
				</div>
				<div class="content-special_show-line" v-if="aimdetail.complete_time">
					<div class="content-special_show-line-left">
						上级确认时间
					</div>
					<div class="content-special_show-line-name">
						{{aimdetail.complete_times}}  【确认耗时：{{diffInHours(aimdetail.workok_time,aimdetail.complete_time)}}】
					</div>
				</div>
				<div class="content-special_show-line" v-if="aimdetail.cancel_time">
					<div class="content-special_show-line-left">
						取消时间
					</div>
					<div class="content-special_show-line-name">
						{{aimdetail.cancel_time}}
					</div>
				</div>
			</div>
		</el-dialog>

		<el-dialog :title="aimdetail?'编辑任务':'新增任务'" :visible.sync="edit_aim" :close-on-click-modal="false">
			<div class="edit_aim-show">
				<div class="edit_aim-show-line">
					<div class="edit_aim-show-line-title">
						任务名称
					</div>
					<el-input v-model="name" placeholder="请输入任务名称" class="edit_aim-show-line-right"></el-input>
				</div>
				<div class="edit_aim-show-line">
					<div class="edit_aim-show-line-title">
						指派给谁
					</div>
					<div class="edit_aim-show-line-right">
						<el-select v-model="next_user_id" placeholder="请选择指派给谁" style="width: 250px;">
							<el-option v-for="item in user_id_relationship" :key="item.user_id"
								:label="item.up_user_name" :value="item.user_id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="edit_aim-show-line">
					<div class="edit_aim-show-line-title">
						任务详情
					</div>
					<div class="edit_aim-show-line-right">
						<WangEditor v-model="content" id='content'></WangEditor>
					</div>
				</div>
				<div class="edit_aim-show-line" style="justify-content: flex-end;">
					<el-button type="primary" plain @click="okedit" size="medium">确认操作</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: '',
				data: [],
				showuniversalskeletonscreen: true,
				isMobile: false,
				routepath: '/',

				aimdetail: '',
				detail_show: false,
				edit_aim: false,
				page: 1,
				perPage: 10,
				total: 0,
				keyword: '',
				aim_user_id: '',

				name: '',
				content: '',
				next_user_id: '',
				user_id_relationship: [],
				first_data: [],
				status:9,
				status_list:[
					{id:9,name:'全部状态'},
					{id:1,name:'待办'},
					{id:2,name:'进行中'},
					{id:3,name:'已完成'},
					{id:4,name:'已确认'},
					{id:5,name:'已取消'},
				]
			}
		},
		created() {
			var that = this
			that.showuniversalskeletonscreen = true
			that.userinfo = this.$tool.GetUserInfo()
			that.aim_user_id = that.userinfo.ggid
			that.GetWorkBaseData()
			this.getdata().then(res => {
				this.showuniversalskeletonscreen = false
			})
		},
		methods: {
			chageaim_status(e){
				var that = this
				that.status = e
				that.page = 1
				that.getdata()
			},
			chageaim_user_id(e) {
				var that = this
				that.aim_user_id = e
				that.page = 1
				that.getdata()
			},
			check_can_op_user_id() {
				var that = this
				return new Promise((resolve, reject) => {
					that.user_id_relationship.forEach(function(item, index) {
						if (item.up_user_id == that.userinfo.ggid) {
							resolve(true)
						}
					});
					resolve(false)
				})
			},
			diffInHours(startTimestamp, endTimestamp) {
				const diffInSeconds = Math.abs(endTimestamp - startTimestamp);
				const days = Math.floor(diffInSeconds / (24 * 60 * 60));
				const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
				if (days) {
					var str = days + '天' + hours + 'h'
				} else {
					var str = hours + 'h'
				}
				return str;
			},
			allok(e) {
				var that = this
				that.aimdetail = e
				that.check_can_op_user_id().then(res => {
					if (!res) {
						this.$notify({
							title: '无法确认',
							message: '您只能确认您的下级工作',
							position: 'bottom-right',
							type: 'error'
						});
						return
					}
					this.$confirm('确定要完成此任务吗？认真工作，谨慎操作', '完成任务', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var data = {
							optype: 4,
							id: that.aimdetail.id,
						}
						that.$api.post('/OpWorkInfo', data).then(res => {
							if (res.code == 200) {
								that.$notify({
									title: '成功',
									message: '操作成功',
									type: 'success'
								});
								that.initdata()

								that.page = 1
								that.getdata()
							} else {
								this.$notify({
									title: '操作错误',
									message: res.msg,
									position: 'bottom-right',
									type: 'error'
								});
							}
						}).catch(error => {
							console.error(error)
						})
					}).catch(() => {

					});
				})
			},
			editdetail(e) {
				var that = this
				that.aimdetail = e
				if (that.aimdetail.generate_by_user_id !== that.aim_user_id) {
					this.$notify({
						title: '无法编辑',
						message: '上级指派的任务您无法编辑',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				that.name = that.aimdetail.name
				that.content = that.aimdetail.content
				that.next_user_id = that.aimdetail.generate_by_user_id
				that.edit_aim = true
			},
			cancel(e) {
				var that = this
				that.aimdetail = e
				
				if (that.aimdetail.generate_by_user_id !== that.aim_user_id) {
					this.$notify({
						title: '无法取消',
						message: '上级指派的任务您无法取消',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				this.$confirm('确定要取消此任务吗？认真工作，谨慎操作', '取消任务', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var data = {
						optype: 5,
						id: that.aimdetail.id,
					}
					that.$api.post('/OpWorkInfo', data).then(res => {
						if (res.code == 200) {
							that.$notify({
								title: '成功',
								message: '操作成功',
								type: 'success'
							});
							that.initdata()
								
							that.page = 1
							that.getdata()
						} else {
							this.$notify({
								title: '操作错误',
								message: res.msg,
								position: 'bottom-right',
								type: 'error'
							});
						}
					}).catch(error => {
						console.error(error)
					})
				}).catch(() => {
								
				});
			},
			okwork(e) {
				var that = this
				that.aimdetail = e
				this.$confirm('确定要完成此任务吗？认真工作，谨慎操作', '完成任务', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var data = {
						optype: 3,
						id: that.aimdetail.id,
					}
					that.$api.post('/OpWorkInfo', data).then(res => {
						if (res.code == 200) {
							that.$notify({
								title: '成功',
								message: '操作成功',
								type: 'success'
							});
							that.initdata()

							that.page = 1
							that.getdata()
						} else {
							this.$notify({
								title: '操作错误',
								message: res.msg,
								position: 'bottom-right',
								type: 'error'
							});
						}
					}).catch(error => {
						console.error(error)
					})
				}).catch(() => {

				});
			},
			okedit() {
				var that = this
				if (that.name == '') {
					this.$notify({
						title: '缺少参数',
						message: '请输入任务名称',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				if (that.next_user_id == '') {
					this.$notify({
						title: '缺少参数',
						message: '请选择指派给谁',
						position: 'bottom-right',
						type: 'error'
					});
					return
				}
				var data = {
					optype: 1,
					id: that.aimdetail.id,
					name: that.name,
					content: that.content,
					user_id:  that.next_user_id,
					generate_by_user_id: that.userinfo.ggid,
				}
				that.$api.post('/OpWorkInfo', data).then(res => {
					console.log(res)
					if (res.code == 200) {
						that.$notify({
							title: '成功',
							message: '操作成功',
							type: 'success'
						});
						that.edit_aim = false
						that.initdata()

						that.page = 1
						that.getdata()
					}
				}).catch(error => {
					console.error(error)
				})
			},
			initdata() {
				var that = this
				that.name = ''
				that.aimdetail = ''
				that.next_user_id = ''
				that.content = ''
			},
			showdetail(e) {
				var that = this
				that.detail_show = true
				that.aimdetail = e
			},
			nextpage(e) {
				var that = this
				that.page = e
				that.getdata()
			},
			getdata() {
				var that = this
				return new Promise((resolve, reject) => {
					that.$api.post('/GetWorkList', {
						id: that.aim_user_id,
						page: that.page,
						keyword: that.keyword,
						status:that.status
					}).then(res => {
						that.data = res.data
						that.total = res.total
						console.log(res, 555)
						resolve(true)

					}).catch(error => {
						console.error(error)
					})
				})
			},
			GetWorkBaseData() {
				var that = this
				return new Promise((resolve, reject) => {
					that.$api.post('/GetWorkBaseData', {
						id: that.userinfo.ggid,
					}).then(res => {
						console.log(res, 4545)
						that.first_data = res.first_data
						var user_id_relationship = res.user_id_relationship
						var myself = {
							up_user_name: that.userinfo.name,
							user_id: that.userinfo.ggid
						}
						user_id_relationship.unshift(myself)
						that.user_id_relationship = user_id_relationship
						console.log(that.user_id_relationship)
						resolve(true)
					}).catch(error => {
						console.error(error)
					})
				})
			}
		}
	}
</script>

<style scoped>
	.content-bottom-sum {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.5rem;
		padding-bottom: 1rem;
	}

	.content-bottom-sum-top {
		background-color: #fafafa;
		padding: 0rem 1.5rem;
		border-radius: 0.5rem;
		height: 6rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.content-bottom-sum-bottom {
		background-color: #fafafa;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		width: 100%;
		height: calc(100% - 6rem - 10px - 40px);
	}

	.content-bottom-sum-pagination {
		width: 100%;
		height: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.content-bottom-sum-top-left-item {
		width: calc(100% / 7);
		display: flex;
		flex-direction: column;
	}

	.content-bottom-sum-top-left {
		width: 70%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.content-bottom-sum-top-left-item-num {
		font-size: 1.3rem;
		font-weight: bold;
	}

	.content-bottom-sum-top-left-item-data {
		font-size: 0.9rem;
		margin-top: 0.3rem;
	}

	.content-special_show {
		padding-bottom: 2rem;
	}

	.content-special_show-line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.2rem;
	}

	.content-special_show-line-left {
		width: 15%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		font-size: 1rem;
		color: gray;
	}

	.content-special_show-line-name {
		width: calc(100% - 15% - 2rem);
		font-size: 1rem;
	}

	.edit_aim-show-line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.2rem;
	}

	.edit_aim-show-line-title {
		width: 10%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		font-size: 1rem;
		color: gray;
	}

	.edit_aim-show-line-right {
		width: calc(100% - 10% - 2rem);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.content-bottom-sum-bottom-top {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 4rem;
	}

	.content-bottom-sum-bottom-top-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 1rem;
	}

	.content-bottom-sum-bottom-top-item-name {
		font-size: 1rem;
		color: gray;
		margin-right: 0.7rem;
		width: 6rem;
	}

	.content-bottom-sum-top-right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>