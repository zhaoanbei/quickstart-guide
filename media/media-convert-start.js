var AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
    
    var mediaconvert = new AWS.MediaConvert({
        apiVersion: '2017-08-29',
        //您的media convert account endpoint
        endpoint: '',
        region: 'cn-northwest-1'
    });
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "media-convert-start";
    //get the paramters about s3 and object from the event
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var params = {
      //queue的ARN
      "Queue": "",
      "UserMetadata": {},
      //media convert的role, full s3 access.
      "Role": "",
      "Settings": {
        "OutputGroups": [
          {
            "Name": "File Group",
            "Outputs": [
              {
                "ContainerSettings": {
                  "Container": "MP4",
                  "Mp4Settings": {
                    "CslgAtom": "INCLUDE",
                    "FreeSpaceBox": "EXCLUDE",
                    "MoovPlacement": "PROGRESSIVE_DOWNLOAD"
                  }
                },
                "VideoDescription": {
                  "Width": 720,
                  "ScalingBehavior": "DEFAULT",
                  "Height": 720,
                  "TimecodeInsertion": "DISABLED",
                  "AntiAlias": "ENABLED",
                  "Sharpness": 100,
                  "CodecSettings": {
                    "Codec": "H_264",
                    "H264Settings": {
                      "InterlaceMode": "PROGRESSIVE",
                      "NumberReferenceFrames": 3,
                      "Syntax": "DEFAULT",
                      "Softness": 0,
                      "FramerateDenominator": 1,
                      "GopClosedCadence": 1,
                      "GopSize": 90,
                      "Slices": 1,
                      "GopBReference": "DISABLED",
                      "SlowPal": "DISABLED",
                      "SpatialAdaptiveQuantization": "ENABLED",
                      "TemporalAdaptiveQuantization": "ENABLED",
                      "FlickerAdaptiveQuantization": "DISABLED",
                      "EntropyEncoding": "CABAC",
                      "Bitrate": 5000000,
                      "FramerateControl": "SPECIFIED",
                      "RateControlMode": "CBR",
                      "CodecProfile": "MAIN",
                      "Telecine": "NONE",
                      "FramerateNumerator": 60,
                      "MinIInterval": 0,
                      "AdaptiveQuantization": "HIGH",
                      "CodecLevel": "AUTO",
                      "FieldEncoding": "PAFF",
                      "SceneChangeDetect": "ENABLED",
                      "QualityTuningLevel": "MULTI_PASS_HQ",
                      "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                      "UnregisteredSeiTimecode": "DISABLED",
                      "GopSizeUnits": "FRAMES",
                      "ParControl": "INITIALIZE_FROM_SOURCE",
                      "NumberBFramesBetweenReferenceFrames": 2,
                      "RepeatPps": "DISABLED"
                    }
                  },
                  "AfdSignaling": "NONE",
                  "DropFrameTimecode": "ENABLED",
                  "RespondToAfd": "NONE",
                  "ColorMetadata": "INSERT"
                },
                "AudioDescriptions": [
                  {
                    "AudioTypeControl": "FOLLOW_INPUT",
                    "CodecSettings": {
                      "Codec": "AAC",
                      "AacSettings": {
                        "AudioDescriptionBroadcasterMix": "NORMAL",
                        "Bitrate": 96000,
                        "RateControlMode": "CBR",
                        "CodecProfile": "LC",
                        "CodingMode": "CODING_MODE_2_0",
                        "RawFormat": "NONE",
                        "SampleRate": 48000,
                        "Specification": "MPEG4"
                      }
                    },
                    "LanguageCodeControl": "FOLLOW_INPUT"
                  }
                ]
              }
            ],
            "OutputGroupSettings": {
              "Type": "FILE_GROUP_SETTINGS",
              "FileGroupSettings": {
                "Destination": "s3://dest-video-bucket/"
              }
            }
          }
        ],
        "AdAvailOffset": 0,
        "Inputs": [
          {
            "AudioSelectors": {
              "Audio Selector 1": {
                "Offset": 0,
                "DefaultSelection": "DEFAULT",
                "SelectorType": "TRACK",
                "ProgramSelection": 1
              }
            },
            "FilterEnable": "AUTO",
            "PsiControl": "USE_PSI",
            "FilterStrength": 0,
            "DeblockFilter": "DISABLED",
            "DenoiseFilter": "DISABLED",
            "TimecodeSource": "EMBEDDED",
            "FileInput": "s3://"+ srcBucket +"/" +srcKey
          }
        ]
      }
    };
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
