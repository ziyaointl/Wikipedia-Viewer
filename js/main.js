Vue.component('wiki-page', {
    props:['page'],
    template: '<li class="ccol-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3">{{ page.title }}</li>'
});

var app = new Vue({
    el: '#main',
    data: {
        input: "",
        pageData: []
    },
    methods: {
        submitRequest: function () {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=50&origin=*&srsearch=" + encodeURIComponent(this.input), true);
            xhr.send();
            xhr.addEventListener("readystatechange", processRequest, false);
            var temp = this.pageData;
            function processRequest () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    response.query.search.forEach(function (page) {
                        temp.push(page);
                    });
                    document.getElementById('icon').className += "add-margin";
                }
            }
        }

    }
});
