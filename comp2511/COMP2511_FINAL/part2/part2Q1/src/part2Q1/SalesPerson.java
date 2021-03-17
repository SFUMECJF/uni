package part2Q1;

public class SalesPerson extends Employee {

	private float commission;
	private double salesTarget;
	private double salesAchieved;

	// pushed up constructor for bonuses. Assumes that all employees can
	// possibly have bonuses
	public SalesPerson(String title, String firstName, String lastName, int quota, Double bonus) {
		super(title, firstName, lastName, bonus);
		this.salesTarget = quota;
	}

	@Override
	public double calculateSalary() {
		double totalSal;
		totalSal = super.getBaseSalary() + commission * this.getSalesAchieved()
		         + super.calculateParkingFringeBenefits()
		         - super.calculateTax();
		return totalSal;
	}

	/**
	 * Refused Bequest. Pushed down field
	 * Moved relevant salesperson employee functions into salesperson.
	 * This includes getSalesAchieved and getSalesTarget as well as
	 * Some declarations that were irrelevant to other employees
	*/

	public double getSalesAchieved() {
		return salesAchieved;
	}

	public double getSalesTarget() {
		return salesTarget;
	}

	/**
	 * Excessive coupling between classes. Feature Envy.
	 * used move method to move function getSalesSummary to relevant data
	 * Removed lazy class of salesHistory to relevant data containing class
	 * 
	 */
	
	public String getSalesSummary() {
		return this.getFirstName() + this.getLastName() + "Sales Target: " + 
			   this.getSalesTarget() + "$\n" +
			   "Sales to date: " + this.getSalesAchieved() + "$";
	}

}
