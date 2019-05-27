const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    API_HOST: isProd ? 'https://example.com/1' : 'http://localhost:3000/1'
}