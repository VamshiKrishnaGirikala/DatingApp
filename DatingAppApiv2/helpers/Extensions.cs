using Microsoft.AspNetCore.Http;

namespace DatingAppApiv2.helpers {
    public static class Extensions {
        public static void AddApplicationError (this HttpResponse response, string message) {
            response.Headers.Add ("Application-Error", message);
            response.Headers.Add ("Access-Control-Expose-headers", "Applicaiton-Error");
            response.Headers.Add ("Access-Control-Allow-Origin", "*");

        }
    }
}