import axios from 'axios';
import { CourseSection } from '@/app/api/types';

interface CacheEntry {
  data: CourseSection[];
  timestamp: number;
}

class CourseCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 10 * 60 * 1000;
  private readonly BATCH_SIZE = 500;

  async getAllCourses(): Promise<CourseSection[]> {
    const cacheKey = 'all-courses-202531';
    const cached = this.cache.get(cacheKey);

    // Return cached data if fresh
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log('Using cached course data');
      return cached.data;
    }
    
    try {
      const response = await axios.post(
        'https://howdy.tamu.edu/api/course-sections',
        {
          startRow: 0,
          endRow: this.BATCH_SIZE,
          termCode: "202531",
          publicSearch: "Y"
        },
        {
          timeout: 15000, // 15 second timeout
        }
      );

      const courses = response.data as CourseSection[];
      
      // cache result bro
      this.cache.set(cacheKey, {
        data: courses,
        timestamp: Date.now()
      });

      return courses;
    } catch (error) {
      console.error('Failed to fetch from TAMU API:', error);
      
      
      if (cached) {
        console.log('Using stale cache due to API error');
        return cached.data;
      }
      
      throw error;
    }
  }

  // get courses filtered by department
  async getCoursesByDepartment(department: string): Promise<CourseSection[]> {
    const allCourses = await this.getAllCourses();
    return allCourses.filter(
      course => course.SWV_CLASS_SEARCH_SUBJECT === department.toUpperCase()
    );
  }

  // get courses filtered by department and course number
  async getFilteredCourses(department?: string, courseNumber?: string): Promise<CourseSection[]> {
    const allCourses = await this.getAllCourses();
    
    let filtered = allCourses;
    
    if (department) {
      filtered = filtered.filter(
        course => course.SWV_CLASS_SEARCH_SUBJECT === department.toUpperCase()
      );
    }
    
    if (courseNumber) {
      filtered = filtered.filter(
        course => course.SWV_CLASS_SEARCH_COURSE === courseNumber
      );
    }
    
    return filtered;
  }
}

// singleton instance
export const courseCache = new CourseCache();