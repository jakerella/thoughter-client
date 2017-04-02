(function() {
    'use strict';

    angular.module('thoughter').controller('ThoughtController', ThoughtController);

    ThoughtController.$inject = ['ThoughtService'];

    function ThoughtController(ThoughtService) {
        let vm = this;

        vm.page = -1;
        vm.limit = 10;
        vm.hasMore = true;
        vm.thoughts = [];
        vm.error = false;
        vm.message = null;
        vm.newThought = {};

        vm.loadMore = function loadMore() {
            vm.page++;
            ThoughtService.getThoughts(vm.limit, vm.page * vm.limit)
                .then(function(response) {
                    vm.thoughts = [...vm.thoughts, ...response.data];
                    if (!response.data.length) {
                        vm.hasMore = false;
                    }
                })
                .catch(function(response) {
                    vm.error = true;
                    vm.message = 'Unable to get recent thoughts!';
                });
        };
        // Load some to start...
        vm.loadMore();

        vm.addThought = function addThought(content) {
            vm.error = false;
            vm.message = null;
            return ThoughtService.addThought(content)
                .then(function(response) {
                    if (response.status > 299) {
                        vm.error = true;
                        vm.message = 'Unable to post new thought.';
                        return;
                    }
                    vm.message = 'Your thought has been shared!';
                    vm.thoughts = [response.data, ...vm.thoughts];
                    vm.newThought = {};
                })
                .catch(function(response) {
                    vm.error = true;
                    vm.message = 'Unable to post new thought.';
                });
        };

    }
})();
