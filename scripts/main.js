requirejs.config({
    paths: {
        mod: './modules',
        d3: './libraries/d3.min'
    }
});
requirejs([
    'd3',
    'mod/maincontroller',
    'mod/scatterplot',
    'mod/bargraph'
],
function(d3, main_controller, scatterplot, bar_graph) {

    var controller = main_controller(); 

    controller.init();

})
