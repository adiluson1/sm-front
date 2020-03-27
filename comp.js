let args = process.argv.slice(2);

let fileBody = `import { Component, Vue } from "vue-property-decorator"


@Component
export default class ${args[1]} extends Vue {


    render() {
        return(
            <div>
            </div>
        )
    }
}
`;
let dir = `src/${args[0]}`;

let fs = require("fs");

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.writeFile(`${dir}/${args[1]}.tsx`, fileBody, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});