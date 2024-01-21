//https://nitro.unjs.io/config

export default defineNitroConfig({
    routeRules: {
        '/**': {
            cors: true, headers: {
                "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                "Access-Control-Allow-Origin": "*",
            }
        },
    }
});
