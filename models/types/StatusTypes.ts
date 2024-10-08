enum StatusTypes{
    OK = 200,
    CREATED = 201,

    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,

    INTERNAL_SERVER_ERROR = 500,
}

export default StatusTypes;