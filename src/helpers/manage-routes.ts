export const getFields = (interfaceName: string) => {
  if (interfaceName == 'user') {
    return [
      {
        label: 'civility',
        name: 'civility',
        type: 'select',
        options: [
          {
            key: 'Mr.',
            value: 'Mr.',
          },
          {
            key: 'Mrs.',
            value: 'Mrs.',
          },
          {
            key: 'Mrss.',
            value: 'Mrss.',
          },
        ],
      },
      {
        label: 'firstname',
        name: 'firstname',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'lastname',
        name: 'lastname',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'fullname',
        name: 'fullname',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'email',
        name: 'email',
        type: 'input',
        inputType: 'email',
      },
      {
        label: 'password',
        name: 'password',
        type: 'input',
        inputType: 'password',
      },
    ]
  }
  if (interfaceName == 'tunnel') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
    ]
  }
  if (interfaceName == 'TunnelStepType') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
    ]
  }
  if (interfaceName == 'page') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'content',
        name: 'content',
        type: 'editor',
        inputType: 'text',
      },
      {
        label: 'options',
        name: 'options',
        type: 'options',
        inputType: 'text',
        options: [
          {
            label: 'position',
            name: 'position',
            type: 'select',
            options: [
              {
                key: 'Select page position ...',
                value: '',
              },
              {
                key: 'Header',
                value: 'Header',
              },
              {
                key: 'Footer',
                value: 'Footer',
              },
            ],
          },
          {
            label: 'column',
            name: 'column',
            type: 'select',
            options: [
              {
                key: 'Select page column ...',
                value: '',
              },
              {
                key: 'Column 1',
                value: '1',
              },
              {
                key: 'Column 2',
                value: '2',
              },
              {
                key: 'Column 3',
                value: '3',
              },
            ],
          },
        ],
      },
      {
        label: 'isPublished',
        name: 'isPublished',
        type: 'select',
        options: [
          {
            key: 'Yes',
            value: 'No',
          },
          {
            key: 'No',
            value: 'false',
          },
        ],
      },
    ]
  }
  if (interfaceName == 'formule') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
  
      {
        label: 'options',
        name: 'options',
        type: 'options',
        options: [
          {
            label: 'name',
            name: 'name',
            type: 'input',
            inputType: 'text',
          },
          {
            label: 'value',
            name: 'value',
            type: 'input',
            inputType: 'text',
          },
        ],
      },
  
      {
        label: 'postion',
        name: 'postion',
        type: 'input',
        inputType: 'number',
      },
      {
        label: 'button_link',
        name: 'button_link',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_text',
        name: 'button_text',
        type: 'input',
        inputType: 'text',
      },
  
    ]
  }
  if (interfaceName == 'avantage') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'formules',
        name: 'formules',
        type: 'select',
        inputType: 'text',
        model: 'formule',
        options: []
      },
      {
        label: 'postion',
        name: 'postion',
        type: 'input',
        inputType: 'number',
      },
    ]
  }
  if (interfaceName == 'slide') {
    return [
      {
        label: 'title',
        name: 'title',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_text_one',
        name: 'button_text_one',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_link_one',
        name: 'button_link_one',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_text_two',
        name: 'button_text_two',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_link_two',
        name: 'button_link_two',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'imageUrl',
        name: 'imageUrl',
        type: 'input',
        inputType: 'file',
      },
    ]
  }
  if (interfaceName == 'service') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'content',
        name: 'content',
        type: 'editor',
        inputType: 'text',
      },
      {
        label: 'button_text',
        name: 'button_text',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'button_link',
        name: 'button_link',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'imageUrl',
        name: 'imageUrl',
        type: 'input',
        inputType: 'file',
      },
    ]
  }
  if (interfaceName == 'shop_params') {
    
	
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'currency',
        name: 'currency',
        type: 'select',
        options: [
          {
            key: 'EUR',
            value: 'EUR',
          },
          {
            key: 'USD',
            value: 'USD',
          },
          {
            key: 'XOF',
            value: 'XOF',
          },
        ],
      },
      {
        label: 'city',
        name: 'city',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'country',
        name: 'country',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'code_postal',
        name: 'code_postal',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'taxe_rate',
        name: 'taxe_rate',
        type: 'input',
        inputType: 'number',
      },
      {
        label: 'logo',
        name: 'logo',
        type: 'input',
        inputType: 'file',
      },
    ]
  }
  if (interfaceName == 'client') {
    return [
      {
        label: 'clientIp',
        name: 'clientIp',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'browser',
        name: 'browser',
        type: 'input',
        inputType: 'text',
      },
    
      {
        label: 'os',
        name: 'os',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'device',
        name: 'device',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'AcceptLanguage',
        name: 'acceptLanguage',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'country',
        name: 'country',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'latitude',
        name: 'latitude',
        type: 'input',
        inputType: 'number',
      },
      {
        label: 'longitude',
        name: 'longitude',
        type: 'input',
        inputType: 'number',
      },
      {
        label: 'origin',
        name: 'origin',
        type: 'input',
        inputType: 'text',
      },
    ]
  }
  if (interfaceName == 'navitem') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'key',
        name: 'key',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'path',
        name: 'path',
        type: 'input',
        inputType: 'text',
      },
    
    ]
  }
  if (interfaceName == 'template') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'description',
        name: 'description',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'imageUrl',
        name: 'imageUrl',
        type: 'input',
        inputType: 'file',
      },
      {
        label: 'Template (format Zip)',
        name: 'templateUrl',
        type: 'input',
        inputType: 'file',
      },
    
    ]
  }
  if (interfaceName == 'website_file') {
    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'fileUrl',
        name: 'fileUrl',
        type: 'input',
        inputType: 'file',
      },
    
    ]
  }
  if (interfaceName == 'email_template') {
    return [
      {
        label: 'title',
        name: 'title',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'subject',
        name: 'subject',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'content',
        name: 'content',
        type: 'editor',
        inputType: 'text',
      },
      {
        label: 'fileUrls',
        name: 'fileUrls',
        type: 'input',
        inputType: 'file',
      },
    
    ]
  }
  if (interfaceName == 'email_paramater') {
   

    return [
      {
        label: 'name',
        name: 'name',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'username',
        name: 'username',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'password',
        name: 'password',
        type: 'input',
        inputType: 'password',
      },
      {
        label: 'output_server',
        name: 'output_server',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'port_output_server',
        name: 'port_output_server',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'input_server',
        name: 'input_server',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'port_input_server',
        name: 'port_input_server',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'protocol',
        name: 'protocol',
        type: 'input',
        inputType: 'text',
      },
    
    ]
  }

  return []
}

