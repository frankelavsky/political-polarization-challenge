define([
	'd3'
],
function(d3) {

	function module() {

		var scatter_plot = {};

		var tooltip = d3.select("body").append("div").attr("class", "toolTip");

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

		var x = d3.scaleLinear().rangeRound([0, width]),
			y = d3.scaleLinear().rangeRound([height, 0]);
		x.domain([-1,1]);
		y.domain([-1,1]);

		scatter_plot.drawAxes = function() {
			
			var svg = d3.select("#house").select(".scatterplot");

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).ticks(10));

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10))
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", function(d) { return x(0); })
				.attr("y", 0)

			g.append("rect")
				.attr("width",1)
				.attr("height", height)
				.attr("x", function(d) { return x(0); })
				.attr("y", 0)
				.attr("fill","silver")

			var svg = d3.select("#senate").select(".scatterplot");

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).ticks(20));

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10))
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", function(d) { return x(0); })
				.attr("y", 0)

			g.append("rect")
				.attr("width",1)
				.attr("height", height)
				.attr("x", function(d) { return x(0); })
				.attr("y", 0)
				.attr("fill","silver")
		}

		scatter_plot.draw = function(input_data, parent_element, current) {
			var rep_data = input_data.rep.members;
			var data = input_data.dem.members;
			var dot_class = "scatter"+parent_element+current;
			rep_data.forEach(function(d){
				d.party="rep";
				data.push(d);
			})

			var svg = d3.select(("#"+parent_element)).select(".scatterplot");

			svg.selectAll(".dot")
				.classed("hidden",true)

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			if (d3.selectAll(("."+dot_class)).empty()) {
				g.selectAll(".dot")
					.data(data)
					.enter().append("circle")
					.attr("class", "dot "+dot_class)
					.attr("r",3)
					.attr("cx", function(d) { return x(d.x); })
					.attr("cy", function(d) { return y(d.y); })
					.attr("fill", function(d) {
						if (d.party) {
							return rep_color_scale(d.x); 
						}
						return dem_color_scale(d.x); 
					})
					.style("opacity", 0)
					.style("opacity", function(d){
						if (d.party) {
							return rep_opacity_scale(d.x);
						}
						return dem_opacity_scale(d.x); 
					})
					.on("mousemove",mousemove)
					.on("mouseout",mouseout);
			} else {
				console.log("show the old stuff!")
				d3.selectAll(("."+dot_class)).classed("hidden",false)
			}
			
        	function mousemove(d) {
	    		tooltip
		        	.style("left", d3.event.pageX - 50 + "px")
		        	.style("top", d3.event.pageY - 65 + "px")
		        	.style("display", "inline-block")
		        	.html(d.name+", "+d.state+"<br>"+"X Score: "+d.x+", Y Score: "+d.y);
			};

			function mouseout(d) {
	    		tooltip
	    			.style("display", "none");
			};

		}

		return scatter_plot;

	}

	return module;

})