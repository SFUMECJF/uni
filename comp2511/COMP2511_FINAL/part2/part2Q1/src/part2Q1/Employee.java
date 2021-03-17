package part2Q1;

// changed to abstract class to remove duplicated code
public abstract class Employee {
	private String title;
	private String firstName;
	private String lastName;
	private double baseSalary;
	private double bonus;

	public Employee (String title, String firstName, String lastName, double bonus) {
		this.title = title;
		this.firstName = firstName;
		this.lastName = lastName;
		this.bonus = bonus;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getTitle() {
		return title;
	}

	public double getBaseSalary() {
		return baseSalary;
	}

	public double calculateTax() {
		double tax = 0;
		double salary = baseSalary;
		if (salary > 50000) {
		    tax += 0.3*(salary - 50000);
		}
		if (salary > 30000) {
		    tax += 0.2*(salary - 30000);
		}
		return tax;
	}

	public double calculateParkingFringeBenefits() {
		return (baseSalary - 50000) / 10000;
	}

	public double calculateSalary() {
		double totalSal;
        totalSal = getBaseSalary() + bonus
                 + calculateParkingFringeBenefits() - calculateTax();
        return totalSal;
	}

}
