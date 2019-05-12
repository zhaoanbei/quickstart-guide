### ׼������
- ѡ����������������������������һ�����й���������VPC
- ��ÿ��vpc������ec2ʵ��
- ��ÿ��ec2�а�װweb��������ȷ����Щʵ���İ�ȫ������˿� 80 �ϵ� HTTP ���ʡ� 
### ���� 1��ѡ���ؾ���������
1. �� [Amazon EC2 ����̨](https://console.aws.amazon.com/ec2/)��
1. �ڵ������ϣ�ѡ�����ĸ��ؾ�������������ȷ��ѡ������ EC2 ʵ����ͬһ������
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-1.png)
1. �ڵ��������ϵ� LOAD BALANCING �£�ѡ�� Load Balancers��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-2.png)
1. ѡ�� Create Load Balancer��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-3.png)
1. ���� Application Load Balancer��ѡ�� Create��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-4.png)
### ���� 2�����ø��ؾ�������������

�� Configure Load Balancer ҳ���ϣ�������¹��̡�

1. ���ø��ؾ�������������
1. ���� Name�����븺�ؾ����������ơ�
1. ������� Application Load Balancer �� Network Load Balancer ���ڣ�Ӧ�ó����ؾ����� �����Ʊ���Ψһ���������� 32 ���ַ���ֻ�ܰ�����ĸ�����ַ������ַ������������ַ���ͷ���β�����Ҳ����ԡ�internal-����ͷ��
1. ���� Scheme �� IP address type���뱣��Ĭ��ֵ��
1. ���� Listeners������Ĭ��ֵ��Ĭ��������������ն˿� 80 �ϵ� HTTP ������
1. ���� Availability Zones��ѡ������ EC2 ʵ���� VPC�������������� EC2 ʵ����ÿ����������ѡ��һ����������Ȼ��Ϊ�ÿ�����ѡ����������
1. ѡ�� Next: Configure Security Settings��
1. �ڱ��̳��У��������� HTTPS ��������ѡ�� Next: Configure Security Groups��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-5.png)
### ���� 3��Ϊ���ؾ��������ð�ȫ��

�����ؾ������İ�ȫ�����������ͨ���������˿ں�����״�����˿�����ע��Ŀ�����ͨ�š�����̨���Դ������������ؾ������İ�ȫ�飬���а���ָ����ȷЭ��Ͷ˿ڵĹ��������Ը�⣬Ҳ�������д�����ѡ��ȫ�顣


1. ѡ�� Create a new security group��
1. Ϊ��ȫ��������ƺ����������߱���Ĭ�����ƺ����������°�ȫ�����һ�����򣬸ù��������������͵��� Configure Load Balancer ҳ����ѡ��ĸ��ؾ������������˿ڡ�
1. ѡ�� Next: Configure Routing��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-6.png)
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-7.png)
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-8.png)
### ���� 4������Ŀ����

����һ��Ҫ������·����ʹ�õ�Ŀ���顣����������Ĭ�Ϲ�������·�ɵ���Ŀ�����е���ע��Ŀ�ꡣ���ؾ�����ʹ��ΪĿ���鶨�������״���������������Ŀ������Ŀ�������״������ Configure Routing ҳ���ϣ�������¹��̡�

����Ŀ����

1. ���� Target group������Ĭ��ֵ New target group��
1. ���� Name��������Ŀ��������ơ�
1. �� Protocol ����Ϊ��HTTP����Port Ϊ��80����Target type Ϊ��instance����
1. ���� Health checks������Ĭ��Э��� ping ·����
1. ѡ�� Next: Register Targets��
      ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-9.png)
### ���� 5��������Ŀ����ע��Ŀ��

�� Register Targets ҳ���ϣ�������¹��̡�

��Ŀ����ע��Ŀ��

1. ���� Instances��ѡ��һ������ʵ����
1. ����Ĭ�϶˿� 80����ѡ�� Add to registered��
1. �������ѡ��ʵ����ѡ�� Next: Review��
      ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-10.png)
	  ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-11.png)
	  ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-12.png)
### ���� 6���������������ĸ��ؾ�����

�ڴ������ؾ�����֮ǰ��������ѡ�����á��ڴ������ؾ�����֮�󣬿�����֤���Ƿ��������͵����� EC2 ʵ����

�������������ĸ��ؾ�����
1. �� Review ҳ���ϣ�ѡ�� Create ��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-13.png)
1. �����յ��ѳɹ��������ؾ�������֪ͨ��ѡ�� Close��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-14.png)
1. �ڵ��������ϵ� LOAD BALANCING �£�ѡ�� Target Groups��
1. ѡ���´�����Ŀ���顣
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-15.png)
1. �� Targets ѡ��У���֤����ʵ���Ƿ���׼�����������ʵ��״̬�� initial���ܿ�������Ϊ��ʵ������ע������У�����δͨ����Ϊ�����������������״�������С����������������һ��ʵ����״̬Ϊ healthy �󣬱�ɲ��Ը��ؾ�������
1. �ڵ��������ϵ� LOAD BALANCING �£�ѡ�� Load Balancers��
1. ѡ���´����ĸ��ؾ�������
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-16.png)
1. �� Description ѡ��У����Ƹ��ؾ����� (���磬my-load-balancer-1234567890.us-west-2.elb.amazonaws.com) �� DNS ���ơ��� DNS ����ճ���������� Internet �� Web ������ĵ�ַ���С����һ�����������������ʾ����������Ĭ��ҳ�档
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/ALB/ALB-17.png)
### ����·����·��:
1. �����ڶ���Ŀ����
1. ѡ���´����ĸ��ؾ�������
1. �� Listenersѡ��У�ʹ�ü�ͷ�鿴�������Ĺ���Ȼ��ѡ�� Add rule����������ʾָ������
1. ���� Target group name��ѡ���������ĵڶ���Ŀ���顣
1. ���� Path pattern��ָ����Ի���·����·��ʹ�õ�׼ȷģʽ (���磬/img/*)��
1. ѡ�� Save��
### ʹ��΢������ΪӦ�ó����ؾ�������Ŀ��
�������ڸ� EC2 ʵ���ϰ�װһ�����������ķ���ÿ�������ڲ�ͬ�˿��Ͻ������ӡ�������ʹ�õ���Ӧ�ó����ؾ�����������·�ɵ�Ӧ�ó�������з��������� EC2 ʵ��ע�ᵽĿ����ʱ�����Զ��ע�᣻����ÿ������ʹ�ø÷���Ķ˿�ע��ʵ���� 
### ���� 6��ɾ�����ĸ��ؾ����� (��ѡ)

�����ĸ��ؾ���������֮������ҪΪ���������е�ÿСʱ�򲿷�Сʱ֧�����á�����������Ҫ���ؾ�����ʱ���ɽ���ɾ����

ɾ�����ĸ��ؾ�����

1. �ڵ��������е� LOAD BALANCING �£�ѡ�� Load Balancers��
1. ѡ���ؾ�������Ȼ��ѡ�� Actions �� Delete��
1. ��ϵͳ��ʾ����ȷ��ʱ��ѡ�� Yes, Delete��
### ��ظ�����ã�
[�����ؾ�����](https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/application/application-load-balancers.html)

[������](https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/application/load-balancer-listeners.html)

[Ŀ����](https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/application/load-balancer-target-groups.html)

[���](https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/application/load-balancer-monitoring.html)
