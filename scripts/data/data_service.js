var file_path = process.argv[2];
var input_name = process.argv[3];
var fs = require("fs"),
	csv = require("fast-csv"),
	data_out = file_path + "processed_data";

var max_value = 0;

var output = {
	"macro_extent" : {
		"x" : [0,0],
		"y" : [0,0]
	}
}

var ranges = [
	{
		"range":-1,
		"value":0
	},
	{
		"range":-.9,
		"value":0
	},
	{
		"range":-.8,
		"value":0
	},
	{
		"range":-.7,
		"value":0
	},
	{
		"range":-.6,
		"value":0
	},
	{
		"range":-.5,
		"value":0
	},
	{
		"range":-.4,
		"value":0
	},
	{
		"range":-.3,
		"value":0
	},
	{
		"range":-.2,
		"value":0
	},
	{
		"range":-.1,
		"value":0
	},
	{
		"range":.1,
		"value":0
	},
	{
		"range":.2,
		"value":0
	},
	{
		"range":.3,
		"value":0
	},
	{
		"range":.4,
		"value":0
	},
	{
		"range":.5,
		"value":0
	},
	{
		"range":.6,
		"value":0
	},
	{
		"range":.7,
		"value":0
	},
	{
		"range":.8,
		"value":0
	},
	{
		"range":.9,
		"value":0
	},
	{
		"range":1,
		"value":0
	},
]

