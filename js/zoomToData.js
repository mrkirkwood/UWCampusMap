
//create the zoom to bulding

function popitup(url) {
    newwindow = window.open(url, '_blank', 'name', 'height=200,width=1000,scrollbars=yes, resizable=yes');
    if (window.focus) {
        newwindow.focus();
    }
    return false;
}
var buildingExtent;

function zoomRow(id) {
    require([
        "esri/tasks/query",
        "esri/layers/FeatureLayer"
    ],
            function (Query, FeatureLayer)
            {
                buildingMS.clearSelection();
                housingMS.clearSelection();
                officeMS.clearSelection();
                var query = new Query();
                query.objectIds = [id];
                var myDate = new Date();
                var myMS = myDate.getMilliseconds();
                query.outFields = ['*'];
                query.where = "(" + myMS + "=" + myMS + ")";
                buildingMS.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
                    map.infoWindow.setTitle(features[0].attributes.UW_BLDG_NAME);
                    buildingExtent = features[0].geometry.getExtent().expand(4.0);
                    map.setExtent(buildingExtent);
                });
                buildingMS.queryAttachmentInfos(id, function (infos) {
                    console.log("check infos " + infos.length);
                    if (infos.length > 0) {
                        var el = document.createElement('img');
                        if (!!infos[0].url) {
                            el.setAttribute('src', infos[0].url);
                            el.id = "divIMG";
                            map.infoWindow.show();
                            map.infoWindow.setContent(el);
                            map.infoWindow.show(map.extent.getCenter());
                        }
                    }
                    else
                        map.infoWindow.hide();
                });
            });
}


function zoomRow2(id) {
    require([
        "esri/tasks/query",
        "esri/layers/FeatureLayer"
    ],
            function (Query, FeatureLayer)
            {
                buildingMS.clearSelection();
                housingMS.clearSelection();
                officeMS.clearSelection();
                var query = new Query();
                query.objectIds = [id];
                var myDate = new Date();
                var myMS = myDate.getMilliseconds();
                query.outFields = ['*'];
                query.where = "(" + myMS + "=" + myMS + ")";
                housingMS.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
                    map.infoWindow.setTitle(features[0].attributes.UW_BLDG_NAME);
                    var buildingExtent = features[0].geometry.getExtent().expand(4.0);
                    map.setExtent(buildingExtent);
                });
                housingMS.queryAttachmentInfos(id, function (infos) {
                    if (infos.length > 0) {
                        var el = document.createElement('img');
                        if (!!infos[0].url) {
                            el.setAttribute('src', infos[0].url);
                            el.id = "divIMG";
                            map.infoWindow.show();
                            map.infoWindow.setContent(el);
                            map.infoWindow.show(map.extent.getCenter());
                        }
                    }
                    else
                        map.infoWindow.hide();
                });
            });
}

function zoomRow3(id) {
    require([
        "esri/tasks/query",
        "esri/layers/FeatureLayer"
    ],
            function (Query, FeatureLayer)
            {
                buildingMS.clearSelection();
                housingMS.clearSelection();
                officeMS.clearSelection();
                var query = new Query();
                query.objectIds = [id];
                var myDate = new Date();
                var myMS = myDate.getMilliseconds();
                query.outFields = ['*'];
                query.where = "(" + myMS + "=" + myMS + ")";
                officeMS.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
                    map.infoWindow.setTitle(features[0].attributes.UW_BLDG_NAME);
                    var buildingExtent = features[0].geometry.getExtent().expand(4.0);
                    map.setExtent(buildingExtent);

                });
                officeMS.queryAttachmentInfos(id, function (infos) {
                    if (infos.length > 0) {

                        var el = document.createElement('img');
                        if (!!infos[0].url) {
                            el.setAttribute('src', infos[0].url);
                            el.id = "divIMG";
                            map.infoWindow.show();
                            map.infoWindow.setContent(el);
                            map.infoWindow.show(map.extent.getCenter());
                        }
                    }
                    else
                        map.infoWindow.hide();
                });
            });


}