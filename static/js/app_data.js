//////////////////////////////////////////////
/* DATA TABLE */
//////////////////////////////////////////////



console.log("READING CSV FILE")
// csv file 
csv_file = 'static/data/amazon_data_small_clean.csv'

// Selecting tbody element of html
var tbody = d3.select("tbody");



/*******************************************************/

// Function to add data - to HTML Table
function addRow(item){
    // Creating a new row into table element
    var row = tbody.append("tr");
    // Reading value in the object and then inserting that values into table row.
    Object.values(item).forEach(value => row.append("td").text(value))   
}



/*******************************************************/


function filter_data(tableData, column ,value)
{
// Filtering out the data based on input value
var filteredData = tableData.filter(item => item[column] === value)
// var filteredData = tableData.filter(item => console.log(item))
// console.log(filteredData);

//  Counting filtered records
var records_count = filteredData.length
console.log(records_count)

var h5 = d3.select("#record_count");
h5.text("RECORDS FOUND : " +  records_count)

// Clearing out the tr and td from tbody
tbody.html("");

// Calling a function for each item of an array 'filteredData'
filteredData.forEach(addRow);

}


/*******************************************************/

function optionChanged(id, value) {

    console.log("Inside Option Function")
    console.log(id)
    console.log(value)

  
    // Grab the data with d3
    d3.csv(csv_file).then(data => 
        {
            console.log("Inside csv")
            var tableData = data;

            if(value === "default")
            {
                console.log("INSIDE IF " + id, value)
                tableData.forEach(addRow);
                var records_count = tableData.length
                console.log(records_count)  
                
            }
            else
            {
                console.log("INSIDE ELSE " + id, value)

                if (id=="review_score") 
                {   
                    column = "reviews_rating_score"
                    console.log("Inside option - review score - " + id, value)
                    filter_data(tableData, column, value)            
                }
                else if (id=="review_recommend") 
                {   
                    column = "reviews_doRecommend"
                    console.log("Inside option - review recommend - " +id, value)
                    filter_data(tableData, column, value)            
                }
                else if (id=="review_type") 
                {   
                    column = "review_rating"
                    console.log("Inside option - review type - " + id, value)
                    filter_data(tableData, column, value)            
                }
                
            }  // else ends
           } 
    );  // then ends
}  // function ends





/******************************************************************/
// function to display default contents
function init() 
{
 
    // Grab the data with d3
    d3.csv(csv_file).then(data => 
    {
        // d3.select("#cont2").setAttribute("style", "margin-left:80px;");
        // console.log(data)
        var tableData = data;
        // Selecting tbody element of html
        var tbody = d3.select("tbody");
        
        // Calling a function 'addRow'for each item of an array 'tableData'
        tableData.forEach(addRow);
        
        // Displaying total records in console
        console.log(tableData.length)

    });
}

// Initialize the dashboard
init();