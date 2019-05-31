# AWS 快速上手

如果您想参与到本项目中，请参考[如何提交文档](how_to_contribute.md)。

源项目地址:[https://github.com/chinalabs/quickstart-guide](https://github.com/chinalabs/quickstart-guide)

### 介绍
这个项目的目的是为了更加快速地熟悉AWS服务，或者在AWS上快速部署服务。

*文档标题带有![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
表示文章内提供[CloudFormation](https://aws.amazon.com/cloudformation/)自动部署模板*

*文章标题带有![Terraform](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/terraform.png)
表示文章内提供[Terraform](https://www.terraform.io/)自动部署模板*

### 数据库
* [RedShift vs. MySQL对比实验](database/RedShift_MySQL.md)![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
* [Aurora vs. MySQL性能对比试验](database/Aurora-vs-MySQL.md)
* [MongoDB自动部署](database/MangoDB.md)![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
* [ElastiCache:Redis基准测试](database/redis_benchmark.md)
* [DynamoDB Proxy Using API Gateway](database/api-gateway-proxy-for-ddb.md)
  
### 存储
* [NFS: 利用S3FS自建NFS](storage/S3fs.md)![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
* <a href="https://github.com/lab798/quickstart-kafka" target="_blank">自动构建Kafka集群</a>![TerraformLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/terraform.png)
  
### 网络 & 加速
* [海外域名部署方案：海外域名向国内用户提供服务](ByPassICP.md)
* [VPC 配置指南](network/vpc_guide.md)
* <a href="https://github.com/iceflow/easyvpn" target="_blank">快速自建VPN</a>![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
  
### 运维 & 持续集成/发布
* [EC2,EBS,AMI,Snapshot自动打Tag](EC2_Auto_Tag.md)
* [基于CodePipeline, ECS的cicd解决方案](cicd.md)
* [基于jenkins的容器蓝绿部署解决方案](cicd_docker_bule_jenkins.md)
* [基于jenkins的java应用程序CICD解决方案](cicd_jar_jenkins.md)
  
### 迁移服务
* [镜像迁移：本地镜像导入AWS](migration/SMS_vm-import.md)
* [域名迁移：从GoDaddy到Route 53](migration/TransferDomainRoute53.md)
* [数据库迁移：使用AWS DMS迁移MongoDB到S3](migration/dms-mongo-to-s3.md)
* [中国区服务迁移：从北京区到宁夏区](migration/BJStoZHY.md)
* [海内外数据同步：从global到GCR](s3_transmission.md)![CloudFormationLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/cloudformation_logo_30.png)
  
### 物联网 IoT
* [IoT系列动手实验](IoT/README.md)
  * [IoT Core 实验1](IoT/lab1.IoTCore.1.md)
  * [IoT Core 实验2](IoT/lab2.IoTCore.2.md)
  * [IoT Greengrass实验](IoT/lab3.greengrass.md)
  * [Alexa与AWS IoT的集成](IoT/lab4.Alexa.md)
* [环境配置：在 Windows 中配置 Docker 镜像](DockerGuide.md)
  
### Alexa
* [Cognito User Pool实现账户关联](alexa/account-linking-cognito.md)
  
### 移动开发
* [Cognito实现微信用户第三方登陆](cognito_android.md)
* [S3图片处理](mobile/serverless-image-handler.md)
* <a href="https://github.com/lab798/aws-s3-cognito-lab">Cognito, OpenID Connect实现S3精细化权限控制</a>![TerraformLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/terraform.png)

### AI 
* [Amazon Connect + Lex 构建智能聊天机器人](AI/amazon-connect-with-lex.md)

### 数据分析 & BI
* [从Aurora迁移到Redshift并利用Quicksight做数据可视化分析](aurora-to-redshift-bi.md)![TerraformLogo](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/terraform.png)


