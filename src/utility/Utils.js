
export function fetchFromJson(url, successCallback, errorCallback) {
    fetch(url)
        .then(response => response.json(), error => errorCallback(error))
        .then(result => {
            successCallback(result)
        }, error => {
            errorCallback(error);
        });
}