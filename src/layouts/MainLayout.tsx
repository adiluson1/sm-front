import { Component, Vue } from "vue-property-decorator";
//@ts-ignore
import style from '@/layouts/style.module.css'


@Component
export default class MainLayout extends Vue {
    collapsed: any = false;
    render() {
        return (
            <div>
                    <a-layout id={style.components_layout_demo_custom_trigger}>
                        <a-layout-sider trigger={null} collapsible v-model={this.collapsed}>
                            <div class="logo" />
                            <a-menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                                <a-menu-item key={1}>
                                    <a-icon type="user" />
                                    <span>{this.$t("template.templates")}</span>
                                    <router-link to="/template/all"/>
                                </a-menu-item>
                            <a-menu-item key={2}>
                                <a-icon type="video-camera" />
                                <span>nav 2</span>
                            </a-menu-item>
                            <a-menu-item key={3}>
                                <a-icon type="upload" />
                                <span>nav 3</span>
                            </a-menu-item>
                            </a-menu>
                        </a-layout-sider>
                        <a-layout>
                            <a-layout-header style="background: #fff; padding: 0">
                                <a-icon
                                class="trigger"
                                type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onclick={()=> this.collapsed = !this.collapsed}
                                />
                            </a-layout-header>
                            <a-layout-content
                                style={{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }}
                            >
                                {this.$slots.default}
                            </a-layout-content>
                        </a-layout>
                    </a-layout>
            </div>
        )
    }
}