<template>
	<div class="content-all">
		<img src="./universalskeletonscreen.gif" class="content-all-pic"></img>
	</div>
</template>

<script>
	export default {
		name:"universalskeletonscreen",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.content-all{
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #FFFFFF;
	font-size: 8rem;
}
.content-all-pic{
	width: 8rem;
	height: 8rem;
	animation:mymove 0.5s linear ;
}
@keyframes mymove {
	0%  {opacity: 0;}
	100% {opacity: 1;}
}
</style>