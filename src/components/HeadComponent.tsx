import { Component, Vue } from "vue-property-decorator"


@Component
export class HeadComponent extends Vue {


    render() {
        return(
            <div class="card">
                <div class="card-content level">
                    <div class="level-left">
                        <span onClick={() => this.$emit('back')}><b-icon icon="arrow-left"/></span>
                        <h4 class="title" style="margin-left: 20px">{this.$slots.default}</h4>
                    </div>
                    <div class="level-right">
                        {this.$slots.left}
                    </div>
                </div>
            </div>
        )
    }
}
