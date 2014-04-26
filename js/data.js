
// On page load
window.onload = function() {
  d3.json("data.json", function(data) {
                          IndustryData = data.IndustryOne;
                          CompaniesImpacted(IndustryData.CompaniesImpacted);
                          AverageVolatility(IndustryData.AverageVolatility);
                          BigGraph(IndustryData.BigGraph);
                        })
}

// Updates the data for a given industry
function ShowGraph(IndustryName) {
  d3.json("data.json", function(data) {
                          var IndustryData;

                          if (IndustryName == "IndustryOne") {
                            IndustryData = data.IndustryOne;
                            
                          } else if (IndustryName == "IndustryTwo") {
                            IndustryData = data.IndustryTwo;
                          }

                          CompaniesImpactedUpdate(IndustryData.CompaniesImpacted);
                          AverageVolatilityUpdate(IndustryData.AverageVolatility);
                          BigGraphUpdate(IndustryData.BigGraph);                          
                        });
}

// Draws bar charts for "Companies Impacted"
function CompaniesImpacted(data) {
 
  // TODO: Select size of graph from the size of the containing div
  var barWidth = 30;
  var barSeparation = 10;
  var height = (barWidth + barSeparation) * data.length;
  var width = 200;
  var svgContainer = d3.select("#CompaniesImpacted").append("svg")
          .attr("width", width)
          .attr("height", height);


  // Creating the elements of the graph
  // Background of bar graph
  var barBG = svgContainer.selectAll("rectBG").data(data)
                .enter()
                  .append("rect");

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
                      .append("text");

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
              return d.percent * width / 100;
            })
    .attr("fill", "#F68F40");

  
  textValue.attr("x", 0)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "1.2em")
      .attr("fill", "white")
      .text(  function (d) { 
            return String(d.percent.toFixed(1)) + " %" ;
          });

   textLabel.attr("x", width)
      .attr("y", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", "-1.35em")
      .attr("dy", "1.2em")
      .attr("fill", "white")
      .text(  function (d) { 
            return d.q;
          });
}

function CompaniesImpactedUpdate(data) {
 
  var barWidth = 30;
  var barSeparation = 10;
  var height = (barWidth + barSeparation) * data.length;
  var width = 200;

  var svgContainer = d3.select("#CompaniesImpacted").select("svg")

  var barFG = svgContainer.selectAll(".rectFG").data(data);
  barFG.exit().remove();
  barFG.enter().append("rect");

  var textValue = svgContainer.selectAll(".textValue").data(data);
  textValue.exit().remove();
  textValue.enter().append("text");

  barFG.attr("x", 0)
    .transition()
    .attr("width", function (d) {
              return d.percent * width / 100;
            })

  
  textValue.attr("x", 0)
      .transition()
      .text(  function (d) { 
            return String(d.percent.toFixed(1)) + " %" ;
          });
}

function AverageVolatility(data) {
  
   
  var barWidth = 40;
  var barSeparation = 20;
  var height = (barWidth + barSeparation) * data.length;
  var width = 200;
  var svgContainer = d3.select("#AverageVolatility").append("svg")
          .attr("width", height)
          .attr("height", width);


  var barBG = svgContainer.selectAll("rectBG").data(data);
  barBG.enter().append("rect");
  var barFG = svgContainer.selectAll("rectFG").data(data);
  barFG.enter().append("rect").attr("class", "rectFG");
  var textValue = svgContainer.selectAll("textValue").data(data);
  textValue.enter().append("text").attr("class", "textValue");
  var textLabel = svgContainer.selectAll("textLabel").data(data);
  textLabel.enter().append("text");

  barBG.attr("y", 0)
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("height", width)
    .attr("width", barWidth)
    .attr("fill", "#42BBE8");

  barFG.attr("y", function(d) {
					return width - d.percent;
					})
    .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
    .attr("width", barWidth)
    .attr("height", function (d) {
              return d.percent * height / 100;
            })
    .attr("fill", "#F68F40"); 

  
  textValue.attr("y", function (d) {
						return width - d.percent;
						})
      .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "-1.2em")
      .attr("fill", "black")
      .text(  function (d) { 
            return String(d.percent.toFixed(1)) + " %" ;
          });

   textLabel.attr("y", width)
      .attr("x", function (d, i) {
            return (barWidth + barSeparation) * i;
          })
      .attr("dx", ".35em")
      .attr("dy", "-1.1em")
      .attr("fill", "black")
      .text(  function (d) { 
            return d.q;
          });
}