// export const hasFiles = (interfaceName: string) =>{
//   let result = false 
//   const fields = getFields(interfaceName)

//   // fields


//   return result
// }

export const removeStringFromArray = (
  array: string[],
  target: string
): string[] => {
  return array.filter((item) => item.toLowerCase() !== target.toLowerCase())
}
export const getKeys = (data: any) => {
  try {
    let result = Object.keys(data)
    const excludes = [
      '_id',
      'PASSWORD',
      'content',
      'FILEURLS',
      'CREATED_AT',
      'UPDATED_AT',
      '_V',
      'clientid',
      'CLIENTSECRET',
      'AUTHOR',
      '__V',
      'GRANTS',
      'REDIRECTURIS',
      'FRIEND_COUNT',
      'IS_MY_FRIEND',
      'REQUEST_RECEIVED',
      'REQUEST_SENDED',
      'ROLES',
      'ADDRESSES',
      'TAGS',
      'ONLINE',
      'ISVERIFIED',
      'RECEIVEPROMOMESSAGE',
      'CREATED_FORMATTED_WITH_TIME_SINCE',
    ]

    excludes.forEach((elt) => {
      result = removeStringFromArray(result, elt)
    })
    result.push('created_at')
    result.push('updated_at')

    return result
  } catch (error) {
    console.log(error)

    return []
  }
}
