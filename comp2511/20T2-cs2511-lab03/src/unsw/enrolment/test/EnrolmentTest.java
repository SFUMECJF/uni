package unsw.enrolment.test;

import java.time.DayOfWeek;
import java.time.LocalTime;

import unsw.enrolment.Course;
import unsw.enrolment.CourseOffering;
import unsw.enrolment.Enrolment;
import unsw.enrolment.Grade;
import unsw.enrolment.Lab;
import unsw.enrolment.Lecture;
import unsw.enrolment.Student;
import unsw.enrolment.Tutorial;

public class EnrolmentTest {

    public static void main(String[] args) {

        // Create courses
        Course comp1511 = new Course("COMP1511", "Programming Fundamentals");
        Course comp1531 = new Course("COMP1531", "Software Engineering Fundamentals");
        comp1531.addPrereq(comp1511);
        Course comp2521 = new Course("COMP2521", "Data Structures and Algorithms");
        comp2521.addPrereq(comp1511);

        CourseOffering comp1511Offering = new CourseOffering(comp1511, "19T1");
        CourseOffering comp1531Offering = new CourseOffering(comp1531, "19T1");
        CourseOffering comp2521Offering = new CourseOffering(comp2521, "19T2");
        
        // TODO Create some sessions for the courses --

        //comp1511 sessions
        Lecture comp1511Lecture = new Lecture("Webster Theatre", DayOfWeek.MONDAY, LocalTime.of(15, 30), LocalTime.of(17, 30), "Mr good lecturer");
        comp1511Offering.addSession(comp1511Lecture);
        Tutorial comp1511Tutorial = new Tutorial("piano", DayOfWeek.TUESDAY, LocalTime.of(12,00), LocalTime.of(13,00), "really nice gal");
        comp1511Offering.addSession(comp1511Tutorial);
        Lab comp1511Lab = new Lab("cello", DayOfWeek.TUESDAY, LocalTime.of(13,00), LocalTime.of(15,00), "really nice gal", "really nice guy");
        comp1511Offering.addSession(comp1511Lab);

        //comp1531 sessions
        Lecture comp1531Lecture = new Lecture("Science Theatre", DayOfWeek.THURSDAY, LocalTime.of(8, 00), LocalTime.of(10, 00), "Ms good lecturer");
        comp1531Offering.addSession(comp1531Lecture);
        Tutorial comp1531Tutorial = new Tutorial("piano", DayOfWeek.FRIDAY, LocalTime.of(12,00), LocalTime.of(13,00), "really nice guy");
        comp1531Offering.addSession(comp1531Tutorial);
        Lab comp1531Lab = new Lab("cello", DayOfWeek.FRIDAY, LocalTime.of(13,00), LocalTime.of(15,00), "really nice gul", "really nice gal");
        comp1531Offering.addSession(comp1531Lab);

        //comp2521 sessions
        Lecture comp2521Lecture = new Lecture("Webster Theatre", DayOfWeek.MONDAY, LocalTime.of(15, 30), LocalTime.of(17, 30), "good lecturer");
        comp2521Offering.addSession(comp2521Lecture);
        Tutorial comp2521Tutorial = new Tutorial("piano", DayOfWeek.WEDNESDAY, LocalTime.of(12,00), LocalTime.of(13,00), "really nice person");
        comp2521Offering.addSession(comp2521Tutorial);
        Lab comp2521Lab = new Lab("cello", DayOfWeek.WEDNESDAY, LocalTime.of(13,00), LocalTime.of(15,00), "really nice person", "really nice person");
        comp2521Offering.addSession(comp2521Lab);

        // TODO Create a student --
        Student bobby = new Student("z5123512");

        // TODO Enrol the student in COMP1511 for T1 (this should succeed) --

            //Enrols bobby into the course and sets his history as uncompleted 1511 course
        Enrolment bobby1511 = comp1511Offering.addEnrolment(bobby);

        // TODO Enrol the student in COMP1531 for T1 (this should fail as they --
            // have not met the prereq)
        comp1531Offering.addEnrolment(bobby);

        // TODO Give the student a passing grade for COMP1511--
        
            //Sets bobby's 1511 course as completed at 69 credit pass mark
        bobby1511.setGrade(new Grade(69)); // nice

        // TODO Enrol the student in 2521 (this should succeed as they have met
        // the prereqs) --

        //Allows for change of grade when necessary.
        Enrolment bobby2521 = comp2521Offering.addEnrolment(bobby);
    }
}
