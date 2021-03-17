package part3Q3;

public class FreeShippingDecorator extends Product{
    protected Product p;
    protected double lowerPrice;
    protected double lowerWeight;

    // TODO Complete this class
    public FreeShippingDecorator(Product p, int lowerPrice, int lowerWeight) {
        this.p = p;
        this.lowerPrice = lowerPrice;
        this.lowerWeight = lowerWeight;
    }

    @Override
    public double getPrice() {
        return p.getPrice();
    }

    @Override
    public int getWeight() {
        return p.getWeight();
    }
    @Override
    public double getShippingCost() {
        // TODO Auto-generated method stub
        if (p.getPrice() >= this.lowerPrice && p.getWeight() <= this.lowerWeight) {
            return 0;
        } else {
            return (getWeight()/1000 + 1)*2;
        }
    }
}
