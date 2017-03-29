
function housingQuery() {
    require([
        "dojo/store/Observable",
        "dijit/form/FilteringSelect",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "esri/graphic",
        "dojo/store/Memory",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/SpatialReference",
        "dojo/dom",
        "dojo/domReady!"],
            function (Observable, FilteringSelect, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color, Graphic, Memory, Query, QueryTask, SpatialReference, dom) {

//query the PROJECTS table
                var myQueryTask = new QueryTask(urlHousing);
                var myDate = new Date();
                var myMS = myDate.getMilliseconds();
                var myQuery = new Query();
                myQuery.outFields = ['*'];
                myQuery.returnGeometry = true;
                myQuery.where = "(" + myMS + "=" + myMS + ")";
                myQueryTask.execute(myQuery, function (results) {
                    housingData = [];
                    var menuData = [];
                    menuData.push({
                        id: "1",
                        text: "Residence/Housing",
                        parentid: "-1",
                        subMenuWidth: "250px"
                    });

                    for (var i = 0; i < results.features.length; i++) {
                        if (results.features[i].attributes.UW_BLDG_NAME) {
                            menuData.push({
                                id: results.features[i].attributes.UW_BLDG_NAME,
                                text: results.features[i].attributes.UW_BLDG_NAME,
                                parentid: "1",
                                OBJECTID: results.features[i].attributes.OBJECTID
                            });
                            housingData.push({
                                name: results.features[i].attributes.UW_BLDG_NAME,
                                id: results.features[i].attributes.UW_BLDG_NAME,
                                OBJECTID: results.features[i].attributes.OBJECTID,
                                BuildingUse: results.features[i].attributes.BuildingUse,
                                parentid: results.features[i].attributes.BuildingUse,
                                UW_BLDG_NAME: results.features[i].attributes.UW_BLDG_NAME,
                                GEOMETRY: results.features[i].geometry

                            });
                        }
                    }


                    menuData = JSON.parse(JSON.stringify(menuData));
                    menuData.sort(function (a, b) {
                        return (a.text > b.text) ? 1 : -1;
                    });

                    var myStore = new Memory({
                        idProperty: "name",
                        data: housingData

                    });

                    var filteringSelect = new FilteringSelect({
                        id: "housingDIV",
                        store: myStore,
                        placeHolder: "Residence/Housing",
                        fetchProperties: {sort: [{attribute: "name"}]},
                        style: "margin: 5px; width:240px",
                        required: false,
                        queryExpr: '*${0}*',
                        autoComplete: false,
                        onChange: function (id) {
                            var OID = null;
                            if (this.item.name !== "")
                                this.store.data.forEach(function (a) {
                                    if (a.id === id)
                                        zoomRow2(a.OBJECTID);
                                });
                             map.infoWindow.hide();
                            dijit.byId("buildingDIV").set("value", "");
                            dijit.byId("officeDIV").set("value", "");

                        }

                    }, "housingDIV");

//                    
//                    var source = {
//                        datatype: "array",
//                        datafields: [
//                            {name: 'id'},
//                            {name: 'parentid'},
//                            {name: 'text'},
//                            {name: 'OBJECTID'},
//                            {name: 'subMenuWidth'}
//                        ],
//                        id: 'id',
//                        localdata: menuData
//                       
//                    };
//                    var dataAdapter = new $.jqx.dataAdapter(source);
//                    dataAdapter.dataBind();
//                    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{name: 'text', map: 'label'}]);
//                    $('#jqxWidget2').jqxMenu({source: records, height: 30, width: '200px', theme: 'orange', autoOpen: false, showTopLevelArrows: true});
//                    $("#jqxWidget2").on('itemclick', function (event) {
//                        var itemText = event.target.innerHTML;
//                        var itemInfo;
//                        housingData.forEach(function (d) {
//                            if (d.name === itemText)
//                                itemInfo = d;
//                        });
//                       // console.log(itemInfo.OBJECTID);
//                        zoomRow2(itemInfo.OBJECTID);
//                        
//                    });


                });

            });

}





