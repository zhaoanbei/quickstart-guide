# Summary
* [简介](INTRO.md)
* 数据库
  * [RedShift vs. MySQL对比实验](database/RedShift_MySQL.md)
  * [Aurora vs. MySQL性能对比试验](database/Aurora-vs-MySQL.md)
  * [MongoDB自动部署](database/MangoDB.md)
  * [ElastiCache:Redis基准测试](database/redis_benchmark.md)
* 存储
  * [NFS: 利用S3FS自建NFS](storage/S3fs.md)
* 网络 & 加速
  * [海外域名部署方案：海外域名向国内用户提供服务](ByPassICP.md)
  * [VPC 配置指南](network/vpc_guide.md)
  * <a href="https://github.com/iceflow/easyvpn" target="_blank">快速自建VPN</a>
* 运维 & 持续集成/发布
  * [EC2,EBS,AMI,Snapshot自动打Tag](EC2_Auto_Tag.md)
  * [基于CodePipeline, ECS的cicd解决方案](cicd.md)
  * [基于jenkins的容器蓝绿部署解决方案](cicd_docker_bule_jenkins.md)
  * [基于jenkins的java应用程序CICD解决方案](cicd_jar_jenkins.md)
* 迁移服务
  * [镜像迁移：本地镜像导入AWS](migration/SMS_vm-import.md)
  * [域名迁移：从GoDaddy到Route 53](migration/TransferDomainRoute53.md)
  * [数据库迁移：使用AWS DMS迁移MongoDB到S3](migration/dms-mongo-to-s3.md)
  * [中国区服务迁移：从北京区到宁夏区](migration/BJStoZHY.md)
  * [海内外数据同步：从global到GCR](s3_transmission.md)
* 物联网 IoT
  * [IoT系列动手实验](IoT/README.md)
    * [IoT Core 实验1](IoT/lab1.IoTCore.1.md)
    * [IoT Core 实验2](IoT/lab2.IoTCore.2.md)
    * [IoT Greengrass实验](IoT/lab3.greengrass.md)
    * [Alexa与AWS IoT的集成](IoT/lab4.Alexa.md)
  * [环境配置：在 Windows 中配置 Docker 镜像](DockerGuide.md)
* Alexa
  * [Cognito User Pool实现账户关联](alexa/account-linking-cognito.md)
* 移动开发
  * [Cognito实现微信用户第三方登陆](cognito_android.md)