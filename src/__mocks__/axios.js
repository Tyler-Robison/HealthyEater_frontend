
// mock version of axios for use in tests
// allows us to handle API calls w/o actually making them
const axios = {
    get: jest.fn().mockResolvedValue(),
    post: jest.fn().mockResolvedValue(),
    patch: jest.fn().mockResolvedValue(),
    delete: jest.fn().mockResolvedValue()
}

export default axios