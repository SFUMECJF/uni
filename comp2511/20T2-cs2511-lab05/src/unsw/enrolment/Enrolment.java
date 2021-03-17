package unsw.enrolment;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.time.LocalDateTime;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

// depreciated but will be used as requested by spec. 
// Listeners can be used instead
import java.util.Observable;
import java.util.Observer;




public class Enrolment {

    private CourseOffering offering;
    private Grade grade;
    private Student student;
    private List<Session> sessions;

    private List<Assessment> prac;
    private Exam finalExam;

    public Enrolment(CourseOffering offering, Student student, Session... sessions) {
        this.offering = offering;
        this.student = student;
        this.grade = null; // Student has not completed course yet.
        student.addEnrolment(this);
        offering.addEnrolment(this);
        this.sessions = new ArrayList<>();
        for (Session session : sessions) {
            this.sessions.add(session);
        }
        this.prac = new ArrayList<>();
        this.finalExam = null; // Student has yet to complete final exam
    }

    public Course getCourse() {
        return offering.getCourse();
    }

    public String getTerm() {
        return offering.getTerm();
    }

    public Student getStudent() {
        return this.student;
    }

    public boolean hasPassed() {
        return grade != null && grade.isPassing();
    }

    // Adds practical assessment 
    public void addPrac() {
        Assessment nextPrac = new Assessment();
        addLog(nextPrac);
        prac.add(nextPrac);
    }

    // adds milestone to prac assessment
    public void addMilestone(String name, int mark) {
        for (Assessment anAssess : prac) {
            if (name.equals(anAssess.getName())) {
                anAssess.addMilestone(mark);
                break;
            }
        }
    }
    // Adds a final examination
    public void addExam(int mark) {
        finalExam = new Exam("finalExam");
        addLog(finalExam);
        if (mark != 0) {
            finalExam.setMark(mark);
        }
        
        // when exam is completed. mark total will be calculated
        assignMark();
    }

    // Adds observer to mark and adds it to the designated log file
    private void addLog(Mark mark) {
        mark.addObserver(new Observer() {

        @Override
        public void update(Observable observable, Object arg) {
            String logName = offering.getCourse().getCourseCode() + " " +
                             offering.getTerm() + " " +
                             getStudent().getZID();
            try {
                File file = new File(logName);
                PrintStream write = new PrintStream(new FileOutputStream(file, true));
                
                if (mark instanceof Assessment) {
                    Assessment temp = (Assessment) mark;
                    write.println(LocalDateTime.now() + 
                                  " milestone mark set for " + temp.getName() + 
                                  " to " + temp.getLastMilestone() + 
                                  ", with new average of " + temp.getMark());
                }
                else {
                    write.println(LocalDateTime.now() +
                                  " exam mark set for " + mark.getName() +
                                  " to " + mark.getMark());
                }
                write.close();
            } catch (FileNotFoundException error) {
                error.printStackTrace();
            }
        }

        });
    }

    // Gets all grades and returns the final grade
    // Averages out all prac and final assessment
    public int getCourseTotal() {
        int courseTotal = 0;

        for (Assessment aPrac : prac) {
            courseTotal += aPrac.getMark();
        }
        return courseTotal + (this.finalExam.getMark());
    }

    public void assignMark() {
        grade = new Grade(getCourseTotal());
    }

}
