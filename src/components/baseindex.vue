<template>
	<div>
		<universalskeletonscreen v-if="showuniversalskeletonscreen"></universalskeletonscreen>
		<div class="content-bottom-sum" :style="isMobile?'':'padding: 2rem;padding-top: 1rem;'" v-else>
			<div style="width: 100%;display: flex;flex-direction: column;" v-if="isMobile">
				<div style="display: flex;flex-direction: column;">
					<div style="font-size: 0.8rem;margin-bottom: 0.5rem;">
						选择时间段：
					</div>
					<el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="changetime" value-format="timestamp">
					</el-date-picker>
				</div>
				
				<div style="font-size: 0.8rem;margin-top: 0.5rem;">
					数据时间段：{{showtimename}}
				</div>
			</div>
			<div style="width: 100%;display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;" v-else>
				<div style="display: flex;flex-direction: row;align-items: center;font-size: 1rem;">
					选择时间段：
					<el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="changetime" value-format="timestamp">
					</el-date-picker>
				</div>
				
				<div style="margin-left:2rem;font-size: 1rem;">
					数据时间段：{{showtimename}}
				</div>
			</div>
			<div class="content-bottom-sum-item" v-for="(item,index) in tvdata" style="">
				<div class="content-bottom-sum-item-top">
					<div class="content-bottom-sum-item-top-name">
						{{item.name}}
					</div>
					<div class="content-bottom-sum-item-top-tips" v-if="isMobile">
						共{{item.data_list.length}}项数据
					</div>
					<div class="content-bottom-sum-item-top-tips" style="font-size: 0.8rem;" v-else>
						共{{item.data_list.length}}项数据
					</div>
				</div>
				<div class="content-bottom-sum-item-bottom">
					<div class="content-bottom-sum-item-bottom-info" v-for="(items,indexs) in item.data_list">
						<div class="content-bottom-sum-item-bottom-item">
							<div class="content-bottom-sum-item-bottom-item-num" v-if="isMobile">
								{{items.name_data}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-num" style="font-size: 1.2rem;" v-else>
								{{items.name_data}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-name" v-if="isMobile">
								{{items.name}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-name"
								style="font-size: 0.8rem;margin-top: 0.5rem;" v-else>
								{{items.name}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-title" v-if="starttime" :style="isMobile?'font-size: 0.5rem;top: 0.3rem;left: 0.3rem;':''">
								<div class="content-bottom-sum-item-bottom-item-title-info" v-if="items.sum_type==1">
									求和
								</div>
								<div class="content-bottom-sum-item-bottom-item-title-info" v-if="items.sum_type==2" style="background-color: #ff0000;">
									平均
								</div>
								<div class="content-bottom-sum-item-bottom-item-title-info" v-if="items.sum_type==3" style="background-color: #0055ff;">
									最新
								</div>
							</div>
						</div>
					</div>
		
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseindex from './../components/baseindex.vue';
	export default {
		components: {
			baseindex
		},
		data() {
			return {
				showuniversalskeletonscreen:true,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value2: '',
				isMobile: false,
				routepath: '/',
				tvdata: [],
				
				starttime:'',
				endtime:'',
				showtimename:''
			}
		},
		created() {
			var nowtime =  this.$tool.get_todaytime()
			this.showtimename = nowtime.all
			console.log(nowtime)
			this.isMobile = this.$tool.isMobile()
			this.routepath = this.$route.path
			this.getdata().then(res=>{
				this.showuniversalskeletonscreen = false
			})
		},
		methods: {
			changetime(e){
				var that = this
				if(e){
					that.starttime =  Math.floor(e[0] / 1000);
					that.endtime =  Math.floor(e[1] / 1000);
					that.showtimename = that.$tool.get_todaytime(that.starttime).all+' 至 ' + that.$tool.get_todaytime(that.endtime).all
					this.getdata().then(res=>{
						this.showuniversalskeletonscreen = false
					})
				}else{
					var nowtime =  this.$tool.get_todaytime()
					this.showtimename = nowtime.all
					that.starttime = ''
					that.endtime = ''
					this.getdata().then(res=>{
						this.showuniversalskeletonscreen = false
					})
				}
			},
			jisuan(e) {
				var num = e + 1
				if (num % 6 == 0) {
					return true;
				} else {
					return false;
				}
			},
			getdata() {
				var that = this
				this.showuniversalskeletonscreen = true
				return new Promise((resolve, reject) => {
					that.$api.post('/GGWebIndex', {
						today_start:that.starttime,
						today_end:that.endtime
					}).then(res => {
						that.tvdata = res.data
						resolve(true)
						console.log(that.tvdata, 555)
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
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		padding-bottom: 1rem;
	}

	.content-bottom-sum-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F9F9F9;
		margin-top: 0.7rem;
		border-radius: 0.8rem;
		padding: 1rem 0;
		min-height: 30vh;
	}

	.content-bottom-sum-item-top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.content-bottom-sum-item-top-name {
		font-size: 1rem;
		font-weight: bold;
	}

	.content-bottom-sum-item-top-tips {
		margin-top: 0.4rem;
		color: gray;
		font-size: 0.6rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.content-bottom-sum-item-bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	.content-bottom-sum-item-bottom-info {
		width: calc(100% / 4);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content-bottom-sum-item-bottom-item {
		width: 90%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		padding: 1.2rem 0rem;
		font-size: 0.8rem;
		margin-top: 0.7rem;
		position: relative;
	}
	.content-bottom-sum-item-bottom-item-title{
		position: absolute;
		top: 0.5rem;
		font-size: 0.7rem;
		left: 0.7rem;
	}
	.content-bottom-sum-item-bottom-item-title-info{
		background-color: black;
		color: #FFFFFF;
		padding: 0.2rem 0.5rem;
		border-radius: 0.2rem;
	}
	.content-bottom-sum-item-bottom-item-name {
		font-size: 0.5rem;
		color: gray;
		margin-top: 0.3rem;
	}

	.content-bottom-sum-item-bottom-item-num {
		font-size: 0.9rem;
		font-weight: bold;

	}

	.content-bottom-sum-item-bottom-item-tips {
		font-size: 0.5rem;
		color: gray;
		height: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
	}
</style>