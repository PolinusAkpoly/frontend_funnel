
export function ucfirst(str: string){
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
}

export const filterTableData = (name: string, value: any) => {
    if (name.toLocaleLowerCase().includes('image')) {
        return "<img width='100' src='" + value + "' alt=''/>"
    }
  
    return value;
  }
  
  

  