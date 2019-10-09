5分钟快速上手通过Alluxio引导EMR并运行Spark

*1.概览*
Apache Hadoop和Spark给大数据计算带来了重大革新，而AWS EMR为按需运行集群以处理计算工作负载提供了很好的选择，它管理各种Hadoop服务的部署，并提供挂钩对这些服务进行自定义开发。Alluxio是一个开源的基于内存的分布式存储系统，现在成为开源社区中成长最快的大数据开源项目之一。Alluxio可以运行在EMR上，在EMRFS之上当前提供功能特性。 除了缓存带来的性能优势之外，Alluxio还使用户能够针对on-premise存储或甚至不同的云提供商存储运行计算工作负载。在本文中，我们将通过AWS CLI快速通过Alluxio引导EMR，并运行PySpark进行文档内容筛选。

*2. 准备工作*

* AWS账户
* IAM帐户，具有默认EMR角色
* EC2的密钥对
* 一个S3 Bucket
* AWS CLI：确保已经准备好AWS CLI，有所需要的Access Key和Secret key

通过AWS EMR入门指南 (https://docs.aws.amazon.com/zh_cn/emr/latest/ManagementGuide/emr-gs.html)可以找到大部分先决条件。 需要一个S3存储桶作为Alluxio的Root Under File System，并作为引导脚本的位置。 需要的时候，可以将Root UFS重新配置为HDFS。

*3.基本设置*

首先，下载Alluxio版本 (https://www.alluxio.io/download)并解压缩。

1) 为帐户设置所需的IAM角色，以便能够使用EMR服务

$ aws emr create-default-roles

2) 请确保Alluxio引导程序脚本与EMR配置脚本在可读的S3存储桶中。 以下命令所使用的S3 URI为：s3://pubshow/emr/alluxio-emr.sh；https://pubshow.s3.us-east-2.amazonaws.com/emr/alluxio-emr.json  。
引导脚本需要root UFS URI作为参数。 其他选项可以在引导脚本顶部的注释中看到。 

*$* aws emr create-cluster \
--*auto**-**scaling**-**role* EMR_AutoScaling_DefaultRole \
--*release**-**label* emr-5.25.0 \
--*instance-**groups* '[{"InstanceCount":2,"InstanceGroupType":"CORE","InstanceType":"m5.xlarge","Name":"Core - 2"},{"InstanceCount":1,"EbsConfiguration":{"EbsBlockDeviceConfigs":[{"VolumeSpecification":{"SizeInGB":32,"VolumeType":"gp2"},"VolumesPerInstance":2}]},"InstanceGroupType":"MASTER","InstanceType":"m5.xlarge","Name":"Master - 1"}]' \
--*applications* Name=Presto Name=Hive Name=Hue Name=Spark \
--*name* <CLUSTER NAME> \
--*configurations* https://pubshow.s3.us-east-2.amazonaws.com/emr/alluxio-emr.json \
--*ec2-**attributes* KeyName=<KEY NAME>,InstanceProfile=EMR_EC2_DefaultRole \
--*service-**role*=EMR_DefaultRole \
--*bootstrap-**actions* \
Path='s3://pubshow/emr/alluxio-emr.sh',Args=[<S3 BOOTSTRAP PATH>] \
--log-uri <S3 LOG PATH> \
--region us-east-2