function AverageVolatilityUpdate(data) {
 
  var barWidth = 30;
  var barSeparation = 10;
  var height = (barWidth + barSeparation) * data.length;
  var width = 200;

  var svgContainer = d3.select("#AverageVolatility").select("svg")

  var barFG = svgContainer.selectAll(".rectFG").data(data);
 
  var textValue = svgContainer.selectAll(".textValue").data(data);
  
  barFG.transition()
    .attr("width", function (d) {
              return d.percent * width / 100;
            })

  
  textValue.transition()
      .text(function (d) { 
              return String(d.percent.toFixed(1)) + " %" ;
          });
}

function BigGraph(data) {
 
    var barWidth = 30;
    var barSeparation = 100;
    var barTranslation = 40;
    var height = 300;
    var width = (barWidth+barSeparation) * (data.length-1) + barWidth + barTranslation;

    var svgContainer = d3.select("#BigGraph").append("svg")
                .attr("width", width)
                .attr("height", height);

    var barOneGroup = svgContainer.append("g");
    var barTwoGroup = svgContainer.append("g");

    var barOne = barOneGroup.selectAll("barOne").data(data)
                    .enter()
                      .append("rect")
                      .attr("class", "barOne");

    var barOneLabel = barOneGroup.selectAll("barOneLabel").data(data)
                        .enter()
                          .append("text")
                          .attr("class", "barOneLabel");

    var barTwo = barTwoGroup.selectAll("barTwo").data(data)
                    .enter()
                      .append("rect")
                      .attr("class", "barTwo")

    var barTwoLabel = barTwoGroup.selectAll("barTwoLabel").data(data)
                        .enter()
                          .append("text")
                          .attr("class", "barTwoLabel")

    var textLabel = svgContainer.selectAll("textLabel").data(data)
                      .enter()
                        .append("text")
                        .attr("class", "textLabel")

    var axis = svgContainer.append("line")
            .attr("x1", 0).attr("y1", height/2)
            .attr("x2", width).attr("y2", height/2)
            .attr("stroke-width", 2)
            .attr("stroke", "black")

    barOne.attr("x", function (d, i) {
              return (barWidth + barSeparation) * i;
            })
      .attr("y", function (d) {
              if (d.d1>0) {
                return (height/2) - d.d1;
              } else {
                return height/2;
              }
            })
      .attr("height", function (d) {
                return Math.abs(d.d1);
              })
      .attr("width", barWidth)
      .attr("fill", function (d) {
                if (d.d1 > 0) {
                  return "orange"
                } else {
                  return "green"
                }
              });

    barOneLabel.attr("x", function (d, i) {
              return (barWidth + barSeparation) * i;
            })
      .attr("y", function (d) {
                return (height/2) - d.d1;       
            })
      .attr("dx", function (d) {
              if (d.d1 > 0) {
                return ".35em"
              } else {
                return "-0.2em"
              }
            })
      .attr("dy", function (d) {
              if (d.d1 > 0) {
                return "-0.2em"
              } else {
                return "1.2em"
              }
            })
      .attr("fill", "grey")
      .text(  function (d) { 
            return String(d.d1);
          });

    barTwo.attr("x", function (d, i) {
              return (barWidth + barSeparation) * i;
            })
      .attr("y", function (d) {
              if (d.d2>0) {
                return (height/2) - d.d2;
              } else {
                return height/2;
              }
            })
      .attr("height", function (d) {
                return Math.abs(d.d2);
              })
      .attr("width", barWidth)
      .attr("fill", function (d) {
                if (d.d2 > 0) {
                  return "orange"
                } else {
                  return "green"
                }
              });

    barTwoLabel.attr("x", function (d, i) {
              return (barWidth + barSeparation) * i;
            })
      .attr("y", function (d) {
              return (height/2) - d.d2;
            })
      .attr("dx", function (d) {
              if (d.d2 > 0) {
                return ".35em"
              } else {
                return "-0.2em"
              }
            })
      .attr("dy", function (d) {
              if (d.d2 > 0) {
                return "-0.2em"
              } else {
                return "1.2em"
              }
            })
      .attr("fill", "grey")
      .text(  function (d) { 
            return String(d.d2);
          });

    barTwoGroup.attr("transform", "translate(40,0)");

    textLabel.attr("x", function (d, i) {
              return (barWidth + barSeparation) * i;
            })
      .attr("y", height/2)
      .attr("dx", ".35em")
      .attr("dy", function (d) {
              if (d.d1 > 0) {
                return "1.2em"
              } else {
                return "-.35em"
              }
            })
      .attr("fill", "grey")
      .text(  function (d) { 
            return d.label ;
          });
}

