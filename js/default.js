// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var articlesList;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("C9Data", publicMembers);

            args.setPromise(WinJS.UI.processAll().then(setParams));
        }
    };
    ////call the main to get serach id
    function setParams() {
        var url = 'http://api.wego.com/hotels/api/search/new?location_id=3400&check_in=2012-10-1&check_out=2012-10-10&api_key=d1d11c0cf2605c1e396a';
        WinJS.xhr({ url: url }).then(function (data) {
            var result = JSON.parse(data.responseText);
            alerts(result.search_id);

        });
    }
    ///function bind search result to data

    function alerts(search_id) {
        var msg;
        var url = "http://api.wego.com/hotels/api/search/" + search_id + "?api_key=d1d11c0cf2605c1e396a&currency_code=USD&page=1&per_page=30"
        WinJS.xhr({ url: url }).then(function (data) {

            var hotels_main = JSON.parse(data.responseText);

            for (var i = 0; i < hotels_main.count; i++) {
                var results = {};
                results.title = hotels_main.hotels[i].name;
                console.log(results.title);
                results.thumbnail = hotels_main.hotels[i].image;
                console.log(results.thumbnail);
                articlesList.push(results);

            }

        });


    }


    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
