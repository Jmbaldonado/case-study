// SlideDetail.tsx
import { useParams, Link } from 'react-router-dom';

const slideDetails: Record<number, { title: string; content: React.ReactNode }> = {
  1: {
    title: 'Top 3 Priorities if Hired',
    content: (
      <div className='space-y-6'>
        {/* Priority 1 */}
        <h2 className='text-2xl font-bold'>1. Establish the Control Plane</h2>
        <p>Build a robust foundation for tenant management, authentication, and tier tracking:</p>
        <ul className='text-sm text-left list-disc list-inside space-y-1'>
          <li>Design company, user, connection, and job schemas</li>
          <li>Add SSO/OAuth authentication + RBAC for secure access</li>
          <li>Integrate tenant scoring into onboarding (whale vs. regular)</li>
          <li>Store tenant tier in control plane metadata to drive infra provisioning and cost tracking</li>
        </ul>

        {/* Priority 2 */}
        <h2 className='text-2xl font-bold'>2. Introduce Job Queue + Stateless Workers</h2>
        <p>Modernize job processing to improve scalability, reliability, and fairness between tenants:</p>
        <ul className='text-sm text-left list-disc list-inside space-y-1'>
          <li>Migrate from monolithic job runner to queue + stateless worker architecture</li>
          <li>Implement safe job leasing to prevent double execution</li>
          <li>Enable tier-aware scheduling (reserved concurrency for whales, shared pool for regular tenants)</li>
        </ul>

        {/* Priority 3 */}
        <h2 className='text-2xl font-bold'>3. Enforce Tenant Isolation & Cost Tracking</h2>
        <p>Ensure data security, proper isolation, and visibility into tenant-specific costs:</p>
        <ul className='text-sm text-left list-disc list-inside space-y-1'>
          <li>Enable row-level security (RLS) in DB for regular tenants</li>
          <li>Provision dedicated schema/DB for whales when needed</li>
          <li>Add metrics and cost instrumentation</li>
          <li>Create tier-aware dashboards to monitor infra cost vs. contract value per tenant</li>
        </ul>
      </div>
    ),
  },

  2: {
    title: 'Core Architecture',
    content: (
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>1. Core Design</h2>

        {/* Architecture Choice */}
        <h3 className='text-xl font-semibold'>1.1 Architecture Choice</h3>
        <p>
          Multi-tenant SaaS architecture with a hybrid storage and execution model for flexibility, cost-efficiency, and
          enterprise readiness. On AWS, each plane can be implemented using managed services and decoupled components:
        </p>

        {/* Architecture Diagram */}
        <div className='grid grid-cols-3 gap-4 text-center'>
          <div className='p-4 rounded-2xl shadow bg-gray-50'>
            <h4 className='font-bold'>Control Plane</h4>
            <p className='text-sm'>Manages tenants, users, jobs, and history</p>
            <ul className='text-sm text-left list-disc list-inside space-y-1'>
              <li>AWS RDS (Postgres) → shared multi-tenant database</li>
              <li>AWS IAM → user and permission management</li>
              <li>AWS API Gateway + Lambda → expose management APIs</li>
            </ul>
          </div>
          <div className='p-4 rounded-2xl shadow bg-gray-50'>
            <h4 className='font-bold'>Execution Plane</h4>
            <p className='text-sm'>Runs replication and processing jobs in isolation</p>
            <ul className='text-sm text-left list-disc list-inside space-y-1'>
              <li>AWS SQS → job queue</li>
              <li>AWS Lambda / ECS Fargate → stateless workers</li>
              <li>AWS CloudWatch → job monitoring & logs</li>
            </ul>
          </div>
          <div className='p-4 rounded-2xl shadow bg-gray-50'>
            <h4 className='font-bold'>Data Plane</h4>
            <p className='text-sm'>Stores customer data with flexible isolation</p>
            <ul className='text-sm text-left list-disc list-inside space-y-1'>
              <li>Shared DB → RDS multi-tenant for fast onboarding</li>
              <li>Dedicated schema → RDS schema per tenant</li>
              <li>Customer-owned DB → VPC peering or direct connect</li>
            </ul>
          </div>
        </div>

        {/* Plane Connections */}
        <h3 className='text-xl font-semibold'>1.2 AWS Connectivity & Flow</h3>
        <p>The planes are connected to ensure secure, reliable operations while remaining scalable:</p>

        {/* Flow Diagram */}
        <div className='flex justify-center items-center gap-4 mt-4'>
          <div className='p-4 rounded-2xl shadow bg-gray-100 text-center w-48'>
            <h4 className='font-bold'>Control Plane (RDS + API Gateway)</h4>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-gray-100 text-center w-48'>
            <h4 className='font-bold'>Execution Plane (SQS + Lambda / Fargate)</h4>
            <p className='text-sm'>Consumes jobs from queue & writes to data plane</p>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-gray-100 text-center w-48'>
            <h4 className='font-bold'>Data Plane (RDS / Customer DB)</h4>
            <p className='text-sm'>Stores tenant data according to isolation level</p>
          </div>
        </div>

        <p>
          This approach uses fully managed AWS services to reduce operational overhead, scale horizontally, and allow
          flexible tenant isolation based on business needs.
        </p>
      </div>
    ),
  },

  3: {
    title: 'Tenant Scoring & Placement',
    content: (
      <div className='space-y-6'>
        {/* Scoring Factors */}
        <h3 className='text-xl font-semibold'>2.1 Scoring Factors</h3>
        <p>Each tenant is evaluated on key criteria to determine the right infrastructure placement:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>
            <strong>Workload:</strong> data volume, job concurrency, query frequency
          </li>
          <li>
            <strong>Compliance:</strong> regulatory requirements like HIPAA, GDPR, SOC2
          </li>
          <li>
            <strong>Contract Tier & Revenue:</strong> SMB vs. enterprise “whales”
          </li>
        </ul>

        {/* Placement Logic */}
        <h3 className='text-xl font-semibold'>2.2 Placement Logic</h3>
        <p>Based on scoring, tenants are placed to balance cost efficiency and performance/isolation needs:</p>

        {/* Placement Flow Diagram */}
        <div className='flex justify-center items-center gap-4'>
          <div className='p-4 rounded-2xl shadow bg-blue-50 text-center w-48'>
            <h4 className='font-bold'>Onboarding</h4>
            <p className='text-sm'>Collect workload, compliance, and contract data</p>
          </div>
          <span className='text-xl'>➡️</span>
          <div className='p-4 rounded-2xl shadow bg-green-50 text-center w-48'>
            <h4 className='font-bold'>Whale Customers</h4>
            <p className='text-sm'>Dedicated infra, isolated schema, or customer-owned DB</p>
          </div>
          <span className='text-xl'>➡️</span>
          <div className='p-4 rounded-2xl shadow bg-yellow-50 text-center w-48'>
            <h4 className='font-bold'>Regular Customers</h4>
            <p className='text-sm'>Shared infra (multi-tenant DB)</p>
          </div>
        </div>

        {/* Benefits */}
        <h3 className='text-xl font-semibold'>2.3 Benefits</h3>
        <ul className='list-disc list-inside space-y-1'>
          <li>Aligns infrastructure spend with tenant value</li>
          <li>Ensures high-value tenants get performance + compliance isolation</li>
          <li>Simplifies operations with one codebase and a clear upgrade path</li>
        </ul>
      </div>
    ),
  },

  4: {
    title: 'Safety & Performance',
    content: (
      <div className='space-y-6'>
        {/* Simple */}
        <h3 className='text-xl font-semibold'>2.1 Simple</h3>
        <p>Enable easy onboarding and operational clarity:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>Self-service onboarding wizards for connectors and guided setup (CloudFormation/CDK automation).</li>
          <li>Clear dashboards for jobs, history, errors, and cost tracking (Amplify / S3 + CloudFront).</li>
          <li>Templates & sensible defaults (polling intervals, retries, pre-configured workers).</li>
          <li>
            Tenant scoring integrated into onboarding → automatically classifies tenants and provisions infra path.
          </li>
        </ul>

        {/* Speedy */}
        <h3 className='text-xl font-semibold'>2.2 Speedy</h3>
        <p>Ensure high performance and scalable processing:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>Worker pool + job queue: AWS SQS + ECS Fargate / Lambda.</li>
          <li>Incremental sync: change tracking and watermarks to avoid full reloads.</li>
          <li>Sharded/partitioned tables for large tenants on RDS / Aurora.</li>
          <li>Parallel execution per tenant with concurrency caps.</li>
          <li>
            Scoring-aware scheduling: whales get higher concurrency & reserved capacity (Lambda reserved concurrency /
            ECS task placement).
          </li>
        </ul>

        {/* Safe */}
        <h3 className='text-xl font-semibold'>2.3 Safe</h3>
        <p>Protect tenant data and ensure compliance:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>Row-Level Security (RLS) for tenant isolation in shared DB (regular tenants).</li>
          <li>Dedicated schema/DB or customer-owned DB for whales.</li>
          <li>Per-tenant encryption keys using AWS KMS.</li>
          <li>Audit logs & monitoring with CloudWatch, CloudTrail, and RDS Enhanced Monitoring.</li>
          <li>Network isolation via VPC peering, PrivateLink, or VPN for customer-owned DBs.</li>
          <li>Tier-aware safeguards: stricter SLAs, monitoring, and compliance hooks for whales.</li>
        </ul>

        {/* Safety & Performance Diagram */}
        <h3 className='text-xl font-semibold'>2.4 AWS Implementation & Flow</h3>
        <p>Planes and flows ensuring performance, safety, and tenant-aware scaling:</p>
        <div className='flex justify-center items-center gap-4 mt-4'>
          <div className='p-4 rounded-2xl shadow bg-blue-50 text-center w-48'>
            <h4 className='font-bold'>Control Plane</h4>
            <p className='text-sm'>RDS + API Gateway → manages tenants, scoring, onboarding</p>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-green-50 text-center w-48'>
            <h4 className='font-bold'>Execution Plane</h4>
            <p className='text-sm'>SQS + Lambda / ECS → parallel, scoring-aware job processing</p>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-yellow-50 text-center w-48'>
            <h4 className='font-bold'>Data Plane</h4>
            <p className='text-sm'>RDS/Aurora / Customer DB → isolated storage per tenant</p>
          </div>
        </div>

        <p>
          This setup ensures self-service simplicity, fast scalable processing, and strong tenant isolation and
          compliance using fully managed AWS services.
        </p>
      </div>
    ),
  },

  5: {
    title: 'Cost Controls',
    content: (
      <div className='space-y-6'>
        {/* Where Costs Rise */}
        <h3 className='text-xl font-semibold'>1.3.1 Where Costs Rise</h3>
        <p>Identify major cost drivers across tenants:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>Storage of replicated datasets (larger footprint for whales).</li>
          <li>Compute from heavy transformations or analytical queries.</li>
          <li>Egress costs, especially cross-cloud or customer-owned databases.</li>
          <li>Worker autoscaling when many tenants run jobs concurrently.</li>
          <li>Dedicated infrastructure overhead for whales (isolated DBs, reserved worker pools).</li>
        </ul>

        {/* Controls */}
        <h3 className='text-xl font-semibold'>1.3.2 Controls</h3>
        <p>Mitigate costs while aligning spend with revenue potential:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>
            Tier-aware plans:
            <ul className='list-disc list-inside ml-5'>
              <li>Regular tenants → row/query/storage limits, shared infra.</li>
              <li>Whales → premium pricing, dedicated infra, higher included quotas.</li>
            </ul>
          </li>
          <li>Tenant scoring → infra allocation maps to revenue potential, ensuring whales justify dedicated spend.</li>
          <li>Data lifecycle rules (e.g., cold storage/archive for old datasets).</li>
          <li>Query cost caps (esp. BigQuery/Snowflake).</li>
          <li>Autoscaling with per-tenant concurrency limits (different ceilings for whales vs. regular).</li>
          <li>Per-tenant cost attribution & dashboards → ops + finance can monitor spend vs. contract value.</li>
        </ul>

        {/* Cost Controls Diagram */}
        <h3 className='text-xl font-semibold'>1.3.3 AWS Implementation & Flow</h3>
        <p>Planes and flows for cost-aware multi-tenant SaaS:</p>
        <div className='flex justify-center items-center gap-4 mt-4'>
          <div className='p-4 rounded-2xl shadow bg-blue-50 text-center w-48'>
            <h4 className='font-bold'>Control Plane</h4>
            <p className='text-sm'>RDS + API Gateway → tenant scoring, cost policies, plan management</p>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-green-50 text-center w-48'>
            <h4 className='font-bold'>Execution Plane</h4>
            <p className='text-sm'>SQS + Lambda / ECS → auto-scaled jobs with concurrency & cost limits</p>
          </div>
          <span className='text-xl'>⬇️</span>
          <div className='p-4 rounded-2xl shadow bg-yellow-50 text-center w-48'>
            <h4 className='font-bold'>Data Plane</h4>
            <p className='text-sm'>
              RDS/Aurora / Customer DB → tier-aware storage, lifecycle rules, query cost tracking
            </p>
          </div>
        </div>

        <p>
          This setup ensures cost-efficient operations, tier-aware scaling, and full visibility into per-tenant
          infrastructure spend.
        </p>
      </div>
    ),
  },
  6: {
    title: 'Roadmap & Risks',
    content: (
      <div className='space-y-6'>
        {/* Roadmap */}
        <h3 className='text-xl font-semibold'>3.1 Roadmap (6–12 months)</h3>
        <p>Planned phases to deliver multi-tenant SaaS with tier-aware infrastructure:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>
            <strong>Phase 1:</strong> Multi-tenant control plane + stateless workers
            <ul className='list-disc list-inside ml-5'>
              <li>Implement onboarding flow with tenant scoring (assign whale vs. regular)</li>
              <li>Store tier + infra type in control plane</li>
            </ul>
          </li>
          <li>
            <strong>Phase 2:</strong> Tenant cost reporting & quota enforcement
            <ul className='list-disc list-inside ml-5'>
              <li>Tier-aware quotas (shared caps for regulars, dedicated tracking for whales)</li>
              <li>Per-tenant dashboards for infra vs. revenue alignment</li>
            </ul>
          </li>
          <li>
            <strong>Phase 3:</strong> Self-service connectors + schema studio integration
            <ul className='list-disc list-inside ml-5'>
              <li>Smooth onboarding regardless of tier</li>
              <li>Preconfigured defaults (polling intervals, retries) with overrides for whales</li>
            </ul>
          </li>
          <li>
            <strong>Phase 4:</strong> AI Insights layer
            <ul className='list-disc list-inside ml-5'>
              <li>AI-driven usage insights with cost/performance optimization per tier</li>
            </ul>
          </li>
        </ul>

        {/* Risks & Mitigations */}
        <h3 className='text-xl font-semibold'>3.2 Risks & Mitigations</h3>
        <p>Potential risks and how to address them:</p>
        <ul className='list-disc list-inside space-y-1'>
          <li>Data leaks → RLS for shared infra, dedicated DBs for whales, encryption, audits</li>
          <li>Noisy neighbors → per-tenant quotas for regulars, reserved capacity for whales</li>
          <li>Cloud costs → tenant scoring aligns infra with revenue; strict cost attribution + tiered plans</li>
          <li>Connector drift → schema caching + metadata discovery, plus whale support contracts if needed</li>
          <li>Mis-scoring at onboarding → allow tier reclassification over time (upgrade path to whale infra)</li>
        </ul>
      </div>
    ),
  },
};

export default function SlideDetail() {
  const { id } = useParams();
  const slide = slideDetails[Number(id)];

  if (!slide) {
    return (
      <div className='p-6'>
        <h1 className='text-xl font-bold'>Slide not found</h1>
        <Link to='/' className='text-blue-500 underline'>
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <Link to='/' className='text-blue-500 underline'>
        ← Back to slides
      </Link>
      <h1 className='text-3xl font-bold mt-4'>{slide.title}</h1>
      <div className='mt-6'>{slide.content}</div>
    </div>
  );
}
