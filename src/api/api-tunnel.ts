import { cleanData } from "../helpers/utils"
import { apiUrl } from "./apiUtils"
import { get, post } from "./fetchHelpers"

export const getTunnelSetting = async (tunnelId: string, stepId: string) =>{
    const url = apiUrl + "stepsettings/user/"+tunnelId+"/"+stepId
    const datas = await get(url)
    return cleanData(datas)
  }
export const saveTunnelStepTemplate = async (tunnelId: string, stepId: string, data: any) =>{
    const url = apiUrl + "stepsettings/template/"+tunnelId+"/"+stepId
    const datas = await post(url, {blocks : data})
    return cleanData(datas)
  }
export const getTunnelStepTemplate = async (tunnelId: string, stepId: string) =>{
    const url = apiUrl + "stepsettings/template/"+tunnelId+"/"+stepId
    const datas = await get(url)
    return cleanData(datas)
  }