package staff;
import java.util.Calendar;
import java.util.Date;

public class StaffTest {

    // toString override test
    public String printStaffDetails(StaffMember staff) {
        return staff.toString();
    }

    public static void main(String[] args) {
        StaffTest tester  = new StaffTest();

        System.out.println("Now testing StaffMember class");

        // Tests for StaffMember class
        StaffMember staff = new StaffMember("billy", 100000.1);
        System.out.println(tester.printStaffDetails(staff));

        // Start date feb 28th 2015
        System.out.println("Start Contract = " + staff.startContract(2015, 1, 28));
        // End date december 31
        System.out.println("End Contract = "  + staff.endContract(2021,11,31));
        System.out.println("override equals = " + staff.equals(staff));

        //equals override test
        System.out.println("Now testing Lecturer Subclass of StaffMember");

        Lecturer teach = new Lecturer("billy", "A", 250000.1, "UNSW Kensington");
        System.out.println(tester.printStaffDetails(teach));
        
        // Start date jan 1st 2018 
        System.out.println("Contract Start = " + teach.startContract(2018,0,1));
        // End date jan 1st 2023
        System.out.println("Contract End = " + teach.endContract(2023, 0,1));

        //equals override test
        System.out.println("override equals = " + teach.equals(teach));
    }
}