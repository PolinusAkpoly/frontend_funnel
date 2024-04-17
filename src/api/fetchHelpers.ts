import { getToken } from '../helpers/utils'

export const getCsrfToken = (): string | null => {
  const csrfMetaTag = document.head.querySelector('meta[name="csrf-token"]')

  if (csrfMetaTag) {
    return csrfMetaTag.getAttribute('content') || null
  }

  return null
}

export const getBlob = async (url: string, options: any = {}) => {
  try {
    const token = getToken()
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-TOKEN': getCsrfToken(),
    }
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + token,
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }
    let blob = await response.blob()

    const blobURL = URL.createObjectURL(blob)

    return blobURL
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}
export const getHtmlContent = async (url: string, options: any = {}) => {
  try {
    const token = getToken();
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-TOKEN': getCsrfToken(),
    };
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + token,
      };
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.text();  // Correction : Utilisez response.text() pour obtenir le contenu HTML
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};

export const get = async (url: string, options: any = {}) => {
  try {
    const token = getToken()
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-TOKEN': getCsrfToken(),
    }
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + token,
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }

    return await response.json()
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}
export const post = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = 'POST'
    options.body = JSON.stringify(data)
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'same-origin',
      Authorization: 'Bearer ' + getToken(),
      'XSRF-TOKEN': getCsrfToken(), // Utilisez le nom d'en-tête correct pour le jeton CSRF
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }

    return await response.json()
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}

export const put = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = 'PUT'
    options.body = JSON.stringify(data)
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
      'XSRF-TOKEN': getCsrfToken(),
    }

    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }

    return await response.json()
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}
export const remove = async (url: string, options: any = {}) => {
  try {
    options.method = 'DELETE'
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
      'XSRF-TOKEN': getCsrfToken(),
    }

    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }

    return await response.json()
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}
export const postWithFile = async (
  url: string,
  data: any,
  setProgress: any = null
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`)
    xhr.setRequestHeader('XSRF-TOKEN', getCsrfToken() || '')

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        const progressBar: any = document.getElementById('progressBar')
        if (progressBar) {
          setProgress(percentComplete)
        }
      }
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status == 201) {
          // La requête a réussi, vous pouvez résoudre la promesse avec les données de réponse
          const response = JSON.parse(xhr.responseText)
          resolve(response)
        } else {
          // La requête a échoué, vous pouvez rejeter la promesse avec une erreur
          reject(
            new Error(
              'La requête a échoué avec le code de statut : ' + xhr.status
            )
          )
        }
      }
    }

    xhr.send(data)
  })

  // try {

  //     options.method = "POST"
  //     options.body = data
  //     options.headers = {
  //         ...options.headers,
  //         // "Accept": "application/json",
  //         // "Content-Type": "application/json",
  //         "Authorization": "Bearer "+getToken()
  //     }

  //     console.log(options);

  //     const response = await fetch(url, options)
  //     if (!response.ok) {

  //         const error = await response.json()
  //         return {
  //             ...error,
  //             isSuccess: false,
  //         }
  //     }

  //     return await response.json()
  // } catch (error) {
  //     console.log(error);

  //     return {
  //         isSuccess: false,
  //         error
  //     }
  // }
}
export const putWithFile = async (
  url: string,
  data: any,
  setProgress: any = null
) => {
  return new Promise((resolve, reject) => {
    console.log({ data })

    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url, true)
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`)
    xhr.setRequestHeader('XSRF-TOKEN', getCsrfToken() || '')

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        const progressBar: any = document.getElementById('progressBar')
        if (progressBar) {
          setProgress(percentComplete)
        }
      }
    })

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status == 201) {
          // La requête a réussi, vous pouvez résoudre la promesse avec les données de réponse
          const response = JSON.parse(xhr.responseText)
          resolve(response)
        } else {
          // La requête a échoué, vous pouvez rejeter la promesse avec une erreur
          reject(
            new Error(
              'La requête a échoué avec le code de statut : ' + xhr.status
            )
          )
        }
      }
    }

    xhr.send(data)
  })

  // try {

  //     options.method = "POST"
  //     options.body = data
  //     options.headers = {
  //         ...options.headers,
  //         // "Accept": "application/json",
  //         // "Content-Type": "application/json",
  //         "Authorization": "Bearer "+getToken()
  //     }

  //     console.log(options);

  //     const response = await fetch(url, options)
  //     if (!response.ok) {

  //         const error = await response.json()
  //         return {
  //             ...error,
  //             isSuccess: false,
  //         }
  //     }

  //     return await response.json()
  // } catch (error) {
  //     console.log(error);

  //     return {
  //         isSuccess: false,
  //         error
  //     }
  // }
}
