import { apiUrl } from "./apiUtils"
import { get, post, postWithFile, put, putWithFile, remove } from "./fetchHelpers"
import { cleanData } from '../helpers/utils';
import { User } from "../models/User";

export const getMediaByCode = async (entityName: string, code: string) =>{
  entityName = entityName.toLowerCase() === "movie" ? "video" : entityName.toLowerCase()
  const url = apiUrl + entityName +"/by/code/"+code
  const datas = await get(url)
  return cleanData(datas)
}


export const getTemplateLink = async (entityName: string, id: string) =>{
  const url = apiUrl + entityName+"/link/"+id
  const datas = await get(url)
  return cleanData(datas)
}
export const getDatas = async (entityName: string) =>{
  entityName = entityName.toLowerCase() === "movie" ? "video" : entityName.toLowerCase()
  const url = apiUrl + entityName
  const datas = await get(url)
  return cleanData(datas)
}

export const getVideoLink = (uniqueCode: string) =>{
  // let fullPath: string = formatVideoUri(videoUri)
  //fullPath = await getBlob(fullPath)
  return apiUrl+"videos/"+uniqueCode
}

export const getApplication = async (userId: string) =>{
  const url = apiUrl + "application/"+userId
  const datas = await get(url)
  return cleanData(datas)
}

export const regenerateApplication = async (applicationId: string) =>{
  const url = apiUrl + "oauthclient/regenerate/"+applicationId
  const datas = await get(url)
  return cleanData(datas)
}

export const searchDatas = async (entityName: string, query: string, page=1, limit= 8) =>{
  const url = apiUrl + entityName+"/search?"+query+"&pageNumber="+page+ "&pageLimit="+limit
  const datas = await get(url)
  return cleanData(datas)
}

export const getDatasBySlug = async (entityName: string, slug: string) =>{
  const url = apiUrl + entityName+"/by/slug/" + slug
  const datas = await get(url)
  return cleanData(datas)
}

export const getDatasById = async (entityName: string, _id: string) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/" + _id
  const datas = await get(url)
  return cleanData(datas)
}
export const getDatasByUserId = async (entityName: string,filter="", page=1, limit= 5) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/by/userId?pageNumber="+page+ "&pageLimit="+limit+filter
  const datas = await get(url)
  return cleanData(datas)
}
export const getDatasByIdAndUser = async (entityName: string, id: string, tag="", page=1, limit= 5) =>{
  entityName = entityName.toLowerCase()
  let  tagUrl = tag ? "&tag="+tag : ''
  const url = apiUrl + entityName+"/by/"+id+"/and/user?pageNumber="+page+ "&pageLimit="+limit+tagUrl
  const datas = await get(url)
  return cleanData(datas)
}

export const getDatasByUniqueCode = async (entityName: string, uniqueCode: string) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/by/unique-code/" + uniqueCode
  const datas = await get(url)
  return cleanData(datas)
}

export const getDatasByPage = async (entityName: string, page=1, limit= 5) =>{
  entityName = entityName.toLowerCase()
  page = page ? page : 1
  limit = limit ? limit : 5
  const url = apiUrl + entityName+"/by/page" + "?pageNumber="+page+ "&pageLimit="+limit
  const datas = await get(url)
  return cleanData(datas)
}

export const addData = async (entityName: string, data: any) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName
  const datas = await post(url,data)
  return datas
}

export const addDataWithFile = async (entityName: string, data: any, setProgress: any = null) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName
  const datas = await postWithFile(url,data, setProgress)
  return datas
}

export const updateDataWithFile = async (entityName: string, id: string, data: any, setProgress: any = null) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+'/'+id
  const datas = await putWithFile(url,data, setProgress)
  return datas
}

export const updateDataById = async (entityName: string, id: string, data: any) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/"+id
  const datas = await put(url,data)
  return datas
}

export const updateData = async (entityName: string, id: string, data: any) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/"+id
  const datas = await put(url,data)
  return datas
}
export const sortData = async (entityName: string, data: any) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/sort"
  const datas = await post(url,data)
  return datas
}

export const deleteData = async (entityName: string, id: string) =>{
  entityName = entityName.toLowerCase()
  const url = apiUrl + entityName+"/"+id
  const datas = await remove(url)
  return datas
}

export const signupAndAuthenticate = async (user: User) =>{
  const url = apiUrl + "user/signup/and/authenticate"
  const datas = await post(url,user)
  return datas
}

export const authenticate = async (user: User) =>{
  const url = apiUrl + "user/authenticate"
  const datas = await post(url,user)
  return datas
}

export const authenticateEmail = async (user: User) =>{
  const url = apiUrl + "user/authenticate/email"
  const datas = await post(url,user)
  return datas
}

export const verifyAuthenticationCode = async (data: {partial_token: string, code: string}) =>{
  const url = apiUrl + "user/verify/code"
  const datas = await post(url,data)
  return datas
}

export const verifyEmailCode = async (data: {partial_token: string, code: string}) =>{
  const url = apiUrl + "user/verify/email/code"
  const datas = await post(url,data)
  return datas
}
export const resendCode = async (data: {partial_token: string}) =>{
  const url = apiUrl + "user/resend/code"
  const datas = await post(url,data)
  return datas
}
export const resendVerifyEmailCode = async (data: {partial_token: string}) =>{
  const url = apiUrl + "user/resend/verify/email/code"
  const datas = await post(url,data)
  return datas
}
export const verifyToken = async (token: string) =>{
  const url = apiUrl + "user/verify/token"
  const datas = await post(url,{token})
  return datas
}
export const resetPassword = async (data: {partial_token: string, password: string}) =>{
  const url = apiUrl + "user/reset/password"
  const datas = await post(url,data)
  return datas
}