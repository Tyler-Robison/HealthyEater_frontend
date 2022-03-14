// export default {
//     get: jest.fn().mockResolvedValue(),
//     post: jest.fn().mockResolvedValue()
// };

const axios = {
    get: jest.fn().mockResolvedValue(),
    post: jest.fn().mockResolvedValue(),
    patch: jest.fn().mockResolvedValue(),
    delete: jest.fn().mockResolvedValue()
}

// const mockGetRecipes = jest.fn().mockImplementation((data) => {
//     return
// })

export default axios

// jest.mock('axios')

// axios.get.mockImplementation((url) => {
//   switch (url) {
//     case '/users.json':
//       return Promise.resolve({data: [{name: 'Bob', items: []}]})
//     case '/items.json':
//       return Promise.resolve({data: [{id: 1}, {id: 2}]})
//     default:
//       return Promise.reject(new Error('not found'))
//   }
// })

// test('should fetch users', () => {
//   return axios.get('/users.json').then(users => expect(users).toEqual({data: [{name: 'Bob', items: []}]}))
// })

// test('should fetch items', () => {
//   return axios.get('/items.json').then(items => expect(items).toEqual({data: [{id: 1}, {id: 2}]}))
// })