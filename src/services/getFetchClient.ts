import wretch from 'wretch'

const getFetchClient = async (url: string) => {
    return wretch()
        .url(url)
        .get()
        .res(res => res.json())
        .catch(error => error)
}

export default getFetchClient;