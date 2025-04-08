"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CourseEntry } from "@/app/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash2 } from "lucide-react";

interface CourseEntryFormProps {
  courses: CourseEntry[];
  setCourses: React.Dispatch<React.SetStateAction<CourseEntry[]>>;
  onGenerateSchedule: () => void;
}

export function CourseEntryForm({ courses, setCourses, onGenerateSchedule }: CourseEntryFormProps) {
  const [crn, setCrn] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("crn");

  useEffect(() => {
    setCourses([]);
  }, [currentTab, setCourses]);

  // add a course to the list and clear CRN field
  const addCourse = () => {
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

  const removeCourse = (crn: string) => {
    setCourses(courses.filter(course => course.crn !== crn));
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && crn.trim()) {
      addCourse();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="crn" className="w-full" onValueChange={(value) => setCurrentTab(value)}>
        <TabsList className="w-full flex justify-center items-center rounded-lg shadow-sm mb-6">
          <TabsTrigger 
            value="course" 
            className="flex-1 py-3 rounded-l-lg data-[state=active]:bg-[#820000] data-[state=active]:text-white transition-all"
          >
            Search by course
          </TabsTrigger>
          <TabsTrigger 
            value="crn" 
            className="flex-1 py-3 rounded-r-lg data-[state=active]:bg-[#820000] data-[state=active]:text-white transition-all"
          >
            Search by CRN
          </TabsTrigger>
        </TabsList>

        <Card className="border shadow-sm rounded-xl bg-white">
          <CardContent className="p-6">
            <TabsContent value="crn" className="space-y-6 mt-0">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-md space-y-2">
                  <Label htmlFor="crn" className="text-sm font-medium text-gray-700">
                    Course Registration Number (CRN)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="text" 
                      id="crn"
                      value={crn}
                      onChange={(e) => setCrn(e.target.value)}
                      placeholder="Enter CRN (e.g. 12345)"
                      className="rounded-md focus:ring-[#820000] focus:border-[#820000]"
                      onKeyDown={handleKeyDown}
                    />
                    <Button 
                      className="bg-[#820000] hover:bg-[#5A0010] text-white shadow-sm transition-colors" 
                      onClick={addCourse}
                      disabled={!crn.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the 5-digit course CRN
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="course" className="mt-0">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h3>
                <p className="text-gray-500">
                  Search by course name and section functionality will be available soon!
                </p>
              </div>
            </TabsContent>
            
            {courses.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Added Courses</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {courses.map((course, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#820000] hover:bg-[#820000]">{index + 1}</Badge>
                        <span className="font-medium">CRN: {course.crn}</span>
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
                    className="mt-2 bg-[#820000] hover:bg-[#5A0010] text-white px-6 py-2 h-11 text-base font-medium shadow-sm transition-colors"
                    onClick={onGenerateSchedule}
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