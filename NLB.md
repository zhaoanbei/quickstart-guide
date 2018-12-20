### 准备工作
- 选择两个可用区，可用区中有至少一个带有共有子网的VPC
- 在每个vpc中启动ec2实例
- 在每个ec2中安====装web服务====器，确保这些实例的安全组允许端口 80 上的 HTTP 访问。

### 步骤 1：选择负载均衡器类型
1. 打开 [Amazon EC2 控制台](https://console.aws.amazon.com/ec2/)。
1. 在导航栏上，选择您的负载均衡器的区域。请确保选择用于 EC2 实例的同一个区域。
1. 在导航窗格上的 LOAD BALANCING 下，选择 Load Balancers。
1. 选择 Create Load Balancer。
1. 对于 Network Load Balancer，选择 Create。
     ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-1.png)
### 步骤 2：配置负载均衡器和侦听器

在 Configure Load Balancer 页面上，完成以下过程。

1. 配置负载均衡器和侦听器
1. 对于 Name，键入负载均衡器的名称。
1. 在区域的 Application Load Balancer 和 Network Load Balancer 集内，应用程序负载均衡器 的名称必须唯一，最多可以有 32 个字符，只能包含字母数字字符和连字符，不能以连字符开头或结尾，并且不能以“internal-”开头。
1. 对于 Scheme 和 IP address type，请保留默认值。
1. 对于 Listeners，保留默认值，默认侦听器负责接收端口 80 上的 HTTP 流量。
1. 对于 Availability Zones，选择用于 EC2 实例的 VPC。对于用于启动 EC2 实例的每个可用区，选择一个可用区，然后为该可用区选择公有子网。
1. 选择 Next: Configure Security Settings。
1. 在本教程中，将不创建 HTTPS 侦听器。选择 Next: Configure Security Groups。
     ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-2.png)
### 步骤 3：为负载均衡器配置安全组

您负载均衡器的安全组必须允许其通过侦听器端口和运行状况检查端口与已注册目标进行通信。控制台可以代表您创建负载均衡器的安全组，其中包括指定正确协议和端口的规则。如果您愿意，也可以自行创建和选择安全组。


1. 选择 Create a new security group。
1. 为安全组键入名称和描述，或者保留默认名称和描述。此新安全组包含一条规则，该规则允许将流量传送到在 Configure Load Balancer 页面上选择的负载均衡器侦听器端口。
1. 选择 Next: Configure Routing。
     ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-3.png)
### 步骤 4：配置目标组

创建一个要在请求路由中使用的目标组。您侦听器的默认规则将请求路由到此目标组中的已注册目标。负载均衡器使用为目标组定义的运行状况检查设置来检查此目标组中目标的运行状况。在 Configure Routing 页面上，完成以下过程。

配置目标组

1. 对于 Target group，保留默认值 New target group。
1. 对于 Name，键入新目标组的名称。
1. 将 Protocol 保留为“HTTP”，Port 为“80”，Target type 为“instance”。
1. 对于 Health checks，保留默认协议和 ping 路径。
1. 选择 Next: Register Targets。
     ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-4.png)
### 步骤 5：向您的目标组注册目标

在 Register Targets 页面上，完成以下过程。

向目标组注册目标

1. 对于 Instances，选择一个或多个实例。
1. 保留默认端口 80，并选择 Add to registered。
1. 当您完成选择实例后，选择 Next: Review。
     ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-5.png)
	 ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-6.png)
### 步骤 6：删除您的负载均衡器 (可选)

在您的负载均衡器可用之后，您需要为保持其运行的每小时或部分小时支付费用。当您不再需要负载均衡器时，可将其删除。

删除您的负载均衡器

1. 在导航窗格中的 LOAD BALANCING 下，选择 Load Balancers。
1. 选择负载均衡器，然后选择 Actions 和 Delete。
1. 当系统提示进行确认时，选择 Yes, Delete。
   ![图片1](https://s3.cn-north-1.amazonaws.com.cn/chinalabs/assets/NLB/NLB-7.png)
