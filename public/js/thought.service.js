(function() {
    'use strict';

    angular.module('thoughter').factory('ThoughtService', ThoughtService);

    ThoughtService.$inject = ['$http'];
    function ThoughtService($http) {
        return {
            addThought: addThought,
            getThoughts: getThoughts
        };

        function addThought(text=null) {
            if (typeof(text) !== 'string' || !text.length) {
                return Promise.reject({ status: 400, data: 'Please provide the thought text' });
            }
            return $http({
                method: 'POST',
                url: 'https://thoughter.herokuapp.com/api/Thoughts',
                headers: {
                   'Content-Type': 'application/json'
                },
                data: angular.toJson({ content: text })
            });
        }

        function getThoughts(limit=10, offset=0) {
            return $http.get(
                `https://thoughter.herokuapp.com/api/Thoughts?filter={"order":"createTime%20DESC","limit":${limit},"offset":${offset}}`
            );
        }

    }

})();
