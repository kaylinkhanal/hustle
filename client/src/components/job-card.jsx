import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Building2, Clock, Briefcase, DollarSign } from 'lucide-react'



export function JobCard({
  title,
  company,
  location,
  salary,
  jobType,
  experienceLevel,
  skills,
  recruiter,
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] border-2 border-emerald-100 bg-gradient-to-b from-white to-emerald-50 relative">
      {/* Floating Best Fit Tag */}
      <div className="absolute -right-8 top-6 rotate-45 z-10">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-1 px-10 text-sm font-semibold shadow-lg">
          Best Fit
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl text-emerald-800">{title}</h3>
            <div className="flex items-center text-emerald-600">
              <Building2 className="mr-1 h-4 w-4" />
              <span>{recruiter.fullName}</span>
            </div>
          </div>
          {/* <div className="h-12 w-12 absolute right-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
            {recruiter.fullName.charAt(0)}
          </div> */}
        </div>
        <div className="mt-4 grid gap-2">
          <div className="flex items-center text-emerald-700">
            <MapPin className="mr-1 h-4 w-4 text-emerald-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <DollarSign className="mr-1 h-4 w-4 text-emerald-500" />
            <span>${salary.toLocaleString()} per year</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <Clock className="mr-1 h-4 w-4 text-emerald-500" />
            <span>{jobType}</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <Briefcase className="mr-1 h-4 w-4 text-emerald-500" />
            <span>{experienceLevel}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge 
              key={skill} 
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

