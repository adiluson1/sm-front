import { Component, Vue } from "vue-property-decorator"


@Component
export default class Card extends Vue {


    render() {
        return(
            <div class="card">
                <div class="card-content">
                    {this.$slots.default}
                </div>
            </div>
        )
    }
}
