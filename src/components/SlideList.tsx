import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, Server, Shield, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'SyncShift SaaS Evolution Proposal',
    subtitle: 'Prepared by John Michael Baldonado',
    icon: <Server className='w-16 h-16 text-indigo-500' />,
    isCover: true,
  },
  {
    id: 2,
    title: 'Core Architecture',
    points: [
      'Control Plane → Shared Postgres (companies, users, jobs, scoring)',
      'Execution Plane → Stateless workers + job queue (scale-out replication)',
      'Data Plane → Shared DB (regular), Dedicated schema (whales), Customer-owned DB (enterprise)',
    ],
    icon: <Server className='w-10 h-10 text-blue-500' />,
  },
  {
    id: 3,
    title: 'Tenant Scoring & Placement',
    points: [
      'Scoring Factors: workload, compliance, contract tier',
      'Regular tenants → Shared infra',
      'Whales → Dedicated infra (schema/DB, customer-owned)',
      'Aligns infra spend with revenue & supports upgrades',
    ],
    icon: <TrendingUp className='w-10 h-10 text-green-500' />,
  },
  {
    id: 4,
    title: 'Safety • Performance',
    points: [
      'Safety: RLS, encryption keys, dedicated DBs',
      'Performance: worker pools, incremental sync, concurrency caps',
      'Cost: tier-aware quotas, autoscaling caps, per-tenant dashboards',
    ],
    icon: <Shield className='w-10 h-10 text-purple-500' />,
  },
  {
    id: 5,
    title: 'Cost Controls',
    points: [
      'Tier-aware plans: shared infra for regular tenants, dedicated for whales',
      'Manage compute & storage costs from heavy transformations and large datasets',
      'Egress & query cost controls, including per-tenant caps',
      'Autoscaling with concurrency limits & worker allocation per tenant',
      'Per-tenant cost attribution and dashboards to align spend with contract value',
    ],
    icon: <CheckCircle className='w-10 h-10 text-teal-500' />,
  },
  {
    id: 6,
    title: 'Roadmap (6–12 Months)',
    points: [
      'Phase 1: Control plane + workers + scoring',
      'Phase 2: Cost reporting & quota enforcement',
      'Phase 3: Self-service connectors & schema studio',
      'Phase 4: AI insights layer (analytics & optimization)',
    ],
    icon: <Zap className='w-10 h-10 text-yellow-500' />,
  },
];

export default function SlideList() {
  return (
    <div className='w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-6'>
      <div className='max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/slide/${slide.id}`}>
              <Card className='rounded-2xl shadow-md p-6 bg-white h-full flex flex-col justify-between hover:shadow-lg transition'>
                <CardContent>
                  <div className='flex items-center gap-3 mb-4'>
                    {slide.icon}
                    <h2 className='text-xl font-bold'>{slide.title}</h2>
                  </div>
                  <ul className='mt-4 space-y-2 text-gray-700'>
                    {slide.points?.map((p, j) => (
                      <li key={j} className='list-disc list-inside'>
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
