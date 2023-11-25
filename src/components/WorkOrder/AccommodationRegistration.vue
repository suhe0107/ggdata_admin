<template>
	<div class="swiper">
		<div class="swiper-top">
			<el-input v-model="keyword" placeholder="请输入氏名（Name）" class="swiper-top-search"></el-input>
			<el-button type="primary" @click="tosearch" class="swiper-top-button">
				搜索</el-button>
		</div>
		<div class="swiper-content">
			
			<div class="swiper-content-top">
				<el-table :data="data_list" stripe style="width: 100%">
					<el-table-column prop="id" label="单号" width="100">
					</el-table-column>
					<el-table-column prop="registration_name" label="宿泊施設名" width="100">
					</el-table-column>
					<el-table-column prop="time1" label="入居日（Check-in）">
					</el-table-column>
					<el-table-column prop="time2" label="退居日（Check out）">
					</el-table-column>
					<el-table-column prop="name" label="氏名（Name）" width="150">
					</el-table-column>
					<el-table-column prop="nationality" label="国籍（Nationality）" width="170">
					</el-table-column>
					<el-table-column prop="age" label="年齢（Age）" width="150">
					</el-table-column>
					<el-table-column prop="phone" label="パスポート番号（Passport Number）">
					</el-table-column>
					<el-table-column prop="commnet" label="コメント（Comments on a form）">
					</el-table-column>
					<el-table-column label="パスポートの写真をアップロード（Upload passport photos）" width="200px">
						<template slot-scope="scope">
							<el-image
							      style="width: 50px; height: 50px"
							      :src="scope.row.pic"></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间">
					</el-table-column>
				</el-table>
			</div>

		</div>
		<div class="el-pagination-bottom">
			<el-pagination @current-change="nextpage" background layout="prev, pager, next" :page-size="10"
				:current-page="page" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				total:0,
				keyword:'',
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
			tosearch(){
				var that = this
				that.page = 1
				that.getswiperdata()
			},
			getswiperdata() {
				var that = this
				that.$api.post('/OpCustomerWorkOrder', {
					optype: 1,
					page: that.page,
					keyword:that.keyword,
					type:1
				}).then(res => {
					console.log(res)
					that.data_list = res.data.data
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
	.swiper-top{
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
	}
	.swiper-top-search{
		width: 200px;
	}
	.swiper-top-button{
		padding: 0 30px;
		height: 40px;
		margin-left: 14px;
	}
	.swiper-content-top-name {
		font-size: 14px;
	}
</style>