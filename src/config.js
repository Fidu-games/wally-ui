const protocol = 'http',
      hostname = '192.168.1.76',
      port = 8080;

export default {
    api: {
        protocol: protocol,
        hostname: hostname,
        port: port,
        url: `${protocol}://${hostname}:${port}`
    }
}