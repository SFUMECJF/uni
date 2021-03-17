package src.shape;

import java.util.Scanner;
import java.util.ArrayList;

public class RunShape {

    public static void main(String args[]) {
        ArrayList<Shape> shapeList = new ArrayList<Shape>();
        // given an input will print its shape. 

        // beginning in struction
        System.out.println("Enter Shape type to create or type 'exit' \n" +
        "- Square, side length\n" +
        "- Circle, radius");

        Scanner input = new Scanner(System.in);
        String shapeInput = new String();
        while ((shapeInput = input.nextLine()) != "exit") {
            
            // switch case for inputs
            switch (shapeInput) {
                // case that input is square
                case ("square"):
                case ("Square"):
                    System.out.println("Enter side length:");
                    shapeInput = input.nextLine();
                    shapeList.add(new Square(Integer.parseInt(shapeInput)));
                    System.out.println("Added shape Square");
                    break;
                // case that input is circle
                case ("circle"):
                case ("Circle"):
                    System.out.println("Enter radius: ");
                    shapeInput = input.nextLine();
                    shapeList.add(new Circle(Integer.parseInt(shapeInput)));
                    System.out.println("Added shape Circle");
                    break;
                // case that input is to list all
                case ("list"):
                    for (Shape aShape : shapeList) {
                        System.out.println("The shape is " + aShape.getClass().getSimpleName());
                        aShape.printFeatures();
                    }
                    break;
                // case that input tells program to exit
                case ("exit"):
                    input.close();
                    System.exit(0);
                    break;

                default:
                    System.out.println("Invalid input. Correct usage: ");
                    // beginning in struction
                    System.out.println("Enter Shape type to create or type 'exit' \n" +
                                        "- Square, side length\n" +
                                        "- Circle, radius");
                    break;
            }
        }
    }
}