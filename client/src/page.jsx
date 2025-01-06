import { JobCard } from "./job-card"

export default async function Home() {
  const { data } = await fetch('http://localhost:8080/jobs').then(res => res.json())
  
  return (
    (<div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Recommended Jobs</h1>
          <p className="text-muted-foreground mt-1">Find your next opportunity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Latest</option>
            <option>Salary</option>
            <option>Experience</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            company={job.industry}
            location={job.location}
            salary={job.salary}
            jobType={job.jobType}
            experienceLevel={job.experienceLevel}
            skills={job.skills}
            recruiter={job.recruiter} />
        ))}
      </div>
    </div>)
  );
}

