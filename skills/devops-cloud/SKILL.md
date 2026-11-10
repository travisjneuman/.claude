---
name: devops-cloud
description: DevOps, cloud infrastructure, and platform engineering. Use when working with AWS, GCP, Azure, Kubernetes, Terraform, CI/CD pipelines, or infrastructure as code.
---

# DevOps & Cloud Infrastructure

Comprehensive guide for cloud platforms, infrastructure as code, and DevOps practices.

## Cloud Platforms

### AWS (Amazon Web Services)

**Compute:**

```yaml
# EC2 Instance Types
General Purpose: t3, m6i, m7g (ARM)
Compute Optimized: c6i, c7g
Memory Optimized: r6i, x2idn
Storage Optimized: i3, d3

# Auto Scaling
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name my-asg \
  --launch-template LaunchTemplateId=lt-xxx \
  --min-size 1 --max-size 10 --desired-capacity 2 \
  --vpc-zone-identifier "subnet-xxx,subnet-yyy"
```

**Serverless:**

```typescript
// Lambda with TypeScript
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
```

**Storage:**
| Service | Use Case | Durability |
|---------|----------|------------|
| S3 | Object storage | 99.999999999% |
| EBS | Block storage (EC2) | 99.999% |
| EFS | Shared file system | 99.999999999% |
| FSx | Windows/Lustre | 99.999999999% |

### GCP (Google Cloud Platform)

**Key Services:**

```bash
# GKE cluster
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type e2-medium \
  --enable-autoscaling --min-nodes 1 --max-nodes 10

# Cloud Run (serverless containers)
gcloud run deploy my-service \
  --image gcr.io/project/image:tag \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure

**Key Services:**

```bash
# AKS cluster
az aks create \
  --resource-group myRG \
  --name myAKS \
  --node-count 3 \
  --enable-addons monitoring \
  --generate-ssh-keys

# Azure Functions
func init MyFunctionApp --typescript
func new --name HttpTrigger --template "HTTP trigger"
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/devops-cloud/`).

| Topic | File | Covers |
| --- | --- | --- |
| Kubernetes | [`references/kubernetes.md`](references/kubernetes.md) | Core Concepts; Service Types; Ingress with TLS; Helm Charts |
| Terraform | [`references/terraform.md`](references/terraform.md) | AWS Infrastructure; Variables and Outputs |
| CI/CD Pipelines | [`references/ci-cd-pipelines.md`](references/ci-cd-pipelines.md) | GitHub Actions; GitLab CI |
| Docker | [`references/docker.md`](references/docker.md) | Multi-Stage Builds; Docker Compose |
| Monitoring & Observability | [`references/monitoring-and-observability.md`](references/monitoring-and-observability.md) | Prometheus + Grafana; Application Metrics |
| Security Best Practices | [`references/security-best-practices.md`](references/security-best-practices.md) | Secrets Management; Network Policies |
| Checklist | [`references/checklist.md`](references/checklist.md) | Pre-Deployment; Production Readiness |
