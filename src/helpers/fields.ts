export const fields: any = [
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
    type: 'inputText',
  },
  {
    label: 'lastname',
    name: 'lastname',
    type: 'inputText',
  },
  {
    label: 'fullname',
    name: 'fullname',
    type: 'inputText',
  },
  {
    label: 'email',
    name: 'email',
    type: 'inputEmail',
  },
  {
    label: 'password',
    name: 'password',
    type: 'inputPassword',
  },
]
