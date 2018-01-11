define([
	'd3',
    	'mod/scatterplot',
    	'mod/bargraph'
],
function(d3, scatter_plot, bar_graph) {

	function module() {

		var main_controller = {};
		var bargraph = bar_graph();
		var scatterplot = scatter_plot();
		var current = 90;
		var partition = congress_data["congress_90"];

		function drawNewPage() {
			var start_year = 1787+(current*2),
				end_year = start_year+2;
			d3.select("#subtitle")
				.text("Congress #"+current+", "+start_year+"-"+end_year)
			bargraph.draw(partition.house, "house", current);
			bargraph.draw(partition.senate, "senate", current);
			scatterplot.draw(partition.house, "house", current);
			scatterplot.draw(partition.senate, "senate", current);
		}

		function setPartition(direction) {
			if (direction === "partition_right" && current < 114) {
				current += 1;
			} else if (direction === "partition_left" && current > 90) {
				current -= 1;
			} else if (direction === "partition_right" && current === 114) {
				current = 90;
			} else if (direction === "partition_left" && current === 90) {
				current = 114;
			}
			var loaded_congress = "congress_"+current;
			partition = congress_data[loaded_congress];
		}

		function animateButton(side) {
			var button = "#partition_"+side;
			d3.select(button)
				.attr("style","background-color:lightblue")
				.transition()
				.delay(150)
				.attr("style","background-color:white")
		}

		function checkKey(e) {
			var change_detected;
			e = e || window.event;
			if (e.which === 39 && current < 114) {
				current += 1;
				change_detected = "right";
			} else if (e.which === 37 && current > 90) {
				current -= 1;
				change_detected = "left";
			} else if (e.which === 39 && current === 114) {
				current = 90;
				change_detected = "right";
			} else if (e.which === 37 && current === 90) {
				current = 114;
				change_detected = "left";
			}
			if (change_detected) {
				var loaded_congress = "congress_"+current;
				partition = congress_data[loaded_congress];
				animateButton(change_detected)
				drawNewPage();
			}
		}

		function bindPartitionButtons() {
			d3.selectAll(".btn").on("click", function() {
				setPartition(this.id);
				drawNewPage();
			})
			document.onkeydown = checkKey;
		}

		main_controller.init = function() {
			bindPartitionButtons();
			bargraph.drawAxes();
			scatterplot.drawAxes();
			drawNewPage();
		}

		return main_controller;

	}

	return module;

})