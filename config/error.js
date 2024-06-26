
module.exports = {

    "InvalidToken"  :   {

                            "http_error_code"   :   401,
                            "message"           :   "Invalid Token",
                            "error_code"        :   401

                        },
    "TokenMissing"  :   {

                            "http_error_code"   :   403,
                            "message"           :   "Token not Found",
                            "error_code"        :   403

                        },
    "TokenExpired"  :   {

                            "http_error_code"   :   401,
                            "message"           :   "Token Expired",
                            "error_code"        :   401

                        }

};