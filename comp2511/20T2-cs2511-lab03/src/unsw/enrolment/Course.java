package unsw.enrolment;
import java.util.ArrayList;
import java.util.List;

/**
 * A course in the enrolment system.
 * @author Robert Clifton-Everest
 *
 */
public class Course {

    private String courseCode;
    private String title;
    private int uoc;
    private List<Course> prereqs;
    private List<CourseOffering> courseOfferings;


    public Course(String courseCode, String title) {
        this.courseCode = courseCode;
        this.prereqs = new ArrayList<Course>();
        this.courseOfferings = new ArrayList<CourseOffering>();
        this.title = title;
    }


    public void addPrereq(Course course) {
        prereqs.add(course);
    }

    public void addOffering(CourseOffering offering) {
        courseOfferings.add(offering);
    }

    public String getCourseCode() {
        return courseCode;
    }

    public int getUOC() {
        return uoc;
    }

    public String getTitle(){
        return title;
    }

    public Boolean checkPrereq(ArrayList<Enrolment> enrolments) {
        if (prereqs.isEmpty()) { // no prereqs
            System.out.println("Course has no active prerequisites. Enrolment to " + getCourseCode() + " Successful!");
            return true;
        } 
        if (enrolments.isEmpty()) {
            System.out.println("Required prerequisites not completed. Enrolment to " + getCourseCode() +" Failed!");
            return false;
        }
        for (Enrolment anEnrolment : enrolments) {
           boolean found = false;
            for (Course aPrereq : prereqs) {
                if (aPrereq.getCourseCode() == anEnrolment.getCourseCode() && anEnrolment.getGrade() != null && anEnrolment.getGrade().getMark() >= 50) {
                    // student has enrolled in course, course is completed, and courses has passed.
                    found = true;
                    break;
                }
            }
            
            if (found == false) {
                System.out.println("Required prerequisites not completed. Enrolment to " + getCourseCode() +" Failed!"); 
                return false;
            }
        }
        System.out.println ("Required prerequisite requirements met." + "Enrolment to " + getCourseCode() + " Successful!");
        return true;
    }
}
