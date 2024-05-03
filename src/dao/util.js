
export const CONTENT_TYPE_JSON = 'application/json'
export const HTTP_OK = 200

export const writeJSONResponse = (request, response, result) => {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    response.end(JSON.stringify(result, null, 2))
}




