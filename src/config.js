const protocol = 'http',
      hostname = 'localhost',
      port = 8080;

export default {
    api: {
        protocol: protocol,
        hostname: hostname,
        port: port,
        url: `${protocol}://${hostname}:${port}`
    }
}