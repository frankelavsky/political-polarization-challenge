define([
	'd3'
],
function(d3) {

	function module() {

		var bar_graph = {};

		var rep_color_scale = d3.scaleLinear()
			.range(["#ffb3b3","#e60000","#8b0000","#4d0000"])
			.domain([-1,0,.5,1]);
		var dem_color_scale = d3.scaleLinear()
			.range(["#9999ff","#6666ff","#0000ff","#00004d"])
			.domain([1,0,-.5,-1]);

		var rep_opacity_scale = d3.scaleLinear()
			.range([.2,.5,1])
			.domain([-1,.1,1]);
		var dem_opacity_scale = d3.scaleLinear()
			.range([1,.5,.2])
			.domain([-1,-.1,1]);

		var margin = {top: 10, right: 20, bottom: 30, left: 30},
			width = 580 - margin.left - margin.right,
			height = 350 - margin.top - margin.bottom;

		var x = d3.scaleBand().rangeRound([0, width]).padding(0),
			y = d3.scaleLinear().rangeRound([height, 0]);

		bar_graph.drawAxes = function() {
			x.domain(congress_data.congress_90.house.rep.distribution.map(function(d) { return d.range; }));
			y.domain([0, 90]);

			var svg = d3.select("#house").select(".bargraph");

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).ticks(20));

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(9).tickSizeOuter(0))
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0)

			var svg = d3.select("#senate").select(".bargraph");
			y.domain([0, 30]);

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).ticks(20));

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0)

		}

		bar_graph.draw = function(input_data, parent_element, current) {
			var rep_data = input_data.rep.distribution;
			var data = input_data.dem.distribution;
			var bar_class = parent_element+current;
			rep_data.forEach(function(d){
				d.party="rep";
				data.push(d);
			})
			if (parent_element === "senate") {
				y.domain([0, 30]);
			} else {
				y.domain([0, 90]);
			}

			var svg = d3.select(("#"+parent_element)).select(".bargraph");

			svg.selectAll(".bar")
				.classed("hidden",true)

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			if (d3.selectAll(("."+bar_class)).empty()) {
				g.selectAll(".bar")
					.data(data)
					.enter().append("rect")
					.attr("class", "bar "+bar_class)
					.attr("x", function(d) { return x(d.range); })
					.attr("y", function(d) { return y(d.value); })
					.attr("width", x.bandwidth())
					.attr("height", function(d) { return height - y(d.value); })
					.attr("fill", function(d) {
						if (d.party) {
							return rep_color_scale(d.range); 
						}
						return dem_color_scale(d.range); 
					})
					.style("opacity", 0)
					.style("opacity", function(d){
						if (d.party) {
							return rep_opacity_scale(d.range);
						}
						return dem_opacity_scale(d.range); 
					})
					//.style("mix-blend-mode","screen");
			} else {
				d3.selectAll(("."+bar_class)).classed("hidden",false)
			}

		}

		return bar_graph;

	}

	return module;

})