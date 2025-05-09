export interface examMapping{
  dayPattern: string;
  timeStart: number;
  timeEnd: number;
  examDate: string;
  examTime: string;
  regularClassTime: string;
}

export const examMappings: examMapping[] = [
    // May 1 (Thursday)
    { dayPattern: "MW", timeStart: 17.75, timeEnd: 19.00, examDate: "May 1, 2025 (Thursday)", examTime: "7:30 - 9:30 a.m.", regularClassTime: "5:45 – 7:00 p.m." },
    { dayPattern: "MW", timeStart: 19.50, timeEnd: 20.75, examDate: "May 1, 2025 (Thursday)", examTime: "7:30 - 9:30 a.m.", regularClassTime: "7:30 – 8:45 p.m." },
    { dayPattern: "MWF", timeStart: 8.00, timeEnd: 8.83, examDate: "May 1, 2025 (Thursday)", examTime: "10:00 a.m. - 12:00 p.m. (noon)", regularClassTime: "8:00 – 8:50 a.m." },
    { dayPattern: "MWF", timeStart: 8.58, timeEnd: 9.42, examDate: "May 1, 2025 (Thursday)", examTime: "10:00 a.m. - 12:00 p.m. (noon)", regularClassTime: "8:35 – 9:25 a.m." },
    { dayPattern: "TR", timeStart: 9.58, timeEnd: 10.83, examDate: "May 1, 2025 (Thursday)", examTime: "12:30 - 2:30 p.m.", regularClassTime: "9:35 – 10:50 a.m." },
    { dayPattern: "TR", timeStart: 10.33, timeEnd: 11.58, examDate: "May 1, 2025 (Thursday)", examTime: "12:30 - 2:30 p.m.", regularClassTime: "10:20 – 11:35 a.m." },
    { dayPattern: "TR", timeStart: 11.17, timeEnd: 12.42, examDate: "May 1, 2025 (Thursday)", examTime: "3:00 - 5:00 p.m.", regularClassTime: "11:10 a.m. – 12:25 p.m." },
    { dayPattern: "TR", timeStart: 11.92, timeEnd: 13.17, examDate: "May 1, 2025 (Thursday)", examTime: "3:00 - 5:00 p.m.", regularClassTime: "11:55 am. – 1:10 p.m." },
    { dayPattern: "MW", timeStart: 19.33, timeEnd: 20.58, examDate: "May 1, 2025 (Thursday)", examTime: "6:00 - 8:00 p.m.", regularClassTime: "7:20 – 8:35 p.m." },
    { dayPattern: "MW", timeStart: 21.08, timeEnd: 22.33, examDate: "May 1, 2025 (Thursday)", examTime: "6:00 - 8:00 p.m.", regularClassTime: "9:05 – 10:20 p.m." },
    
    // May 2 (Friday)
    { dayPattern: "MWF", timeStart: 9.17, timeEnd: 10.00, examDate: "May 2, 2025 (Friday)", examTime: "8:00 - 10:00 a.m.", regularClassTime: "9:10 – 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 9.75, timeEnd: 10.58, examDate: "May 2, 2025 (Friday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "9:45 – 10:35 a.m." },
    { dayPattern: "MWF", timeStart: 12.67, timeEnd: 13.50, examDate: "May 2, 2025 (Friday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "12:40 – 1:30 p.m." },
    { dayPattern: "MWF", timeStart: 13.25, timeEnd: 14.08, examDate: "May 2, 2025 (Friday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "1:15 – 2:05 p.m." },
    { dayPattern: "TR", timeStart: 8.00, timeEnd: 9.25, examDate: "May 2, 2025 (Friday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "8:00 – 9:15 a.m." },
    { dayPattern: "TR", timeStart: 8.75, timeEnd: 10.00, examDate: "May 2, 2025 (Friday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "8:45 – 10:00 a.m." },
    { dayPattern: "MW", timeStart: 16.17, timeEnd: 17.42, examDate: "May 2, 2025 (Friday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "4:10 – 5:25 p.m." },
    { dayPattern: "MW", timeStart: 17.92, timeEnd: 19.33, examDate: "May 2, 2025 (Friday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "5:55 – 7:20 p.m." },
    
    // May 5 (Monday)
    { dayPattern: "MWF", timeStart: 10.33, timeEnd: 11.17, examDate: "May 5, 2025 (Monday)", examTime: "8:00 - 10:00 a.m.", regularClassTime: "10:20 – 11:10 a.m." },
    { dayPattern: "MWF", timeStart: 10.92, timeEnd: 11.75, examDate: "May 5, 2025 (Monday)", examTime: "8:00 - 10:00 a.m.", regularClassTime: "10:55 – 11:45 a.m." },
    { dayPattern: "MWF", timeStart: 15.00, timeEnd: 15.83, examDate: "May 5, 2025 (Monday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "3:00 – 3:50 p.m." },
    { dayPattern: "MW", timeStart: 16.33, timeEnd: 17.58, examDate: "May 5, 2025 (Monday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "4:20 – 5:35 p.m." },
    { dayPattern: "TR", timeStart: 15.92, timeEnd: 17.17, examDate: "May 5, 2025 (Monday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "3:55 – 5:10 p.m." },
    { dayPattern: "TR", timeStart: 16.67, timeEnd: 17.92, examDate: "May 5, 2025 (Monday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "4:40 – 5:55 p.m." },
    { dayPattern: "MWF", timeStart: 13.83, timeEnd: 14.67, examDate: "May 5, 2025 (Monday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "1:50 – 2:40 p.m." },
    { dayPattern: "MW", timeStart: 14.42, timeEnd: 15.67, examDate: "May 5, 2025 (Monday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "2:25 – 3:40 p.m." },
    { dayPattern: "TR", timeStart: 19.08, timeEnd: 20.33, examDate: "May 5, 2025 (Monday)", examTime: "6:00 - 8:00 p.m.", regularClassTime: "7:05 – 8:20 p.m." },
    { dayPattern: "TR", timeStart: 19.83, timeEnd: 21.08, examDate: "May 5, 2025 (Monday)", examTime: "6:00 - 8:00 p.m.", regularClassTime: "7:50 – 9:05 p.m." },
    
    // May 6 (Tuesday)
    { dayPattern: "TR", timeStart: 12.75, timeEnd: 14.00, examDate: "May 6, 2025 (Tuesday)", examTime: "8:00 - 10:00 a.m.", regularClassTime: "12:45 – 2:00 p.m." },
    { dayPattern: "TR", timeStart: 13.50, timeEnd: 14.75, examDate: "May 6, 2025 (Tuesday)", examTime: "8:00 - 10:00 a.m.", regularClassTime: "1:30 – 2:45 p.m." },
    { dayPattern: "MWF", timeStart: 11.50, timeEnd: 12.33, examDate: "May 6, 2025 (Tuesday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "11:30 a.m. – 12:20 p.m." },
    { dayPattern: "MWF", timeStart: 12.08, timeEnd: 12.92, examDate: "May 6, 2025 (Tuesday)", examTime: "10:30 a.m. - 12:30 p.m.", regularClassTime: "12:05 – 12:55 p.m." },
    { dayPattern: "TR", timeStart: 14.33, timeEnd: 15.58, examDate: "May 6, 2025 (Tuesday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "2:20 – 3:35 p.m." },
    { dayPattern: "TR", timeStart: 15.08, timeEnd: 16.33, examDate: "May 6, 2025 (Tuesday)", examTime: "1:00 - 3:00 p.m.", regularClassTime: "3:05 – 4:20 p.m." },
    { dayPattern: "TR", timeStart: 17.50, timeEnd: 18.75, examDate: "May 6, 2025 (Tuesday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "5:30 – 6:45 p.m." },
    { dayPattern: "TR", timeStart: 18.25, timeEnd: 19.50, examDate: "May 6, 2025 (Tuesday)", examTime: "3:30 - 5:30 p.m.", regularClassTime: "6:15 – 7:30 p.m." }
  ];