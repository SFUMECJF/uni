package staff;
import java.util.Calendar;
import java.util.Date;
/**
 * A staff member
 * @author Robert Clifton-Everest
 *
 */
public class StaffMember {
    public String name;
    protected double salary;
    protected Date startContract;
    protected Date endContract;

   /** Constructor for Staffmember includes
    * @param name StaffMember name
    * @param salary StaffMember Salary given on contract
    */


    // constructor for StaffMember object
    public StaffMember(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public Date startContract (int hYear, int hMonth, int hDay) {
        Calendar startContractCal = Calendar.getInstance();
        startContractCal.set(hYear, hMonth, hDay);
        Date startContractDate = startContractCal.getTime();
        return startContractDate;
    }

    // Function to return endContract
    public Date endContract (int eYear, int eMonth, int eDay) {
        Calendar endContractCal = Calendar.getInstance();
        endContractCal.set(eYear, eMonth, eDay);
        Date endContractDate = endContractCal.getTime();
        return endContractDate;
    }

    // Returns name of obj
    public String getName() {
        return name;
    }

    // Returns Salary of obj
    public double getSal() {
        return salary;
    }

    // to String override
    @Override
    public String toString() {
        return "Name: " + getName() + "\t Salary: " + getSal();
    }

    //equals override    
    @Override
    public boolean equals(Object object) {
        if (object == null) {return false;}
        if (this.getClass() != object.getClass()) {return false;}

        StaffMember tester = (StaffMember) object;
        if (tester.name == this.name && tester.salary == this.salary) {
            return true;
        } else { 
            return false;
        }
        
    }
}
