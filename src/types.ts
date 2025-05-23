export interface Job {
  $id: string;
  title: string;
  company: string;
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  jobType: string;
  description: string;
  requirements: [];
  responsibilities: [];
  applicationDeadline: string;
  $createdAt: string;
  logo: string;
}