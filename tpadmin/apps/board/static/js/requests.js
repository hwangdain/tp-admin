(function (win, $) {
    if (typeof (win.tpadmin) === 'undefined') {
        win.tpadmin = {};
    }

    var tpadmin = win.tpadmin;
    tpadmin.requests = tpadmin.requests || {};

    tpadmin.requests.getUrlWithContextPath = function (URL) {
        return URL;
    };

    tpadmin.requests.changePage = function (page) {
        window.location.href = tpadmin.requests.getUrlWithContextPath(page);
    };

    tpadmin.requests.openPage = function (page) {
        var win = window.open(tpadmin.requests.getUrlWithContextPath(page), '_blank');
        if (win) {
            win.focus();
        }
    };

    tpadmin.requests.getCurrentUrl = function () {
        var url = window.location.pathname;
        return url.includes('?') ? url.substring(0, url.indexOf('?')) : url;
    }

    tpadmin.requests.refreshPage = function () {
        window.location.reload();
    }

    tpadmin.requests.getCsrfToken = function () {
        return $('[name="csrfmiddlewaretoken"]').val();
    }

    tpadmin.requests.getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                var newVar = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                return newVar;
            }
        }
    };


    function popupError(error) {
        var modalText = error.responseText;
        if (error.responseJSON) {
            modalText = '';
            $.each(error.responseJSON, function (k, v) {
                modalText += ('<p>' + k + ' : ');
                if ($.isArray(v)) {
                    $.each(v, function (index, value) {
                        if (index !== 0) {
                            modalText += ',<br>';
                        }
                        modalText += value;
                    });
                } else {
                    modalText += v;
                }
                modalText += '</p>\n';
            });
        }
    }

    tpadmin.requests.get = function (path, params, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);
        $.get($url, params).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {
            var error = {
                fail: true,
                url: $url,
                method: 'GET',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };

    tpadmin.requests.post = function (path, params, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);
        if (params) {
            params = JSON.stringify(params);
        }

        $.ajax({
            url: $url,
            method: 'post',
            type: 'json',
            contentType: 'application/json',
            data: params
        }).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {

            var error = {
                fail: true,
                url: $url,
                method: 'POST',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };

    tpadmin.requests.upload = function (path, formData, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);

        $.ajax({
            url: $url,
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
        }).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {
            var error = {
                fail: true,
                url: $url,
                method: 'POST',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };


    tpadmin.requests.create = tpadmin.requests.post;

    tpadmin.requests.put = function (path, params, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);
        $.ajax({
            url: $url,
            method: 'put',
            type: 'json',
            data: params
        }).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {
            var error = {
                fail: true,
                url: $url,
                method: 'PUT',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };

    tpadmin.requests.update = tpadmin.requests.put;


    tpadmin.requests.patch = function (path, params, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);
        $.ajax({
            url: $url,
            method: 'patch',
            type: 'json',
            data: params
        }).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {
            var error = {
                fail: true,
                url: $url,
                method: 'PATCH',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };


    tpadmin.requests.destroy = function (path, params, option) {
        var $deferred = $.Deferred();
        option = option || {};
        var $url = tpadmin.requests.getUrlWithContextPath(path);

        if (params) {
            if (Object.keys(params) !== undefined && Object.keys(params).length > 0) {
                $url += '?';
            }
            for (var i = 0; i < Object.keys(params).length; i++) {
                if (Object.keys(params)[i] === undefined) {
                    break;
                }
                var key = Object.keys(params)[i];
                $url += key + '=' + encodeURIComponent(params[key]);
                if (i < Object.keys(params).length - 1) {
                    $url += '&';
                }
            }
            params = {};
        }

        $.ajax({
            url: $url,
            method: 'delete',
            type: 'json',
        }).done(function (res) {
            $deferred.resolve(res);
        }).fail(function (data, status, error) {
            var error = {
                fail: true,
                url: $url,
                method: 'DELETE',
                params: params,
                status: data.status,
                errorCode: data.status,
                detailErrorCode: 0,
                message: data.statusText,
                detailMessage: undefined,
                stackTrace: undefined,
                statusText: data.statusText,
                responseText: data.responseText,
                responseJSON: data.responseJSON
            };
            if (!option.hidepopup) {
                popupError(error)
            }
            $deferred.reject(error);
        });
        return $deferred.promise();
    };


    tpadmin.requests.successToast = function (title, message) {
        toastr.success(message, title, {
            timeOut: 1000,
            closeButton: true,
            positionClass: 'toast-bottom-right',
        })
    }

})(window, jQuery);
