package staff;

public class Lecturer extends StaffMember{
    // Lecturer Atributes as requested

   /**
    *   @param school is staff member's affiliated school
    *   @param aStatus is lecturer's status
    */

    // Staff Atributes as subclass of StaffMember 

   /**
    *   @param name is staff member name
    *   @param salary is given salary of staff member
    *   @param startContract = Hire date of staff member
    *   @param endContract = Planned end of tenanure of staff member
    */

    private String school;
    private  String aStatus;

    // Lecturer Constructor
    // Note contained attributes as in StaffMember
    public Lecturer(String name, String aStatus, double salary, String school) {
        super(name, salary);
        this.school = school;
        this.aStatus = aStatus;
        
    }

    // Other Helper class return 
    public String getSchool() {
        return school;
    }

    public String getaStatus() {
        String newaStatus = "";
        if (this.aStatus == "A") {newaStatus = "Associate Lecturer";}
        if (this.aStatus == "B") {newaStatus = "Lecturer";}
        if (this.aStatus == "C") {newaStatus = "Senior Lecturer";}

        return newaStatus;
    }

    // Method Override toString including name, school and aStatus
    @Override
    public String toString() {
        String stats = "Name: " + getName() + "\t School: " + getSchool() + "\t aStatus: " + getaStatus();
        return stats;
    }

    // Method override method

    @Override
    public boolean equals(Object object) {
        if (super.equals(object) == false) return false;
        Lecturer tester = (Lecturer) object;
        if (this.school == tester.school && this.aStatus == tester.aStatus) {
            return true;
        } else {
            return false;
        }
        
    }

    
}