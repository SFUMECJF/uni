package example;

import java.util.Scanner;

public class Splitter {

    public static void main(String[] args){
        System.out.println("Enter a sentence specified by spaces only: ");
        // Add your code
        Scanner sentence = new Scanner(System.in);
        String sc = sentence.nextLine();
        String[] splitSentence = sc.split("\\s+");

        System.out.println("Output of split sentence is: ");
        for (int i = 0; i < splitSentence.length; i++) {
            System.out.println(splitSentence[i]);
        }
    }
}
