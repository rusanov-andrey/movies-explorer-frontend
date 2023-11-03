export default class ApiBase {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _get(url, additionalHeaders) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: additionalHeaders ? {...this._headers, ...additionalHeaders} : this._headers,
      // credentials: "include"
    })
    .then((res) => {
      return this._handleRes(res);
    })
  }

  _post(url, data, params) {
    return this._send(url, 'POST', data, params);
  }
  _put(url, data) {
    return this._send(url, 'PUT', data);
  }
  _patch(url, data) {
    return this._send(url, 'PATCH', data);
  }

  _send(url, method, data, params) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data || {}),
    })
    .then(res => {
      return this._handleRes(res, params);
    });
  }

  _delete(url, data) {
    return this._send(url, 'DELETE', data);
  }

  _handleRes(res, params) {
    if(res.ok) {
      if(params && params.noResponseBody) {
        return '';
      }
      if(params && params.noJsonResponse) {
        return res.text();
      }
      return res.json();
    }

    if((res.status >= 400) && (res.status < 600)) {
      return Promise.reject(res.text());
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  _handleDel(res) {
    if(res.ok) {
      return true;
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
}
