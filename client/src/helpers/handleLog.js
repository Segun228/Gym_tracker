import { SILENT_MODE } from "../../config"


const handleLog = (info) => {
    if(!SILENT_MODE){
        console.log(info)
    }
}

export default handleLog