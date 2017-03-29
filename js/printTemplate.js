/* 
 * Code for the creating a PDF from the map.
 */

function printMap() {
    require([
        "esri/tasks/LegendLayer",
        "esri/dijit/Print",
        "esri/tasks/PrintTask",
        "esri/tasks/PrintTemplate",
        "esri/SpatialReference",
        "esri/tasks/PrintParameters"

    ], function (LegendLayer, Print, PrintTask, PrintTemplate, SpatialReference, PrintParameters) {
        var printMap = new PrintTask("https://wygiscservices10-3.wygisc.org/arcgis/rest/services/REO/REOExportWebMap/GPServer/Export%20Web%20Map");
        var params = new PrintParameters();
        var template = new PrintTemplate();

        template.exportOptions = {dpi: 200};
        //template.outSpatialReference = new SpatialReference(3857);
        template.format = "PDF";
        template.layout = "Print_Template_A";
        template.preserveScale = false;
        template.showAttribution = true;

       

        template.layoutOptions = {
            legendLayers: [], // empty array means no legend
            //scalebarUnit: "Feet",
            titleText: "Campus Utilities Viewer"

        };

        params.map = map;
        params.template = template;
        printMap.execute(params, printResult);
        showLoading2();

        function printResult(result) {
            window.open(result.url);
            hideLoading2();
        }
        ;
    });

}

