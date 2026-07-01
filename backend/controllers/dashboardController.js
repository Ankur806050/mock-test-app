const path = require("path");

function dashboardPage(req,res){
    res.sendFile(path.join(__dirname,"../../frontend/pages/dashboard.html"));
}

module.exports = {dashboardPage};