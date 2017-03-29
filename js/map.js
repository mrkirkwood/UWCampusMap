/* 
 * Code for the functions that involve the map.
 */
/* global map */
var map;
var popup;

var urlProjects;
var urlMap;
var urlLegendData;
var urlCampusMap;
var urlHousing;
var urlUWServices;
var urlAthletics;
var urlBuildings;

var highlightSymbol;
var template;
var buildingData;

var projectlayers;
var legendlayers;
var buildingMS;
var housingMS;
var officeMS;
var urlResearch;

function initMap() {
    require([
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/dijit/BasemapToggle",
        "esri/symbols/SimpleFillSymbol",
        "esri/dijit/LocateButton",
        "dojo/parser",
        "dojo/dom",
        "dojo/dom-style",
        "dojo/query",
        "dojo/on",
        "esri/config",
        "dojo/dom-style",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "esri/dijit/Scalebar",
        "esri/dijit/LocateButton",
        "esri/dijit/HomeButton",
        "dojo/domReady!"],
            function (Map, FeatureLayer, ArcGISDynamicMapServiceLayer, BasemapToggle, SimpleFillSymbol, LocateButton, parser, dom, domStyle, query, on, esriConfig, domStyle, Popup, PopupTemplate, Scalebar, LocateButton, HomeButton) {

                parser.parse();
                // Prevent flash of unstyled content(FOUC).
                domStyle.set(query("body")[0], "visibility", "visible");
                esriConfig.defaults.io.corsEnabledServers.push("wygiscservices10-3.wygisc.org");

                urlProjects = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_RK/MapServer/0";

                urlMap = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_OverView/FeatureServer/0";
               
                urlLegendData = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Transit/MapServer";

                urlCampusMap = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer";
                urlHousing = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer/0";
                urlUWServices = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer/1";
                urlAthletics = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer/2";
                urlBuildings = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer/3";
                urlResearch = "https://wygiscservices10-3.wygisc.org/arcgis/rest/services/UWInstitutionalMarketing/UW_Website_CampusMap_Buildings/MapServer/4";


               template = new PopupTemplate({
                    title: "{UW_BLDG_NAME}",
                    showAttachments: true,
                    description: "",
                    mediaInfos: [{
                            "title": "",
                            "caption": "",
                            "type": "image",
                            "value": {
                                "sourceURL": "{Hyperlink}",
                                "linkURL": "{Hyperlink}"
                            }
                        }]

                });

                //dynamic layers layers data
                projectlayers = new FeatureLayer(urlMap, {
                   mode: FeatureLayer.MODE_ONDEMAND,
                    visible: true,
                     outFields: ["*"],
                    opacity: 0.3,
                    infoTemplate: template
                });
                projectlayers.id = "projectlayers";
                
              

                 //dynamic layers layers data
                legendlayers = new ArcGISDynamicMapServiceLayer(urlLegendData, {
                    visible: true
                    //opacity: 0.5,
                    //infoTemplate: false
                });
                legendlayers.id = "legendlayers";

                 //feature layers layers data
                buildingMS = new FeatureLayer(urlBuildings, {
                   mode: FeatureLayer.MODE_SELECTION,
                    id: 'buildingMS',
                    visible: true,
                    //infoTemplate: template,
                    outFields: ["*"]
                });

                housingMS = new FeatureLayer(urlHousing, {
                    mode: FeatureLayer.MODE_SELECTION,
                    id: 'housingMS',
                    visible: true,
                    // infoTemplate: template,
                    outFields: ["*"]
                });

                officeMS = new FeatureLayer(urlUWServices, {
                    mode: FeatureLayer.MODE_SELECTION,
                    id: 'officeMS',
                    visible: true,
                    //infoTemplate: template,
                    outFields: ["*"]
                });

                //create the popup window
                popup = new Popup({
                    titleInBody: true
                }, "identifyDiv");
                popup.visibleWhenEmpty = false;


                //create the map
                map = new Map("map", {
                    basemap: "topo",
                    smartNavigation: false,
                    infoWindow: popup,
                    center: [-105.58, 41.313],
                    zoom: 17

                });

                var toggle = new BasemapToggle({
                    map: map,
                    basemap: "satellite"
                }, "BasemapToggle");
                toggle.startup();

                //create the scalebar
                var scalebar = new Scalebar({
                    map: map,
                    scalebarUnit: "dual",
                    attachTo: "bottom-left"
                });

//code for the home button 
                var home = new HomeButton({
                    map: map

                }, "HomeButton");
                home.startup();
                on(document.getElementById('HomeButton'),'click',function(){map.infoWindow.hide();});

//end of code for the home button 

                geoLocate = new LocateButton({
                    map: map
                }, "LocateButton");
                geoLocate.startup();

//on load functions
                map.addLayers([projectlayers, buildingMS, housingMS, officeMS, legendlayers]);

                //define a selection symbol 
                highlightSymbol = new SimpleFillSymbol().setColor(new dojo.Color([128, 0, 255, .4]));
                buildingMS.setSelectionSymbol(highlightSymbol);

                //define a selection symbol 
                highlightSymbol = new SimpleFillSymbol().setColor(new dojo.Color([102, 255, 51, .4]));
                housingMS.setSelectionSymbol(highlightSymbol);

                //define a selection symbol 
                highlightSymbol = new SimpleFillSymbol().setColor(new dojo.Color([255, 255, 51, .4]));
                officeMS.setSelectionSymbol(highlightSymbol);

                map.on("load", function () {
                    initTOC();
                    buildingQuery();
                    housingQuery();
                    officeQuery();
                });


            });


}





