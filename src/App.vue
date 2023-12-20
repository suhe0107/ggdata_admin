<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				
			};
		},
		watch: {
			$route() {
				this.initroute()
			},
		},
		created() {
			this.initroute()
		},
		methods: {
			initroute() {
				var that = this
				var isMobile = that.$tool.isMobile()
				if(isMobile) {
					let meta = document.createElement("meta");
					meta.name = "viewport";
					meta.content = "initial-scale=1"
					document.head.appendChild(meta);
				}
			}
		}
	}
</script>

<style>
	:root {
		--innearwidth: 88%;
		--maincolor:#ff5500;
	}
	input[type="file"] {
		display: none;
	}
	img {
		-webkit-user-drag: none;
	}
	body {
		width: 100vw;
		height: 100vh;
		margin: 0;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	div {
		box-sizing: border-box;
	}

	button: {
		border: none;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.router-link-active {
		text-decoration: none;
		color: black;
	}
	
	.content-next{
		width: 100%;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	input {
		border: none;
		outline: none;
	}
	
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	
	input[type='number'] {
		-moz-appearance: textfield;
	}
	
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	}
	
	input[type=text]:focus,
	input[type=password]:focus,
	textarea:focus {
		/* -webkit-box-shadow: 0 0 0 1000px white inset; */
	}
	
	::-webkit-scrollbar {
		width: 0;
	}
	textarea {
		border: none;
		outline: none;
		resize: none;
	}
	
	.el-pagination-bottom{
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
</style>