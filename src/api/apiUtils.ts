

export const baseUrl = () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:8080/"
    }
    if (process.env.NODE_ENV === "production") {
      return "https://api.funnel.mudey.fr/"
    }
  }
  
  export const apiUrl = baseUrl()