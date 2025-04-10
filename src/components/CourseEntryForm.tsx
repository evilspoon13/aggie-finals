"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseEntry } from "@/app/api/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash2, User, Clock, Smile} from "lucide-react";
import { IndividualDataEntry } from "./IndividualDataEntry";
import { searchCourses } from "@/app/api/hooks/searchCourses";

interface CourseEntryFormProps {
  courses: CourseEntry[];
  setCourses: React.Dispatch<React.SetStateAction<CourseEntry[]>>;
  onGenerateSchedule: () => void;
}

export function CourseEntryForm({ courses, setCourses, onGenerateSchedule }: CourseEntryFormProps) {

  // for when a user enters their course by subject
  const [possibleCourses, setPossibleCourses] = useState<CourseEntry[]>([]);
  const [possibleCoursesLoading, setPossibleCoursesLoading] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [courseNumber, setCourseNumber] = useState<number>(0);
  const [submittedCourseSearch, setSubmittedCourseSearch] = useState<boolean>(false);

  // for when a user enters their course by crn
  const [crn, setCrn] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<string>("course");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSearchForCourseButton = () => {
    searchBySubject();
    setPossibleCourses([]);
  }

  const handleGenerateSchedule = () => {
    // function to set submitted to true and generate schedule so we can have two functions called on one button press
    setSubmitted(true);
    onGenerateSchedule();
  }

  useEffect(() => {
    setCourses([]);
  }, [currentTab, setCourses]);

  // add a course to the list and clear CRN field
  const addCourseByCrn = () => {
    if(!crn.trim() || courses.some(course => course.crn === crn)) {
      return;
    }

    const newCourse: CourseEntry = {
      crn,
      loading: false,
      error: null
    }

    setCourses([...courses, newCourse]);
    setCrn("");
  }

  const searchBySubject = async () => {
    setPossibleCoursesLoading(true);
    setSubmittedCourseSearch(true);
    if (!subject.trim() || courseNumber <= 0) {
      return;
    }

    const result = await searchCourses(subject, courseNumber);

    setPossibleCoursesLoading(false);
    setPossibleCourses(result.courses);
  };


const addSelectedCourse = (course: CourseEntry) => {
  if (courses.some(c => c.crn === course.crn)) {
    return;
  }
  
  setCourses([...courses, course]);
  
  setPossibleCourses([]);
  setSubmittedCourseSearch(false);
  setCourseNumber(0);
  setSubject("");
};

  const removeCourse = (crn: string) => {
    setCourses(courses.filter(course => course.crn !== crn));
  }


  return (
    <div className="w-full max-w-2xl mx-auto">
      

      {submitted && (
        <div className="flex items-center gap-1 mb-4">
          <h2 className="text-xl font-bold">Good luck!</h2>
          <Smile size={20} className="text-gray-500"/>
        </div>
      )}

      {!submitted && (
        <h2 className="text-3xl font-bold mb-6 text-white">Find your courses</h2>
      )}

      <Tabs defaultValue="course" className="w-full" onValueChange={(value) => setCurrentTab(value)}>
        <TabsList className="w-full flex justify-center items-center rounded-lg shadow-sm mb-6">
          <TabsTrigger 
            value="course" 
            className="flex-1 py-3 rounded-l-lg data-[state=active]:bg-[#562626] data-[state=active]:text-white transition-all"
          >
            Search by course
          </TabsTrigger>
          <TabsTrigger 
            value="crn" 
            className="flex-1 py-3 rounded-r-lg data-[state=active]:bg-[#562626] data-[state=active]:text-white transition-all"
          >
            Search by CRN
          </TabsTrigger>
        </TabsList>

        <Card className="border shadow-sm rounded-xl bg-white">
          <CardContent className="p-6">

          <TabsContent value="crn">
            <IndividualDataEntry
              value={crn}
              tabValue="crn"
              onChange={(e) => setCrn(e.target.value)}
              handleKeyDown={(e) => {
                if (e.key === 'Enter' && crn.trim()) {
                  addCourseByCrn();
                }
              }}
              label="CRN"
              description="Enter the 5-digit CRN (e.g. 12345)"
            />
            <div className="flex justify-center mt-4">
              <Button 
                className="bg-[#562626] hover:bg-[#5A0010]text-white shadow-sm transition-colors w-50" 
                onClick={addCourseByCrn}
                disabled={!crn.trim()}
              >
                Add Course
              </Button>
            </div>
        </TabsContent>

        <TabsContent value="course">
          <div className="space-y-4">
            <IndividualDataEntry
              value={subject}
              tabValue="course"
              onChange={(e) => setSubject(e.target.value)}
              handleKeyDown={(e) => {
                if (e.key === 'Enter' && subject.trim() && courseNumber > 0) {
                  searchBySubject();
                }
              }}
              label="Subject"
              description="Enter department (e.g. CSCE)"
            />

            <IndividualDataEntry
              value={courseNumber === 0 ? "" : courseNumber.toString()}
              tabValue="course"
              onChange={(e) => setCourseNumber(parseInt(e.target.value) || 0)}
              handleKeyDown={(e) => {
                if (e.key === 'Enter' && subject.trim() && courseNumber > 0) {
                  searchBySubject();
                }
              }}
              label="Course Number"
              description="Enter Course Number (e.g. 120)"
            />
            
            <div className="flex justify-center mt-4">
              <Button 
                className="bg-[#562626] hover:bg-[#5A0010]text-white shadow-sm transition-colors w-50" 
                onClick={handleSearchForCourseButton}
                disabled={!subject.trim() || courseNumber <= 0}
              >
                Search for Course
              </Button>
            </div>


            {(possibleCoursesLoading) && (
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-medium text-gray-800 mb-3 text-center">Loading possible courses...</h2>
                <div className="animate-spin h-6 w-6 border-2 border-[#562626] border-t-transparent rounded-full mx-auto"></div>
              </div>
            )}

            
            {((possibleCourses.length === 0 && !possibleCoursesLoading) && submittedCourseSearch) && (
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-medium text-gray-800 mb-3 text-center">No courses found.</h2>
              </div>
            )}

            {/* after the user inputs their course, display the search results */}
            {(possibleCourses.length > 0 && submittedCourseSearch) && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Search Results</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {possibleCourses.map((course, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                      <div className="flex-1">
                        {course.courseDetails ? (
                          <div>
                            <span className="font-medium">
                              {course.courseDetails.subject} {course.courseDetails.courseNumber}-{course.courseDetails.section}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <User size={14} className="text-gray-500" />
                              <span>{course.courseDetails.instructor}</span>
                            </div>
                            <span className="text-sm text-gray-600 block">
                              {course.courseDetails.title} (CRN: {course.crn})
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-600 block">
                                {course.lectureSchedule?.beginTime}-{course.lectureSchedule?.endTime}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="font-medium">CRN: {course.crn}</span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => addSelectedCourse(course)}
                        className="bg-[#562626] hover:bg-[#5A0010] text-white"
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}




          </div>
        </TabsContent>
            
            {courses.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Added Courses</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {courses.map((course, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#562626] hover:bg-[#562626]">{index + 1}</Badge>
                        
                        {currentTab === "course" ? (
                           <span className="font-medium"> {course.courseDetails?.subject} {course.courseDetails?.courseNumber}</span>
                        ): (
                          <span className="font-medium"> {course.crn}</span>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeCourse(course.crn)}
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 flex justify-center">
                  <Button 
                    className="mt-2 bg-[#562626] hover:bg-[#5A0010] text-white px-6 py-2 h-11 text-base font-medium shadow-sm transition-colors"
                    onClick={handleGenerateSchedule}
                    disabled={courses.length === 0}
                  >
                    Generate Exam Schedule
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}