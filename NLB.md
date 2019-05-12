### ׼������
- ѡ����������������������������һ�����й���������VPC
- ��ÿ��vpc������ec2ʵ��
- ��ÿ��ec2�а�====װweb����====����ȷ����Щʵ���İ�ȫ������˿� 80 �ϵ� HTTP ���ʡ�

### ���� 1��ѡ���ؾ���������
1. �� [Amazon EC2 ����̨](https://console.aws.amazon.com/ec2/)��
1. �ڵ������ϣ�ѡ�����ĸ��ؾ�������������ȷ��ѡ������ EC2 ʵ����ͬһ������
1. �ڵ��������ϵ� LOAD BALANCING �£�ѡ�� Load Balancers��
1. ѡ�� Create Load Balancer��
1. ���� Network Load Balancer��ѡ�� Create��
     ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-1.png)
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
     ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-2.png)
### ���� 3��Ϊ���ؾ��������ð�ȫ��

�����ؾ������İ�ȫ�����������ͨ���������˿ں�����״�����˿�����ע��Ŀ�����ͨ�š�����̨���Դ������������ؾ������İ�ȫ�飬���а���ָ����ȷЭ��Ͷ˿ڵĹ��������Ը�⣬Ҳ�������д�����ѡ��ȫ�顣


1. ѡ�� Create a new security group��
1. Ϊ��ȫ��������ƺ����������߱���Ĭ�����ƺ����������°�ȫ�����һ�����򣬸ù��������������͵��� Configure Load Balancer ҳ����ѡ��ĸ��ؾ������������˿ڡ�
1. ѡ�� Next: Configure Routing��
     ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-3.png)
### ���� 4������Ŀ����

����һ��Ҫ������·����ʹ�õ�Ŀ���顣����������Ĭ�Ϲ�������·�ɵ���Ŀ�����е���ע��Ŀ�ꡣ���ؾ�����ʹ��ΪĿ���鶨�������״���������������Ŀ������Ŀ�������״������ Configure Routing ҳ���ϣ�������¹��̡�

����Ŀ����

1. ���� Target group������Ĭ��ֵ New target group��
1. ���� Name��������Ŀ��������ơ�
1. �� Protocol ����Ϊ��HTTP����Port Ϊ��80����Target type Ϊ��instance����
1. ���� Health checks������Ĭ��Э��� ping ·����
1. ѡ�� Next: Register Targets��
     ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-4.png)
### ���� 5��������Ŀ����ע��Ŀ��

�� Register Targets ҳ���ϣ�������¹��̡�

��Ŀ����ע��Ŀ��

1. ���� Instances��ѡ��һ������ʵ����
1. ����Ĭ�϶˿� 80����ѡ�� Add to registered��
1. �������ѡ��ʵ����ѡ�� Next: Review��
     ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-5.png)
	 ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-6.png)
### ���� 6��ɾ�����ĸ��ؾ����� (��ѡ)

�����ĸ��ؾ���������֮������ҪΪ���������е�ÿСʱ�򲿷�Сʱ֧�����á�����������Ҫ���ؾ�����ʱ���ɽ���ɾ����

ɾ�����ĸ��ؾ�����

1. �ڵ��������е� LOAD BALANCING �£�ѡ�� Load Balancers��
1. ѡ���ؾ�������Ȼ��ѡ�� Actions �� Delete��
1. ��ϵͳ��ʾ����ȷ��ʱ��ѡ�� Yes, Delete��
   ![ͼƬ1](https://s3.cn-northwest-1.amazonaws.com.cn/aws-quickstart/assets/NLB/NLB-7.png)
