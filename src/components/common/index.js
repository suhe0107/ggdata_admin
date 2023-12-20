import main_head from '../main/main_head.vue';
import universalskeletonscreen from '../universalskeletonscreen.vue';
const components = {
    install(Vue){
		Vue.component("main_head",main_head)
		Vue.component("universalskeletonscreen",universalskeletonscreen)
    }
}
export default components
