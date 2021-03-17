package part3Q3;

public class DiscountDecorator extends Product{

    protected Product p;
    protected double discountPercentage;
    // TODO: Complete this class
    public DiscountDecorator(Product p, double discountPercentage) {
        this.p = p;
        this.discountPercentage = discountPercentage/100;
    }

    @Override
    public double getPrice() {
        return p.getPrice() - (p.getPrice() * discountPercentage);
    }

    @Override
    public int getWeight() {
        return p.getWeight();
    }
}
