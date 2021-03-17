package part2Q1;

public class Engineer extends Employee {
    
    // removed quota due to engineer not requiring a quota. 
    // Pushed down to salesPerson
    // Pushed constructor bonus up to Employee as all employees can have possible
    // bonuses
    public Engineer(String title, String firstName, String lastName, Double bonus) {
        super(title, firstName, lastName, bonus);
    }
    // removed calculation of salary via push up method to Employee.
    // assumes all employees will have a possible bonus with all that dont, 
    // calculate salary is @Override to calculate the correct method.
}
