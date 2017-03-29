/* 
 * Code for the creating the legend.
 */

function initTOC() {
    require(["esri/map", "esri/dijit/Legend", "agsjs/dijit/TOC"], function (Map, Legend, TOC) {
                   

        var projectlayersTOC = map.getLayer("legendlayers");
        if (projectlayersTOC !== undefined) {
            projectlayersTOC.setVisibility(true);
            projectlayersTOC.setOpacity(0.9);
          
            tocProjects = new TOC({
                map: map,
                layerInfos: [{
                        layer: projectlayersTOC,
                        title: "",
                        collapsed: false,
                        slider: false
                    }

                ]
            }, 'tocProjectsDiv');
            tocProjects.startup();
        }
        else {
             alert("The service is not available. Please refresh at a later time. This will not affect the overall functionality of the map.");
        }
       
    });
}

