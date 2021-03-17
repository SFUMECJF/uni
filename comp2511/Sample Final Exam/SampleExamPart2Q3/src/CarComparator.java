import java.util.Comparator;

/**
 * TODO: Complete this class
 *
 */



public class CarComparator implements Comparator<Car> {

    @Override
    public int compare(Car comp1, Car comp2) {
        if (comp1.getManufacturer().compareTo(comp2.getManufacturer()) == 0) {
            return (comp1.getAge() - comp2.getAge());
        } else {
            return comp1.getManufacturer().compareTo(comp2.getManufacturer());
        }
    }
    
}