import wretch from 'wretch';
import { ResponseObject } from '../objects/responseObject';

const postFetchClient = async (url: string, postObject: {}) => {
    return wretch()
        .url(url)
        .post(postObject)
        .res(res => res.json())
        .catch(() => {
            return failedResponse
        })
}

const failedResponse: ResponseObject = {
    status: "failure"
}

export default postFetchClient;