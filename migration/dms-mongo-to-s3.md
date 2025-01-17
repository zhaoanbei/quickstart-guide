# 使用 AWS DMS 迁移 MongoDB 到 S3

### 概述

DMS 的迁移部署耗时约十分钟.

##### 概念解释

- **源**:  您需要迁移数据的来源, 在这里的源为您的 **MongoDB 数据库**

- **目标**: 您需要迁移数据的目的地, 在这里目标为您的 **S3 桶**

- **复制实例**:  您可以将复制实例理解为一台虚拟主机. AWS DMS 执行数据迁移时, 会先从**源**数据库中读取数据到**复制实例**, 再对数据进行相应的调整( 如格式转换)后, 最终将数据载入到**目标**数据库

  ![](https://docs.aws.amazon.com/zh_cn/dms/latest/userguide/images/datarep-conceptual2.png)

- **持续复制( 也叫做数据捕获, CDC )**: 在实际生产中, 当**源**数据库中数据发生改变时,  我们需要在**目标**数据库中也应用这些改变, 如若达到这种目的, 可以使用**CDC**.

  特别的, CDC 只会读取您**改变**的那一部分数据, 即**增量迁移**

##### 注意事项

- **MongoDB 版本**: 若将 MongoDB 作为**源**, 则 MongoDB 的版本必须为 **2.6.x** 或 **3.x**
-  若要使用 **CDC** 功能, AWS DMS 必须要具有对 **oplog** 的访问权限, 因此请确保您的 MongoDB 具有可用的**副本集**. 有关更多的信息, 请参阅 [MongoDB 文档](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)

### 迁移步骤

> **重要**
>
> 在本文中所涉及**参数设置**仅为演示作用
>
> 通常情况下, 您都需要根据您的实际情况, 设置**适合您自己**的参数
>
> 更多的参数细节请参考 [DMS 最佳实践](https://docs.aws.amazon.com/zh_cn/dms/latest/userguide/CHAP_BestPractices.html)

#### 配置 IAM 角色

1. 在 **IAM** 导航中选择**角色**, 并点击**创建角色**

   ![image-20180902135728450](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902135728450.png)

2. 在**创建角色**面板的**选择受信任实体的类型**中选择 **AWS 产品**, 在**选择将使用此角色的服务**中选择 **DMS**, 最后点击下一步

   ![image-20180902135929445](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902135929445.png)

3. 在**附加权限策略**中搜索 **EC2**, 并勾选 **AmazonEC2FullAccess**. 再搜索 **S3**, 并勾选 **AmazonS3FullAccess**, 再点击**下一步**

   ![image-20180902140247757](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902140247757.png)

   ![image-20180902140421994](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902140421994.png)

4. 在**审核**页面中, 自定义您的**角色名称**( 本文中设置为了*dms-mongo-s3* )及**角色描述**( 可选 ), 最后点击创建角色

   ![image-20180902140720071](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902140720071.png)

5. 在**完成页面**点击**角色名**

   ![image-20180902171518511](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902171518511.png)

   在**摘要**页面中记录下**角色 ARN**

   ![image-20180902171612792](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902171612792.png)

#### 配置复制实例

1. 在 **DMS 导航**中选择**复制实例**, 并选择**创建复制实例**

   ![image-20180902164019595](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902164019595.png)

2. 在**创建复制实例**页面, 按以下内容配置, **未说明**的配置项即采用**默认配置**

   - **名称**: **用户自定义**, 本文采用*dms-mongo-s3*
   - **描述**: **用自定义**
   - **实例类**: **请根据您的数据情况选择合适的实例类型**, 本文中采用为 *dms.t2.large*
   - **VPC**: **请采用能连接到您 MongoDB 数据库所在的 VPC**
   - **多可用区部署**: **请根据您的需要选择是否启用**, 本文采用*否*
   - **公开访问**: **请根据您的需要选择是否启用**, 本文采用*是*

   ![image-20180902164718794](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902164718794.png)

   再点开**高级**

   - **VPC 安全组**: 选择合适的安全组, 确保**您的复制实例能连接到您的 MongoDB 数据库**

   ![image-20180902164940267](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902164940267.png)

3. 点击**创建复制实例**

#### 配置源端

在配置源端前, 请确保您的 MongoDB 已满足使用 AWS DMS 的条件

1. 在 **DMS 导航**中选择**终端节点**, 并选择**创建终端节点**

   ![image-20180902163224923](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902163224923.png)

2. 在**创建终端节点**, 按以下内容配置, **未说明**的配置项即采用**默认配置**

   - **终端节点类型**: **源**
   - **终端节点标识符**: **自定义**, 本文中采用 *dms-mongo*
   - **源引擎**: **mongodb**
   - **服务器名称**: **<您 MongoDB 数据库所在的 IP 地址>**
   - **端口**: **<您 MongoDB 数据库的的端口号>**
   - **身份验证模式**: 若您的数据库需要用户身份验证, 请选择 **password**, 然后填写以下**四项**内容
   - **用户名**:  请填入具有**合适权限** 的**MongoDB** 用户的用户名, 关于将 MongoDB 用作 AWS DMS 的源时所需的权限, 请参考[将 MongoDB 作为 AWS DMS 源](https://docs.aws.amazon.com/zh_cn/dms/latest/userguide/CHAP_Source.MongoDB.html)
   - **密码**: 您 **MongoDB用户**对应的密码
   - **身份验证来源**: 您 **MongoDB用户**所在的身份库, 本文中为 MongoDB 默认的身份库*admin*
   - **数据库名称**: 您**要迁移**的数据库名称
   - **元数据模式**: **document**

   ![image-20180902170355942](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902170355942.png)

3. 在**测试终端节点连接**中,按以下内容配置,并选择**运行测试**

   - **VPC**: 选择您在**配置复制实例**这一步骤中创建的**复制实例**所在的**VPC**
   - **复制实例**: 选择您在**配置复制实例**这一步骤中创建的**复制实例**

   ![image-20180902170618952](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902170618952.png)

4. 在点击**运行测试**完成后, 等待一段时间后, 如若配置成功, 则会出现**已成功测试连接**的字样, 之后点击 **Save**

   ![image-20180902170921889](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902170921889.png)

#### 配置目标端

请先在 **S3** 中建立您需要存放**迁移后数据**的**桶**, 本文所使用的桶为 *dms-mongo-s3*

1. 在 **DMS 导航**中选择**终端节点**, 并选择**创建终端节点**

![image-20180902171333032](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902171333032.png)

2. 在**创建终端节点**, 按以下内容配置, **未说明**的配置项即采用**默认配置**

   - **终端节点类型**: **源**
   - **终端节点标识符**: **自定义**, 本文中采用 *dms-s3*
   - **目标引擎**: **s3**
   - **服务访问角色 ARN**: 您在**配置 IAM 角色**这一步骤中创建的角色的 **ARN**
   - **存储桶名称**:  存放**迁移后数据**的**桶的名称**, 本文为 *dms-mongo-s3*

   在**测试终端节点连接**下

   - **VPC**: 选择您在**配置复制实例**这一步骤中创建的**复制实例**所在的**VPC**
   - **复制实例**: 选择您在**配置复制实例**这一步骤中创建的**复制实例**

   点击**运行测试**

   ![image-20180902171815104](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902171815104.png)

3. 在点击**运行测试**完成后, 等待一段时间后, 如若配置成功, 则会出现**已成功测试连接**的字样, 之后点击 **Save**

   ![image-20180902172249931](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902172249931.png)

#### 发起任务

1. 在 **DMS 导航**中选择**任务**, 并选择**创建任务**

   ![image-20180902172443429](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902172443429.png)

2. 在**创建任务**页面, 按以下内容配置, **未说明**的配置项即采用**默认配置**

   - **任务名称**: 用户自定义, 这里采用 *dms-mongo-s3*
   - **复制实例**: 选择您在**配置复制实例**这一步中创建的**复制实例**
   - **源终端节点**: 选择您在**配置源端**中创建的**源**
   - **目标端节点**: 选择您在**配置目标端**中创建的**目标**
   - **迁移类型**: **迁移现有数据并复制持续更改**
   - **在创建时启动任务**: **勾选**
   - **启用日志记录**: **勾选**(十分建议您**勾选**此项)

   ![image-20180902174851946](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902174851946.png)

3. 在**表映像**块下,输入以下内容, 并选择**添加选择规则**

   - **架构名称是**: 选择**输入架构**
   - **架构名称**: **%**

![image-20180902173335984](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902173335984.png)

4. 点击**创建任务**

   ![image-20180902173507271](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902173507271.png)

### 迁移结果

当您按照以上步骤中完成所有的配置后,若出现以下内容, 则意味着您开启了一个具有**增量迁移**功能的**从 MongoDB 到 S3** 的数据迁移任务.

![image-20180902175225925](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902175225925.png)

此任务不仅会在第一次启动时从 MongoDB 迁移**所有**的数据到 S3, 还会在之后**每当您在 MongoDB**中的数据有所改变时, 把**改变情况**也反应到 S3

#### MongoDB 中的数据

本文所使用的 MongoDB 数据库中含有两张表, **BookSpider** 与 **test**

![image-20180902182454667](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902182454667.png)

- **BookSpider** 中的表结构

  ![image-20180902182704584](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902182704584.png)

- **test** 中的表结构

  ![image-20180902182559828](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902182559828.png)

#### 未触发持续复制的迁移结果

当迁移完成后, 如果**源**数据库中的数据未发生改变, 则意味不会触发 **CDC**

此时 S3 中目录结构为

- Scrapy_data(文件夹, 与**源数据库**同名)
  - BookSpider(文件夹, 其中一个表同名)
    - LOAD00000001.csv
  - test( 文件夹, 与另一个表同名)
    - LOAD00000001.csv

这两个 csv 文件即保存了 MongoDB 中**对应表**的所有的数据信息, 选取 BookSpider 表的LOAD00000001.csv

![image-20180902183440025](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902183440025.png)

如上图, 所有的数据都以 json 格式保存了下来

#### 触发了持续复制后的迁移结果

我们对 BookSpider 表增加一条数据, 修改一条数据, 再删除一条数据, 使其能够触发 CDC

- **增**

![image-20180902184206870](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902184206870.png)

- **改**

![image-20180902184431978](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902184431978.png)

- **删**

![image-20180902184151610](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902184151610.png)



此时打开 S3,  其目录结构变为了

- Scrapy_data
  - BookSpider
    - LOAD00000001.csv
    - 20180902-104149271.csv(**新增**)
    - 20180902-104505261.csv(**新增**)
  - test( 文件夹, 与另一个表同名)
    - LOAD00000001.csv

打开两个文件**新增**的 csv 文件

- 20180902-104505261.csv

  ![image-20180902184912046](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902184912046.png)

- 20180902-104149271.csv

![image-20180902184938951](http://cdn.quickstart.org.cn/assets/dms-mongodb-to-s3/image-20180902184938951.png)

可以看到, 三个改变都被记录了下来, 切前面多了 **U D I** 三个字母, 这意味着这三条操作分别为 **U**pdate, **D**elete,**I**nsert
