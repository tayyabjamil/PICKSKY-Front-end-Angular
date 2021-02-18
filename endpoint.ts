export const endpoints = [{
    name: 'SHRIVASA_FOODS_REST_API',
    uri: 'api/foods',
    local: 'http://localhost:8000',
    internal: {
        dev: 'https://calm-lake-26690.herokuapp.com/',
        test: 'https://test-shrivasafoods.tk/',
        prod: 'https://shrivasafoods.com/'

    }
}]

export const localEnv = endpoints.reduce((param, paramName) => {
    return {
        ...param,
        [paramName.name]: paramName.local
    };
}, {})
export const devEnv = endpoints.reduce((param, paramName) => {
    return {
        ...param,
        [paramName.name]: paramName.uri
    };
}, {})