function prepData(slice) {
	var congress_number = +slice.congress_number;
	if (congress_number > 89) {
		var congress_name = "congress_"+congress_number;
		if (!output[congress_name]) {
			output[congress_name] = {
				"number" : congress_number,
				"house" : {
					"rep" : {
						"members" : [],
						"distribution" : [
							{
								"range":-1,
								"value":0
							},
							{
								"range":-.9,
								"value":0
							},
							{
								"range":-.8,
								"value":0
							},
							{
								"range":-.7,
								"value":0
							},
							{
								"range":-.6,
								"value":0
							},
							{
								"range":-.5,
								"value":0
							},
							{
								"range":-.4,
								"value":0
							},
							{
								"range":-.3,
								"value":0
							},
							{
								"range":-.2,
								"value":0
							},
							{
								"range":-.1,
								"value":0
							},
							{
								"range":.1,
								"value":0
							},
							{
								"range":.2,
								"value":0
							},
							{
								"range":.3,
								"value":0
							},
							{
								"range":.4,
								"value":0
							},
							{
								"range":.5,
								"value":0
							},
							{
								"range":.6,
								"value":0
							},
							{
								"range":.7,
								"value":0
							},
							{
								"range":.8,
								"value":0
							},
							{
								"range":.9,
								"value":0
							},
							{
								"range":1,
								"value":0
							}
						]
					},
					"dem" : {
						"members" : [],
						"distribution" : [
							{
								"range":-1,
								"value":0
							},
							{
								"range":-.9,
								"value":0
							},
							{
								"range":-.8,
								"value":0
							},
							{
								"range":-.7,
								"value":0
							},
							{
								"range":-.6,
								"value":0
							},
							{
								"range":-.5,
								"value":0
							},
							{
								"range":-.4,
								"value":0
							},
							{
								"range":-.3,
								"value":0
							},
							{
								"range":-.2,
								"value":0
							},
							{
								"range":-.1,
								"value":0
							},
							{
								"range":.1,
								"value":0
							},
							{
								"range":.2,
								"value":0
							},
							{
								"range":.3,
								"value":0
							},
							{
								"range":.4,
								"value":0
							},
							{
								"range":.5,
								"value":0
							},
							{
								"range":.6,
								"value":0
							},
							{
								"range":.7,
								"value":0
							},
							{
								"range":.8,
								"value":0
							},
							{
								"range":.9,
								"value":0
							},
							{
								"range":1,
								"value":0
							}
						]
					}
				},
				"senate" : {
					"rep" : {
						"members" : [],
						"distribution" : [
							{
								"range":-1,
								"value":0
							},
							{
								"range":-.9,
								"value":0
							},
							{
								"range":-.8,
								"value":0
							},
							{
								"range":-.7,
								"value":0
							},
							{
								"range":-.6,
								"value":0
							},
							{
								"range":-.5,
								"value":0
							},
							{
								"range":-.4,
								"value":0
							},
							{
								"range":-.3,
								"value":0
							},
							{
								"range":-.2,
								"value":0
							},
							{
								"range":-.1,
								"value":0
							},
							{
								"range":.1,
								"value":0
							},
							{
								"range":.2,
								"value":0
							},
							{
								"range":.3,
								"value":0
							},
							{
								"range":.4,
								"value":0
							},
							{
								"range":.5,
								"value":0
							},
							{
								"range":.6,
								"value":0
							},
							{
								"range":.7,
								"value":0
							},
							{
								"range":.8,
								"value":0
							},
							{
								"range":.9,
								"value":0
							},
							{
								"range":1,
								"value":0
							}
						]
					},
					"dem" : {
						"members" : [],
						"distribution" : [
							{
								"range":-1,
								"value":0
							},
							{
								"range":-.9,
								"value":0
							},
							{
								"range":-.8,
								"value":0
							},
							{
								"range":-.7,
								"value":0
							},
							{
								"range":-.6,
								"value":0
							},
							{
								"range":-.5,
								"value":0
							},
							{
								"range":-.4,
								"value":0
							},
							{
								"range":-.3,
								"value":0
							},
							{
								"range":-.2,
								"value":0
							},
							{
								"range":-.1,
								"value":0
							},
							{
								"range":.1,
								"value":0
							},
							{
								"range":.2,
								"value":0
							},
							{
								"range":.3,
								"value":0
							},
							{
								"range":.4,
								"value":0
							},
							{
								"range":.5,
								"value":0
							},
							{
								"range":.6,
								"value":0
							},
							{
								"range":.7,
								"value":0
							},
							{
								"range":.8,
								"value":0
							},
							{
								"range":.9,
								"value":0
							},
							{
								"range":1,
								"value":0
							}
						]
					}
				}
			};
		}
		//create entry for "members" array
		var item = {
			"name":slice.name,
			"state":slice.state_name
		}
		item.x = +slice.x_dimension;
		item.y = +slice.alt_dimension;
		var distribution;
		
		if (item.x > 0) {
			distribution = Number(Math.ceil(slice.x_dimension+'e1')+'e-1');
		} else {
			distribution = Number(Math.floor(slice.x_dimension+'e1')+'e-1');
		}

		function addDistribution(target) {
			var j = target.length,
				i;
			for (i = 0; i < j; i++) {
				if (target[i].range === distribution) {
					target[i].value++
					if (target[i].value > max_value) {
						max_value = target[i].value;
					}
					break;
				}
			}
		}

		//determine house/senate, rep/dem
		if (slice.congress_district == 0) {
			if (slice.party_code == 100) {
				output[congress_name].senate.dem.members.push(item);
				addDistribution(output[congress_name].senate.dem.distribution);
			} else if (slice.party_code == 200) {
				output[congress_name].senate.rep.members.push(item);
				addDistribution(output[congress_name].senate.rep.distribution);
			} else if (slice.x_dimension <= 0) {
				console.log(slice.name + " is assigned dem and has a score of:");
				console.log(slice.x_dimension);
				console.log(distribution);
				output[congress_name].senate.dem.members.push(item);
				addDistribution(output[congress_name].senate.dem.distribution);
			} else {
				console.log(slice.name + " is assigned rep and has a score of:");
				console.log(slice.x_dimension);
				console.log(distribution);
				output[congress_name].senate.rep.members.push(item);
				addDistribution(output[congress_name].senate.rep.distribution);
			}
		} else {
			if (slice.party_code == 100) {
				output[congress_name].house.dem.members.push(item);
				addDistribution(output[congress_name].house.dem.distribution);
			} else if (slice.party_code == 200) {
				output[congress_name].house.rep.members.push(item);
				addDistribution(output[congress_name].house.rep.distribution);
			} else if (slice.x_dimension <= 0) {
				console.log(slice.name + " is assigned dem and has a score of:");
				console.log(slice.x_dimension);
				console.log(distribution);
				output[congress_name].house.dem.members.push(item);
				addDistribution(output[congress_name].house.dem.distribution);
			} else {
				console.log(slice.name + " is assigned rep and has a score of:");
				console.log(slice.x_dimension);
				console.log(distribution);
				output[congress_name].house.rep.members.push(item);
				addDistribution(output[congress_name].house.rep.distribution);
			}
		}
		if (item.x < output.macro_extent.x[0]) {
			output.macro_extent.x[0] = item.x;
		} else if (item.x > output.macro_extent.x[1]) {
			output.macro_extent.x[1] = item.x;
		}
		if (item.y < output.macro_extent.y[0]) {
			output.macro_extent.y[0] = item.y;
		} else if (item.y > output.macro_extent.y[1]) {
			output.macro_extent.y[1] = item.y;
		}
	}
}

function write_json(data, file_name, var_name) {
	var file_js = file_name + ".js";

	var newDat = JSON.stringify(data);
	newDat = "var " + var_name + " = " + newDat;

	fs.writeFile(file_js, newDat, function(err) {
	//console.log(err);
	});
}

var stream = fs.createReadStream(file_path+"data.csv")
    .pipe(csv.parse({headers: true}))
    .on("readable", function() {
        var row;
        while (null !== (row = stream.read())) {
            prepData(row);
        }
    })
    .on("end", function() {
    	console.log(output);
    	console.log(output.macro_extent.x)
    	console.log(output.macro_extent.y)
    	console.log("MAX VALUE IS:")
    	console.log(max_value)
    	write_json(output, "congress_data", "congress_data")
    	process.exit;
    });


