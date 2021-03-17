package src.shape;

public class Square implements Shape {
    private int sideLength;

    // constructor of square class
    public Square(int sideLength) {
        this.sideLength = sideLength;
    }

    // method to print the side length of circle
    @Override
    public void printFeatures() {
        System.out.println("The sidelength of this square is " + this.sideLength + "\n");
    }
}