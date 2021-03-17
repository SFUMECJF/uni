package example;

public class Average {

        /**
         * Returns the average of an array of numbers
         * @param the array of integer numbers
         * @return the average of the numbers
         */
        public float average(int[] nums) {
            float result = 0;
            // Add your code

            for (int val : nums) {
                result += val;
            }

            return(result/nums.length);
        }

        public static void main(String[] args) {
            // Add your code
            int nums[] = {1, 2, 3, 4};
            Average allNums = new Average();
            System.out.println(allNums.average(nums));
        }
}
