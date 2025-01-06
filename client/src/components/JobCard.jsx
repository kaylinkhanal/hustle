import React from 'react'
import { CalendarIcon, MapPinIcon, BriefcaseIcon, CurrencyIcon as CurrencyDollarIcon, ClockIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const JobCard = ({ job }) => {
  return (
    (<Card
      className="w-full max-w-2xl mb-6 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-primary mb-2">{job.title}</CardTitle>
            <p className="text-muted-foreground">{job.industry}</p>
          </div>
          <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>${job.salary.toLocaleString()}/year</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>
        <p className="text-sm mb-4">{job.description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
          <ul className="list-disc list-inside text-sm">
            {job.responsibilities.slice(0, 3).map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Qualifications:</h4>
          <ul className="list-disc list-inside text-sm">
            {job.qualifications.slice(0, 2).map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
          <span className="text-sm">Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
        </div>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>)
  );
}

export default JobCard

