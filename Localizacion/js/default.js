// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    function manejarIdioma() {
        var desp = document.getElementById("idioma");
        var seleccionado = desp.options[desp.selectedIndex].value;

        WinJS.Resources._getResourceContext().languages =
            new Array(seleccionado);

    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            var tit = document.querySelector("body");
            WinJS.Resources.processAll(tit);

            var titulo = WinJS.Resources.getString("titulo");

         //   new Windows.UI.Popups.
         //       MessageDialog(JSON.stringify(WinJS.Resources._getResourceContext().languages)).showAsync();

            var ce = document.getElementById("error");
            var err =
                new Windows.ApplicationModel.Resources.ResourceLoader("err");
            ce.innerHTML = err.getString("pete");

            var ctx = new Windows.ApplicationModel.Resources.Core.
                ResourceContext();
            ctx.languages = ["fr"];

            var mapa = Windows.ApplicationModel.Resources.Core.
                ResourceManager.current.mainResourceMap.getSubtree("err");

            var cad = mapa.getValue("roto", ctx);
            document.getElementById("roto").innerHTML = cad.valueAsString;
            //Nuevo idioma

            document.getElementById("idioma").
                addEventListener("change", manejarIdioma);

            var formateador = new Windows.Globalization.
                DateTimeFormatting.DateTimeFormatter("day month hour minute");
            var fecha = formateador.format(new Date());

            var monedas = new Windows.Globalization.NumberFormatting.
                CurrencyFormatter(
                Windows.System.UserProfile.GlobalizationPreferences.currencies
                );
           
            monedas = new Windows.Globalization.NumberFormatting.
                CurrencyFormatter(
                Windows.Globalization.CurrencyIdentifiers.php
                );
              
            var pasta = monedas.format(547.33);

            new Windows.UI.Popups.
               MessageDialog(fecha +" "+pasta).showAsync();


            WinJS.Resources.addEventListener("contextchanged", function() {

                WinJS.Resources.processAll(document.querySelector("body"));
                var ce2 = document.getElementById("error");
                var err2 =
                    new Windows.ApplicationModel.Resources.ResourceLoader("err");
                ce2.innerHTML = err2.getString("pete");

            }, false);
        }
    };

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
