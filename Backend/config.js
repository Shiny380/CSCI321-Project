exports.token = {
    tokenSecret: 'alumniApp',
    defaultTokenExpiry: '1d',
    issuer: 'UOWAlumni',
}

exports.sql = {
    connectionPoolLimit: 50,
    host: 'localhost',
    user: "cooperb",
    password: "Balotelli45",
    database: 'alumniapp'
}

exports.tempPassword = {
    possible: 'abcdefghijklmnopqrstuvwxyz1234567890',
    maxLength: 10,
}

exports.email = {
    host: 'pod51008.outlook.com',
    post: '587',
    auth: {
        user: 'dm431@uowmail.edu.au',
        pass: 'Dan_380',
    },
    from: 'no-reply@uowtest.edu.au',

}