function BigGraphUpdate(data) {
 
    var barWidth = 30;
    var barSeparation = 100;
    var barTranslation = 40;
    var height = 300;
    var width = (barWidth+barSeparation) * (data.length-1) + barWidth + barTranslation;

    var svgContainer = d3.select("#BigGraph").select("svg")
                
    var barOne = svgContainer.selectAll(".barOne").data(data);
    var barOneLabel = svgContainer.selectAll(".barOneLabel").data(data);
    var barTwo = svgContainer.selectAll(".barTwo").data(data);
    var barTwoLabel = svgContainer.selectAll(".barTwoLabel").data(data);
    var textLabel = svgContainer.selectAll(".textLabel").data(data);
    
    barOne
      .transition()
      .attr("y", function (d) {
              if (d.d1>0) {
                return (height/2) - d.d1;
              } else {
                return height/2;
              }
            })
      .attr("height", function (d) {
                return Math.abs(d.d1);
              })
      .attr("fill", function (d) {
                if (d.d1 > 0) {
                  return "orange"
                } else {
                  return "green"
                }
              });

    barOneLabel
      .transition()
      .attr("y", function (d) {
                return (height/2) - d.d1;       
            })
      .attr("dx", function (d) {
              if (d.d1 > 0) {
                return ".35em"
              } else {
                return "-0.2em"
              }
            })
      .attr("dy", function (d) {
              if (d.d1 > 0) {
                return "-0.2em"
              } else {
                return "1.2em"
              }
            })
      .text(  function (d) { 
            return String(d.d1);
          });

    barTwo
      .transition()
      .attr("y", function (d) {
              if (d.d2>0) {
                return (height/2) - d.d2;
              } else {
                return height/2;
              }
            })
      .attr("height", function (d) {
                return Math.abs(d.d2);
              })
      .attr("width", barWidth)
      .attr("fill", function (d) {
                if (d.d2 > 0) {
                  return "orange"
                } else {
                  return "green"
                }
              });

    barTwoLabel
      .transition()
      .attr("y", function (d) {
                return (height/2) - d.d2;       
            })
      .attr("dx", function (d) {
              if (d.d2 > 0) {
                return ".35em"
              } else {
                return "-0.2em"
              }
            })
      .attr("dy", function (d) {
              if (d.d2 > 0) {
                return "-0.2em"
              } else {
                return "1.2em"
              }
            })
      .text(  function (d) { 
            return String(d.d2);
          });

    textLabel
      .transition()
      .attr("dy", function (d) {
              if (d.d1 > 0) {
                return "1.2em"
              } else {
                return "-.35em"
              }
            })
      .text(  function (d) { 
            return d.label ;
          });
}
