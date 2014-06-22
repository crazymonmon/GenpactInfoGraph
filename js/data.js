// Updates the data for a given industry
function ShowGraph(IndustryName, Q1, Q2) {
//alert(IndustryName);
//alert(Q1);
//alert(Q2);


  d3.json("data.json", function(data) {
                          var IndustryData;

                          IndustryData = data[IndustryName];
                          TotalVolatilityUpdate(
                            IndustryData["Industries"], Q1, Q2)
                          CompaniesImpactedUpdate(
                            IndustryData["CompaniesImpacted"], Q1, Q2);
                          AverageVolatilityUpdate(
                            IndustryData["AverageVolatility"], Q1, Q2);
                          BigGraphUpdate(
                            IndustryData["Others"], Q1, Q2);                          
                        });
}

function TotalVolatility(graphData, Q1, Q2) {


 
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  
  
  var width = jQuery("#TotalVolatility").width();
  var height = jQuery("#TotalVolatility").height();

  var divContainer = d3.select("#TotalVolatility");
  var svgContainer = divContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

  var barWidth = width/4.0;
  var barSeparation = barWidth/2.0;

  var linearScale = d3.scale.linear()
                      .domain([0,100])
                      .range([0,height]);

  
  // Creating the elements of the graph
  // Background of bar graph
  var barBG = svgContainer.selectAll("rectBG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectBG");

  // Bar graph
  var barFG = svgContainer.selectAll("rectFG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectFG");

  // Percentage value
  var textValue = svgContainer.selectAll("textValue").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textValue");

  // Quarter
  var textLabel = svgContainer.selectAll("textLabel").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textLabel");

  barBG.attr("y", 0)
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", height)
    .attr("width", barWidth)
    .attr("fill", "#42BBE8");

   barFG.attr("y", function(d) {
                    return height - linearScale(d);
            })
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("width", barWidth)
    .attr("height", function (d) {
              return linearScale(d);
            })
    .attr("fill", "#F68F40");

  
  textValue.attr("y", function(d) {
                    return height - linearScale(d);
            })
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", "0.0em")
      .attr("dy", "-.35em")
      .attr("fill", "black")
      .text(  function (d) { 
            return String(d.toFixed(1));
            
          });

   textLabel.attr("y", function(d) {
                    return height;
            })
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "-0.35em")
      .attr("fill", "black")
      .text(  function (d, i) { 
         var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

function TotalVolatilityUpdate(graphData, Q1, Q2) {
 
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  var height = jQuery("#TotalVolatility").height();

  var svgContainer = d3.select("#TotalVolatility").select("svg");
  
  var linearScale = d3.scale.linear()
                    .domain([0,100])
                    .range([0,height]);

  existingData = svgContainer.selectAll(".rectFG").data();
  existingLabel = svgContainer.selectAll(".textLabel")[0];
  
  if (Q1 == null) {
    data[0] = existingData[0];
    label[0] = existingLabel[0].innerHTML;
  }

  if (Q2 == null) {
    data[1] = existingData[1];
    label[1] = existingLabel[1].innerHTML;
  }

  // Bar graph
  var barFG = svgContainer.selectAll(".rectFG").data(data);
  barFG.exit().remove();
  barFG.enter().append("rect")
          .attr("class", "rectFG");

  // Percentage value
  var textValue = svgContainer.selectAll(".textValue").data(data);
  textValue.exit().remove();
  textValue.enter()
              .append("text")
              .attr("class", "textValue");

  // Quarter
  var textLabel = svgContainer.selectAll(".textLabel").data(data);
  textLabel.exit().remove();
  textLabel.enter()
            .append("text")
            .attr("class", "textLabel");

    barFG
    .transition()
    .attr("y", function(d) {
                    return height - linearScale(d);
            })
    .attr("height", function (d) {
              return linearScale(d);
            });
  
  textValue
      .transition()
      .attr("y", function(d) {
                    return height - linearScale(d);
            })
      .text(  function (d) { 
            return String(d.toFixed(1));
          });

   textLabel
      .transition()
      .text(  function (d, i) { 
             var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

// Draws bar charts for "Companies Impacted"
function CompaniesImpacted(graphData, Q1, Q2) {
 
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  
  
  var width = jQuery("#CompaniesImpacted").width();
  var height = jQuery("#CompaniesImpacted").height();

  var divContainer = d3.select("#CompaniesImpacted");
  var svgContainer = divContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

  var barWidth = height/3.0;
  var barSeparation = barWidth/2.0;

  var linearScale = d3.scale.linear()
                      .domain([0,100])
                      .range([0,width]);

  //scaleData(data, linearScale);

  
  // Creating the elements of the graph
  // Background of bar graph
  var barBG = svgContainer.selectAll("rectBG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectBG");

  // Bar graph
  var barFG = svgContainer.selectAll("rectFG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectFG");

  // Percentage value
  var textValue = svgContainer.selectAll("textValue").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textValue");

  // Quarter
  var textLabel = svgContainer.selectAll("textLabel").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textLabel");

  barBG.attr("x", 0)
    .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", barWidth)
    .attr("width", width)
    .attr("fill", "#42BBE8");

  barFG.attr("x", 0)
    .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", barWidth)
    .attr("width", function (d) {
              return linearScale(d);
            })
    .attr("fill", "#F68F40");

  
  textValue.attr("x", width)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", "-2.50em")
      .attr("dy", "0.8em")
      .attr("fill", "black")
      .text(  function (d) { 
            return String(d.toFixed(1) + "%");
          });

   textLabel.attr("x", 0)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "1.2em")
      .attr("fill", "black")
      .text(  function (d, i) { 
             var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

function CompaniesImpactedUpdate(graphData, Q1, Q2) {
 
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  var width = jQuery("#CompaniesImpacted").width();
  var svgContainer = d3.select("#CompaniesImpacted").select("svg");

  existingData = svgContainer.selectAll(".rectFG").data();
  existingLabel = svgContainer.selectAll(".textLabel")[0];
  
  if (Q1 == null) {
    data[0] = existingData[0];
    label[0] = existingLabel[0].innerHTML;
  }

  if (Q2 == null) {
    data[1] = existingData[1];
    label[1] = existingLabel[1].innerHTML;
  }

  var barFG = svgContainer.selectAll(".rectFG").data(data);
  barFG.exit().remove();
  barFG.enter().append("rect")
                  .attr("class", "rectFG");

  var textValue = svgContainer.selectAll(".textValue").data(data);
                    textValue.exit().remove();
                    textValue.enter().append("text");

  var textLabel = svgContainer.selectAll(".textLabel").data(data);
                    textValue.exit().remove();
                    textValue.enter().append("text");
            
  var linearScale = d3.scale.linear()
                      .domain([0,100])
                      .range([0,width]);

  //scaleData(data, linearScale);

  barFG
    .transition()
    .attr("width", function (d) {
              return linearScale(d);
            });

  
  textValue
      .transition()
      .text(  function (d) { 
            return String(d.toFixed(1) +"%");
          });

  textLabel
      .transition()
      .text(  function (d, i) { 
             var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

function AverageVolatility(graphData, Q1, Q2) {
 
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  var width = jQuery("#AverageVolatility").width();
  var height = jQuery("#AverageVolatility").height();

  var divContainer = d3.select("#AverageVolatility");
  var svgContainer = divContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

  var barWidth = height/3.0;
  var barSeparation = barWidth/2.0;
  var height = (barWidth + barSeparation) * data.length;

  var linearScale = d3.scale.linear()
                      .domain([0,100])
                      .range([0,width]);

  //scaleData(data, linearScale);
  
  // Creating the elements of the graph
  // Background of bar graph
  var barBG = svgContainer.selectAll("rectBG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectBG");

  // Bar graph
  var barFG = svgContainer.selectAll("rectFG").data(data)
                .enter()
                  .append("rect")
                  .attr("class", "rectFG");

  // Percentage value
  var textValue = svgContainer.selectAll("textValue").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textValue");

  // Quarter
  var textLabel = svgContainer.selectAll("textLabel").data(data)
                    .enter()
                      .append("text")
                      .attr("class", "textLabel");

  barBG.attr("x", 0)
    .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", barWidth)
    .attr("width", width)
    .attr("fill", "#42BBE8");

  barFG.attr("x", 0)
    .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", barWidth)
    .attr("width", function (d) {
              return linearScale(d);
            })
    .attr("fill", "#F68F40");

  
  textValue.attr("x", width)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", "-3.50em")
      .attr("dy", "0.8em")
      .attr("fill", "black")
      .text(  function (d) { 
            return String(d.toFixed(1) + "%");
          });

   textLabel.attr("x", 0)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "1.2em")
      .attr("fill", "black")
      .text(  function (d, i) { 
             var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

function AverageVolatilityUpdate(graphData, Q1, Q2) {
  data = [graphData[Q1], graphData[Q2]];
  label = [Q1, Q2];

  var width = jQuery("#AverageVolatility").width();
  var svgContainer = d3.select("#AverageVolatility").select("svg");

  existingData = svgContainer.selectAll(".rectFG").data();
  existingLabel = svgContainer.selectAll(".textLabel")[0];
  
  if (Q1 == null) {
    data[0] = existingData[0];
    label[0] = existingLabel[0].innerHTML;
  }

  if (Q2 == null) {
    data[1] = existingData[1];
    label[1] = existingLabel[1].innerHTML;
  }

  var barFG = svgContainer.selectAll(".rectFG").data(data);
  barFG.exit().remove();
  barFG.enter().append("rect")
                  .attr("class", "rectFG");

  var textValue = svgContainer.selectAll(".textValue").data(data);
                    textValue.exit().remove();
                    textValue.enter().append("text");

  var textLabel = svgContainer.selectAll(".textLabel").data(data);
                    textValue.exit().remove();
                    textValue.enter().append("text");
            
  var linearScale = d3.scale.linear()
                      .domain([0,100])
                      .range([0,width]);

  //scaleData(data, linearScale);

  barFG
    .transition()
    .attr("width", function (d) {
              return linearScale(d);
            });

  
  textValue
      .transition()
      .text(  function (d) { 
            return String(d.toFixed(1)) + "%";
          });

  textLabel
      .transition()
      .text(  function (d, i) { 
             var res = label[i].substring(0, 2);
            return res.toUpperCase() ;
          });
}

function BigGraph(graphData, Q1, Q2) {
 
  var width = jQuery("#BigGraph").width();
  var height = jQuery("#BigGraph").height();

  var linearScale = d3.scale.linear()
                      .domain([-1,1])
                      .range([-0.8* height/2,0.8*height/2]);

  var svgContainer = d3.select("#BigGraph").append("svg")
              .attr("width", width)
              .attr("height", height);


  dataQ1 = [
    graphData["FinancialIndustries"][Q1],
    graphData["RegulatoryIndustries"][Q1],
    graphData["MAIndustries"][Q1],
    graphData["RestructuringIndustries"][Q1],
    graphData["LeadershipIndustries"][Q1]
    ];

  dataQ2 = [
    graphData["FinancialIndustries"][Q2],
    graphData["RegulatoryIndustries"][Q2],
    graphData["MAIndustries"][Q2],
    graphData["RestructuringIndustries"][Q2],
    graphData["LeadershipIndustries"][Q2]
    ];

  dataLabel = [
    "Financial",
    "Regulatory",
    "MA",
    "Restructuring",
    "Leadership"
    ];
  
  

  var barWidth = width/20;
  var barSeparation = barWidth * 3;
  var barTranslation = barWidth * 2;
  

  var barOneGroup = svgContainer.append("g");
  var barTwoGroup = svgContainer.append("g");


  var barOne = barOneGroup.selectAll("barOne").data(dataQ1)
                  .enter()
                    .append("rect")
                    .attr("class", "barOne");

  var barOneLabel = barOneGroup.selectAll("barOneLabel").data(dataQ1)
                      .enter()
                        .append("text")
                        .attr("class", "barOneLabel");

  var barTwo = barTwoGroup.selectAll("barTwo").data(dataQ2)
                  .enter()
                    .append("rect")
                    .attr("class", "barTwo")

  var barTwoLabel = barTwoGroup.selectAll("barTwoLabel").data(dataQ2)
                      .enter()
                        .append("text")
                        .attr("class", "barTwoLabel")

  var textLabel = svgContainer.selectAll("textLabel").data(dataLabel)
                    .enter()
                      .append("text")
                      .attr("class", "textLabel")

  var axis = svgContainer.append("line")
          .attr("x1", 0).attr("y1", height/2)
          .attr("x2", width).attr("y2", height/2)
          .attr("stroke-width", 2)
          .attr("stroke", "black")

  barOne.attr("x", function (d, i) {
            return ((barWidth + barSeparation) * i) + barWidth;
          })
    .attr("y", function (d) {
            if (d>0) {
              return (height/2) - linearScale(d);
            } else {
              return height/2;
            }
          })
    .attr("height", function (d) {
              return linearScale(Math.abs(d));
            })
    .attr("width", barWidth)
    .attr("fill", function (d) {
              if (d > 0) {
                return "orange";
              } else {
                return "green";
              }
            });

  barOneLabel.attr("x", function (d, i) {
            return ((barWidth + barSeparation) * i) + barWidth;
          })
    .attr("y", function (d) {
              return (height/2) - linearScale(d);       
          })
    .attr("dx", function (d) {
            if (d > 0) {
              return ".35em";
            } else {
              return "-0.2em";
            };
          })
    .attr("dy", function (d) {
            if (d > 0) {
              return "-0.2em";
            } else {
              return "1.2em";
            }
          })
    .attr("fill", "grey")
    .text(  function (d) { 
          return String(d.toFixed(0));
        });

  barTwo.attr("x", function (d, i) {
            return ((barWidth + barSeparation) * i) + barWidth;
          })
    .attr("y", function (d) {
            if (d>0) {
              return (height/2) - linearScale(d);
            } else {
              return height/2;
            }
          })
    .attr("height", function (d) {
              return linearScale(Math.abs(d));
            })
    .attr("width", barWidth)
    .attr("fill", function (d) {
              if (d > 0) {
                return "orange";
              } else {
                return "green";
              }
            });

  barTwoLabel.attr("x", function (d, i) {
            return ((barWidth + barSeparation) * i) + barWidth;
          })
    .attr("y", function (d) {
            return (height/2) - linearScale(d);
          })
    .attr("dx", function (d) {

            if (d > 0) {
              return ".35em";
            } else {
              return "-0.2em";
            }
          })
    .attr("dy", function (d) {
            if (d > 0) {
              return "-0.2em";
            } else {
              return "1.2em";
            }
          })
    .attr("fill", "grey")
    .text(  function (d) { 
          return String(d.toFixed(0));
        });

  barTwoGroup.attr("transform", "translate(40,0)");

  textLabel.attr("x", function (d, i) {
            return ((barWidth + barSeparation) * i) + barWidth;
          })
    .attr("y", height/2)
    .attr("fill", "black")
    .attr("dy", function (d) {

            if (d < 0) {
              return "-1.2em";
            } else {
              return "1.35em";
            }
          })
    .attr("fill", "grey")
    .text(  function (d, i) { 
          return dataLabel[i];
        });
}


function BigGraphUpdate(graphData, Q1, Q2) {



  var height = jQuery("#BigGraph").height();

  var linearScale = d3.scale.linear()
                      .domain([-1,1])
                      .range([-0.8* height/2,0.8*height/2]);

  dataQ1 = [
    graphData["FinancialIndustries"][Q1],
    graphData["RegulatoryIndustries"][Q1],
    graphData["MAIndustries"][Q1],
    graphData["RestructuringIndustries"][Q1],
    graphData["LeadershipIndustries"][Q1]
    ];

  dataQ2 = [
    graphData["FinancialIndustries"][Q2],
    graphData["RegulatoryIndustries"][Q2],
    graphData["MAIndustries"][Q2],
    graphData["RestructuringIndustries"][Q2],
    graphData["LeadershipIndustries"][Q2]
    ];

  dataLabel = [
    "Financial",
    "Regulatory",
    "MA",
    "Restructuring",
    "Leadership"
    ];
 
  var svgContainer = d3.select("#BigGraph").select("svg");
  
  if (Q1 != null) {           
    var barOne = svgContainer.selectAll(".barOne").data(dataQ1);
    barOne.exit().remove();
    barOne.enter().append("rect")
                    .attr("class", "barOne");

    var barOneLabel = svgContainer.selectAll(".barOneLabel").data(dataQ1);
    barOne.exit().remove();
    barOne.enter().append("text")
                    .attr("class", "barOneLabel");
  }
  
  if (Q2 != null) {
    var barTwo = svgContainer.selectAll(".barTwo").data(dataQ2);
    barTwo.exit().remove();
    barTwo.enter().append("rect")
                    .attr("class", "barTwo");
   
    var barTwoLabel = svgContainer.selectAll(".barTwoLabel").data(dataQ2);
    barTwoLabel.exit().remove();
    barTwoLabel.enter().append("text")
                    .attr("class", "barTwoLabel");
  }

  if (Q1 != null) {
    var textLabel = svgContainer.selectAll(".textLabel").data(dataQ1);
    textLabel.exit().remove();
    textLabel.enter().append("text")
                    .attr("class", "textLabel");
  }

  barOne
    .transition()
    .attr("y", function (d) {
            if (d>0) {
              return (height/2) - linearScale(d);
            } else {
              return height/2;
            }
          })
    .attr("height", function (d) {
              return linearScale(Math.abs(d));
            })
    .attr("fill", function (d) {
              if (d > 0) {
                return "orange";
              } else {
                return "green";
              }
            });

  barOneLabel
    .transition()
    .attr("y", function (d) {
              return (height/2) - linearScale(d);       
          })
    .attr("dx", function (d) {
            if (d > 0) {
              return ".35em";
            } else {
              return "-0.2em";
            }
          })
    .attr("dy", function (d) {
            if (d > 0) {
              return "-0.2em";
            } else {
              return "1.2em";
            }
          })
    .text(  function (d) { 
          return String(d.toFixed(0));
        });

  barTwo
    .transition()
    .attr("y", function (d) {
            if (d>0) {
              return (height/2) - linearScale(d);
            } else {
              return height/2;
            }
          })
    .attr("height", function (d) {
              return linearScale(Math.abs(d));
            })
    .attr("fill", function (d) {
              if (d > 0) {
                return "orange";
              } else {
                return "green";
              }
            });

  barTwoLabel
    .transition()
    .attr("y", function (d) {
              return (height/2) - linearScale(d);       
          })
    .attr("dx", function (d) {
            if (d > 0) {
              return ".35em";
            } else {
              return "-0.2em";
            }
          })
    .attr("dy", function (d) {
            if (d > 0) {
              return "-0.2em";
            } else {
              return "1.2em";
            }
          })
    .text(  function (d) { 
          return String(d.toFixed(0));
        });

  textLabel
    .transition()
    .attr("dy", function (d) {

            if (d > 0) {
              return "1.2em";
            } else {
              return "-.35em";
            }
          })
    .text(  function (d, i) { 
          return dataLabel[i];
        });
}
