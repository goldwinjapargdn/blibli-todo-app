export default [
  {
    method: 'GET',
    url: '/api/todo',
    response: [
      {
        id: 1,
        text: 'Belajar Odoo',
        isCompleted: false
      },
      {
        id: 2,
        text: 'Beli Hyundai Palisade',
        isCompleted: false
      },
      {
        id: 3,
        text: 'Beli Indomie',
        isCompleted: false
      },
      {
        id: 4,
        text: 'Ngudud bareng mas Sandi dan ko Juan',
        isCompleted: true
      }
    ]
  },
  {
    method: 'POST',
    url: '/api/todo',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'DELETE',
    url: '/api/todo/1',
    response: {
      code: 500,
      status: 'GA_BAE_BAE_AJA'
    }
  },
  {
    method: 'DELETE',
    url: '/api/todo/2',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]
