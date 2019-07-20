var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "media-convert-finish";
    var info = event["Records"][0]["Sns"]["Message"];
     var params_table = {
              TableName: table,
              Item:{
                "job_id": JSON.parse(info)["detail"]["jobId"],
                "time_stamp": JSON.parse(info)["time"]
              }
           };
           docClient.put(params_table, function(err, data){
             if(err) callback(err, err.stack);
             else callback(null, data);
           });
};
