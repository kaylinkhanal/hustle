
import { JobCard } from "@/components/job-card"
import axios from "axios"

export default async function Home() {
  const { data } = await axios.get('http://localhost:8080/jobs')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Recommended Jobs
            </h1>
            <p className="text-emerald-600 mt-1 text-lg">
              Find your next opportunity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-emerald-600">Sort by:</span>
            <select className="border-2 border-emerald-200 rounded-md px-3 py-2 text-sm bg-white text-emerald-700 focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50">
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
              recruiter={job.recruiter}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

