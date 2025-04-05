import { LectureSchedule } from "../api/types";
import { FinalExam } from "../api/types";

export const findFinalExam = (lectureSchedule: LectureSchedule) : FinalExam => {
    // convert time from "HH:MM AM/PM" format to decimal hours (24-hour format)
    const convertTo24Hour = (timeStr: string): number => {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      let hoursNum = parseInt(hours);
      
      if (period === "PM" && hoursNum < 12) {
        hoursNum += 12;
      } else if (period === "AM" && hoursNum === 12) {
        hoursNum = 0;
      }
      
      return hoursNum + parseInt(minutes) / 60;
    };
  
    // get decimal time for comparison
    const beginHour24 = convertTo24Hour(lectureSchedule.beginTime);
    
    // Spring 2025 Final Exam Schedule
    const examSchedule = [
      // May 1 (Thursday)
      {
        date: "May 1, 2025 (Thursday)",
        slots: [
          {
            examTime: "7:30 - 9:30 a.m.",
            patterns: [
              { days: "MW", startTimeRange: [17.75, 19.00] }, // 5:45-7:00 PM
              { days: "MW", startTimeRange: [19.50, 20.75] }  // 7:30-8:45 PM
            ]
          },
          {
            examTime: "10:00 a.m. - 12:00 p.m.",
            patterns: [
              { days: "MWF", startTimeRange: [8.00, 8.83] },   // 8:00-8:50 AM
              { days: "MWF", startTimeRange: [8.58, 9.42] }    // 8:35-9:25 AM
            ]
          },
          {
            examTime: "12:30 - 2:30 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [9.58, 10.83] },  // 9:35-10:50 AM
              { days: "TR", startTimeRange: [10.33, 11.58] }  // 10:20-11:35 AM
            ]
          },
          {
            examTime: "3:00 - 5:00 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [11.17, 12.42] },  // 11:10-12:25 PM
              { days: "TR", startTimeRange: [11.92, 13.17] }   // 11:55-1:10 PM
            ]
          },
          {
            examTime: "6:00 - 8:00 p.m.",
            patterns: [
              { days: "MW", startTimeRange: [19.33, 20.58] },  // 7:20-8:35 PM
              { days: "MW", startTimeRange: [21.08, 22.33] }   // 9:05-10:20 PM
            ]
          }
        ]
      },
      // May 2 (Friday)
      {
        date: "May 2, 2025 (Friday)",
        slots: [
          {
            examTime: "8:00 - 10:00 a.m.",
            patterns: [
              { days: "MWF", startTimeRange: [9.17, 10.00] },  // 9:10-10:00 AM
              { days: "MWF", startTimeRange: [9.75, 10.58] }   // 9:45-10:35 AM
            ]
          },
          {
            examTime: "10:30 a.m. - 12:30 p.m.",
            patterns: [
              { days: "MWF", startTimeRange: [12.67, 13.50] },  // 12:40-1:30 PM
              { days: "MWF", startTimeRange: [13.25, 14.08] }   // 1:15-2:05 PM
            ]
          },
          {
            examTime: "1:00 - 3:00 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [8.00, 9.25] },    // 8:00-9:15 AM
              { days: "TR", startTimeRange: [8.75, 10.00] }    // 8:45-10:00 AM
            ]
          },
          {
            examTime: "3:30 - 5:30 p.m.",
            patterns: [
              { days: "MW", startTimeRange: [16.17, 17.42] },  // 4:10-5:25 PM
              { days: "MW", startTimeRange: [17.92, 19.33] }   // 5:55-7:20 PM
            ]
          }
        ]
      },
      // May 5 (Monday)
      {
        date: "May 5, 2025 (Monday)",
        slots: [
          {
            examTime: "8:00 - 10:00 a.m.",
            patterns: [
              { days: "MWF", startTimeRange: [10.33, 11.17] },  // 10:20-11:10 AM
              { days: "MWF", startTimeRange: [10.92, 11.75] }   // 10:55-11:45 AM
            ]
          },
          {
            examTime: "10:30 a.m. - 12:30 p.m.",
            patterns: [
              { days: "MWF", startTimeRange: [15.00, 15.83] },  // 3:00-3:50 PM
              { days: "MW", startTimeRange: [16.33, 17.58] }    // 4:20-5:35 PM
            ]
          },
          {
            examTime: "1:00 - 3:00 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [15.92, 17.17] },  // 3:55-5:10 PM
              { days: "TR", startTimeRange: [16.67, 17.92] }   // 4:40-5:55 PM
            ]
          },
          {
            examTime: "3:30 - 5:30 p.m.",
            patterns: [
              { days: "MWF", startTimeRange: [13.83, 14.67] },  // 1:50-2:40 PM
              { days: "MW", startTimeRange: [14.42, 15.67] }    // 2:25-3:40 PM
            ]
          },
          {
            examTime: "6:00 - 8:00 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [19.08, 20.33] },  // 7:05-8:20 PM
              { days: "TR", startTimeRange: [19.83, 21.08] }   // 7:50-9:05 PM
            ]
          }
        ]
      },
      // May 6 (Tuesday)
      {
        date: "May 6, 2025 (Tuesday)",
        slots: [
          {
            examTime: "8:00 - 10:00 a.m.",
            patterns: [
              { days: "TR", startTimeRange: [12.75, 14.00] },  // 12:45-2:00 PM
              { days: "TR", startTimeRange: [13.50, 14.75] }   // 1:30-2:45 PM
            ]
          },
          {
            examTime: "10:30 a.m. - 12:30 p.m.",
            patterns: [
              { days: "MWF", startTimeRange: [11.50, 12.33] },  // 11:30-12:20 PM
              { days: "MWF", startTimeRange: [12.08, 12.92] }   // 12:05-12:55 PM
            ]
          },
          {
            examTime: "1:00 - 3:00 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [14.33, 15.58] },  // 2:20-3:35 PM
              { days: "TR", startTimeRange: [15.08, 16.33] }   // 3:05-4:20 PM
            ]
          },
          {
            examTime: "3:30 - 5:30 p.m.",
            patterns: [
              { days: "TR", startTimeRange: [17.50, 18.75] },  // 5:30-6:45 PM
              { days: "TR", startTimeRange: [18.25, 19.50] }   // 6:15-7:30 PM
            ]
          }
        ]
      }
    ];
    
    // check if class days pattern matches a schedule pattern
    const matchesPattern = (classDays: string, scheduleDays: string): boolean => {
      // for exact matches (like TR, MWF)
      if (classDays === scheduleDays) {
        return true;
      }
      
      // for schedules that list MW but a class is just M or just W
      if (scheduleDays === "MW" && (classDays === "M" || classDays === "W")) {
        return true;
      }
      
      // for schedules that list TR but a class is just T or just R
      if (scheduleDays === "TR" && (classDays === "T" || classDays === "R")) {
        return true;
      }
      
      // for schedules that list MWF but a class might be just MW or just WF, etc.
      if (scheduleDays === "MWF") {
        // Check if the class days are a subset of MWF
        return classDays.split("").every(day => "MWF".includes(day));
      }
      
      return false;
    };
    
    // Check each day in the exam schedule
    for (const day of examSchedule) {
      for (const slot of day.slots) {
        for (const pattern of slot.patterns) {
          // Check if the meeting pattern matches
          if (matchesPattern(lectureSchedule.days, pattern.days)) {
            // Check if the start time is within range
            const [minTime, maxTime] = pattern.startTimeRange;
            if (beginHour24 >= minTime && beginHour24 <= maxTime) {
              return {
                success: true,
                date: day.date,
                examTime: slot.examTime,
                error: null,
                schedule: lectureSchedule
              };
            }
          }
        }
      }
    }
    
    return { 
      success: false,
      error: "No matching final exam time found for this course",
      schedule: lectureSchedule
    };
  };