3) 在EMR控制台 (https://console.aws.amazon.com/elasticmapreduce/home)上，可以看到群集经历不同的设置阶段。 群集处于“Waiting”阶段后，单击群集详细信息以获取“Master public DNS”。 使用上一个命令中提供的密钥对SSH进入此实例。 如果未通过CLI指定安全组，则默认EMR安全组将不允许入站SSH。 如果需要通过SSH连接到实例，需要添加新的安全组规则。

4）测试Alluxio是否按预期运行

*$* alluxio runTests

Alluxio缺省安装在/opt/alluxio/中。 Hive和Presto已配置为连接到Alluxio。 集群还使用AWS Glue作为Presto和Hive的默认Metastore。 这将允许您在Alluxio集群的多次运行之间维护表定义。

请参阅以下示例命令以供参考。

*$* aws emr create-cluster \
--auto-scaling-role EMR_AutoScaling_DefaultRole \
--release-label emr-5.25.0 \
--instance-groups '[{"InstanceCount":2,"InstanceGroupType":"CORE","InstanceType":"m5.xlarge","Name":"Core - 2"},{"InstanceCount":1,"EbsConfiguration":{"EbsBlockDeviceConfigs":[{"VolumeSpecification":{"SizeInGB":32,"VolumeType":"gp2"},"VolumesPerInstance":2}]},"InstanceGroupType":"MASTER","InstanceType":"m5.xlarge","Name":"Master - 1"}]' \
--name 'alluxio-Test' \
--configurations https://pubshow.s3.us-east-2.amazonaws.com/emr/alluxio-emr.json \
--ec2-attributes KeyName=keyAlluxio,InstanceProfile=EMR_EC2_DefaultRole \
--service-role=EMR_DefaultRole \
--bootstrap-actions \
Path='s3://pubshow/emr/alluxio-emr.sh',Args=['s3://pubshow/emr/'] \
--log-uri 's3://pubshow/emr/bootstrap-logs' \
--region us-east-2

注意：默认的Alluxio Worker内存设置为20GB。 如果实例类型的内存少于20GB，请更改alluxio-emr.sh脚本中的值。

*4.创建表*

将EMR与Alluxio一起使用的最简单步骤是在Alluxio上创建一个表，并使用Presto / Hive进行查询。
1）SSH进入主节点中的'hadoop'用户。
2）在Alluxio中创建一个目录作为表的外部位置。

$ /opt/alluxio/bin/alluxio fs mkdir /testTable

3）启动Hive CLI

*$* hive

4）创建一个新数据库以查看AWS Glue是否按预期工作。 检查控制台以查看是否已创建数据库。

*CREATE* *DATABASE* glue;

5） 使用新创建的数据库并定义表。

USE glue;
*create* *external* *table* test1 (
userid INT,
age INT,
gender CHAR(1),
occupation STRING,
zipcode STRING)
*ROW* FORMAT DELIMITED
FIELDS TERMINATED *BY* '|'
*LOCATION* 'alluxio:///testTable';

6）将值插入表中

USE glue;
*INSERT* *INTO* test1 *VALUES* (1, 24, 'F', 'Developer', '12345');

7) 读取test1表的数据

*SELECT* * *FROM* test1;

*5.运行Spark作业*
Alluxio bootstrap还可以为您设置EMR并运行Spark作业。主要步骤如下所示：
1）启动pyspark

*$* pyspark

2) 在S3的alluxio根目录（该目录为emr create-cluster中--bootstrap-actions Args中指定的路径）上传文档。文档来源: https://pubshow.s3.us-east-2.amazonaws.com/emr/EMR.txt

在pyspark下输入如下指令。该指令用于计算文档中出现EMR的行数。

from pyspark.sql import SparkSession
spark = SparkSession.builder.getOrCreate()
textFile = spark.read.text("alluxio:///EMR.txt")
textFile.filter(textFile.value.contains("EMR")).count()

3） 查看返回结果 。

2

*6.自定义设置*
Alluxio属性的调整可以在几个不同的位置完成。 根据哪些服务需求调整，EMR提供了修改服务设置和环境变量的不同方法。

1）Alluxio服务
必须在alluxio-emr.sh引导脚本中进行任何服务器端配置更改。 在生成alluxio-site.properties的部分中，添加一行包含所需配置的内容，附加到文件底部。 选项也可以作为第三个参数传递给带有';'分隔符的引导脚本。

2）Alluxio客户端
如上所述，也可以通过引导脚本编辑通用客户端属性。 这主要是针对本地客户端（CLI）。 像Presto / Hive这样的特定服务的属性更改，应该在相应的配置文件中完成，即core-site.xml，hive.catalog。
