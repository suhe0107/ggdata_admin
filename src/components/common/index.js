import nodata from '../plug/nodata.vue';
import web_left from '../web_left.vue';
import main_head from '../main/main_head.vue';
const components = {
    install(Vue){
		Vue.component("nodata",nodata),
		Vue.component("main_head",main_head),
		Vue.component("web_left",web_left)
    }
}
export default components
