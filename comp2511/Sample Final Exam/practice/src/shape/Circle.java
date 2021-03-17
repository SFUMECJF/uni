package src.shape;

public class Circle implements Shape {
    
    int radius;

    // Constructor for class circle
    public Circle(int radius) {
        this.radius = radius;
    }

    // method to print features
    @Override
    public void printFeatures() {
        System.out.println("The radius of this circle is " + this.radius + "\n");
    }
}