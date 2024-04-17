import { formatDuration, formattedDate } from './utils'

export const getTemplate = (entityName?: string, data?: any) => {
  if (entityName?.toLocaleLowerCase() === 'movie') {
    return `
       
                                          <div className="iq-Data">
                                            <a href="javascript:void(0);">
                                              <img src=${
                                                data?.posterFiles?.[0]
                                              } 
                                                className="img-border-radius img-fluid" 
                                                width="150"
                                                height="50"
                                                alt="" 
                                              />
                                              </a>
                                          </div>
                                          <div className="media-body text-white text-left ml-3">
                                            <p className="mb-0">${data.name}</p>
                                            <small>${formatDuration(
                                              data?.duration
                                            )}</small> -  
                                            <small>Mise en ligne le ${formattedDate(
                                              data.created_at
                                            )}</small>
                                          </div>
                                         
        `
  }
  if (entityName?.toLocaleLowerCase() === 'category') {
    return `
       
                                          <div className="iq-Data">
                                            <div>
                                              ${data.name}
                                            </div>
                                            <div>
                                              ${data.description}
                                            </div>
                                          </div>
                                         
        `
  }
  return ''
}
