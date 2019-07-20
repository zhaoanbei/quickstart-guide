# AWS MediaConvert Demo
## 架构图
![](https://image-resources-aws.s3.amazonaws.com/54129C4CB8D01CBA5BDE94414122566B.png)

## AWS 组件
* S3 面向对象存储服务
* Lambda 无服务器计算服务
* MediaConvert 视频转码服务
* CloudWatch 监控服务
* SNS 发布/订阅消息收发服务
* DynamoDB 无服务器的NoSQL数据库

## 实验步骤
### 1.创建源S3存储桶
* 名字:source-video-bucket
* 区域:ZHY

![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+9.59.58+PM.png)

### 2.创建目标S3存储桶
* 名字:dest-video-bucket
* 区域:ZHY

![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.04.03+PM.png)

### 3.创建DynamoDB表
* 记录开始转换记录的表: media-convert-start
    * job_id: MediaConvert转换任务的ID(主键)
    * time_stamp: 开始转换的时间
    * destbucket: 目标桶
    * destkey: 目标文件名
    * srcbucket: 源桶
    * srckey: 源文件名

![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.28.55+PM.png)
* 记录转换结束的表: media-convert-finish
    * job_id: MediaConvert转换任务的ID(主键)
    * time_stamp: 转换结束的时间

![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.28.55+PM.png)

### 4.创建Lambda函数(2个)
#### 开始转换的Lambda
* 名字:media-convert-resize
* 触发器:
    * S3:source-video-bucket
    * 事件类型:ObjectCreated
![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.07.36+PM.png)
* 角色: Admin(注意，demo不是最佳实践，生产环境请根据具体情况修改)
![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.14.23+PM.png)
* 代码：
```javascript
var AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
    var mediaconvert = new AWS.MediaConvert({
        apiVersion: '2017-08-29',
        //您的MediaConvert服务中的account endpoint
        endpoint: '...',
        region: 'cn-northwest-1'
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "media-convert-start";
    //get the paramters about s3 and object from the event
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    //根据您的具体配置生成params,是一个json
    var params = {...};
    mediaconvert.createJob(params, function(err, data){
        if (err) callback(err, err.stack);
        else {
            callback(null, data);
            var params_table = {
              TableName: table,
              Item:{
                "job_id": data["Job"]["Id"],
                "time_stamp": JSON.stringify(data["Job"]["Timing"]["SubmitTime"]),
                "srcbucket": srcBucket,
                "srckey": srcKey,
                "destbucket": "dest-video-bucket",
                "destkey": srcKey
              }
           };
           docClient.put(params_table, function(err, data){
             if(err) callback(err, err.stack);
             else callback(null, data);
           });
        }
    });  
};
```
#### 结束转换写入dynamoDB的Lambda
* 名称: write_dynamodb_finish
* 角色: Admin(注意，demo不是最佳实践，生产环境请根据具体情况修改)
* 代码:
```javascript
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
```

### 5.配置SNS
* 主题: 
    * 名称: dynamodb
    * 订阅: 
        * 协议: Lambda
        * 终端节点: lambda write_dynamodb_finish 的ARN

![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.51.17+PM-1.png)

### 6.配置CloudWatch Rule
* 名字: finish
* Pattern
```json
{
  "source": [
    "aws.mediaconvert"
  ],
  "detail": {
    "status": [
      "COMPLETE"
    ]
  }
}
```
* Target
* SNS Topic: dynamodb
![](https://image-resources-aws.s3.amazonaws.com/Screen+Shot+2019-06-26+at+10.59.44+PM-1.png)