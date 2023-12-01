<template>
	<div class="content">
		<main_head></main_head>
		<div class="content-bottom">
			<div class="content-bottom-sum">
				<div class="content-bottom-sum-item" v-for="(item,index) in tvdata">
					<div class="content-bottom-sum-item-top">
						<div class="content-bottom-sum-item-top-name">
							{{item.name}}
						</div>
						<div class="content-bottom-sum-item-top-tips">
							共{{item.data_list.length}}项数据 
							<div class="" v-if="item.data_list[0]" style="margin-left: 1rem;">
								更新时间{{item.data_list[0].create_time}}
							</div>
						</div>
					</div>
					<div class="content-bottom-sum-item-bottom">
						<div v-for="(items,indexs) in item.data_list" class="content-bottom-sum-item-bottom-item">
						<!-- <div :class="jisuan(indexs)?'content-bottom-sum-item-bottom-items':'content-bottom-sum-item-bottom-item'" v-for="(items,indexs) in item.data_list" > -->
							<div class="content-bottom-sum-item-bottom-item-name">
								{{items.name}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-num">
								{{items.name_data}}
							</div>
							<div class="content-bottom-sum-item-bottom-item-tips">
								{{items.tips}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				routepath:'/',
				tvdata:[]
			}
		},
		watch: {
			$route() {
				this.routepath = this.$route.path
				if(this.routepath=='/'){
					this.initroute()
				}
			},
		},
		created() {
			this.routepath = this.$route.path
			if(this.routepath=='/'){
				this.initroute()
			}
			this.getdata()
		},
		methods: {
			jisuan(e){
				var num = e+1
				if(num%6==0){
					return true;
				}else{
					return false;
				}
			},
			initroute() {
				var that = this
				var aim_path = this.$route.path
			},
			getdata(){
				var that = this
				that.$api.post('/GGWebIndex', {
					appId:28
				}).then(res => {
					that.tvdata = res.data
					console.log(that.tvdata, 555)
				}).catch(error => {
					console.error(error)
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.content-bottom{
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		flex-direction: column;
	}
	.content-bottom-sum{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		padding-bottom: 3rem;
	}
	.content-bottom-sum-item{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F9F9F9;
		margin-top: 1rem;
		border-radius: 0.8rem;
		padding:2rem;
		min-height: 30vh;
	}
	.content-bottom-sum-item-top{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.content-bottom-sum-item-top-name{
		font-size: 1.2rem;
		font-weight: bold;
	}
	.content-bottom-sum-item-top-tips{
		margin-top: 0.8rem;
		color: gray;
		font-size: 0.8rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.content-bottom-sum-item-bottom{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}
	.content-bottom-sum-item-bottom-item{
		width: calc((100% - 1rem) / 6);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		padding: 1.5rem 0.5rem;
		font-size: 0.8rem;
		margin-top: 1rem;
		margin-right: 1rem;
	}
	.content-bottom-sum-item-bottom-items{
		width: calc((100% - 1rem) / 6);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		padding: 1.5rem 0.5rem;
		font-size: 0.8rem;
		margin-top: 1rem;
		margin-right: 0;
	}
	.content-bottom-sum-item-bottom-item-name{
		font-size: 0.8rem;
		color: gray;
	}
	.content-bottom-sum-item-bottom-item-num{
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 0.8rem;
	}
	.content-bottom-sum-item-bottom-item-tips{
		font-size: 0.5rem;
		color: gray;
		height:1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top:1rem;
	}
</style>