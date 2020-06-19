const protocol = 'http',
      hostname = '192.168.1.76',
      port = 8080;
    
const ps_config = {
    port: 8090,
    hostname: '192.168.1.76',
    protocol: 'http'
};

export default {
    api: {
        protocol: protocol,
        hostname: hostname,
        port: port,
        url: `${protocol}://${hostname}:${port}`
    },
    peer_server: {
        port: ps_config.port,
        hostname: ps_config.hostname,
        protocol: ps_config.protocol,
        URL: `${ps_config.protocol}://${ps_config.hostname}:${ps_config.port}`
    }
}