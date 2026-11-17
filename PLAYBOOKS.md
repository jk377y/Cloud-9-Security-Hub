# Cloud9 Security Configuration Auditor — Remediation Playbooks

This document provides standardized, step-by-step **Standard Operating Procedures (SOPs)** for resolving security findings and operational alerts detected by the Cloud9 Security Configuration Auditor. 

Each playbook maps the finding to real-world compliance frameworks (**CIS AWS Foundations Benchmark**, **SOC 2**, and **PCI-DSS**) and provides both **AWS Console** and **AWS CLI** remediation steps.

---

## Part 1: Configuration Audit Playbooks (Core Security Checks)

### Playbook 1: Public S3 Bucket Exposed
* **Audit Category:** Storage (Amazon S3)
* **Severity:** Critical
* **Compliance Mapping:** CIS AWS Foundations Benchmark 2.1.5 | SOC 2 CC6.1
* **The Risk:** Anyone on the public internet can read, list, or download files from this S3 bucket, risking unauthorized data exposure or regulatory fines.

**AWS Console Remediation:**
1. Open the **Amazon S3 Console** and click the name of the flagged bucket.
2. Select the **Permissions** tab.
3. Under **Block public access (bucket settings)**, click **Edit**.
4. Check **Block all public access**, click **Save changes**, and type `confirm`.

**AWS CLI Remediation:**
```bash
aws s3api put-public-access-block \
  --bucket <BUCKET_NAME> \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

---

### Playbook 2: Unencrypted S3 Bucket Storage
* **Audit Category:** Storage (Amazon S3)
* **Severity:** High
* **Compliance Mapping:** CIS AWS Foundations Benchmark 2.1.1 | PCI-DSS 3.4
* **The Risk:** Data stored in this bucket is not encrypted at rest by default, meaning unauthorized access to underlying storage could expose readable files.

**AWS Console Remediation:**
1. Open the **Amazon S3 Console** and select the flagged bucket.
2. Go to the **Properties** tab and scroll down to **Default encryption**.
3. Click **Edit**, select **Server-side encryption with Amazon S3 managed keys (SSE-S3)**, and click **Save changes**.

**AWS CLI Remediation:**
```bash
aws s3api put-bucket-encryption \
  --bucket <BUCKET_NAME> \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

---

### Playbook 3: Security Group Allows Unrestricted SSH (`0.0.0.0/0`)
* **Audit Category:** Network (VPC Security Groups)
* **Severity:** Critical
* **Compliance Mapping:** CIS AWS Foundations Benchmark 5.2 | SOC 2 CC6.6
* **The Risk:** Port 22 (SSH) is open to the entire internet (`0.0.0.0/0`), allowing automated bots worldwide to launch brute-force login attacks against your EC2 instance.

**AWS Console Remediation:**
1. Open the **Amazon EC2 Console** and select **Security Groups** in the left menu.
2. Click the flagged Security Group ID and open the **Inbound rules** tab.
3. Click **Edit inbound rules**, find the rule for **SSH (Port 22)** with source `0.0.0.0/0`, and change the Source dropdown to **My IP** (or delete the rule if using AWS Systems Manager Session Manager).
4. Click **Save rules**.

**AWS CLI Remediation:**
```bash
aws ec2 revoke-security-group-ingress \
  --group-id <SECURITY_GROUP_ID> \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0
```

---

### Playbook 4: AWS CloudTrail Disabled or Multi-Region Logging Off
* **Audit Category:** Logging (AWS CloudTrail)
* **Severity:** High
* **Compliance Mapping:** CIS AWS Foundations Benchmark 3.1 | SOC 2 CC7.2
* **The Risk:** Without active multi-region CloudTrail logging and log file validation, the team has no tamper-proof audit trail to investigate who modified resources or accessed data during a security incident.

**AWS Console Remediation:**
1. Open the **AWS CloudTrail Console** and click **Trails** in the left menu.
2. Select your trail (or click **Create trail** if no active trail exists).
3. Ensure **Apply trail to all regions** is enabled and **Log file validation** is turned on, then click **Save changes**.

**AWS CLI Remediation:**
```bash
aws cloudtrail update-trail \
  --name <TRAIL_NAME> \
  --is-multi-region-trail \
  --enable-log-file-validation
```

---

### Playbook 5: IAM User Missing MFA or Using Old Access Keys (>90 Days)
* **Audit Category:** Identity (AWS IAM)
* **Severity:** High
* **Compliance Mapping:** CIS AWS Foundations Benchmark 1.10 & 1.14 | SOC 2 CC6.1
* **The Risk:** Compromised passwords or unrotated access keys without Multi-Factor Authentication allow attackers to take over the AWS account using stolen credentials alone.

**AWS Console Remediation:**
1. Open the **AWS IAM Console** and select **Users** in the left menu.
2. Click the flagged user and open the **Security credentials** tab.
3. Under **Multi-factor authentication (MFA)**, click **Assign MFA device** and complete setup.
4. Under **Access keys**, click **Actions > Deactivate** on any key older than 90 days.

**AWS CLI Remediation:**
```bash
aws iam update-access-key \
  --user-name <USERNAME> \
  --access-key-id <ACCESS_KEY_ID> \
  --status Inactive
```

---

## Part 2: Live Demo & Operational Incident Playbook

### Playbook 6: EC2 High CPU Utilization / Resource Exhaustion Anomaly
* **Audit Category:** Operational Availability & Anomaly Response (EC2 / CloudWatch / SNS)
* **Trigger Mechanism:** Simulated via the **CPU Stress Test** button on the Cloud9 EC2 Web Dashboard (or triggered organically by runaway processes / unauthorized cryptomining malware).
* **Severity:** High
* **Compliance Mapping:** SOC 2 CC7.1 (System Monitoring & Anomaly Detection) | AWS Well-Architected Operational Excellence
* **The Risk:** Sustained CPU utilization above threshold degrades application performance, causes service outages, and often indicates a Denial-of-Service (DoS) spike or unauthorized cryptomining script running on the instance.

**Incident Investigation & Remediation Steps:**
1. **Acknowledge Alert:** Review the incoming **Amazon SNS** email/SMS notification to confirm the affected `Instance-ID`, metric (`CPUUtilization`), and breach timestamp.
2. **Inspect Active Processes (CLI):** Connect to the EC2 instance via SSH or AWS Systems Manager Session Manager and run `top` (press `q` to exit) to identify the process consuming CPU.
3. **Terminate Stress / Rogue Process:** Stop the stress test via the dashboard button, or terminate the process ID directly from the terminal:
   ```bash
   kill -9 <PID>
   ```
4. **Verify Recovery:** Monitor the **Amazon CloudWatch** alarm dashboard and confirm CPU utilization drops back to baseline and the alarm state returns from `ALARM` to `OK`.
