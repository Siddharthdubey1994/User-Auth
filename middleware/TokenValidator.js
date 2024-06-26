const errorConfig = require("../config/error");
const config = require("../config/config");
const util = require("../enums/utility");
const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {

    /**
     * x-access-token validator
     * add decoded data to @variable request with attribute local and key access
     */
    try {
        
        const body = request.body;
        const header = request.headers;
        const internalTest = (request.query.internal_test) ? request.query.internal_test : '';
        const requestHost = request.hostname.toLowerCase();
        const prodEnvs = new Map(Object.entries(config.Details.prodEnvHostname));
        if(internalTest && internalTest == 1 && !prodEnvs.has(requestHost)){
            //httpContext.set('access_token', "");
            return next();
        }
        let decoded;
        
        if ( Object.keys(header).length ){

            if( !_.isEmpty(header["x-access-token"]) ){

                try {
                    decoded = await jwt.verify( header["x-access-token"], config.Details.x_access_token.secret );
                }
                catch (error) {
                    if( !decoded ){

                        console.error(`X-Access token invalid`);
                        //let check = request.originalUrl.includes("partnerFeeds/getdata");
                        let dataNotFoundError =  {
                                                    "http_error_code"   :   400,
                                                    "message"           :   "Data not found",
                                                    "error_code"        :   "101"
                                                }
                        let error = errorConfig["InvalidToken"];
                        throw util.error( error.message, error.error_code, error.http_error_code );

                    }
                }

                if( !decoded.hasOwnProperty("issuedAt") || ( Date.now() - Date.parse(decoded.issuedAt) ) > config.Details.x_access_token.addition_time ) {

                    console.error(`X-Access token expired`);
                    let error = errorConfig["TokenExpired"];
                    throw util.error( error.message, error.error_code, error.http_error_code );

                }

                if( !request.local ){

                    request.local = {};

                }

                request.local.access = decoded;

            } else {

                console.error(`X-Access token not available in header`);
                let error = {...errorConfig["AccessTokenMissing"]};

                // if( request.originalUrl.includes("/content/partnerFeeds/") ){

                //     error.http_error_code = 200;

                // }
                
                throw util.error( error.message, error.error_code, error.http_error_code );

            }

        }
        //httpContext.set('access_token', decoded);
        //next();
        
        return;

    } catch (error) {

        let statusCode = error.hasOwnProperty("http_code") ? error.http_code : 400;
        error = error.hasOwnProperty("message") ? error : util.error("Data not found", "101", 400)
        delete (error.http_code);
        return response.status(statusCode).send(error);

    }

}